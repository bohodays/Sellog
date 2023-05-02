package com.example.estable.repository;

import com.example.estable.entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedRepository extends JpaRepository<Feed,Long> {

    public Feed findByTitle(String title);
}
