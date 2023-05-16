package com.example.selog.service;

import com.example.selog.dto.exam.ExamDto;
import com.example.selog.entity.Exam;
import com.example.selog.entity.Member;
import com.example.selog.repository.ExamRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
class ExamServiceTest {

    @InjectMocks
    ExamService examService;
    @Mock
    ExamRepository examRepository;

    private final Exam exam = Exam.builder()
            .id(1L).option1("1").option2("2").option3("3").option4("4").answer("1").category("category").comment("comment").quest("quest").build();

    private final Exam exam2 = Exam.builder()
            .id(2L).option1("1").option2("2").option3("3").option4("4").answer("1").category("category").comment("comment").quest("quest").build();

    private final Exam exam3 = Exam.builder()
            .id(3L).option1("1").option2("2").option3("3").option4("4").answer("1").category("category").comment("comment").quest("quest").build();
    private final Exam exam4 = Exam.builder()
            .id(4L).option1("1").option2("2").option3("3").option4("4").answer("1").category("category").comment("comment").quest("quest").build();
    private final Exam exam5 = Exam.builder()
            .id(5L).option1("1").option2("2").option3("3").option4("4").answer("1").category("category").comment("comment").quest("quest").build();


    @Test
    void getExamList() throws Exception {
        //given

        List<Exam> examList = new ArrayList<>();
        examList.add(exam);
        examList.add(exam2);

        List<ExamDto> examDtoList = new ArrayList<>();
        examDtoList.add(exam.toExamDto());
        examDtoList.add(exam2.toExamDto());

        when(examRepository.getExamListByRandom(anyLong(), anyLong())).thenReturn(examList);
        //when
        List<ExamDto> result = examService.getExamList();

        //then
        assertEquals(result.size(),examDtoList.size());
    }

    @Test
    void testGetExamList() throws Exception{
        List<Exam> examList = new ArrayList<>();
        examList.add(exam);
        examList.add(exam2);
        examList.add(exam3);
        examList.add(exam4);
        examList.add(exam5);


        when(examRepository.getExamListByCategory(any())).thenReturn(examList);

        //when
        List<ExamDto> result = examService.getExamList("category");

        //then
        assertEquals(result.size(),5);
    }

    @Test
    void getRealTimeExamList() throws Exception {
        List<Exam> examList = new ArrayList<>();
        examList.add(exam);
        examList.add(exam2);
        examList.add(exam3);
        examList.add(exam4);
        examList.add(exam5);

        when(examRepository.getRealTimeExamList()).thenReturn(examList);

        //when
        List<ExamDto> result = examService.getRealTimeExamList();

        //then
        assertEquals(result.size(),3);
    }
}