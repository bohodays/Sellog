package com.example.selog.service;

import com.example.selog.dto.record.RecordRequestDto;
import com.example.selog.entity.GitHub;
import com.example.selog.entity.Member;
import com.example.selog.entity.Record;
import com.example.selog.exception.CustomException;
import com.example.selog.exception.OpenAIException;
import com.example.selog.exception.error.ErrorCode;
import com.example.selog.repository.GitHubRepository;
import com.example.selog.repository.MemberRepository;
import com.example.selog.repository.RecordRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import org.springframework.http.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import java.util.*;

@Slf4j
@Service
public class WebHookService {

    private RecordRepository recordRepository;
    private MemberRepository memberRepository;
    private GitHubRepository gitHubRepository;

    private Map<String,Integer> score;
    private final RestTemplate restTemplate = restTemplate();

    @Value("${OPEN_AI_KEY}")
    private String OPEN_AI_KEY;

    private static final String Endpoint = "https://api.openai.com/v1/chat/completions";

    @Autowired
    public WebHookService(RecordRepository recordRepository,
                          MemberRepository memberRepository,
                          GitHubRepository gitHubRepository) {
        this.recordRepository = recordRepository;
        this.memberRepository = memberRepository;
        this.gitHubRepository = gitHubRepository;

        this.score = new HashMap<>();
        score.put("github",10);
        score.put("blog",20);
        score.put("algo",15);
        score.put("feed",5);
        score.put("cs",2);
    }
    @Transactional
    public void createRecord(HashMap<String, Object> request) {

        HashMap<String,Object> sender = (HashMap<String, Object>) request.get("sender");
        HashMap<String,Object> repository = (HashMap<String, Object>) request.get("repository");
        HashMap<String,Object> head_commit = (HashMap<String, Object>) request.get("head_commit");

        String repoName = (String)repository.get("name");

        //웹훅 첫 요청이면 무시
        if(head_commit == null) return;

        String content = (String)head_commit.get("message");
        String who = (String)sender.get("login");

        log.info("유저네임 {}",who);
        Member member = memberRepository.findByEmail(who)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));

        //github_repo에 없었다면 저장

        Integer webhookId = (Integer)repository.get("id");
        GitHub gitHub = gitHubRepository.findByWebhookId(webhookId);

        if(gitHub == null) {
            gitHubRepository.save(GitHub.builder()
                            .member(member)
                            .webhookId(webhookId)
                            .name(repoName)
                            .build());
        }

        earnPoints(member,"github");

        Record record = Record.builder()
                .category("github")
                .content(repoName + "/"+content)
                .member(member)
                .writing_time(LocalDateTime.now())
                .build();

        recordRepository.save(record);
    }

    @Transactional
    public int createAlgoRecord(RecordRequestDto recordRequestDto, Long userId){
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));

        //블로그인 경우
        if(!recordRequestDto.getProblemId().equals("")){
            Optional<Record> record = recordRepository.findByProblemIdAndCategory(recordRequestDto.getProblemId(), recordRequestDto.getType());
            if(record.isPresent()){
                throw new CustomException(ErrorCode.CONFLICT_ALGO);
            }
        }

        else {
            //message parsing
            StringTokenizer st = new StringTokenizer(recordRequestDto.getMessage(),"\n");

            String title = st.nextToken();
            st.nextToken();
            String content = st.nextToken();

            log.info("title {}, content {}",title,content);

            //chat gpt로 글 검증해서 가져오기
            for(int i=0;i<10;++i) {

                if(i==9) return -1;

                String response = chatGptResponse(title,content);

                log.info("chatgpt response : {}",response);
                //블로그 글이 검증된경우
                if(response.toLowerCase().contains("pass")) {
                    break;
                }
                //블로그 글이 검증 실패
                else if(response.toLowerCase().contains("fail")){
                    return -1;
                }
            }
        }

        int result = earnPoints(member,recordRequestDto.getType());
        recordRepository.save(
                Record.builder()
                        .category(recordRequestDto.getType())
                        .content(recordRequestDto.getMessage())
                        .member(member)
                        .problemId(recordRequestDto.getProblemId())
                        .writing_time(LocalDateTime.now())
                        .build());

        return result;
    }

    public String chatGptResponse(String title,String content) {

        StringBuilder question = new StringBuilder();
        question.append(title).append("\n");
        question.append(content+"\n");
        question.append("Please read the above korean text and evaluate it according to the following criteria.\n" +
                "1.Does the writing exceed 300 characters in length in korean? (10 points)\n" +
                "2.Does the writing contain content that is merely filler to meet the word count?(10 points)\n" +
                "3.Is there a correlation between the title of the writing and its content? (20 points)\n" +
                "4.Does the writing involve repetitive use of unknown characters?(20 points)\n" +
                "5.Are the Korean spellings and grammar correct? (20 points)\n" +
                "6.Does the writing demonstrate professionalism? (20 points)\n" +

                "\n" +
                "question: \"Please return 'pass' if the total score is 50 or higher, and 'fail' if it is lower, using no more than 10 characters.\"");

        System.setProperty("https.protocols","TLSv1.2");

        Map<String, Object> requestBody = new HashMap<>();

        List<HashMap<String,Object>> messages = new ArrayList<>();

        HashMap<String,Object> system = new HashMap<>();
        HashMap<String,Object> user = new HashMap<>();
        HashMap<String,Object> assistance = new HashMap<>();
        HashMap<String,Object> ask = new HashMap<>();

        system.put("role","system");
        system.put("content","You are a helpful assistant.");
        user.put("role","user");
        user.put("content","ㅋㅋㅋㅋㅋㅋ \n\nCan you evaluate above article pass or fail for me?");
        assistance.put("role","assistant");
        assistance.put("content","fail");
        ask.put("role","user");
        ask.put("content",question.toString());

        messages.add(system);
        messages.add(user);
        messages.add(assistance);
        messages.add(ask);
        // 요청 질문
        requestBody.put("messages", messages);

        // 요청에 사용될 모델 설정
        //requestBody.put("model", "gpt-3.5-turbo");
        requestBody.put("model", "gpt-4-32k-0314");
        // 완료시 생성할 최대 토큰수
        requestBody.put("max_tokens", 1500);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody);

        try {
            ResponseEntity<HashMap> response = restTemplate.postForEntity(Endpoint, request, HashMap.class);
            Map<String,Object> result = (Map<String,Object>) response.getBody();

            log.info("result {}",result);
            List<Object> choices = (List<Object>)result.get("choices");
            Map<String,Object> tmp = (Map<String, Object>) choices.get(0);
            Map<String,Object> message = ( Map<String,Object>) tmp.get("message");
            String answer = (String)message.get("content");

            log.info("answer {}",answer);

            return answer;

        } catch (RestClientException e) {
            throw new OpenAIException("OpenAI API 호출 중 오류가 발생하였습니다.", e);
        }
    }

    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();

        List<ClientHttpRequestInterceptor> interceptors = new ArrayList<>();
        interceptors.add((request, body, execution) -> {
            request.getHeaders().setContentType(MediaType.APPLICATION_JSON);
            request.getHeaders().setBearerAuth(OPEN_AI_KEY);
            return execution.execute(request, body);
        });
        restTemplate.setInterceptors(interceptors);

        return restTemplate;
    }

    public int earnPoints(Member member,String category){
        int result = 0;
        LocalDateTime startDate = getStartDate(member,category);
        if(startDate == null) throw new CustomException(ErrorCode.NO_TARGET);

        //시작 날짜를 포함하므로 1더함
        long diff = calculateDiff(startDate,LocalDateTime.now()) + 1;

        log.info("두 날짜의 차이 : {}",diff);

        //목표 달성했을 때만 유저 포인트 증가
//        member.updatePoint(score.getOrDefault(category,0));

        String target = getType(member,category);

        if(target == null) throw new CustomException(ErrorCode.NO_TARGET);

        int day = (target.charAt(0) - '0');
        int cnt = (target.charAt(2) - '0');

        log.info("목표날짜일수 {} 목표 회수 {}",day,cnt);

        long offset = diff % day == 0 ? diff / day - 2 : diff / day -1;
        boolean progress = false; //오늘 날짜가 시작 기간을 포함하는 구간이면
        List<Record> rList = null;

        //시작으로부터 day일 이내였을 경우
        if(offset < 0) {
            rList = recordRepository.getUserRecordByUserIdAfterStartDate(member.getUserId(),
                    startDate,
                    LocalDateTime.now(),
                    category);
            progress = true;
        }
        //현재 날짜 구간을 포함하는 앞부분
        else {
            rList = recordRepository.getUserRecordByUserIdAfterStartDate(member.getUserId(),
                    startDate.plusDays(offset * day),
                    startDate.plusDays((offset+1) * day-1),
                    category);
        }

        //현재 구간날짜가 아니면서
        if(!progress) {
            //목표 달성실패했다면 시작시간을 현재시간으로 재설정
            if(rList.size() < cnt) {
                log.info("목표 시간 초기화");

                if(category.equals("github")) member.updateGitHUbStartDate(LocalDateTime.now());
                else if(category.equals("blog")) member.updateBlogStartDate(LocalDateTime.now());
                else if(category.equals("algo")) member.updateAlgoStartDate(LocalDateTime.now());
            }
            //현재 구간에서 목표를 달성한 경우라면 포인트 주기
            List<Record> recordList = recordRepository.getUserRecordByUserIdAfterStartDate(member.getUserId(),
                    startDate.plusDays((offset+1) * day),
                    LocalDateTime.now(),
                    category);

            if(recordList.size() +1 == cnt) {
                updatePoint(member,score.getOrDefault(category,0));
                result += score.getOrDefault(category,0);

                //누적 보상 계산
                if(category.equals("github") || category.equals("algo")) {
                    if(day == 1 && cnt == 1 && (diff+1) % 5 == 0) {
                        //21,66일 추가 보상
                        if(diff+1 == 21) {
                            updatePoint(member,20);
                            result += 20;
                        }

                        else if(diff+1 ==66) {
                            updatePoint(member,20);
                            result += 20;
                        }

                        updatePoint(member, score.getOrDefault(category, 0));
                        result += score.getOrDefault(category,0);
                    }
                }

                else if(category.equals("blog")) {
                    if(day == 7 && cnt == 1) {
                        //21,66일 추가 보상
                        if(diff+1 >= 21 && diff+1 <=27) {
                            updatePoint(member,20);
                            result += 20;
                        }

                        else if(diff+1 >= 63 && diff +1 <= 69) {
                            updatePoint(member,20);
                            result += 20;
                        }

                        updatePoint(member, score.getOrDefault(category, 0));
                        result += score.getOrDefault(category,0);
                    }
                }
            }
        }

        else {
            //꾸준히 해왔다면 point증가
            if(rList.size() + 1 == cnt) {
                log.info("{} 포인트 증가",member.getNickname());
                updatePoint(member,score.getOrDefault(category,0));
                result += score.getOrDefault(category,0);
            }
        }

        return result;
    }
    public LocalDateTime getStartDate(Member member,String category) {
        if(category.equals("github")) return member.getGithub_start_date();
        else if(category.equals("blog")) return member.getBlog_start_date();
        else if(category.equals("algo")) return member.getAlgo_start_date();

        return LocalDateTime.now(); //oops
    }

    public String getType(Member member,String category) {
        if(category.equals("github")) return member.getGithubTarget();
        else if(category.equals("algo")) return member.getBojTarget();
        else if(category.equals("blog")) return member.getBlogTarget();

        return "1-1";//oops
    }
    public long calculateDiff(LocalDateTime date1, LocalDateTime date2) {

        LocalDate start = date1.toLocalDate();
        LocalDate end = date2.toLocalDate();

        return ChronoUnit.DAYS.between(start,end);
    }

    public void updatePoint(Member member, int point) {
        member.updatePoint(point);
        memberRepository.save(member);
    }
}
