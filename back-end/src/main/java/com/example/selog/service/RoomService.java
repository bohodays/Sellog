package com.example.selog.service;

import com.example.selog.dto.room.ItemDto;
import com.example.selog.entity.Room;
import com.example.selog.entity.UserItem;
import com.example.selog.exception.CustomException;
import com.example.selog.exception.error.ErrorCode;
import com.example.selog.repository.RoomRepository;
import com.example.selog.repository.UserItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;
    private final UserItemRepository userItemRepository;

    @Transactional(readOnly = true)
    public List<ItemDto> findRoomInfoById(Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_ROOM));

        List<UserItem> userItemList = userItemRepository.findByRoomAndXIsNotNull(room);
        List<ItemDto> itemDtoList = new ArrayList<>();

        // room에 설치되어 있는 아이템
        for(UserItem userItem : userItemList){
            itemDtoList.add(userItem.toDto());
        }
        return itemDtoList;
    }

    @Transactional
    public List<ItemDto> updateItemLocation(List<ItemDto> itemDtoList){
        List<ItemDto> updateItemDtoList = new ArrayList<>();
        for(ItemDto itemDto : itemDtoList){
            UserItem userItem = userItemRepository.findById(itemDto.getRoomId())
                    .orElseThrow(() -> new CustomException(ErrorCode.NO_ITEM));
            userItem.updateItemLocation(itemDto.getX(), itemDto.getY(), itemDto.getZ());

            UserItem updateItem = userItemRepository.save(userItem);
            if(updateItem.getX() != null){
                updateItemDtoList.add(updateItem.toDto());
            }
        }

        return updateItemDtoList;
    }

    @Transactional(readOnly = true)
    public List<ItemDto> findUserItemByRoomId(Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_ROOM));

        List<UserItem> userItemList = userItemRepository.findByRoomAndXIsNull(room);
        List<ItemDto> itemDtoList = new ArrayList<>();

        // 보유한 설치하지 않은 아이템
        for(UserItem userItem : userItemList){
            itemDtoList.add(userItem.toDto());
        }
        return itemDtoList;
    }
}
