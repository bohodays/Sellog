package com.example.selog.dto.github;

import com.example.selog.entity.GitHub;
import lombok.*;
import org.springframework.stereotype.Service;

@Data
@Builder
@Getter
@Service
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class GitHubDto {

    private String name; //레포지토리 이름
    private String userName;

    public GitHub toEntity() {
        return GitHub.builder()
                .name(name)
                .build();
    }
}
