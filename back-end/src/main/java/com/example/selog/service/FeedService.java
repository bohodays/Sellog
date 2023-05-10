package com.example.selog.service;

import com.example.selog.dto.feed.FeedDto;
import com.example.selog.entity.Feed;
import com.example.selog.repository.FeedRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class FeedService {

    private final FeedRepository feedRepository;

    public List<FeedDto> getFeeds(Pageable pageable) {

        return feedRepository.findAllFeedByDate(pageable)
                .stream()
                .map(Feed::toFeedDto)
                .collect(Collectors.toList());
    }

    public void updateViews(Long feed_id) {

        feedRepository.findById(feed_id)
                .map(Feed::updateViews)
                .map(feedRepository::save);
    }

    public List<FeedDto> getFeedsByViews() {

        return feedRepository.findFeedByViews()
                .stream()
                .map(Feed::toFeedDto)
                .collect(Collectors.toList());
    }
}
