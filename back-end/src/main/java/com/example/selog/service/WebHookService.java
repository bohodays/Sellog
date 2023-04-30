package com.example.selog.service;

import com.example.selog.dto.record.RecordDto;
import com.example.selog.entity.Member;
import com.example.selog.entity.Record;
import com.example.selog.exception.CustomException;
import com.example.selog.exception.error.ErrorCode;
import com.example.selog.repository.MemberRepository;
import com.example.selog.repository.RecordRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class WebHookService {

    private final RecordRepository recordRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public void createRecord(HashMap<String, Object> request) {

        HashMap<String,Object> sender = (HashMap<String, Object>) request.get("sender");
        HashMap<String,Object> repository = (HashMap<String, Object>) request.get("repository");

        String repoName = (String)repository.get("name");
        String who = (String)sender.get("login");

        log.info("유저네임 {}",who);
        Member member = memberRepository.findByEmail(who)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));

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

    @Transactional
    public void createAlgoRecord(RecordDto recordDto, Long userId){
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));

        Optional<Record> record = recordRepository.findByProblemIdAndCategory(recordDto.getProblemId(), recordDto.getType());
        if(record.isPresent()){
            throw new CustomException(ErrorCode.CONFLICT_ALGO);
        }else{
            recordRepository.save(
                    Record.builder()
                            .category(recordDto.getType())
                            .content(recordDto.getMessage())
                            .member(member)
                            .problemId(recordDto.getProblemId())
                            .writing_time(LocalDateTime.now())
                            .build()
            );
        }
    }
}
