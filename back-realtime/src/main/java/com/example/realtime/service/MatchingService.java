package com.example.realtime.service;

import com.example.realtime.dto.MatchingDto;
import com.example.realtime.dto.MemberDto;
import com.example.realtime.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.AmqpException;
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

    public void addMatchingMember(String roomId, String sessionId, MemberDto memberDto){

        MatchingDto matchingDto = MatchingDto.builder()
                .roomId(roomId)
                .sessionId(sessionId)
                .enterTime(LocalDateTime.now())
                .userId(memberDto.getUserId())
                .characterId(memberDto.getCharacterId())
                .nickname(memberDto.getNickname())
                .build();

        log.info("매칭 요청 전송 : {}",roomId);
        try {
            rabbitTemplate.convertAndSend( EXCAHGE_NAME, routingKey, matchingDto);
        } catch (AmqpException e) {
           log.info("rabbitmq 전송 실패 : {}", e.getMessage());
        }
    }
}