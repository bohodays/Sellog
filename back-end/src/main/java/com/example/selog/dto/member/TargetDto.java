package com.example.selog.dto.member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TargetDto {
    private String bojTarget;
    private String blogTarget;
    private Boolean feedTarget;
    private String githubTarget;
    private Boolean csTarget;
}
