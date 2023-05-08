package com.example.matching.schedule;

import com.example.matching.dto.MatchingDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class SendMatching {

    final String url = "https://k8a404.p.ssafy.io/api/matching/result";
    public void sendMatching(List<MatchingDto> send) {

        log.info("send : {} "+send.toString());

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<?> requestMessage = new HttpEntity<>(send, httpHeaders);

        restTemplate.postForEntity(url, requestMessage, List.class);
    }
}
