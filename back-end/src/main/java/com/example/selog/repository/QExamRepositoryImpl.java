package com.example.selog.repository;

import com.example.selog.entity.Exam;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.util.List;

import static com.example.selog.entity.QExam.exam;

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
}
