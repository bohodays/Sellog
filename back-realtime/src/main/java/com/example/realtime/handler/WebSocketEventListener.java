package com.example.realtime.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Slf4j
@RequiredArgsConstructor
@Component
public class WebSocketEventListener {

    private static final String EXCAHGE_NAME = "sellog.exchange";
    private static String routingKey = "sellog.bad.routing.#";
    private final RabbitTemplate rabbitTemplate;
    private final SimpMessageSendingOperations messagingTemplate;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        log.info("Received a new web socket connection");
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) { //session 연결이 종료됨을 감지
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String socketType = (String) headerAccessor.getSessionAttributes().get("socketType");
        log.info("websocket session 종료를 감지");

        if(socketType == null) return;
        else if(socketType.equals("matching")){
            // 매칭 도중 탈출했음을 알려줌
            rabbitTemplate.convertAndSend(EXCAHGE_NAME, routingKey, event.getMessage().getHeaders().get("simpSessionId").toString());
        }
    }
}
