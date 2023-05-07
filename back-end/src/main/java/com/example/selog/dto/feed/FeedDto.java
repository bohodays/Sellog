package com.example.selog.dto.feed;

import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class FeedDto {

    private String company;

    private String title;

    private int views;

    private String link;

    private LocalDateTime pub_date;
    private Long feedId;
}
