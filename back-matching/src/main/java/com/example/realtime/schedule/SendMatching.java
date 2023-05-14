package com.example.realtime.schedule;

import com.example.realtime.dto.MatchingDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class SendMatching {

    String url = "http://localhost:8083/matching/result";

    public void sendMatching(List<MatchingDto> send) {

        log.info("send : {} "+send.toString());

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<?> requestMessage = new HttpEntity<>(send, httpHeaders);

        restTemplate.exchange(url, HttpMethod.POST, requestMessage, String.class);
    }
}
