package com.example.selog.entity;

import com.example.selog.dto.feed.FeedDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.boot.context.properties.bind.DefaultValue;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Table(name = "feed")
@Entity
public class Feed {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "company")
    private String company;

    @Column(name = "title")
    private String title;

    @Column(name = "views",columnDefinition = "integer default 0")
    private Integer views;

    @Column(name = "link")
    private String link;

    @Column(name = "pub_date")
    private LocalDateTime pub_date;

    public Feed updateViews() {
        this.views+=1;
        return this;
    }

    public FeedDto toFeedDto() {
        return FeedDto.builder()
                .title(title)
                .feedId(id)
                .company(company)
                .views(views)
                .link(link)
                .pub_date(pub_date)
                .build();
    }
}

