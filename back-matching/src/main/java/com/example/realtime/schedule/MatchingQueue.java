package com.example.realtime.schedule;

import com.example.realtime.dto.MatchingDto;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

@Slf4j
@Component
@Getter
public class MatchingQueue {
    Queue<MatchingDto> matchingQueue = new LinkedList<>(); // 매칭 대기자
//    Queue<MatchingDto> matchingResultQueue = new LinkedList<>(); //매칭 성사된 대기자들을 관리
    List<String> badList = new ArrayList<>(); // 매칭 중 나간 유저들 관리

}
