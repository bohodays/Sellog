package com.example.estable.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

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

    public Record updateMember(Member member) {
        this.member = member;
        return this;
    }
}
