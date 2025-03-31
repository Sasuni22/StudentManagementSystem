package com.sctt.sctt_new.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentCourseDTO {
    private String courseId;
    private String moduleName;
    private String studentName;
    private LocalDate enrolledDate;
}