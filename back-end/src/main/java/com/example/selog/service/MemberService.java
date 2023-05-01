package com.example.selog.service;

import com.example.selog.dto.member.MemberDto;
import com.example.selog.dto.member.SignUpDto;
import com.example.selog.dto.member.TokenDto;
import com.example.selog.dto.member.TokenRequestDto;
import com.example.selog.entity.Member;
import com.example.selog.exception.CustomException;
import com.example.selog.exception.error.ErrorCode;
import com.example.selog.jwt.TokenProvider;
import com.example.selog.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;

    @Transactional(readOnly = true)
    public MemberDto findMemberInfoByUserId(Long userId) {
        return memberRepository.findById(userId)
                .map(MemberDto::of)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));
    }

    @Transactional
    public TokenDto reissue(TokenRequestDto tokenRequestDto) {
        TokenDto tokenDto = null;
        Member member = null;

        if (tokenProvider.validateToken(tokenRequestDto.getAccessToken())) {
            Authentication authentication = tokenProvider.getAuthentication(tokenRequestDto.getAccessToken());
            member = memberRepository.findById(Long.parseLong(authentication.getName()))
                    .orElseThrow(() -> new CustomException(ErrorCode.NO_LOGIN));
            if (!member.getRefreshToken().equals(tokenRequestDto.getRefreshToken())) {
                throw new CustomException(ErrorCode.NO_USER);
            }
            tokenDto = tokenProvider.createTokenDto(authentication);
        }
        else {
            if (!tokenProvider.validateToken(tokenRequestDto.getRefreshToken())) {
                throw new CustomException(ErrorCode.NO_TOKEN);
            }
            member = memberRepository.findByRefreshToken(tokenRequestDto.getRefreshToken())
                    .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));
            Authentication authentication = new UsernamePasswordAuthenticationToken(member.getUserId(), null, new ArrayList<>());
            tokenDto = tokenProvider.createTokenDto(authentication);
        }

        member.updateRefreshToken(tokenDto.getRefreshToken());
        memberRepository.save(member);

        return tokenDto;
    }

    @Transactional
    public MemberDto signup(SignUpDto signUpDto){
        Member member = memberRepository.findById(signUpDto.getUserId())
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));

        member.updateSignUp(signUpDto);
        return MemberDto.of(memberRepository.save(member));
    }

    @Transactional
    public void logout(Long userId){
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));
        member.updateRefreshToken(null);
        memberRepository.save(member);
    }

    @Transactional
    public void deleteMember(Long userId){
        memberRepository.delete(
                memberRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.NO_USER))
        );
    }
}