package com.example.realtime.schedule;

import com.example.realtime.dto.MatchingDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class Matching {

    private final MatchingAlgorithm matchingAlgorithm;
    private final SendMatching sendMatching;
    static boolean successed;
    static Map<Object, Object> result = new HashMap<>();
    List<MatchingDto> send = new ArrayList<>();

    @Scheduled(fixedDelay = 5000, initialDelay = 1000) // 1초 후 5초마다 동작
    public void matching(){
        result = matchingAlgorithm.algorithm();

        successed = (boolean) result.get("succeed"); // 성사 여부

        if(successed){ // 성사되면 main server 전송
            send = (List<MatchingDto>) result.get("matchingResult");
            sendMatching.sendMatching(send);
        }

    }
}
