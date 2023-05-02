package com.example.selog.entity;

import com.example.selog.dto.member.SignUpDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;

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
    private String feedTarget;

    @Column(name="github_target")
    private String githubTarget;

    @Column(name="cs_target")
    private String csTarget;

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

    @OneToOne(mappedBy = "member", cascade = CascadeType.REMOVE)
    private Room room;

    @Column(name = "start_date")
    private LocalDateTime start_date;

    public void updateTistoryToken(String tistoryToken) {
        this.tistoryToken = tistoryToken;
    }
    public void updateGithubToken(String githubToken) {
        this.githubToken = githubToken;
    }
    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
    public void updateImg(String img){
        this.img = img;
    }

    public void updateSignUp(SignUpDto signUpDto){
        this.contact = signUpDto.getContact();
        this.motto = signUpDto.getMotto();
        this.characterId = signUpDto.getCharacterId();
        //        this.baekjoon = signUpDto.getBaekjoon();
        this.github = signUpDto.getGithub();
        this.blog = signUpDto.getBlog();
        this.nickname = signUpDto.getNickname();
    }

    public void updatePoint(int point) {
        this.points += point;
    }

    public void updateStartDate(LocalDateTime today) {
        this.start_date = today;
    }
}
