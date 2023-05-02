package com.example.selog.repository;


import com.example.selog.entity.Exam;

import java.util.List;

public interface QExamRepository {

    public List<Exam> getExamListByRandom(Long start, Long end);
}
