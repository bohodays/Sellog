package com.example.estable.schedule.baekjoon;

import com.example.estable.dto.RecordDto;
import com.example.estable.entity.Member;
import com.example.estable.entity.Record;
import com.example.estable.repository.MemberRepository;
import com.example.estable.repository.RecordRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class CrawlingService {

    private final MemberRepository memberRepository;
    private final RecordRepository recordRepository;

    @Scheduled(fixedRate = 1000 * 10)
    public void crawling() {
        //크롤링 작업 해오기

        List<Member> mList = memberRepository.findAll();

        //모든 멤버에 대해 반복
        for(Member m : mList) {
            StringBuilder url = new StringBuilder();
            String id = m.getBaekjoon();
            url.append("https://www.acmicpc.net/status?user_id=")
                    .append(id+"&")
                    .append("result_id=4");

            try {
                Document doc = Jsoup.connect(url.toString()).get();
                Elements contents = doc.select("#status-table > tbody");

                for(Element row : contents.select("tr")) {

                    boolean first = false;

                    RecordDto recordDto = new RecordDto();
                    recordDto.setCategory("baekjoon");

                    for(Element cell : row.select("td > a")) {

                        //시간을 나타냄
                        if(cell.hasAttr("title")) {
                            //숫자인경우
                            if(isNumber(cell.text())) {
                                log.info("문제번호 {}", cell.text());
                                recordDto.setContent(cell.text());
                            }

                            else if(!first) {

                                String str = cell.attr("title");

                                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                                LocalDateTime dateTime = LocalDateTime.parse(str, formatter);

                                LocalDateTime twoHoursAgo = LocalDateTime.now().minusHours(10); // 두 시간 전의 시간
                                LocalDateTime now = LocalDateTime.now(); // 현재 시간

                                //이전시간과 비교해서 문제를 등록했다면
                                if (dateTime.isAfter(twoHoursAgo) && dateTime.isBefore(now)) {

                                    recordDto.setWriting_time(LocalDateTime.now());
                                }

                            }
                            else first = true;
                        }
                    }

                    //writed_date이 null이 아니면 DB에 저장
                    if(recordDto.getWriting_time() != null) {
                        log.info("{} 문제 풀었음", recordDto.getContent());
                        Record record = recordRepository.findByContent(recordDto.getContent());
                        //문제 푼 이력이 없다면
                        if(record == null) recordRepository.save(recordDto.toEntity().updateMember(m));
                    }
                }
            }

            catch(Exception e) {
                e.printStackTrace();
            }
        }

    }

    public boolean isNumber(String str) {
        for(int i=0;i<str.length();++i) {
            char ch = str.charAt(i);

            if(!Character.isDigit(ch)) return false;
        }
        return true;
    }
}
