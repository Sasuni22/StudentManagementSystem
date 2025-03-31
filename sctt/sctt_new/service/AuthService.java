package com.sctt.sctt_new.service;

import com.sctt.sctt_new.dto.LoginRequestDTO;
import com.sctt.sctt_new.dto.LoginResponseDTO;
import com.sctt.sctt_new.entity.Admin;
import com.sctt.sctt_new.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.UUID;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private AuditLogService auditLogService;

    // Simple in-memory token store (in a real application, use JWT or other token solution)
    private Map<String, String> tokenStore = new HashMap<>();

    public LoginResponseDTO login(LoginRequestDTO loginRequest) {
        Optional<Admin> adminOpt = adminRepository.findByEmail(loginRequest.getEmail());
        if (adminOpt.isPresent() && adminOpt.get().getPassword().equals(loginRequest.getPassword())) {
            String token = UUID.randomUUID().toString();
            tokenStore.put(token, loginRequest.getEmail());
            auditLogService.logAction("User logged in", loginRequest.getEmail());
            return new LoginResponseDTO(token, loginRequest.getEmail());
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }

    public void logout(String token) {
        if (tokenStore.containsKey(token)) {
            String email = tokenStore.get(token);
            auditLogService.logAction("User logged out", email);
            tokenStore.remove(token);
        }
    }

    public String validateToken(String token) {
        if (tokenStore.containsKey(token)) {
            return tokenStore.get(token);
        }
        throw new RuntimeException("Invalid or expired token");
    }
}
