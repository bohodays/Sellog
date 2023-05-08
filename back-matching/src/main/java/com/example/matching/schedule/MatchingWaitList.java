package com.example.matching.schedule;

import com.example.matching.dto.MatchingDto;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

@Slf4j
@Component
@Getter
public class MatchingWaitList {
    Queue<MatchingDto> matchingList = new LinkedList<>(); // 매칭 대기자
    Queue<MatchingDto> matchingResultList = new LinkedList<>(); //매칭 성사된 대기자들을 관리
    List<String> badList = new LinkedList<>(); // 매칭 중 나간 유저들 관리

}
