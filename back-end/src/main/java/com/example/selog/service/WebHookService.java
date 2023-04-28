package com.example.selog.service;

import com.example.selog.entity.Member;
import com.example.selog.entity.Record;
import com.example.selog.repository.MemberRepository;
import com.example.selog.repository.RecordRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class WebHookService {

    private final RecordRepository recordRepository;
    private final MemberRepository memberRepository;
    public void createRecord(HashMap<String, Object> request) {

        HashMap<String,Object> sender = (HashMap<String, Object>) request.get("sender");
        HashMap<String,Object> repository = (HashMap<String, Object>) request.get("repository");

        String repoName = (String)repository.get("name");
        String who = (String)sender.get("login");

        log.info("유저네임 {}",who);
        Optional<Member> result = memberRepository.findByEmail(who);

        //사용자가 아닌 다른 유저가 push 했으므로 무시
        if(!result.isPresent()) return;

        Member member = result.get();

        //목표 달성했을 때만 유저 포인트 증가

        member.updatePoint(10);

        memberRepository.save(member);

        Record record = Record.builder()
                .category("github")
                .content(repoName)
                .member(member)
                .build();

        recordRepository.save(record);
    }
}
