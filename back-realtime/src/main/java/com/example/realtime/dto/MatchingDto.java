package com.example.realtime.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MatchingDto implements Serializable {
    private static final long serialVersionUID = 6529685098267757690L;
    String roomId;
    String sessionId;
    LocalDateTime enterTime;
    private Long userId;
    private String nickname;
    private Integer characterId;

}
