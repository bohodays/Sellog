package com.example.selog.repository;

import com.example.selog.dto.room.StoreItemDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface QItemUserItemRepository {
    Page<StoreItemDto> getAllStoreItemByCategory(Long roomId, String category, Pageable pageable);
    Page<StoreItemDto> getAllStoreItem(Long roomId, Pageable pageable);
}
