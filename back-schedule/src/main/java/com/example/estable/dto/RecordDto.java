package com.example.estable.dto;

import com.example.estable.entity.Record;
import lombok.*;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecordDto {

    private String content;
    private String category;

    private LocalDateTime writing_time;

    public Record toEntity() {
        return Record.builder()
                .category(category)
                .content(content)
                .writing_time(writing_time)
                .build();
    }
}
