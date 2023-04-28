package com.example.selog.service;

import com.example.selog.dto.github.GitHubDto;
import com.example.selog.entity.GitHub;
import com.example.selog.entity.Member;
import com.example.selog.exception.CustomException;
import com.example.selog.exception.error.ErrorCode;
import com.example.selog.repository.GitHubRepository;
import com.example.selog.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class GitHubService {

    private final MemberRepository memberRepository;
    private final GitHubRepository gitHubRepository;

    public void synchronize(Long user_id) {

        Member member = memberRepository.findById(user_id).get();

        //유저가 없다면
        if(member == null) {
            throw new CustomException(ErrorCode.NO_USER);
        }

        String gitAccessToken = member.getGithub();

        //엑세스 토큰 없다면
        if(gitAccessToken == null) {
            throw new CustomException(ErrorCode.NO_TOKEN);
        }

        //액세스 토큰 있다면 github api에서 가져오기
        String requestUrl = "https://api.github.com/user/repos";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "token "+gitAccessToken);

        HttpEntity<String> entity  = new HttpEntity<String>(headers);

        try {
            ResponseEntity<List> response = restTemplate.exchange(requestUrl, HttpMethod.GET,entity, List.class);
            List<Object> responseBody = response.getBody();
            List<GitHub> gitHubList = gitHubRepository.getAllRepositoryByMember(user_id);
            Set<GitHubDto> remoteRepo = new HashSet<>(); //원격레포 목록

            for(Object repo : responseBody) {
                Map<String,Object> info = (HashMap<String,Object>)repo;
                Map<String,Object> owner = (HashMap<String,Object>)info.get("owner");

                String repoName = (String)info.get("name");
                String ownerName = (String)owner.get("login");

                remoteRepo.add(GitHubDto.builder()
                                .name(repoName)
                                .userName(ownerName)
                                .build());

                //gitHubList에 없다면 webhook등록
                if(!isIn(gitHubList,repoName,ownerName)) {
                    log.info("webhook 등록!");
                    makeWebHook(gitAccessToken,repoName,ownerName, member.getEmail());

                    GitHub github = GitHub.builder()
                            .name(repoName)
                            .member(member)
                            .build();

                    gitHubRepository.save(github);
                }
            }

            //만약 원격레포와 저장소가 동기화 되어있지 않다면 디비에서 삭제해야함
            if(remoteRepo.size() < gitHubList.size()) {

                for(GitHub g : gitHubList) {
                    //원격 레포에는 없고 디비에는 있다면 삭제된 레포
                    if(!isIn(remoteRepo,g.getName(),g.getMember().getEmail())) {
                        gitHubRepository.delete(g);
                    }
                }
            }

        } catch(Exception e) {
            e.printStackTrace();
            throw new CustomException(ErrorCode.INVALID_REQUEST);
        }
    }
    //깃허브리스트와 응답 객체가 같은지 확인
    public boolean isIn(List<GitHub> list,String rName, String oName) {

        GitHubDto dto = GitHubDto.builder()
                .name(rName)
                .userName(oName)
                .build();

        List<GitHubDto> arr = list.stream().map(GitHub::toGitHubDto).collect(Collectors.toList());

        return arr.contains(dto);
    }

    public boolean isIn(Set<GitHubDto> set,String rName, String oName) {

        GitHubDto dto = GitHubDto.builder()
                .name(rName)
                .userName(oName)
                .build();

        return set.contains(dto);
    }
    @Transactional
    public void makeWebHook(String gitAccessToken,String rName, String oName,String userName) {
        //DB에 없는 레포지토리라면 webhook 생성해주기

        log.info("페로 이름 : {}",rName);
        log.info("주인 이름 : {}",oName);

        RestTemplate restTemplate = new RestTemplate();

        StringBuilder url = new StringBuilder();

        url.append("https://api.github.com/repos/")
                .append(userName+"/")
                .append(rName+"/")
                .append("hooks");

        log.info("request url : {}", url);

        HttpHeaders webhookHeader = new HttpHeaders();
        webhookHeader.setContentType(MediaType.APPLICATION_JSON);
        webhookHeader.set("Authorization", "Bearer "+gitAccessToken);

        //body 작성
        HashMap<String, Object> requestMap = new HashMap<>();
        HashMap<String, Object> inner = new HashMap<>();

        inner.put("url","http://k8a404.p.ssafy.io:8080/api/webhook");
        inner.put("content_type","json");
        inner.put("insecure_ssl","0");

        requestMap.put("name","web");
        requestMap.put("active",true);
        requestMap.put("events",new String[] {"push","pull_request"});
        requestMap.put("config",inner);

        HttpEntity<Map<String, Object>> webhookEntity  = new HttpEntity<>(requestMap,webhookHeader);

        ParameterizedTypeReference<HashMap<String, Object>> responseType = new ParameterizedTypeReference<HashMap<String, Object>>() {};

        ResponseEntity<HashMap<String, Object>> responseEntity = restTemplate.exchange(url.toString(), HttpMethod.POST, webhookEntity, responseType);

        HashMap<String, Object> responseMap = responseEntity.getBody();
    }
}
