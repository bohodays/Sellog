package com.example.realtime.controller;

import com.example.realtime.dto.MatchingDto;
import com.example.realtime.exception.CustomException;
import com.example.realtime.exception.error.ErrorCode;
import com.example.realtime.response.ErrorResponse;
import com.example.realtime.response.SuccessResponse;
import com.example.realtime.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/matching")
public class MatchingController {

    // rabbitMQ의 EXCAHGE NAME
    private static final String EXCAHGE_NAME = "sellog.exchange";
    private static String routingKey = "sellog.routing.#";

    private final MemberService memberService;

    private final RabbitTemplate rabbitTemplate;

    private final SimpMessageSendingOperations messagingTemplate;

    //매칭 요청을 한다.
    @GetMapping
    public ResponseEntity<?> matching(){
        try{
            String roomId = UUID.randomUUID().toString() + "-matching"; //매칭 요청임을 구분
            return new ResponseEntity<>(new SuccessResponse(roomId),HttpStatus.OK);
        } catch(CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/result")
    public ResponseEntity matching(@RequestBody List<MatchingDto> matchingDtoList) {
        try{
            log.info(matchingDtoList.toString());
            String roomId = UUID.randomUUID().toString();

            for(MatchingDto matchingDto : matchingDtoList){
                messagingTemplate.convertAndSend("/sub/" + matchingDto.getRoomId(), roomId);
            }
            return new ResponseEntity<>(new SuccessResponse("매칭 요청을 완료했습니다."),HttpStatus.OK);
        } catch(CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
