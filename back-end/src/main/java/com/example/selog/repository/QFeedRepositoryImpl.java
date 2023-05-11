package com.example.selog.repository;

import com.example.selog.dto.feed.FeedDto;
import com.example.selog.entity.Feed;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;

import java.util.List;

import static com.example.selog.entity.QFeed.feed;

public class QFeedRepositoryImpl implements QFeedRepository{

    private final JPAQueryFactory jpaQueryFactory;

    public QFeedRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public Slice<FeedDto> findAllFeedByDate(Pageable pageable) {
        List<FeedDto> feedDtoList = jpaQueryFactory
                .select(Projections.fields(
                        FeedDto.class,
                        feed.company,
                        feed.title,
                        feed.views,
                        feed.link,
                        feed.pub_date,
                        feed.id.as("feedId")
                ))
                .from(feed)
                .orderBy(feed.pub_date.desc())
                .offset(pageable.getOffset()) //페이지 번호
                .limit(pageable.getPageSize()+1) //페이지 사이즈
                .fetch();

        boolean hasNext = false;

        if(feedDtoList.size() > pageable.getPageSize()) {
            feedDtoList.remove(pageable.getPageSize());
            hasNext = true;
        }

        return new SliceImpl<>(feedDtoList,pageable,hasNext);
    }

    @Override
    public List<Feed> findFeedByViews() {
        return jpaQueryFactory
                .selectFrom(feed)
                .orderBy(feed.views.desc(),feed.pub_date.desc())
                .limit(10)
                .fetch();
    }
}
