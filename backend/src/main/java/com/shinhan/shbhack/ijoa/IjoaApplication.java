package com.shinhan.shbhack.ijoa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing // BaseEntity의 자동 시간 지정이 안되서 더 추가함
@SpringBootApplication
public class IjoaApplication {

	public static void main(String[] args) {
		SpringApplication.run(IjoaApplication.class, args);
	}

}
