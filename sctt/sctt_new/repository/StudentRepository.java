package com.sctt.sctt_new.repository;

import com.sctt.sctt_new.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    @Query("SELECT s FROM Student s JOIN s.courses c WHERE c.courseId = :courseId")
    List<Student> findStudentsByCourseId(String courseId);
}