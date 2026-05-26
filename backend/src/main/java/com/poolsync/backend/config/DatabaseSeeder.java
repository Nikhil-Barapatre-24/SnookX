package com.poolsync.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.poolsync.backend.user.User;
import com.poolsync.backend.user.UserRepository;
import com.poolsync.backend.user.UserRole;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class DatabaseSeeder implements CommandLineRunner {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public DatabaseSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public void run(String... args) throws Exception {
		seedOwnerUser();
	}

	private void seedOwnerUser() {
		String ownerEmail = "nikhilbarapatre786@gmail.com";
		
		if (!userRepository.existsByEmailIgnoreCase(ownerEmail)) {
			log.info("Seeding initial Owner user...");
			User owner = new User(
					"Nikhil Barapatre",
					ownerEmail,
					null, // No phone provided in prompt
					passwordEncoder.encode("Pass@1234"),
					UserRole.OWNER);
			userRepository.save(owner);
			log.info("Initial Owner user seeded successfully.");
		} else {
			log.info("Owner user already exists.");
		}
	}
}
