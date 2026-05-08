package com.example.backend.repository;

import com.example.backend.model.Country;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

/**
 * DATA LOADER
 * -----------
 * Se ejecuta automáticamente al iniciar la aplicación.
 * Inserta países de ejemplo en el repositorio para demostrar
 * la funcionalidad del servicio sin necesidad de una BD real.
 *
 * Implementa CommandLineRunner: Spring Boot lo ejecuta justo
 * después de que el contexto esté listo.
 *
 * NOTA: En el Sub-Laboratorio 2 se pide crear este DataLoader
 * como parte de la entrega evaluada.
 */
@Component
public class DataLoader implements CommandLineRunner {

    private final CountryRepository repository;

    // Spring inyecta el repositorio automáticamente (inyección por constructor)
    public DataLoader(CountryRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {

        // ── Costa Rica ────────────────────────────────────────────────────
        repository.save(new Country(
                "CRI",
                "Republica de Costa Rica",
                "San José",
                5058007L,
                51100L,
                Arrays.asList(10.0, -84.0),
                List.of("https://www.banderas-mundo.es/data/flags/w580/cr.webp")
        ));

        // ── Panamá ────────────────────────────────────────────────────────
        repository.save(new Country(
                "PAN",
                "Republica de Panamá",
                "Ciudad de Panamá",
                4218808L,
                75417L,
                Arrays.asList(9.0, -80.0),
                List.of("https://www.banderas-mundo.es/data/flags/w580/pa.webp")
        ));

        // ── Argentina ─────────────────────────────────────────────────────
        repository.save(new Country(
                "ARG",
                "República Argentina",
                "Buenos Aires",
                45376763L,
                2780400L,
                Arrays.asList(-34.0, -64.0),
                List.of("https://www.banderas-mundo.es/data/flags/w580/ar.webp")
        ));

        // ── Honduras ──────────────────────────────────────────────────────
        repository.save(new Country(
                "HND",
                "República de Honduras",
                "Tegucigalpa",
                10280345L,
                112492L,
                Arrays.asList(15.0, -86.5),
                List.of("https://www.banderas-mundo.es/data/flags/w580/hn.webp")
        ));

        System.out.println("DataLoader: 4 países cargados correctamente.");
    }
}
