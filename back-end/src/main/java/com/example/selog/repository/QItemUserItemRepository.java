package com.example.selog.repository;

import com.example.selog.dto.room.StoreItemDto;

import java.util.List;

public interface QItemUserItemRepository {
    List<StoreItemDto> getAllItem(Long roomId, String category);
}
