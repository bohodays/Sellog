package com.example.selog.service;

import com.example.selog.dto.room.StoreItemDto;
import com.example.selog.dto.room.UserItemDto;
import com.example.selog.repository.ItemRepository;
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

//    @Transactional(readOnly = true)
//    public List<StoreItemDto> findAllItem(Long userId) {
//
//    }
}
