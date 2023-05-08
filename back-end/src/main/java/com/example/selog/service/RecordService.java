package com.example.selog.service;

import com.example.selog.dto.record.RecordDto;
import com.example.selog.dto.record.RecordMaintainDto;
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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
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

    @Transactional
    public Map<String, RecordMaintainDto> findByMaintain(Long userId){
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));

        if(member.getStart_date() == null) throw new CustomException(ErrorCode.NO_TARGET);

        long diff = ChronoUnit.DAYS.between(member.getStart_date(),LocalDateTime.now());
        log.info("두 날짜의 차이 : {}", diff);

        long n = (diff / 5); // 1 + (diff / 5);
        long mid = 6 + n * 5; //6 + (n - 1) * 5

        Map<String, RecordMaintainDto> result = new HashMap<>();
        List<Integer> points = new ArrayList<>();

        if(member.getGithubTarget() != null && member.getGithubTarget().equals("1-1")){
            // 기본 10, 21일, 66일에는 20
            points = point((int)mid-5, points);
            points = point((int)mid, points);
            points = point((int)mid+5, points);


            result.put("github",RecordMaintainDto.builder()
                    .day(diff)
                    .start(new int[]{(int)(mid-5), points.get(0)})
                    .mid(new int[]{(int)(mid), points.get(1)})
                    .last(new int[]{(int)(mid+5), points.get(2)})
                    .build());
        }
        if(member.getBojTarget() != null && member.getBojTarget().equals("1-1") ){
            // 기본 10, 21일, 66일에는 20
            points = new ArrayList<>();
            points = point((int)mid-5, points);
            points = point((int)mid, points);
            points = point((int)mid+5, points);


            result.put("algo",RecordMaintainDto.builder()
                    .day(diff)
                    .start(new int[]{(int)(mid-5), points.get(0)})
                    .mid(new int[]{(int)(mid), points.get(1)})
                    .last(new int[]{(int)(mid+5), points.get(2)})
                    .build());
        }
        if(member.getBlogTarget() != null && member.getBlogTarget().equals("7-1")){
            //21일, 66일 40
            result.put("blog",RecordMaintainDto.builder()
                    .day(diff)
                    .start(new int[]{21, 40})
                    .mid(new int[]{66, 40})
                    .build());
        }

        return result;
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

    public List<Integer> point(int day, List<Integer> points){
        if(day == 21 || day == 66){
            points.add(20);
        }else{
            points.add(10);
        }
        return points;
    }
}
