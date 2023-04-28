package com.example.selog.repository;

import com.example.selog.dto.room.StoreItemDto;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.util.List;

import static com.example.selog.entity.QItem.item;
import static com.example.selog.entity.QUserItem.userItem;

public class QItemUserItemRepositoryImpl implements QItemUserItemRepository{
    private final JPAQueryFactory jpaQueryFactory;
    public QItemUserItemRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }
    @Override
    public List<StoreItemDto> getAllItem(Long roomId, String category) {
        return jpaQueryFactory
                .selectDistinct(Projections.bean(StoreItemDto.class, item.id, item.category, item.name, item.point,
                        ExpressionUtils
                                .as(new CaseBuilder()
                                        .when(userItem.item.id.isNull())
                                        .then(0)
                                        .otherwise(1), "possession")))
                .from(item)
                .leftJoin(userItem).on(item.id.eq(userItem.item.id), userItem.room.id.eq(roomId))
                .where(item.category.eq(category))
                .fetch();
    }
}
