package com.example.selog.repository;

import com.example.selog.entity.GitHub;

import java.util.List;

public interface QGitHubRepository {

    List<GitHub> getAllRepositoryByMember(Long user_id);
    void deleteAllByMember(Long user_id);
}
