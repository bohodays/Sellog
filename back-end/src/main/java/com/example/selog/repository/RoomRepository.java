package com.example.selog.repository;

import com.example.selog.entity.Member;
import com.example.selog.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findByMember(Member member);
}
