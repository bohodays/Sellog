package com.example.estable.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "member")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member extends BaseTime{

    @Id
    @Column(name = "user_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(name = "img")
    private String img;

    @Column(name="email", nullable = false)
    private String email;

    @Column(name="password", nullable = false)
    private String password;

    @Column(name = "nickname", length = 20, nullable = false)
    private String nickname;

    @Column(name="points", nullable = false)
    @ColumnDefault("0")
    private Integer points;

    @Column(name="boj_target")
    private String bojTarget;

    @Column(name="blog_target")
    private String blogTarget;

    @Column(name="feed_target")
    private Boolean feedTarget;

    @Column(name="github_target")
    private String githubTarget;

    @Column(name="cs_target")
    private Boolean csTarget;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    @Column(name="refresh_token")
    private String refreshToken;

    @Column(name="tistory_token")
    private String tistoryToken;

    @Column(name="github_token")
    private String githubToken;

    @Column(name="baekjoon")
    private String baekjoon;

    @Column(name="blog")
    private String blog;

    @Column(name="github")
    private String github;

    @Column(name="motto")
    private String motto;

    @Column(name="character_id")
    private Integer characterId;

    @Column(name = "contact")
    private String contact;

    @Column(name = "start_date")
    private LocalDateTime start_date;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Builder.Default
    private List<Record> recordList = new ArrayList<>();

}
