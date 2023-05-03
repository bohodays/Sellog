package com.example.realtime.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RealTimeInfoDto {
    private String sender;
    private Double x;
    private Double y;
    private Double z;
    private Long room;
}
