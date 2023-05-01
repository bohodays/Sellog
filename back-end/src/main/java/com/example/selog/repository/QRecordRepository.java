package com.example.selog.repository;

import com.example.selog.entity.Record;

import java.time.LocalDateTime;
import java.util.List;

public interface QRecordRepository {

    List<Record> getUserRecordByUserIdAfterStartDate(Long userId, LocalDateTime start_date,LocalDateTime end_date,String category);
}
