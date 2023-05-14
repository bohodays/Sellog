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
        log.info("현재 매칭 대기 중 인원 : {}" ,size);
        if(size<2) {
            result.put("succeed",false);
            return result;
        }else {
            //2명이 모였을 경우에만
            for (int i = 0; i < 2; i++) {
                if (matchingWaitList.getMatchingList().isEmpty()) break;

                MatchingDto user = matchingWaitList.getMatchingList().poll();
                if (matchingWaitList.getBadList().contains(user.getSessionId())) {
                    log.info("매칭 탈출한 유저 존재");
                    matchingWaitList.getBadList().remove(matchingWaitList.getBadList().indexOf(user.getSessionId()));
                    i--;
                } else {
                    matchingDtoList.add(user); //매칭 성사
                    matchingWaitList.getMatchingList().remove(i);
                    i--;
                }
            }

            result.put("succeed", true);
            result.put("matchingResult", matchingDtoList);

            return result;
        }
    }
}
