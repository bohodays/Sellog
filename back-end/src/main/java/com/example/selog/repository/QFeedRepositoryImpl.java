package com.example.selog.repository;

import com.example.selog.entity.Feed;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public class QFeedRepositoryImpl implements QFeedRepository{

    private final JPAQueryFactory jpaQueryFactory;

    public QFeedRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public Slice<Feed> findAllFeedByDate(Pageable pageable) {
        return null;
    }
}
