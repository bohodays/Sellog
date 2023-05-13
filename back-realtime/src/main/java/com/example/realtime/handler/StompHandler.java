package com.example.realtime.handler;

import com.example.realtime.dto.MemberDto;
import com.example.realtime.dto.RealTimeInfoDto;
import com.example.realtime.jwt.TokenProvider;
import com.example.realtime.service.MatchingService;
import com.example.realtime.service.MemberService;
import com.example.realtime.util.SecurityUtil;
import io.jsonwebtoken.MalformedJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.SimpMessagingTemplate;
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
public class StompHandler implements ChannelInterceptor, ApplicationContextAware {

    private final MatchingService matchingService;
    private final MemberService memberService;
    private final TokenProvider tokenProvider;
    private static final String BEARER_PREFIX = "Bearer ";
    private ApplicationContext applicationContext;

    /**
     * interceptor 역할
     * Websocket 요청 처리 전에 제일 먼저 실행된다.
     */
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        if(StompCommand.CONNECT == accessor.getCommand() || StompCommand.SUBSCRIBE == accessor.getCommand()){
            String authorizationHeader = String.valueOf(accessor.getFirstNativeHeader("Authorization"));

            if(authorizationHeader == null || authorizationHeader.equals("null")){
                throw new MalformedJwtException("JWT");
            }

            String jwt = authorizationHeader.substring(BEARER_PREFIX.length());

            if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
                Authentication authentication = tokenProvider.getAuthentication(jwt);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        if (StompCommand.SUBSCRIBE == accessor.getCommand()) {

            String roomId = getRoomId(Optional.ofNullable((String) message.getHeaders().get("simpDestination")).orElse("InvalidRoomId"));
            log.info("방 번호 : {}", roomId);

            String[] sp = roomId.split("-");

            String sessionId = (String) message.getHeaders().get("simpSessionId");

            if(sp.length>=6 && sp[5].equals("matching")){
                MemberDto memberDto = memberService.findMemberInfoByUserId(SecurityUtil.getCurrentMemberId());

                accessor.getSessionAttributes().put("socketType", "matching");
                matchingService.addMatchingMember(roomId, sessionId, memberDto);
            }else{
                MemberDto memberDto = memberService.findMemberInfoByUserId(SecurityUtil.getCurrentMemberId());
                RealTimeInfoDto info = RealTimeInfoDto.builder()
                        .roomId(roomId)
                        .sender(memberDto.getUserId())
                        .x(0.0)
                        .y(0.0)
                        .nickname(memberDto.getNickname())
                        .characterId(memberDto.getCharacterId())
                        .build();

                SimpMessagingTemplate messagingTemplate = applicationContext.getBean(SimpMessagingTemplate.class);
                messagingTemplate.convertAndSend("/sub/" + roomId, info);
                log.info("입장시 유저 정보 보내기 : {}", info.toString());
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

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }
}