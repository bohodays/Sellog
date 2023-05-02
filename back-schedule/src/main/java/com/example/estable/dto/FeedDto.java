package com.example.estable.dto;

import com.example.estable.entity.Feed;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedDto {

    private String link;
    private String title;
    private String company;
    private LocalDateTime pub_date;

    public Feed toEntity() {
        return Feed.builder()
                .link(link)
                .pub_date(pub_date)
                .company(company)
                .title(title)
                .build();
    }
}
