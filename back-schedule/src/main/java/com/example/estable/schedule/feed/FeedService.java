package com.example.estable.schedule.feed;

import com.example.estable.dto.FeedDto;
import com.example.estable.entity.Feed;
import com.example.estable.repository.FeedRepository;
import com.sun.syndication.feed.synd.SyndContent;
import com.sun.syndication.feed.synd.SyndEntry;
import com.sun.syndication.feed.synd.SyndFeed;
import com.sun.syndication.io.SyndFeedInput;
import com.sun.syndication.io.XmlReader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.xml.sax.InputSource;
import org.xml.sax.XMLReader;

import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.StringReader;
import java.net.URL;
import java.net.URLConnection;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;


@Slf4j
@RequiredArgsConstructor
@Service
public class FeedService {

    private final FeedRepository feedRepository;

    private String[] company = {"MUSINSA","NHN Toast","당근","토스"};
    private String[] urls = {
            "https://medium.com/feed/musinsa-tech",
            "https://meetup.toast.com/rss",
            "https://medium.com/feed/daangn",
    "https://toss.tech/rss.xml"};

    //12시간마다 반복
    @Scheduled(fixedRate = 1000 * 60 * 60 * 12)
    @Transactional
    public void realTimeFeed() throws Exception{

        //회사 기술블로그에 맞춰 반복
        for(int i=0;i< company.length;++i) {

            log.info("회사 이름 : {}",company[i]);
            URL feedUrl = new URL(urls[i]);

            log.info("url : {}",urls[i]);

            SyndFeedInput input = new SyndFeedInput();
            SyndFeed feed = input.build(new XmlReader(feedUrl));

            List<SyndEntry> entries = feed.getEntries();

            for(SyndEntry entry : entries) {

                String title = entry.getTitle();

                Feed result = feedRepository.findByTitle(title);

                //최신순이므로 이미 있다면 제외
                if(result != null) break;

                Date publishedDate = entry.getPublishedDate();
                String link = entry.getLink();

                //DB에 넣기
                log.info("title {}",title);
                log.info("published Date {}",publishedDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime());
                log.info("link {}",link);

                FeedDto feedDto = new FeedDto().builder()
                        .title(title)
                        .link(link)
                        .company(company[i])
                        .pub_date(publishedDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime())
                        .build();

                feedRepository.save(feedDto.toEntity());
            }


        }
    }
}
