package com.sctt.sctt_new.service;

import com.sctt.sctt_new.dto.StudentDTO;
import com.sctt.sctt_new.dto.StudentCourseDTO;
import com.sctt.sctt_new.entity.Course;
import com.sctt.sctt_new.entity.Student;
import com.sctt.sctt_new.repository.CourseRepository;
import com.sctt.sctt_new.repository.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private AuditLogService auditLogService;

    public List<StudentDTO> getAllStudents() {
        return studentRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public StudentDTO getStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
        return convertToDTO(student);
    }

    @Transactional
    public StudentDTO addStudent(StudentDTO studentDTO, String adminEmail) {
        Student student = convertToEntity(studentDTO);
        Student savedStudent = studentRepository.save(student);
        auditLogService.logAction("Student added: " + savedStudent.getFullName(), adminEmail);
        return convertToDTO(savedStudent);
    }

    @Transactional
    public StudentDTO updateStudent(Long id, StudentDTO studentDTO, String adminEmail) {
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));

        existingStudent.setFullName(studentDTO.getFullName());
        existingStudent.setNameWithInitials(studentDTO.getNameWithInitials());
        existingStudent.setDateOfBirth(studentDTO.getDateOfBirth());
        existingStudent.setPhoneNumber(studentDTO.getPhoneNumber());
        existingStudent.setEmail(studentDTO.getEmail());
        existingStudent.setAddress(studentDTO.getAddress());
        existingStudent.setEnrollmentDate(studentDTO.getEnrollmentDate());

        // Update courses
        Set<Course> courses = new HashSet<>();
        if (studentDTO.getCourseIds() != null) {
            for (String courseId : studentDTO.getCourseIds()) {
                Course course = courseRepository.findByCourseId(courseId);
                if (course != null) {
                    courses.add(course);
                }
            }
        }
        existingStudent.setCourses(courses);

        Student updatedStudent = studentRepository.save(existingStudent);
        auditLogService.logAction("Student updated: " + updatedStudent.getFullName(), adminEmail);
        return convertToDTO(updatedStudent);
    }

    @Transactional
    public void deleteStudent(Long id, String adminEmail) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
        auditLogService.logAction("Student deleted: " + student.getFullName(), adminEmail);
        studentRepository.delete(student);
    }

    public List<StudentCourseDTO> getStudentsByCourse(String courseId) {
        List<Student> students = studentRepository.findStudentsByCourseId(courseId);
        Course course = courseRepository.findByCourseId(courseId);
        if (course == null) {
            throw new RuntimeException("Course not found with id: " + courseId);
        }

        List<StudentCourseDTO> studentCourseDTOs = new ArrayList<>();
        for (Student student : students) {
            StudentCourseDTO dto = new StudentCourseDTO();
            dto.setCourseId(courseId);
            dto.setModuleName(course.getName());
            dto.setStudentName(student.getFullName());
            dto.setEnrolledDate(student.getEnrollmentDate());
            studentCourseDTOs.add(dto);
        }
        return studentCourseDTOs;
    }

    private StudentDTO convertToDTO(Student student) {
        StudentDTO dto = new StudentDTO();
        dto.setId(student.getId());
        dto.setFullName(student.getFullName());
        dto.setNameWithInitials(student.getNameWithInitials());
        dto.setDateOfBirth(student.getDateOfBirth());
        dto.setPhoneNumber(student.getPhoneNumber());
        dto.setEmail(student.getEmail());
        dto.setAddress(student.getAddress());
        dto.setEnrollmentDate(student.getEnrollmentDate());

        List<String> courseIds = student.getCourses().stream()
                .map(Course::getCourseId)
                .collect(Collectors.toList());
        dto.setCourseIds(courseIds);
        return dto;
    }

    private Student convertToEntity(StudentDTO dto) {
        Student student = new Student();
        student.setId(dto.getId());
        student.setFullName(dto.getFullName());
        student.setNameWithInitials(dto.getNameWithInitials());
        student.setDateOfBirth(dto.getDateOfBirth());
        student.setPhoneNumber(dto.getPhoneNumber());
        student.setEmail(dto.getEmail());
        student.setAddress(dto.getAddress());
        student.setEnrollmentDate(dto.getEnrollmentDate());

        Set<Course> courses = new HashSet<>();
        if (dto.getCourseIds() != null) {
            for (String courseId : dto.getCourseIds()) {
                Course course = courseRepository.findByCourseId(courseId);
                if (course != null) {
                    courses.add(course);
                }
            }
        }
        student.setCourses(courses);
        return student;
    }
}