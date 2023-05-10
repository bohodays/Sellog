package com.example.selog.repository;

import com.example.selog.dto.room.UserItemDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface QUserItemRepository {

    Slice<UserItemDto> getItemByCategory(Pageable pageable, String category, Long user_id);
    Slice<UserItemDto> getAllItem(Pageable pageable, Long user_id);

    List<UserItemDto> findAllItemsByCategoryAndUserId(String category, Long user_id);
}
