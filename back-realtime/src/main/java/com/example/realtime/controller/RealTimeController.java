package com.example.realtime.controller;

import com.example.realtime.dto.RealTimeInfoDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
@Slf4j
@RequiredArgsConstructor
@Controller
public class RealTimeController {
    private final SimpMessagingTemplate simpMessagingTemplate;

    // 클라이언트에서 /pub/{id} 로 메시지를 발생
    @MessageMapping("/{id}")
    public void message(@DestinationVariable Long id, Message<RealTimeInfoDto> message) {
        // /sub/channel/채널아이디에 구독중인 클라이언트에게 메시지 전송

        RealTimeInfoDto info = message.getPayload();
        log.info("chat sender Id :{}", info.getSender());
        //id는 룸 id
        simpMessagingTemplate.convertAndSend("/sub/"+ id, info);
    }

}
