package com.example.selog.repository;

import com.example.selog.entity.GitHub;
import com.example.selog.entity.Record;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.time.LocalDateTime;
import java.util.List;

import static com.example.selog.entity.QGitHub.gitHub;
import static com.example.selog.entity.QRecord.record;

public class QRecordRepositoryImpl implements QRecordRepository{

    private final JPAQueryFactory jpaQueryFactory;

    public QRecordRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }
    @Override
    public List<Record> getUserRecordByUserIdAfterStartDate(Long userId, LocalDateTime start_date, LocalDateTime end_date, String category) {
        return jpaQueryFactory
                .selectFrom(record)
                .where(record.member.userId.eq(userId).and(record.category.eq(category).and(record.createdDate.between(start_date,end_date.plusDays(1)))))
                .fetch();
    }
}
