package com.example.realtime.handler;

import com.example.realtime.service.MatchingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Configuration
@Component
public class StompHandler implements ChannelInterceptor {

    private final MatchingService matchingService;


    /**
     * interceptor 역할
     * Websocket 요청 처리 전에 제일 먼저 실행된다.
     */
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        if (StompCommand.SUBSCRIBE == accessor.getCommand()) { // 채팅룸 구독 요청 (pub)

            // header에서 destination 정보를 얻고, roomId를 추출한다.
            String roomId = getRoomId(Optional.ofNullable((String) message.getHeaders().get("simpDestination")).orElse("InvalidRoomId"));
            log.info(roomId);
            log.info(message.getHeaders().toString());

            String[] sp = roomId.split("-");

            String sessionId = (String) message.getHeaders().get("simpSessionId");

            if(sp[1].equals("matching")){
                accessor.getSessionAttributes().put("socketType", "matching");
                matchingService.addMatchingMember(roomId, sessionId);
            }

        } else if (StompCommand.DISCONNECT == accessor.getCommand()) { // Websocket 연결 종료

        }

        return message;
    }

    public String getRoomId(String destination) {
        int lastIndex = destination.lastIndexOf('/');
        if (lastIndex != -1)
            return destination.substring(lastIndex+1);
        else
            return "";
    }
}