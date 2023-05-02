package com.example.estable.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;


@NoArgsConstructor
@AllArgsConstructor
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

    @Column(name = "views")
    private Integer views;

    @Column(name = "link")
    private String link;

    @Column(name = "pubDate")
    private LocalDateTime pub_date;
}
