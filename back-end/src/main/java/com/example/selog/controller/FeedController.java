package com.example.selog.controller;

import com.example.selog.exception.error.ErrorCode;
import com.example.selog.repository.FeedRepository;
import com.example.selog.response.ErrorResponse;
import com.example.selog.response.SuccessResponse;
import com.example.selog.service.FeedService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/feeds")
@RestController
public class FeedController {

    private final FeedService feedService;

    @GetMapping
    public ResponseEntity<?> getFeeds(@PageableDefault(size = 8) Pageable pageable) {
        log.info("get feeds 호출!");

        try {
            return new ResponseEntity<>(new SuccessResponse(feedService.getFeeds(pageable)), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{feed_id}")
    public ResponseEntity<?> feedDetail(HttpServletRequest request, HttpServletResponse response, @PathVariable Long feed_id) {
        log.info("get feedDetail 호출!");

        try {

            Cookie[] cookies = request.getCookies();

            if(cookies != null) {

                //쿠키값에 feed_views가 없었다면
                if(!checkCookies(cookies)) {
                    Cookie newCookie = new Cookie("feed_views",feed_id.toString());
                    newCookie.setMaxAge(60*60*2); //2시간으로 설정
                    response.addCookie(newCookie);
                    feedService.updateViews(feed_id);
                }
            }
            //쿠키자체가 없었다면
            else {
                Cookie newCookie = new Cookie("feed_views",feed_id.toString());
                newCookie.setMaxAge(60*60*2); //2시간으로 설정
                response.addCookie(newCookie);
                feedService.updateViews(feed_id);
            }

            return new ResponseEntity<>(new SuccessResponse("success"), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private boolean checkCookies(Cookie[] cookies) {

        for(Cookie cookie : cookies) {

            if(cookie.getName().equals("feed_views")) {
                return true;
            }
        }

        return false;
    }
}
