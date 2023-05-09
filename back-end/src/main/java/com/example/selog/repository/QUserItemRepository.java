package com.example.selog.repository;

import com.example.selog.dto.room.UserItemDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface QUserItemRepository {

    public Page<UserItemDto> getItemByCategory(Pageable pageable, String category, Long user_id);
}
