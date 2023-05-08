package com.example.selog.dto.record;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecordMaintainDto {
    Long day;

    int[] start;
    int[] mid;
    int[] last;

}
