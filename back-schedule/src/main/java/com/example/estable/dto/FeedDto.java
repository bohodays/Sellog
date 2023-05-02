package com.example.estable.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedDto {

    private String url;
    private String description;
    private String title;
    private String company;
}
