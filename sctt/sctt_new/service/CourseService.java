package com.sctt.sctt_new.service;

import com.sctt.sctt_new.dto.CourseDTO;
import com.sctt.sctt_new.entity.Course;
import com.sctt.sctt_new.repository.CourseRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private AuditLogService auditLogService;

    public List<CourseDTO> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<CourseDTO> getCoursesBySemester(int semester) {
        return courseRepository.findBySemester(semester).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public CourseDTO getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));
        return convertToDTO(course);
    }

    @Transactional
    public CourseDTO addCourse(CourseDTO courseDTO, String adminEmail) {
        Course course = convertToEntity(courseDTO);
        Course savedCourse = courseRepository.save(course);
        auditLogService.logAction("Course added: " + savedCourse.getName(), adminEmail);
        return convertToDTO(savedCourse);
    }

    @Transactional
    public void deleteCourse(String courseId, String adminEmail) {
        Course course = courseRepository.findByCourseId(courseId);
        if (course == null) {
            throw new RuntimeException("Course not found with courseId: " + courseId);
        }
        auditLogService.logAction("Course deleted: " + course.getName(), adminEmail);
        courseRepository.delete(course);
    }

    private CourseDTO convertToDTO(Course course) {
        CourseDTO dto = new CourseDTO();
        dto.setId(course.getId());
        dto.setCourseId(course.getCourseId());
        dto.setName(course.getName());
        dto.setDescription(course.getDescription());
        dto.setSemester(course.getSemester());
        return dto;
    }

    private Course convertToEntity(CourseDTO dto) {
        Course course = new Course();
        course.setId(dto.getId());
        course.setCourseId(dto.getCourseId());
        course.setName(dto.getName());
        course.setDescription(dto.getDescription());
        course.setSemester(dto.getSemester());
        return course;
    }
}