package com.example.realtime.schedule;

import com.example.realtime.dto.MatchingDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class MatchingAlgorithm {

    private final MatchingWaitList matchingWaitList;
    static Map<Object, Object> result = new HashMap<>();
    static List<MatchingDto> matchingDtoList = new ArrayList<>();

    public Map<Object, Object> algorithm(){
        int size = matchingWaitList.getMatchingList().size();

        if(size<5) {
            result.put("succeed",false);
            return result;
        }else {
            //5명이 모였을 경우에만
            for (int i = 0; i < 5; i++) {
                if (matchingWaitList.getMatchingResultList().isEmpty()) break;

                MatchingDto user = matchingWaitList.getMatchingList().poll();
                if (matchingWaitList.getBadList().contains(user.getSessionId())) {
                    log.info("매칭 탈출한 유저 존재");
                    matchingWaitList.getBadList().remove(matchingWaitList.getBadList().indexOf(user.getSessionId()));
                    i--;
                } else {
                    matchingDtoList.add(user); //매칭 성사
                }
            }

            result.put("succeed", true);
            result.put("matchingResult", matchingDtoList);

            return result;
        }
    }
}
