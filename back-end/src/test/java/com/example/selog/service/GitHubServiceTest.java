package com.example.selog.service;

import com.example.selog.entity.GitHub;
import com.example.selog.entity.Member;
import com.example.selog.repository.GitHubRepository;
import com.example.selog.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.example.selog.entity.Authority.ROLE_USER;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
class GitHubServiceTest {

    @InjectMocks
    GitHubService gitHubService;
    @Mock
    GitHubRepository gitHubRepository;
    @Mock
    MemberRepository memberRepository;

    private final Member member = Member.builder()
            .userId(1L).nickname("nickname").img("img").email("email").password("password").points(100)
            .githubTarget("1-1").bojTarget("1-1").blogTarget("7-1").feedTarget(false).csTarget(false)
            .baekjoon("algo").blog("blog").github("github").authority(ROLE_USER).refreshToken("token")
            .tistoryToken("token").githubToken("token")
            .motto("motto").characterId(0).contact("contact").points(1000)
            .github_start_date(LocalDateTime.now()).algo_start_date(LocalDateTime.now()).blog_start_date(LocalDateTime.now())
            .build();

    private final GitHub github1 = GitHub.builder()
            .name("name").webhookId(1).member(member)
            .build();
    private final GitHub github2 = GitHub.builder()
            .name("name").webhookId(2).member(member)
            .build();

    @Test
    void synchronize() {
        List<GitHub> gitHubList = new ArrayList<>();
        gitHubList.add(github1);
        gitHubList.add(github2);

        when(memberRepository.findById(anyLong())).thenReturn(Optional.ofNullable(member));
        when(gitHubRepository.getAllRepositoryByMember(any())).thenReturn(gitHubList);

//        gitHubService.synchronize(1L);
    }

    @Test
    void isIn() {
    }

    @Test
    void testIsIn() {
    }

    @Test
    void makeWebHook() {
    }

    @Test
    void deleteWebHook() {
    }
}