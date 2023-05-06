package com.example.selog.controller;

import com.example.selog.dto.record.RecordRequestDto;
import com.example.selog.exception.CustomException;
import com.example.selog.exception.error.ErrorCode;
import com.example.selog.response.ErrorResponse;
import com.example.selog.response.SuccessResponse;
import com.example.selog.service.WebHookService;
import com.example.selog.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/webhook")
@RestController
public class WebHookController {

    private final WebHookService webHookService;

    @PostMapping
    public ResponseEntity<?> addRecord(@RequestBody HashMap<String,Object> request) {
        log.info("webhook 요청발생");
        log.info("요청 내용\n {}",request);
        try {
            webHookService.createRecord(request);
            return new ResponseEntity<>(new SuccessResponse("success"), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/chrome")
    public ResponseEntity<?> createAlgoRecord(@RequestBody RecordRequestDto recordRequestDto) {
        try{
            int result = webHookService.createAlgoRecord(recordRequestDto, SecurityUtil.getCurrentMemberId());
            return new ResponseEntity<>(new SuccessResponse(result), HttpStatus.OK);
        } catch(CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
