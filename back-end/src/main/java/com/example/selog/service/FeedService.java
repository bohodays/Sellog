package com.example.selog.service;

import com.example.selog.repository.FeedRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class FeedService {

    private final FeedRepository feedRepository;


}
