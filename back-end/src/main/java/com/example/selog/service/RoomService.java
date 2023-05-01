package com.example.selog.service;

import com.example.selog.dto.room.UserItemDto;
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
    public List<UserItemDto> findRoomInfoById(Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_ROOM));

        List<UserItem> userItemList = userItemRepository.findByRoomAndXIsNotNull(room);
        List<UserItemDto> userItemDtoList = new ArrayList<>();

        // room에 설치되어 있는 아이템
        for(UserItem userItem : userItemList){
            userItemDtoList.add(userItem.toDto());
        }
        return userItemDtoList;
    }

    @Transactional
    public List<UserItemDto> updateItemLocation(List<UserItemDto> userItemDtoList){
        List<UserItemDto> updateUserItemDtoList = new ArrayList<>();
        for(UserItemDto userItemDto : userItemDtoList){
            UserItem userItem = userItemRepository.findById(userItemDto.getRoomId())
                    .orElseThrow(() -> new CustomException(ErrorCode.NO_ITEM));
            userItem.updateItemLocation(userItemDto.getX(), userItemDto.getY(), userItemDto.getZ());

            UserItem updateItem = userItemRepository.save(userItem);
            if(updateItem.getX() != null){
                updateUserItemDtoList.add(updateItem.toDto());
            }
        }

        return updateUserItemDtoList;
    }

    @Transactional(readOnly = true)
    public List<UserItemDto> findUserItemByRoomId(Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_ROOM));

        List<UserItem> userItemList = userItemRepository.findByRoomAndXIsNull(room);
        List<UserItemDto> userItemDtoList = new ArrayList<>();

        // 보유한 설치하지 않은 아이템
        for(UserItem userItem : userItemList){
            userItemDtoList.add(userItem.toDto());
        }
        return userItemDtoList;
    }
}