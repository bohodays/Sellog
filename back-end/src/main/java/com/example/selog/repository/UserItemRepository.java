package com.example.selog.repository;

import com.example.selog.entity.Room;
import com.example.selog.entity.UserItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserItemRepository extends JpaRepository<UserItem, Long>,QUserItemRepository {
    List<UserItem> findByRoom(Room room);
    List<UserItem> findByRoomAndXIsNull(Room room);
    List<UserItem> findByRoomAndXIsNotNull(Room room);


}
