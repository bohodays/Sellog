package com.example.selog.repository;

import com.example.selog.config.TestConfig;
import com.example.selog.entity.GitHub;
import com.example.selog.entity.Member;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDateTime;
import java.util.List;

import static com.example.selog.entity.Authority.ROLE_USER;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@Import(TestConfig.class)
@TestPropertySource("classpath:application-test.properties")
class GitHubRepositoryTest {
    @Autowired
    GitHubRepository gitHubRepository;

    @Autowired
    MemberRepository memberRepository;

    private final Member member = Member.builder()
            .nickname("nickname").img("img").email("email").password("password").points(100)
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
    void getAllRepositoryByMember(){

        Member entity = memberRepository.save(member);
        gitHubRepository.save(github1);
        gitHubRepository.save(github2);

        List<GitHub> result = gitHubRepository.getAllRepositoryByMember(entity.getUserId());
        assertThat(result.size()).isEqualTo(2);
    }

    @Test
    void deleteAllByMember(){
        Member entity = memberRepository.save(member);
        gitHubRepository.save(github1);
        gitHubRepository.save(github2);

        gitHubRepository.deleteAllByMember(entity.getUserId());
    }
}