package com.example.realtime.service;

import com.example.realtime.dto.MemberDto;
import com.example.realtime.dto.RealTimeInfoDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatService {
    private final SimpMessagingTemplate simpMessagingTemplate;
    public void sendMessage(String id, Message<RealTimeInfoDto> message) {
        simpMessagingTemplate.convertAndSend("/sub/"+ id, message.getPayload());
    }
}
