package com.example.selog.controller;

import com.example.selog.exception.error.ErrorCode;
import com.example.selog.response.ErrorResponse;
import com.example.selog.response.SuccessResponse;
import com.example.selog.service.GitHubService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/github")
public class GitHubController {

    private final GitHubService gitHubService;

    @GetMapping("/{user_id}")
    public ResponseEntity<?> synchronizeInfo(@PathVariable Long user_id) {

        log.info("synchronizeInfo 호출");

        try {
            gitHubService.synchronize(user_id);
            return new ResponseEntity<>(new SuccessResponse("success"), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{user_id}")
    public ResponseEntity<?> deleteWebhook(@PathVariable Long user_id) {

        log.info("webhook 삭제 컨트롤러 호출");

        try {
            gitHubService.synchronize(user_id);
            return new ResponseEntity<>(new SuccessResponse("success"), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
