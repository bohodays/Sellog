package com.example.selog.service;

import com.example.selog.entity.Member;
import com.example.selog.entity.Record;
import com.example.selog.repository.MemberRepository;
import com.example.selog.repository.RecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class WebHookService {

    private final RecordRepository recordRepository;
    private final MemberRepository memberRepository;
    public void createRecord(HashMap<String, Object> request) {

        HashMap<String,Object> sender = (HashMap<String, Object>) request.get("sender");
        String who = (String)sender.get("login");

        Optional<Member> member = memberRepository.findByEmail(who);
        //사용자가 아닌 다른 유저가 push 했으므로 무시
        if(!member.isPresent()) {
            return;
        }

        Record record = Record.builder()
                .category("github")
                .content("commit")
                .member(member.get())
                .build();

        recordRepository.save(record);
    }
}
