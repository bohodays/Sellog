package com.example.selog.controller;

import com.example.selog.exception.error.ErrorCode;
import com.example.selog.repository.FeedRepository;
import com.example.selog.response.ErrorResponse;
import com.example.selog.response.SuccessResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/feeds")
@RestController
public class FeedController {

    private final FeedRepository feedRepository;

    @GetMapping
    public ResponseEntity<?> getFeeds(@PageableDefault(size = 10) Pageable pageable) {
        log.info("get feeds 호출!");

        try {
            return new ResponseEntity<>(new SuccessResponse(feedRepository.findAllFeedByDate(pageable)), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
