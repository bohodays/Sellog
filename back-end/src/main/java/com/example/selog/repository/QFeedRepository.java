package com.example.selog.repository;

import com.example.selog.entity.Feed;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface QFeedRepository {

    public List<Feed> findAllFeedByDate(Pageable pageable);
}
