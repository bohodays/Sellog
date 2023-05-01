package com.example.selog.repository;

import com.example.selog.entity.Record;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordRepository extends JpaRepository<Record,Long>,QRecordRepository {
}
