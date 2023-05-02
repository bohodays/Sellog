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
    private String contact; //선택
    private String nickname; //닉네임
    private String motto; //선택
    private Integer characterId; //필수

    //계정 정보
    private String blog;
    private String github;
}
