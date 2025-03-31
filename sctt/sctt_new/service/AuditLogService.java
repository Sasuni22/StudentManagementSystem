package com.sctt.sctt_new.service;

import com.sctt.sctt_new.dto.AuditLogDTO;
import com.sctt.sctt_new.entity.AuditLog;
import com.sctt.sctt_new.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuditLogService {
    @Autowired
    private AuditLogRepository auditLogRepository;

    public void logAction(String action, String userEmail) {
        AuditLog auditLog = new AuditLog();
        auditLog.setAction(action);
        auditLog.setTimestamp(LocalDateTime.now());
        auditLog.setUserEmail(userEmail);
        auditLogRepository.save(auditLog);
    }

    public List<AuditLogDTO> getAllLogs() {
        return auditLogRepository.findAllByOrderByTimestampDesc().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private AuditLogDTO convertToDTO(AuditLog auditLog) {
        return new AuditLogDTO(
                auditLog.getId(),
                auditLog.getAction(),
                auditLog.getTimestamp(),
                auditLog.getUserEmail()
        );
    }
}