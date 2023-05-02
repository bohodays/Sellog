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
import java.time.format.DateTimeFormatter;
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
    public Map<String, Map<String, List<RecordDto>>> findRecordByMonth(String year, String month, Long userId){
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));

        List<Record> recordList = recordRepository.findRecordByMonth(userId, year, month);

        return toHashMap(recordList);
    }

    @Transactional
    public Map<String, List<RecordDto>> findRecordByToday(Long userId){
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));

        LocalDateTime now = LocalDateTime.now();
        List<Record> recordList = recordRepository.findRecordByToday(userId, now.getYear(), now.getMonthValue(), now.getDayOfMonth());

        Map<String, List<RecordDto>> result = new HashMap<>(); // <category, 기록List>
        for(Record record : recordList){
            List<RecordDto> list = new ArrayList<>();
            if(result.containsKey(record.getCategory())){
                list = result.get(record.getCategory());
            }
            list.add(record.toRecordDto());
            result.put(record.getCategory(), list);
        }
        return result;
    }

    @Transactional
    public Map<String, Map<String, List<RecordDto>>> findRecordByStartDay(Long userId){
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));

        LocalDateTime now = LocalDateTime.now();
        List<Record> recordList = recordRepository.findRecordByStartDay(userId, member.getStart_date(), now);
        return toHashMap(recordList);
    }

    public Map<String, Map<String, List<RecordDto>>> toHashMap(List<Record> recordList){

        Map<String, Map<String, List<RecordDto>>> result = new HashMap<>(); // <날짜, <타입,기록List>>

        for(Record record : recordList){
            List<RecordDto> list = new ArrayList<>();
            Map<String, List<RecordDto>> categoryList = new HashMap<>();
            String time = record.getWriting_time().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
            if(result.containsKey(time)){
                categoryList = result.get(time);
                if(categoryList.containsKey(record.getCategory())){
                    list = result.get(time).get(record.getCategory());
                }
            }
            list.add(record.toRecordDto());
            categoryList.put(record.getCategory(), list);
            result.put(time, categoryList);
        }
        return result;
    }
}
