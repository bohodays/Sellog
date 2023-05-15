package com.example.selog.repository;

import com.example.selog.config.TestConfig;
import com.example.selog.entity.Member;
import com.example.selog.exception.CustomException;
import com.example.selog.exception.error.ErrorCode;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDateTime;

import static com.example.selog.entity.Authority.ROLE_USER;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@Import(TestConfig.class)
@TestPropertySource("classpath:application-test.properties")
class MemberRepositoryTest {

    @Autowired
    MemberRepository memberRepository;

    @Test
    void findByEmail() {
        //given
        Member member = Member.builder()
                .nickname("nickname").img("img").email("email").password("password").points(100)
                .githubTarget("1-1").bojTarget("1-1").blogTarget("7-1").feedTarget(false).csTarget(false)
                .baekjoon("algo").blog("blog").github("github").authority(ROLE_USER).refreshToken("token")
                .tistoryToken("token").githubToken("token")
                .motto("motto").characterId(0).contact("contact").points(1000)
                .github_start_date(LocalDateTime.now()).algo_start_date(LocalDateTime.now()).blog_start_date(LocalDateTime.now())
                .build();

        memberRepository.save(member);


        Member result = memberRepository.findByEmail("email")
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));

        assertThat(result.getEmail()).isEqualTo(member.getEmail());
    }

    @Test
    void findByRefreshToken() {

        Member member = Member.builder()
                .nickname("nickname").img("img").email("email").password("password").points(100)
                .githubTarget("1-1").bojTarget("1-1").blogTarget("7-1").feedTarget(false).csTarget(false)
                .baekjoon("algo").blog("blog").github("github").authority(ROLE_USER).refreshToken("token")
                .tistoryToken("token").githubToken("token")
                .motto("motto").characterId(0).contact("contact").points(1000)
                .github_start_date(LocalDateTime.now()).algo_start_date(LocalDateTime.now()).blog_start_date(LocalDateTime.now())
                .build();

        Member entity = memberRepository.save(member);

        //when
        Member result = memberRepository.findByRefreshToken(entity.getRefreshToken())
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));

        //then
        assertThat(result.getEmail()).isEqualTo(member.getEmail());
    }
}