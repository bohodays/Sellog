package com.example.selog.dto.exam;

import lombok.*;

import javax.persistence.Column;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExamDto {
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private String answer;
    private String category;
    private String comment;
    private String quest;
}
