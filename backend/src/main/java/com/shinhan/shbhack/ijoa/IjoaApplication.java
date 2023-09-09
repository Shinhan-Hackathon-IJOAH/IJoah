package com.shinhan.shbhack.ijoa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class IjoaApplication {

	public static void main(String[] args) {
		SpringApplication.run(IjoaApplication.class, args);
	}

}
