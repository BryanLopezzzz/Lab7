package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

/**
 * CAPA CONFIG - Configuración de Spring Security
 * -----------------------------------------------
 * Por defecto, Spring Security bloquea TODAS las rutas.
 * Esta clase define qué rutas son públicas y cuáles requieren autenticación.
 *
 * Para el Sub-Laboratorio 1, todos los endpoints de /countries
 * son públicos para facilitar las pruebas con Postman/SoapUI.
 *
 * NOTA: En laboratorios futuros se implementará JWT y se
 * restringirá el acceso a POST, PUT y DELETE solo a usuarios autenticados.
 *
 * @Configuration indica que esta clase define beans de Spring.
 */
@Configuration
public class SecurityConfig {

    /**
     * Define las reglas de seguridad HTTP.
     * SecurityFilterChain es la cadena de filtros que Spring aplica
     * a cada petición entrante.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Desactivamos CSRF para permitir POST/PUT/DELETE desde Postman/SoapUI
            // En producción con JWT esto se gestiona de otra manera
            .csrf(csrf -> csrf.disable())

            .authorizeHttpRequests(auth -> auth
                // Rutas públicas: página testigo y recursos estáticos
                .requestMatchers(
                        "/",
                        "/index.html",
                        "/styles.css",
                        "/favicon.ico",
                        "/js/**",
                        "/images/**",
                        "/css/**"
                ).permitAll()

                // Todos los endpoints de countries son públicos (Sub-Lab 1)
                // En laboratorios futuros esto cambiará con JWT
                .requestMatchers("/countries/**").permitAll()

                // Cualquier otra ruta requiere autenticación
                .anyRequest().authenticated()
            )
            // Formulario de login habilitado (para acceder a rutas protegidas)
            .formLogin(Customizer.withDefaults())
            .logout(Customizer.withDefaults());

        return http.build();
    }

    /**
     * Define un usuario de prueba en memoria.
     * Usuario: admin | Contraseña: admin123
     *
     * NOTA: {noop} indica que la contraseña NO está encriptada.
     * En producción se debe usar BCryptPasswordEncoder.
     */
    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails admin = User.withUsername("admin")
                .password("{noop}admin123")
                .roles("ADMIN")
                .build();
        return new InMemoryUserDetailsManager(admin);
    }
}
