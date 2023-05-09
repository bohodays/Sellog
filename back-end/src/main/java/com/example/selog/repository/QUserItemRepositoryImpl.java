package com.example.selog.repository;

import com.example.selog.dto.room.UserItemDto;
import com.example.selog.entity.UserItem;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static com.example.selog.entity.QItem.item;
import static com.example.selog.entity.QRoom.room;
import static com.example.selog.entity.QUserItem.userItem;

@Slf4j
public class QUserItemRepositoryImpl implements QUserItemRepository{

    private final JPAQueryFactory jpaQueryFactory;

    public QUserItemRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public List<UserItemDto> getItemByCategory(Pageable pageable, String category, Long user_id) {
        return jpaQueryFactory
                .select(Projections.fields(UserItemDto.class,
                        userItem.id,
                        room.id.as("roomId"),
                        userItem.item.id.as("itemId"),
                        userItem.item.name,
                        userItem.item.point,
                        userItem.item.category,
                        userItem.x,
                        userItem.y,
                        userItem.z,
                        userItem.rotation)
                )
                .from(userItem)
                .innerJoin(userItem.room,room)
                .where(userItem.item.category.eq(category).and(room.member.userId.eq(user_id)))
                .offset(pageable.getOffset()) //페이지 번호
                .limit(pageable.getPageSize()) //페이지 사이즈
                .fetch();
    }

    @Override
    public List<UserItemDto> getAllItem(Pageable pageable, Long user_id) {
        return jpaQueryFactory
                .select(Projections.fields(UserItemDto.class,
                        userItem.id,
                        room.id.as("roomId"),
                        userItem.item.id.as("itemId"),
                        userItem.item.name,
                        userItem.item.point,
                        userItem.item.category,
                        userItem.x,
                        userItem.y,
                        userItem.z,
                        userItem.rotation)
                )
                .from(userItem)
                .innerJoin(userItem.room,room)
                .where(room.member.userId.eq(user_id))
                .offset(pageable.getOffset()) //페이지 번호
                .limit(pageable.getPageSize()) //페이지 사이즈
                .fetch();
    }
}
