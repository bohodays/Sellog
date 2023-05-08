package com.example.matching.schedule;

import com.example.matching.dto.MatchingDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Slf4j
@RequiredArgsConstructor
@Service
public class MatchingListener {

    private final MatchingWaitList matchingWaitList;

    @RabbitListener(queues = "sellog.bad.queues") // 매칭 중간에 나간자
    public void receiveMessage(final Message message) throws UnsupportedEncodingException {
        log.info(message.toString());
        log.info( new String(message.getBody(), "UTF-8"));
        String sessionId = new String(message.getBody(), "UTF-8");
        matchingWaitList.getBadList().add(sessionId);
    }

    @RabbitListener(queues = "sellog.queues") // 매칭 요청자
    public void receiveMessage(MatchingDto matchingDto) {

        log.info("receive message : " + matchingDto.toString());

        // 매칭 대기자 추가
        matchingWaitList.getMatchingList().add(matchingDto);
    }
}
