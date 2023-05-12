package com.example.realtime.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberDto {
    private Long userId;
    private String nickname;
    private Integer characterId;
}
