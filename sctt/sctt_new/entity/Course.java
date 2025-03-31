package com.sctt.sctt_new.entity;

import com.sctt.sctt_new.entity.Student;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "courses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String courseId; // Custom course ID like "CS101"
    private String name;
    private String description;
    private int semester;

    @ManyToMany(mappedBy = "courses")
    private Set<Student> students = new HashSet<>();
}
