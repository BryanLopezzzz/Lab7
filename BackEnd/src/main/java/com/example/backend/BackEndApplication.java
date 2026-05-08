package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Punto de entrada principal de la aplicación Spring Boot.
 * La anotación @SpringBootApplication activa:
 *   - @Configuration: permite definir beans
 *   - @EnableAutoConfiguration: configura automáticamente Spring
 *   - @ComponentScan: escanea los componentes del paquete
 */
@SpringBootApplication
public class BackEndApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackEndApplication.class, args);
    }
}
