package com.example.selog.service;

import com.example.selog.dto.record.RecordRequestDto;
import com.example.selog.entity.Member;
import com.example.selog.entity.Record;
import com.example.selog.exception.CustomException;
import com.example.selog.exception.error.ErrorCode;
import com.example.selog.repository.MemberRepository;
import com.example.selog.repository.RecordRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.bridge.IMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
public class WebHookService {

    private RecordRepository recordRepository;
    private MemberRepository memberRepository;
    private Map<String,Integer> score;

    @Autowired
    public WebHookService(RecordRepository recordRepository, MemberRepository memberRepository) {
        this.recordRepository = recordRepository;
        this.memberRepository = memberRepository;

        this.score = new HashMap<>();
        score.put("github",10);
        score.put("blog",20);
        score.put("algo",15);
    }

    @Transactional
    public void createRecord(HashMap<String, Object> request) {

        HashMap<String,Object> sender = (HashMap<String, Object>) request.get("sender");
        HashMap<String,Object> repository = (HashMap<String, Object>) request.get("repository");
        HashMap<String,Object> head_commit = (HashMap<String, Object>) request.get("head_commit");

        String repoName = (String)repository.get("name");
        String content = (String)head_commit.get("message");
        String who = (String)sender.get("login");

        log.info("유저네임 {}",who);
        Member member = memberRepository.findByEmail(who)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));

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

        if(!recordRequestDto.getProblemId().equals("") || recordRequestDto.getProblemId() != null){
            Optional<Record> record = recordRepository.findByProblemIdAndCategory(recordRequestDto.getProblemId(), recordRequestDto.getType());
            if(record.isPresent()){
                throw new CustomException(ErrorCode.CONFLICT_ALGO);
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
                        .build()
        );

        return result;
    }

    public int earnPoints(Member member,String category){
        int result = 0;
        if(member.getStart_date() == null) throw new CustomException(ErrorCode.NO_TARGET);

        //시작 날짜를 포함하므로 1더함
        long diff = calculateDiff(member.getStart_date(),LocalDateTime.now()) + 1;

        log.info("두 날짜의 차이 : {}",diff);

        //목표 달성했을 때만 유저 포인트 증가
//        member.updatePoint(score.getOrDefault(category,0));

        String target = member.getGithubTarget();

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
                    member.getStart_date(),
                    LocalDateTime.now(),
                    "github");
            progress = true;
        }
        //현재 날짜 구간을 포함하는 앞부분
        else {
            rList = recordRepository.getUserRecordByUserIdAfterStartDate(member.getUserId(),
                    member.getStart_date().plusDays(offset * day),
                    member.getStart_date().plusDays((offset+1) * day-1),
                    "github");
        }

        //현재 구간날짜가 아니면서
        if(!progress) {
            //목표 달성실패했다면 시작시간을 현재시간으로 재설정
            if(rList.size() < cnt) {
                log.info("목표 시간 초기화");
                member.updateStartDate(LocalDateTime.now());
            }
            //현재 구간에서 목표를 달성한 경우라면 포인트 주기
            List<Record> recordList = recordRepository.getUserRecordByUserIdAfterStartDate(member.getUserId(),
                    member.getStart_date().plusDays((offset+1) * day),
                    LocalDateTime.now(),
                    "github");

            if(recordList.size() +1 == cnt) {
                updatePoint(member,score.getOrDefault(category,0));
                result += score.getOrDefault(category,0);
            }
        }

        else {
            //꾸준히 해왔다면 point증가
            if(rList.size() + 1 == cnt) {
                log.info("{} 포인트 증가",member.getNickname());
                updatePoint(member,score.getOrDefault(category,0));
                result += score.getOrDefault(category,0);

                //1일 1커밋이면서 누적 보상을 받을 수 있다면
                if(day == 1 && cnt == 1 && diff % 10 == 0) {
                    updatePoint(member, score.getOrDefault(category, 0));
                    result += score.getOrDefault(category,0);
                }
            }
        }

        return result;
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
