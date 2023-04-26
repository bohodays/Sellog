package com.example.selog.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Table(name = "user_item")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserItem extends BaseTime {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "x")
    private String x;

    @Column(name = "y")
    private String y;

    @Column(name = "z")
    private String z;

    @JoinColumn(name = "room_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToOne
    private Room room;

    @JoinColumn(name = "item_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToOne
    private Item item;

}
