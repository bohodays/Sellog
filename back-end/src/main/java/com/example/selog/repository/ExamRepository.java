package com.example.selog.repository;

import com.example.selog.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamRepository extends JpaRepository<Exam,Long>,QExamRepository {
}
