package com.example.selog.repository;

import com.example.selog.config.TestConfig;
import com.example.selog.entity.Exam;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@Import(TestConfig.class)
@TestPropertySource("classpath:application-test.properties")
class ExamRepositoryTest {
    @Autowired
    ExamRepository examRepository;

    private final Exam exam1 = Exam.builder()
            .id(1L).option1("option1").option2("option2").option3("option3").option4("option4").answer("answer").category("category").comment("comment").quest("quest")
            .build();
    private final Exam exam2 = Exam.builder()
            .id(2L).option1("option1").option2("option2").option3("option3").option4("option4").answer("answer").category("category").comment("comment").quest("quest")
            .build();

    @Test
    void getExamListByRandom(){
        //given
        examRepository.save(exam1);
        examRepository.save(exam2);

        //when
        List<Exam> result = examRepository.getExamListByRandom(1L, 2L);

        //then
        assertThat(result.size()).isEqualTo(2);
    }

    @Test
    void getExamListByCategory(){
        examRepository.save(exam1);
        examRepository.save(exam2);

        //when
        List<Exam> result = examRepository.getExamListByCategory("category");

        //then
        assertThat(result.size()).isEqualTo(2);
    }
}