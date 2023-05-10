package com.example.estable.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDateTime;


@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@Getter
@Builder
@Table(name = "feed")
@Entity
public class Feed {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "company")
    private String company;

    @Column(name = "title")
    private String title;

    @ColumnDefault("0")
    @Column(name = "views", nullable = false)
    private Integer views;

    @Column(columnDefinition = "TEXT")
    private String link;

    @Column(name = "pub_date")
    private LocalDateTime pub_date;
}
