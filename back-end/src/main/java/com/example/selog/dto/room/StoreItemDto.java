package com.example.selog.dto.room;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoreItemDto {
    Long itemId;
    String name;
    Integer point;
    String category;
    boolean possession; //이미 가지고 있는지 여부
}
