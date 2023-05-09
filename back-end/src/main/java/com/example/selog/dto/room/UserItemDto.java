package com.example.selog.dto.room;

import com.example.selog.entity.UserItem;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserItemDto {
    private Long id; //user_item id
    private Long roomId; //방 id
    private Long itemId; //item id
    private String name; // item 이름
    private Integer point; //item 점수
    private String category; //item 카테고리
    private String x;
    private String y;
    private String z;
    private String rotation;

    public UserItem toEntity(){
        return UserItem.builder()
                .id(id)
                .x(x).y(y).z(z).rotation(rotation)
                .build();
    }
}
