package com.example.selog.repository;

import com.example.selog.dto.feed.FeedDto;
import com.example.selog.entity.Feed;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

import static com.example.selog.entity.QFeed.feed;

public class QFeedRepositoryImpl implements QFeedRepository{

    private final JPAQueryFactory jpaQueryFactory;

    public QFeedRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public List<Feed> findAllFeedByDate(Pageable pageable) {
        return jpaQueryFactory
                .selectFrom(feed)
                .orderBy(feed.pub_date.desc())
                .offset(pageable.getOffset()) //페이지 번호
                .limit(pageable.getPageSize()) //페이지 사이즈
                .fetch();



    }
}
