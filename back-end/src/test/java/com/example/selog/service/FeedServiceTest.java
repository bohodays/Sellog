package com.example.selog.service;

import com.example.selog.dto.exam.ExamDto;
import com.example.selog.dto.feed.FeedDto;
import com.example.selog.entity.Feed;
import com.example.selog.repository.FeedRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
class FeedServiceTest {

    @InjectMocks
    FeedService feedService;

    @Mock
    FeedRepository feedRepository;

    private final Feed feed1 = Feed.builder()
            .id(1L).company("company").title("title").views(0).link("link").pub_date(LocalDateTime.now())
            .build();

    private final Feed feed2 = Feed.builder()
            .id(2L).company("company").title("title").views(0).link("link").pub_date(LocalDateTime.now())
            .build();

    @Test
    void getFeeds() {
        List<FeedDto> feedDtoList = new ArrayList<>();
        feedDtoList.add(feed1.toFeedDto());
        feedDtoList.add(feed2.toFeedDto());

        Slice<FeedDto> feedDtoSlice  = new SliceImpl<>(feedDtoList, PageRequest.of(0, 5), false);
        when(feedRepository.findAllFeedByDate(any())).thenReturn(feedDtoSlice);

        //when
        Slice<FeedDto> result = feedService.getFeeds(PageRequest.of(0, 5));

        //then
        assertEquals(result.getContent(),feedDtoSlice.getContent());
    }

    @Test
    void updateViews() {
        when(feedRepository.findById(any())).thenReturn(Optional.ofNullable(feed1));
        feed1.updateViews();
        when(feedRepository.save(any())).thenReturn(feed1);
        feedService.updateViews(1L);

        verify(feedRepository, times(1)).findById(any());
        verify(feedRepository, times(1)).save(any());
    }

    @Test
    void getFeedsByViews() {
        List<Feed> feedList = new ArrayList<>();
        feedList.add(feed1);
        feedList.add(feed2);

        List<FeedDto> feedDtoList = new ArrayList<>();
        feedDtoList.add(feed1.toFeedDto());
        feedDtoList.add(feed2.toFeedDto());

        when(feedRepository.findFeedByViews()).thenReturn(feedList);

        List<FeedDto> result = feedService.getFeedsByViews();
        assertEquals(result.size(),feedDtoList.size());
    }
}