package com.example.selog.dto.record;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecordResponseDto {

    private String type;
    private String message;
    private LocalDateTime created_date;

}
