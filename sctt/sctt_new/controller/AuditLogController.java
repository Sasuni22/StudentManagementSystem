package com.sctt.sctt_new.controller;

import com.sctt.sctt_new.dto.AuditLogDTO;
import com.sctt.sctt_new.service.AuditLogService;
import com.sctt.sctt_new.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/audit-logs")
@CrossOrigin(origins = "http://localhost:3000")
public class AuditLogController {
    @Autowired
    private AuditLogService auditLogService;

    @Autowired
    private AuthService authService;

    @GetMapping
    public ResponseEntity<List<AuditLogDTO>> getAllLogs(@RequestHeader("Authorization") String token) {
        authService.validateToken(token.replace("Bearer ", ""));
        return ResponseEntity.ok(auditLogService.getAllLogs());
    }
}