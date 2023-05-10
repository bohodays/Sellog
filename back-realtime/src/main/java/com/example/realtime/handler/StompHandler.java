package com.example.realtime.handler;

import com.example.realtime.jwt.TokenProvider;
import com.example.realtime.service.MatchingService;
import com.example.realtime.util.SecurityUtil;
import io.jsonwebtoken.MalformedJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Configuration
@Component
public class StompHandler implements ChannelInterceptor {

    private final MatchingService matchingService;
    private final TokenProvider tokenProvider;
    private static final String BEARER_PREFIX = "Bearer ";

    /**
     * interceptor 역할
     * Websocket 요청 처리 전에 제일 먼저 실행된다.
     */
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        if(StompCommand.CONNECT == accessor.getCommand()){
            String authorizationHeader = String.valueOf(accessor.getFirstNativeHeader("Authorization"));

            if(authorizationHeader == null || authorizationHeader.equals("null")){
                throw new MalformedJwtException("JWT");
            }

            String jwt = authorizationHeader.substring(BEARER_PREFIX.length());

            if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
                Authentication authentication = tokenProvider.getAuthentication(jwt);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }// 토큰 검증
        }
        else if (StompCommand.SUBSCRIBE == accessor.getCommand()) {

            String roomId = getRoomId(Optional.ofNullable((String) message.getHeaders().get("simpDestination")).orElse("InvalidRoomId"));
            log.info(roomId);
            log.info(message.getHeaders().toString());

            String[] sp = roomId.split("-");

            String sessionId = (String) message.getHeaders().get("simpSessionId");

            if(sp.length>=6 && sp[5].equals("matching")){
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