package com.example.estable.schedule.baekjoon;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class CrawlingService {

    @Scheduled(fixedRate = 1000 * 10)
    public void crawling() {
        //크롤링 작업 해오기

        StringBuilder url = new StringBuilder();
        String id = "cksgnlcjswo";
        url.append("https://www.acmicpc.net/status?user_id=")
                    .append(id+"&")
                    .append("result_id=4");
        try {
            Document doc = Jsoup.connect(url.toString()).get();
            Elements contents = doc.select("#status-table > tbody");

            for(Element row : contents.select("tr")) {

                boolean first = false;

                for(Element cell : row.select("td > a")) {

                    //시간을 나타냄
                    if(cell.hasAttr("title")) {
                        //숫자인경우
                        if(isNumber(cell.text())) {
                            log.info("문제번호 {}", cell.text());
                        }

                        else if(!first) {
                            log.info("날짜 {}", cell.attr("title"));
                        }
                        else first = true;
                    }
                    //id 정보와 문제번호
                    else {

                        log.info("id {}",cell.text());

                    }


                }
            }
        }

        catch(Exception e) {
            e.printStackTrace();
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
