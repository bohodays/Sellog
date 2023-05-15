package com.example.selog.repository;

import com.example.selog.entity.GitHub;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GitHubRepository extends JpaRepository<GitHub,Long>,QGitHubRepository {

    GitHub findByWebhookId(Integer webhook_id);
}
