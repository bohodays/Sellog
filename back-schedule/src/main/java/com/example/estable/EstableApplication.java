package com.example.estable;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class EstableApplication {

	public static void main(String[] args) {
		SpringApplication.run(EstableApplication.class, args);
	}

}
