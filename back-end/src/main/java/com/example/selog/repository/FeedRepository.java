package com.example.selog.repository;

import com.example.selog.entity.Feed;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedRepository extends JpaRepository<Feed,Long>,QFeedRepository {
}
