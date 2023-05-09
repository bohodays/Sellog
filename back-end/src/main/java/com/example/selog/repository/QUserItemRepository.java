package com.example.selog.repository;

import com.example.selog.dto.room.UserItemDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface QUserItemRepository {

    List<UserItemDto> getItemByCategory(Pageable pageable, String category, Long user_id);
    List<UserItemDto> getAllItem(Pageable pageable, Long user_id);
}
