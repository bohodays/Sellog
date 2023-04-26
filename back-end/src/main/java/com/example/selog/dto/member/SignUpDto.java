package com.example.selog.dto.member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignUpDto {
    private Long userId;
    private String tel;
    private String contact;
    private String motto;
    private Integer characterId;

    //계정 정보
    private String tistory;
    private String velog;
    private String github;
    private String baekjoon;
}
