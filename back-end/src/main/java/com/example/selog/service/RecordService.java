package com.example.selog.service;

import com.example.selog.dto.record.RecordDto;
import com.example.selog.entity.Member;
import com.example.selog.exception.CustomException;
import com.example.selog.exception.error.ErrorCode;
import com.example.selog.repository.MemberRepository;
import com.example.selog.repository.RecordRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class RecordService {
    private final RecordRepository recordRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public Map<String, List<RecordDto>> findRecordByMonth(String year, String month, Long userId){
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));

        List<RecordDto> recordList = recordRepository.findRecordByMonth(userId, year, month);
        Map<String, List<RecordDto>> result = new HashMap<>();
        for(RecordDto record : recordList){
            List<RecordDto> list = new ArrayList<>();
            if(result.containsKey(record.getWriting_time())){
                list = result.get(record.getWriting_time());
            }
            list.add(record);
            result.put(record.getWriting_time(), list);
        }

        return result;
    }
}
