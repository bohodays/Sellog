package com.example.realtime.service;

import com.example.realtime.dto.ExamDto;
import com.example.realtime.entity.Exam;
import com.example.realtime.repository.ExamRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class ExamService {

    private final ExamRepository examRepository;

    public List<ExamDto> getExamList() {

        long start = (long)(Math.random() * 200)+1;

        return examRepository.getExamListByRandom(start,start+4)
                .stream()
                .map(Exam::toExamDto)
                .collect(Collectors.toList());
    }

    public List<ExamDto> getExamList(String category) {

        //네트워크 38
        List<Exam> result = examRepository.getExamListByCategory(category);

        log.info("결과 개수 : {}",result.size());

        int offset = (int)(Math.random() * (result.size() -6)+1);

        return result.subList(offset,offset+5)
                .stream()
                .map(Exam::toExamDto)
                .collect(Collectors.toList());
    }

    public List<ExamDto> getRealTimeExamList() {

        List<Exam> result = examRepository.getRealTimeExamList();

        log.info("결과 개수 : {}",result.size());

        int offset = (int)(Math.random() * (result.size() -3)+1);

        return result.subList(offset,offset+3)
                .stream()
                .map(Exam::toExamDto)
                .collect(Collectors.toList());
    }
}
