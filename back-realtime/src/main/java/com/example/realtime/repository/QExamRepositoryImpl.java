package com.example.realtime.repository;

import com.example.realtime.entity.Exam;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.util.List;

import static com.example.realtime.entity.QExam.exam;

public class QExamRepositoryImpl implements QExamRepository{

    private final JPAQueryFactory jpaQueryFactory;

    public QExamRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public List<Exam> getExamListByRandom(Long start, Long end) {
        return jpaQueryFactory
                .selectFrom(exam)
                .where(exam.id.between(start,end))
                .fetch();
    }

    @Override
    public List<Exam> getExamListByCategory(String category) {
        return jpaQueryFactory
                .selectFrom(exam)
                .where(exam.category.eq(category))
                .fetch();
    }

    @Override
    public List<Exam> getRealTimeExamList() {

        return jpaQueryFactory
                .selectFrom(exam)
                .where(exam.category.eq("realtime"))
                .fetch();
    }
}
