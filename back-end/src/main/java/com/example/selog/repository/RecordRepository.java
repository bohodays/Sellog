package com.example.selog.repository;

import com.example.selog.entity.Record;
import org.springframework.data.jpa.repository.JpaRepository;

<<<<<<< HEAD
public interface RecordRepository extends JpaRepository<Record,Long>,QRecordRepository {
=======
import java.util.Optional;

public interface RecordRepository extends JpaRepository<Record,Long> {
    Optional<Record> findByProblemIdAndCategory(String problemId, String category);
>>>>>>> 9ff3e9f95323aa30c88e4cd54b2a106cb9ece903
}
