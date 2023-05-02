package com.example.selog.service;

import com.example.selog.dto.exam.ExamDto;
import com.example.selog.entity.Exam;
import com.example.selog.repository.ExamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ExamService {

    private final ExamRepository examRepository;

    public List<ExamDto> getExamList() {

        long start = (long)(Math.random() * 200);

        return examRepository.getExamListByRandom(start,start+4)
                .stream()
                .map(Exam::toExamDto)
                .collect(Collectors.toList());
    }
}
