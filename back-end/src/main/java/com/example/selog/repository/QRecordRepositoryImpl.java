package com.example.selog.repository;

import com.example.selog.dto.room.StoreItemDto;
import com.example.selog.entity.Record;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.time.LocalDateTime;
import java.util.List;

import static com.example.selog.entity.QItem.item;
import static com.example.selog.entity.QRecord.record;
import static com.example.selog.entity.QUserItem.userItem;

public class QRecordRepositoryImpl implements QRecordRepository{

    private final JPAQueryFactory jpaQueryFactory;
    public QRecordRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    //user_id와 같고 user의 start_date 이후로 모든 record 가져오기
    public List<Record> getUserRecordByUserIdAfterStartDate(Long userId, LocalDateTime start_date,LocalDateTime end_date,String category) {

        return jpaQueryFactory
                .selectFrom(record)
                .where(record.category.eq(category).and(record.member.userId.eq(userId).and(record.writing_time.between(start_date,end_date.plusDays(1)))))
                .orderBy(record.createdDate.asc())
                .fetch();
    }
}
