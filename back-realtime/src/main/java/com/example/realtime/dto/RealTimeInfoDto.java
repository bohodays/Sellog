package com.example.realtime.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RealTimeInfoDto {
    private String roomId;
    private Long sender;
    private Double x;
    private Double y;
//    private Double z;
    private String nickname;
    private Integer characterId;
}