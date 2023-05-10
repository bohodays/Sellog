package com.example.selog.service;

import com.example.selog.dto.room.StoreItemDto;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class StoreService {
    private final ItemRepository itemRepository;
    private final MemberRepository memberRepository;
    private final RoomRepository roomRepository;
    private final UserItemRepository userItemRepository;

    @Transactional(readOnly = true)
    public Page<StoreItemDto> findAllItem(Long userId, String category, Pageable pageable) {
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));

        if(member.getRoom() == null) throw new CustomException(ErrorCode.NO_ROOM);

        if(category.equals("all")){
            return itemRepository.getAllStoreItem(member.getRoom().getId(), pageable);
        }else{
            return itemRepository.getAllStoreItemByCategory(member.getRoom().getId(), category, pageable);
        }

    }

    @Transactional
    public Integer insertItem(Long itemId, Long userId){
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_ITEM));

        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));

        Room room = roomRepository.findByMember(member)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_ROOM));

        if(member.getPoints() - item.getPoint() < 0){
            throw new CustomException(ErrorCode.LACK_POINTS);
        }

        UserItem userItem = UserItem.builder()
                .room(room)
                .item(item)
                .build();

        userItemRepository.save(userItem);
        member.purchasePoint(item.getPoint());

        return memberRepository.save(member).getPoints();
    }
}
