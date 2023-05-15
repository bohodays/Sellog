package com.example.realtime.repository;

import com.example.realtime.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamRepository extends JpaRepository<Exam,Long>,QExamRepository {
}
