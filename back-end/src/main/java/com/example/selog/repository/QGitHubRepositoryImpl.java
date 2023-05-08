package com.example.selog.repository;

import com.example.selog.entity.GitHub;
import com.querydsl.jpa.impl.JPAQueryFactory;
import static com.example.selog.entity.QGitHub.gitHub;
import java.util.List;

public class QGitHubRepositoryImpl implements QGitHubRepository{

    private final JPAQueryFactory jpaQueryFactory;

    public QGitHubRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }
    @Override
    public List<GitHub> getAllRepositoryByMember(Long user_id) {
        return jpaQueryFactory
                .selectFrom(gitHub)
                .where(gitHub.member.userId.eq(user_id))
                .fetch();
    }

    @Override
    public void deleteAllByMember(Long user_id) {
        jpaQueryFactory.delete(gitHub)
                .where(gitHub.member.userId.eq(user_id))
                .execute();
    }
}
