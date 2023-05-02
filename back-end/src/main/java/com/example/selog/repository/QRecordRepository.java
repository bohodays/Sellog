package com.example.selog.repository;

import com.example.selog.dto.record.RecordDto;
import com.example.selog.dto.record.RecordRequestDto;
import com.example.selog.entity.Record;

import java.time.LocalDateTime;
import java.util.List;

public interface QRecordRepository {

    public List<Record> getUserRecordByUserIdAfterStartDate(Long userId, LocalDateTime start_date,LocalDateTime end_date,String category);
    public List<RecordDto> findRecordByMonth(Long userId, String year, String month);
}
