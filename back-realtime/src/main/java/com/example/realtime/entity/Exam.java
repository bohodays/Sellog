package com.example.realtime.entity;

import com.example.realtime.dto.ExamDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Table(name = "exam_question")
@Entity
public class Exam {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "option1")
    private String option1;

    @Column(name = "option2")
    private String option2;

    @Column(name = "option3")
    private String option3;

    @Column(name = "option4")
    private String option4;

    @Column(name = "answer")
    private String answer;

    @Column(name = "category")
    private String category;

    @Column(name = "comment")
    private String comment;

    @Column(name = "quest")
    private String quest;

    public ExamDto toExamDto() {
        return ExamDto.builder()
                .option1(option1)
                .option2(option2)
                .option3(option3)
                .option4(option4)
                .answer(answer)
                .category(category)
                .comment(comment)
                .quest(quest)
                .build();
    }
}
