package com.example.selog.entity;

import com.example.selog.dto.github.GitHubDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Table(name = "github_repository")
@Entity
public class GitHub extends BaseTime {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //레포지토리 이름
    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Member member;

    @Column(name = "webhook_id")
    private Integer webhook_id;

    public GitHubDto toGitHubDto() {
        return GitHubDto.builder()
                .name(name)
                .userName(member.getNickname())
                .build();
    }
}
