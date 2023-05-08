package com.example.realtime.service;

import com.example.realtime.dto.MatchingDto;
import com.example.realtime.entity.Member;
import com.example.realtime.exception.CustomException;
import com.example.realtime.exception.error.ErrorCode;
import com.example.realtime.repository.MemberRepository;
import com.example.realtime.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Slf4j
@RequiredArgsConstructor
public class MatchingService {

    // rabbitMQ의 EXCAHGE NAME
    private static final String EXCAHGE_NAME = "sellog.exchange";
    private static String routingKey = "sellog.routing.#";

    private final MemberRepository memberRepository;

    private final RabbitTemplate rabbitTemplate;

    public void addMatchingMember(String roomId, String sessionId){

        Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));

        MatchingDto matchingDto = MatchingDto.builder()
                .userId(member.getUserId())
                .roomId(roomId)
                .sessionId(sessionId)
                .enterTime(LocalDateTime.now())
                .build();

        rabbitTemplate.convertAndSend(EXCAHGE_NAME, routingKey, matchingDto); // rabbit MQ 전송
    }
}