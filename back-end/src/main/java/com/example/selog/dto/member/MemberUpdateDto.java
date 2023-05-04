package com.example.selog.dto.member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberUpdateDto {
    private String contact; //선택 //email
    private String nickname; //닉네임
    private String motto; //선택

    //계정 정보
    private String blog;
    private String github;
}
