package com.example.selog.repository;

import com.example.selog.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long>, QItemUserItemRepository {
}
