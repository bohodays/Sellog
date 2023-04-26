package com.example.selog.dto.room;

import com.example.selog.entity.UserItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ItemDto {
    Long id;
    Long roomId;
    Long itemId;
    private String x;
    private String y;
    private String z;

    public UserItem toEntity(){
        return UserItem.builder()
                .id(id)
                .x(x).y(y).z(z)
                .build();
    }
}
