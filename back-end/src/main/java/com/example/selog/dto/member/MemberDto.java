package com.example.selog.dto.member;

import com.example.selog.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberDto {
    private Long userId;
    private String nickname;
    private String img;
    private String email;
    private Integer points;

    // 목표 설정
    private String githubTarget;
    private String bojTarget;
    private String blogTarget;
    private Boolean feedTarget;
    private Boolean csTarget;

    //주소
    private String baekjoon;
    private String blog;
    private String github;

    private String motto;
    private Integer characterId;
    private String contact;
    private LocalDateTime blog_start_date;
    private LocalDateTime algo_start_date;
    private LocalDateTime github_start_date;


    public static MemberDto of(Member member) {
        return MemberDto.builder()
                .userId(member.getUserId()).nickname(member.getNickname()).img(member.getImg()).email(member.getEmail())
                .githubTarget(member.getGithubTarget()).bojTarget(member.getBojTarget()).blogTarget(member.getBlogTarget()).feedTarget(member.getFeedTarget()).csTarget(member.getCsTarget())
                .baekjoon(member.getBaekjoon()).blog(member.getBlog()).github(member.getGithub())
                .motto(member.getMotto()).characterId(member.getCharacterId()).contact(member.getContact())
                .points(member.getPoints())
                .github_start_date(member.getGithub_start_date())
                .algo_start_date(member.getAlgo_start_date())
                .blog_start_date(member.getBlog_start_date())
                .build();
    }
}
