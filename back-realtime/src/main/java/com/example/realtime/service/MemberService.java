package com.example.realtime.service;

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
    public void findMemberInfoByUserId(Long userId) {
        memberRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));
    }
}
