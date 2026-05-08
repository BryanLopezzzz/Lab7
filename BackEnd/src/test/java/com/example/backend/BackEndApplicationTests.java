package com.example.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Verifica que el contexto de Spring Boot carga correctamente.
 * Si hay errores de configuración o beans mal definidos,
 * este test fallará y lo indicará.
 */
@SpringBootTest
class BackEndApplicationTests {

    @Test
    void contextLoads() {
        // Si Spring puede iniciar sin errores, el test pasa
    }
}
