package com.sctt.sctt_new.repository;

import com.sctt.sctt_new.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findBySemester(int semester);
    Course findByCourseId(String courseId);
}
