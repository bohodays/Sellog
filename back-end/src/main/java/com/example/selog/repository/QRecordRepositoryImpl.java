package com.example.selog.repository;

import com.example.selog.dto.record.RecordDto;
import com.example.selog.entity.Record;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @Override
    public List<Record> findRecordByMonth(Long userId, String year, String month) {
        return jpaQueryFactory
                //                .select(Projections.bean(RecordDto.class, record.category, record.content, record.problemId, Expressions.dateTemplate(String.class, "%Y-%m-%d %T", record.writing_time)))
                .selectFrom(record)
                .where(record.member.userId.eq(userId).and(record.writing_time.year().eq(Integer.valueOf(year)).and(record.writing_time.month().eq(Integer.valueOf(month)))))
//                .groupBy(Expressions.dateTemplate(String.class, "%Y-%m-%d", record.writing_time))
                .orderBy(record.writing_time.asc())
                .fetch();
    }

    @Override
    public List<Record> findRecordByToday(Long userId, Integer year, Integer month, Integer day) {
        return jpaQueryFactory
                .selectFrom(record)
                .where(record.member.userId.eq(userId).and(record.writing_time.year().eq(year)).and(record.writing_time.month().eq(month)).and(record.writing_time.dayOfMonth().eq(day)))
                .orderBy(record.writing_time.asc())
                .fetch();
    }

    @Override
    public List<Record> findRecordByStartDay(Long userId, LocalDateTime startDate, LocalDateTime now, String category) {
        return jpaQueryFactory
                .selectFrom(record)
                .where(record.member.userId.eq(userId).and(record.writing_time.between(startDate, now)).and(record.category.eq(category)))
                .orderBy(record.writing_time.asc())
                .fetch();
    }

    @Override
    public Map<String, Long> findAllRecordCount(Long userId) {
        Map<String, Long> result = new HashMap<>();
        List<Tuple> tupleList = jpaQueryFactory
                .select(record.category, record.count())
                .from(record)
                .where(record.member.userId.eq(userId))
                .groupBy(record.category)
                .fetch();

        for(Tuple tuple : tupleList){
            result.put(tuple.get(record.category), tuple.get(record.count()));
        }
        return result;
    }
}
