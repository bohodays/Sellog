package com.example.selog.repository;

import com.example.selog.config.TestConfig;
import com.example.selog.dto.feed.FeedDto;
import com.example.selog.entity.Feed;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@Import(TestConfig.class)
@TestPropertySource("classpath:application-test.properties")
class FeedRepositoryTest {
    @Autowired
    FeedRepository feedRepository;
    private final Feed feed1 = Feed.builder()
            .id(1L).company("company").title("title").views(0).link("link").pub_date(LocalDateTime.now())
            .build();

    private final Feed feed2 = Feed.builder()
            .id(2L).company("company").title("title").views(0).link("link").pub_date(LocalDateTime.now())
            .build();

    @Test
    void findAllFeedByDate(){
        feedRepository.save(feed1);
        feedRepository.save(feed2);

        Slice<FeedDto> result = feedRepository.findAllFeedByDate(PageRequest.of(0, 5));

        assertThat(result.getContent().size()).isEqualTo(2);
        assertThat(result.hasNext()).isEqualTo(false);
    }

    @Test
    void findFeedByViews(){
        feedRepository.save(feed1);
        feedRepository.save(feed2);

        List<Feed> result = feedRepository.findFeedByViews();

        assertThat(result.size()).isEqualTo(2);
    }
}