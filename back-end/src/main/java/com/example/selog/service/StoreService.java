package com.example.selog.service;

import com.example.selog.dto.room.StoreItemDto;
import com.example.selog.dto.room.UserItemDto;
import com.example.selog.entity.Item;
import com.example.selog.entity.Member;
import com.example.selog.entity.Room;
import com.example.selog.entity.UserItem;
import com.example.selog.exception.CustomException;
import com.example.selog.exception.error.ErrorCode;
import com.example.selog.repository.ItemRepository;
import com.example.selog.repository.MemberRepository;
import com.example.selog.repository.RoomRepository;
import com.example.selog.repository.UserItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class StoreService {
    private final ItemRepository itemRepository;
    private final MemberRepository memberRepository;
    private final RoomRepository roomRepository;
    private final UserItemRepository userItemRepository;

    @Transactional(readOnly = true)
    public List<StoreItemDto> findAllItem(Long userId, String category) {
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));

        Room room = roomRepository.findByMember(member)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_ROOM));

        return itemRepository.getAllItem(room.getId(), category);
    }

    @Transactional
    public UserItemDto insertItem(Long itemId, Long userId){
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_ITEM));

        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));

        Room room = roomRepository.findByMember(member)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_ROOM));

        UserItem userItem = UserItem.builder()
                .room(room)
                .item(item)
                .build();

        return userItemRepository.save(userItem).toDto();
    }
}
