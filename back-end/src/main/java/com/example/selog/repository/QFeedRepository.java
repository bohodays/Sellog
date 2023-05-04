package com.example.selog.repository;

import com.example.selog.entity.Feed;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface QFeedRepository {

    public Slice<Feed> findAllFeedByDate(Pageable pageable);
}
