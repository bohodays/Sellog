package com.example.selog.entity;

import com.example.selog.dto.record.RecordDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table
@Entity
public class Record extends BaseTime {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String content;

    @Column
    private String category;

    @Column
    private LocalDateTime writing_time;

    @Column(name = "problem_id")
    private String problemId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Member member;

    public RecordDto toRecordDto(){
        return RecordDto.builder()
                .message(content)
                .type(category)
                .writing_time(writing_time.format(DateTimeFormatter.ofPattern("yyyyMMdd")))
                .problemId(problemId)
                .build();
    }
}
