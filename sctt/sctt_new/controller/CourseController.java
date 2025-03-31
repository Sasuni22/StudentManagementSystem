package com.sctt.sctt_new.controller;

import com.sctt.sctt_new.dto.CourseDTO;
import com.sctt.sctt_new.service.AuthService;
import com.sctt.sctt_new.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @Autowired
    private AuthService authService;

    @GetMapping
    public ResponseEntity<List<CourseDTO>> getAllCourses(@RequestHeader("Authorization") String token) {
        authService.validateToken(token.replace("Bearer ", ""));
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @GetMapping("/semester/{semester}")
    public ResponseEntity<List<CourseDTO>> getCoursesBySemester(
            @PathVariable int semester,
            @RequestHeader("Authorization") String token) {
        authService.validateToken(token.replace("Bearer ", ""));
        return ResponseEntity.ok(courseService.getCoursesBySemester(semester));
    }

    @PostMapping
    public ResponseEntity<CourseDTO> addCourse(
            @RequestBody CourseDTO courseDTO,
            @RequestHeader("Authorization") String token) {
        String adminEmail = authService.validateToken(token.replace("Bearer ", ""));
        return ResponseEntity.ok(courseService.addCourse(courseDTO, adminEmail));
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<Void> deleteCourse(
            @PathVariable String courseId,
            @RequestHeader("Authorization") String token) {
        String adminEmail = authService.validateToken(token.replace("Bearer ", ""));
        courseService.deleteCourse(courseId, adminEmail);
        return ResponseEntity.ok().build();
    }
}
