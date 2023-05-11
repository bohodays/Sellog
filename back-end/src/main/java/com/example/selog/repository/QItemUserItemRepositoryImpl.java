package com.example.selog.repository;

import com.example.selog.dto.room.StoreItemDto;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.SliceImpl;

import java.util.List;

import static com.example.selog.entity.QItem.item;
import static com.example.selog.entity.QUserItem.userItem;

public class QItemUserItemRepositoryImpl implements QItemUserItemRepository{
    private final JPAQueryFactory jpaQueryFactory;
    public QItemUserItemRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }
    @Override
    public Page<StoreItemDto> getAllStoreItemByCategory(Long roomId, String category, Pageable pageable) {
        List<StoreItemDto> result = jpaQueryFactory
                .selectDistinct(Projections.bean(StoreItemDto.class, item.id, item.category, item.name, item.point, item.path,
                        ExpressionUtils
                                .as(new CaseBuilder()
                                        .when(userItem.item.id.isNull())
                                        .then(0)
                                        .otherwise(1), "possession")))
                .from(item)
                .leftJoin(userItem).on(item.id.eq(userItem.item.id), userItem.room.id.eq(roomId))
                .where(item.category.eq(category))
                .offset(pageable.getOffset()) //페이지 번호
                .limit(pageable.getPageSize()) //페이지 사이즈
                .fetch();

        long totalCount = jpaQueryFactory
                .selectFrom(item)
                .where(item.category.eq(category))
                .fetchCount();

        return new PageImpl<>(result, pageable, totalCount);
    }

    @Override
    public Page<StoreItemDto> getAllStoreItem(Long roomId, Pageable pageable) {
        List<StoreItemDto> result = jpaQueryFactory
                .selectDistinct(Projections.bean(StoreItemDto.class, item.id, item.category, item.name, item.point, item.path,
                        ExpressionUtils
                                .as(new CaseBuilder()
                                        .when(userItem.item.id.isNull())
                                        .then(0)
                                        .otherwise(1), "possession")))
                .from(item)
                .leftJoin(userItem).on(item.id.eq(userItem.item.id), userItem.room.id.eq(roomId))
                .offset(pageable.getOffset()) //페이지 번호
                .limit(pageable.getPageSize()) //페이지 사이즈
                .fetch();

        long totalCount = jpaQueryFactory
                .selectFrom(item)
                .fetchCount();

        return new PageImpl<>(result, pageable, totalCount);
    }
}
