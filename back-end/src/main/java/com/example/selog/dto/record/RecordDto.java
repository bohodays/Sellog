package com.example.selog.dto.record;

import lombok.*;


@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecordDto {
    private String type;
    private String message;
    private String problemId;
}
