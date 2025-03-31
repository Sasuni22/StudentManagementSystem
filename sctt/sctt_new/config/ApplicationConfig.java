package com.sctt.sctt_new.config;

import com.sctt.sctt_new.entity.Admin;
import com.sctt.sctt_new.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationConfig {
    @Autowired
    private AdminRepository adminRepository;

    // Initialize default admin account
    @Bean
    public CommandLineRunner initializeAdmin() {
        return args -> {
            if (adminRepository.count() == 0) {
                Admin admin = new Admin();
                admin.setEmail("admin@example.com");
                admin.setPassword("admin123");
                adminRepository.save(admin);
                System.out.println("Default admin account created.");
            }
        };
    }
}
