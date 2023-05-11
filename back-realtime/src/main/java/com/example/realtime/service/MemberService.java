package com.example.realtime.service;

import com.example.realtime.dto.MemberDto;
import com.example.realtime.entity.Member;
import com.example.realtime.exception.CustomException;
import com.example.realtime.exception.error.ErrorCode;
import com.example.realtime.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public MemberDto findMemberInfoByUserId(Long userId) {
        return memberRepository.findById(userId)
                .map(Member::toDto)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));
    }
}
