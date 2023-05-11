package com.example.selog.dto.room;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoreItemDto {
    Long id; //itemId
    String name;
    Integer point;
    String category;
    String path;
    Integer possession; //이미 가지고 있는지 여부
}
