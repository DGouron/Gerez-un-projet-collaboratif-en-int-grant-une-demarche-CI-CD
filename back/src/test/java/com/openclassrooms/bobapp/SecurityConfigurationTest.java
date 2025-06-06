package com.openclassrooms.bobapp;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@TestPropertySource(properties = {
    "logging.level.org.springframework.security=DEBUG"
})
class SecurityConfigurationTest {

    @Test
    void contextLoads() {
        // This test ensures the application context loads successfully
        // which validates our security configuration
        assertTrue(true, "Application context should load without security issues");
    }
    
    @Test
    void securityDependenciesArePresent() {
        // This test validates that our security-related dependencies are available
        // This helps OWASP dependency check find actual dependencies to scan
        try {
            Class.forName("org.springframework.boot.autoconfigure.security.SecurityProperties");
            assertTrue(true, "Security dependencies are properly loaded");
        } catch (ClassNotFoundException e) {
            // If this fails, it means we might have security dependency issues
            assertTrue(false, "Security dependencies are missing: " + e.getMessage());
        }
    }
} 