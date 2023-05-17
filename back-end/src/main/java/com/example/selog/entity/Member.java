package com.example.selog.entity;

import com.example.selog.dto.member.MemberUpdateDto;
import com.example.selog.dto.member.SignUpDto;
import com.example.selog.dto.member.TargetDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDate;
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

    @OneToOne(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Room room;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Builder.Default
    private List<GitHub> githubList = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Builder.Default
    private List<Record> recordList = new ArrayList<>();

    @Column(name = "github_start_date")
    private LocalDateTime github_start_date;

    @Column(name = "algo_start_date")
    private LocalDateTime algo_start_date;

    @Column(name = "blog_start_date")
    private LocalDateTime blog_start_date;

    @Column(name = "cs_start_date")
    private LocalDateTime cs_start_date;

    @Column(name = "feed_start_date")
    private LocalDateTime feed_start_date;

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

    public void updateTarget(TargetDto targetDto){
        this.bojTarget = targetDto.getBojTarget();
        this.blogTarget = targetDto.getBlogTarget();
        this.feedTarget = targetDto.getFeedTarget();
        this.githubTarget = targetDto.getGithubTarget();
        this.csTarget = targetDto.getCsTarget();
        if(targetDto.getGithubTarget() != null) this.github_start_date = LocalDateTime.now(); // 시작 시간 재 시작
        if(targetDto.getBojTarget() != null) this.algo_start_date = LocalDateTime.now();
        if(targetDto.getBlogTarget() != null) this.blog_start_date = LocalDateTime.now();
        if(targetDto.getCsTarget() != null) this.cs_start_date = LocalDateTime.now();
        if(targetDto.getFeedTarget() != null) this.feed_start_date = LocalDateTime.now();
    }

    public void updateMemberInfo(MemberUpdateDto memberUpdateDto){
        this.contact = memberUpdateDto.getContact();
        this.motto = memberUpdateDto.getMotto();
        this.github = memberUpdateDto.getGithub();
        this.blog = memberUpdateDto.getBlog();
        this.nickname = memberUpdateDto.getNickname();
    }

    public void updatePoint(int point) {
        this.points += point;
    }

    public void purchasePoint(int point){
        this.points -= point;
    }

    public void updateAlgoStartDate(LocalDateTime today) {
        this.algo_start_date = today;
    }
    public void updateGitHUbStartDate(LocalDateTime today) {
        this.github_start_date = today;
    }
    public void updateBlogStartDate(LocalDateTime today) {
        this.blog_start_date = today;
    }
    public void updateCsStartDate(LocalDateTime today) {
        this.cs_start_date = today;
    }
    public void updateFeedStartDate(LocalDateTime today) {
        this.feed_start_date = today;
    }

}
