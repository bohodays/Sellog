package com.example.selog.repository;

import com.example.selog.config.TestConfig;
import com.example.selog.entity.Member;
import com.example.selog.entity.Record;
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
import java.util.List;
import java.util.Map;

import static com.example.selog.entity.Authority.ROLE_USER;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@Import(TestConfig.class)
@TestPropertySource("classpath:application-test.properties")
class RecordRepositoryTest {

    @Autowired
    RecordRepository recordRepository;

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

    private final Record record = Record.builder()
            .content("content").category("category").writing_time(LocalDateTime.now()).problemId("problemId").member(member)
            .build();

    private final Record record2 = Record.builder()
            .content("content").category("category").writing_time(LocalDateTime.now().plusDays(1)).problemId("problemId2").member(member)
            .build();

    @Test
    void findByProblemIdAndCategory() {
        memberRepository.save(member);

        Record record_1 = recordRepository.save(record);
        recordRepository.save(record2);

        Record result = recordRepository.findByProblemIdAndCategoryAndMember("problemId","category", member)
                .orElseThrow(() -> new CustomException(ErrorCode.CONFLICT_ALGO));

        assertThat(result.getProblemId()).isEqualTo(record_1.getProblemId());
    }

    @Test
    void getUserRecordByUserIdAfterStartDate(){
        Member member1 = memberRepository.save(member);

        Record record_1 = recordRepository.save(record);
        Record record_2 = recordRepository.save(record2);

        List<Record> result = recordRepository.getUserRecordByUserIdAfterStartDate(member1.getUserId(), record_1.getCreatedDate(), LocalDateTime.now().plusDays(1), "category");

//        assertThat(result.size()).isEqualTo(0);
    }

    @Test
    void findRecordByMonth(){
        Member member1 = memberRepository.save(member);

        recordRepository.save(record);
        recordRepository.save(record2);

        List<Record> result = recordRepository.findRecordByMonth(member1.getUserId(), Integer.toString(LocalDateTime.now().getYear()),Integer.toString(LocalDateTime.now().getMonthValue()));
        assertThat(result.size()).isEqualTo(2);
    }

    @Test
    void findRecordByToday(){
        Member member1 = memberRepository.save(member);

        recordRepository.save(record);
        recordRepository.save(record2);

        List<Record> result = recordRepository.findRecordByToday(member1.getUserId(),LocalDateTime.now().getYear(),LocalDateTime.now().getMonthValue(),LocalDateTime.now().getDayOfMonth());
        assertThat(result.size()).isEqualTo(1);
    }

    @Test
    void findRecordByStartDay(){
        Member member1 = memberRepository.save(member);

        recordRepository.save(record);
        recordRepository.save(record2);

        List<Record> result = recordRepository.findRecordByStartDay(member1.getUserId(),LocalDateTime.now(),LocalDateTime.now().plusDays(1),"category");
        assertThat(result.size()).isEqualTo(1);
    }

    @Test
    void findAllRecordCount(){
        Member member1 = memberRepository.save(member);

        recordRepository.save(record);
        recordRepository.save(record2);

        Map<String, Long> result = recordRepository.findAllRecordCount(member1.getUserId());
        assertThat(result.get("category")).isEqualTo(2);
    }
}