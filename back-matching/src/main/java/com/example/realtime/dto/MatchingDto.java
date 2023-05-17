package com.example.realtime.dto;

import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class MatchingDto implements Serializable, Comparable<MatchingDto> {
    private static final long serialVersionUID = 6529685098267757690L;
    String roomId;
    String sessionId;
    LocalDateTime enterTime;
    private Long userId;
    private String nickname;
    private Integer characterId;

    @Override
    public int compareTo(MatchingDto o) {
        return this.enterTime.compareTo(o.enterTime);
    }
}
