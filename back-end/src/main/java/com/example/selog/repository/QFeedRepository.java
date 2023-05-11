package com.example.selog.repository;

import com.example.selog.dto.feed.FeedDto;
import com.example.selog.entity.Feed;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface QFeedRepository {

    public Slice<FeedDto> findAllFeedByDate(Pageable pageable);
    public List<Feed> findFeedByViews();
}
