package com.example.selog.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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

    @Column(name="email", nullable = false)
    private String email;

    private String password;

    @Column(name = "nickname", length = 20, nullable = false)
    private String nickname;

    @Column(name="points", nullable = false)
    private Integer points;

    @Column(name="boj_target")
    private String bojTarget;

    @Column(name="blog_target")
    private String blogTarget;

    @Column(name="feed_target")
    private String feedTarget;

    @Column(name="cs_target")
    private String csTarget;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    @Column(name="refresh_token")
    private String refreshToken;

    @Column(name="tistory")
    private String tistory;

    @Column(name="velog")
    private String velog;

    @Column(name="github")
    private String github;

    @Column(name="baekjoon")
    private String baekjoon;

    @Column(name="motto")
    private String motto;

    @Column(name="character_id")
    private Integer characterId;

    public void updateTistory(String tistory) {
        this.tistory = tistory;
    }
    public void updateGithub(String github) {
        this.github = github;
    }
    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

}
