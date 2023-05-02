package com.example.selog.repository;

import com.example.selog.entity.Record;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RecordRepository extends JpaRepository<Record,Long>,QRecordRepository {
    Optional<Record> findByProblemIdAndCategory(String problemId, String category);

}
