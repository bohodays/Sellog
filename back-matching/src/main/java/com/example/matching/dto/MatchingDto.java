package com.example.matching.dto;

import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MatchingDto implements Serializable {
    private static final long serialVersionUID = 6529685098267757690L;
    Long userId;
    String roomId;
    String sessionId;
    LocalDateTime enterTime;

}
