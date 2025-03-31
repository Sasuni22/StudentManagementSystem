package com.sctt.sctt_new;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class ScttNewApplication {

	public static void main(String[] args) {
		SpringApplication.run(ScttNewApplication.class, args);
	}

}
