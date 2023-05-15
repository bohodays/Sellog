package com.example.realtime.repository;


import com.example.realtime.entity.Exam;

import java.util.List;

public interface QExamRepository {

    public List<Exam> getExamListByRandom(Long start, Long end);
    public List<Exam> getExamListByCategory(String category);
    public List<Exam> getRealTimeExamList();
}
