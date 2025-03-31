package com.sctt.sctt_new.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO {
    private Long id;
    private String fullName;
    private String nameWithInitials;
    private LocalDate dateOfBirth;
    private String phoneNumber;
    private String email;
    private String address;
    private LocalDate enrollmentDate;
    private List<String> courseIds;
}