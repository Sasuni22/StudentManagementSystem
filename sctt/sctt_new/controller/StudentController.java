package com.sctt.sctt_new.controller;

import com.sctt.sctt_new.dto.StudentDTO;
import com.sctt.sctt_new.dto.StudentCourseDTO;
import com.sctt.sctt_new.service.AuthService;
import com.sctt.sctt_new.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @Autowired
    private AuthService authService;

    @GetMapping
    public ResponseEntity<List<StudentDTO>> getAllStudents(@RequestHeader("Authorization") String token) {
        authService.validateToken(token.replace("Bearer ", ""));
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentDTO> getStudentById(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token) {
        authService.validateToken(token.replace("Bearer ", ""));
        return ResponseEntity.ok(studentService.getStudentById(id));
    }

    @PostMapping
    public ResponseEntity<StudentDTO> addStudent(
            @RequestBody StudentDTO studentDTO,
            @RequestHeader("Authorization") String token) {
        String adminEmail = authService.validateToken(token.replace("Bearer ", ""));
        return ResponseEntity.ok(studentService.addStudent(studentDTO, adminEmail));
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentDTO> updateStudent(
            @PathVariable Long id,
            @RequestBody StudentDTO studentDTO,
            @RequestHeader("Authorization") String token) {
        String adminEmail = authService.validateToken(token.replace("Bearer ", ""));
        return ResponseEntity.ok(studentService.updateStudent(id, studentDTO, adminEmail));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token) {
        String adminEmail = authService.validateToken(token.replace("Bearer ", ""));
        studentService.deleteStudent(id, adminEmail);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<StudentCourseDTO>> getStudentsByCourse(
            @PathVariable String courseId,
            @RequestHeader("Authorization") String token) {
        authService.validateToken(token.replace("Bearer ", ""));
        return ResponseEntity.ok(studentService.getStudentsByCourse(courseId));
    }
}
