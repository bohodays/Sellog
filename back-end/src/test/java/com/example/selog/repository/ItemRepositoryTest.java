package com.example.selog.repository;

import com.example.selog.config.TestConfig;
import com.example.selog.dto.room.StoreItemDto;
import com.example.selog.entity.Item;
import com.example.selog.entity.Room;
import com.example.selog.entity.UserItem;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@Import(TestConfig.class)
@TestPropertySource("classpath:application-test.properties")
class ItemRepositoryTest {
    @Autowired
    ItemRepository itemRepository;

    @Autowired
    UserItemRepository userItemRepository;

    @Autowired
    RoomRepository roomRepository;

    @Test
    void getAllStoreItemByCategory(){
        Item item1 = Item.builder()
                .name("name").point(100).category("category").path("path")
                .build();

        Item item2 = Item.builder()
                .name("name").point(100).category("category").path("path")
                .build();

        Room room = Room.builder().build();

        itemRepository.save(item1);
        itemRepository.save(item2);
        roomRepository.save(room);

        UserItem userItem = UserItem.builder()
                .id(1L).x("x").y("y").z("z").rotation("rotation").room(room).item(item1)
                .build();

        userItemRepository.save(userItem);

        Page<StoreItemDto> result = itemRepository.getAllStoreItemByCategory(1L,"category", PageRequest.of(0, 5));

        assertThat(result.getContent().size()).isEqualTo(2);
        assertThat(result.hasNext()).isEqualTo(false);
    }

    @Test
    void getAllStoreItem(){
        Item item1 = Item.builder()
                .name("name").point(100).category("category").path("path")
                .build();

        Item item2 = Item.builder()
                .name("name").point(100).category("category").path("path")
                .build();

        Room room = Room.builder().build();

        itemRepository.save(item1);
        itemRepository.save(item2);
        roomRepository.save(room);

        UserItem userItem = UserItem.builder()
                .id(2L).x("x").y("y").z("z").rotation("rotation").room(room).item(item1)
                .build();

        userItemRepository.save(userItem);

        Page<StoreItemDto> result = itemRepository.getAllStoreItem(2L, PageRequest.of(0, 5));

        assertThat(result.getContent().size()).isEqualTo(2);
        assertThat(result.hasNext()).isEqualTo(false);
    }
}