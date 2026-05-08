package com.example.backend.controller;

import com.example.backend.model.Country;
import com.example.backend.repository.CountryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * CAPA CONTROLLER (lógica de negocio / orquestación)
 * ---------------------------------------------------
 * En el MVC definido por el laboratorio, esta capa:
 *   - Recibe las solicitudes de la capa VIEW
 *   - Aplica reglas de negocio
 *   - Delega el acceso a datos al REPOSITORY
 *   - Devuelve los resultados a la capa VIEW
 *
 * La anotación @Service indica a Spring que este componente
 * es un bean de lógica de negocio (equivalente semántico de @Component).
 * Spring lo inyectará donde sea necesario.
 *
 * IMPORTANTE: ya NO usamos el patrón Singleton manual (instance()).
 * Spring gestiona el ciclo de vida de este objeto automáticamente.
 */
@Service
public class CountryService {

    // Inyección por constructor: buena práctica recomendada por Spring
    private final CountryRepository repository;

    public CountryService(CountryRepository repository) {
        this.repository = repository;
    }

    // ── Métodos de negocio ─────────────────────────────────────────────────

    /**
     * Retorna todos los países, o filtra por nombre si se provee patrón.
     */
    public List<Country> find(String pattern) {
        if (pattern == null || pattern.isBlank()) {
            return repository.findAll();
        }
        return repository.findByNameContaining(pattern);
    }

    /**
     * Retorna un país por su id.
     * Lanza excepción si no existe.
     */
    public Country read(String id) throws Exception {
        return repository.findById(id);
    }

    /**
     * Crea un nuevo país.
     * Lanza excepción si ya existe un país con ese id.
     */
    public Country create(Country country) throws Exception {
        if (repository.existsById(country.getId())) {
            throw new Exception("Ya existe un país con id: " + country.getId());
        }
        return repository.save(country);
    }

    /**
     * Actualiza un país existente.
     * Lanza excepción si el país no existe.
     */
    public Country update(String id, Country country) throws Exception {
        if (!repository.existsById(id)) {
            throw new Exception("País con id '" + id + "' no encontrado");
        }
        country.setId(id); // aseguramos consistencia del id
        return repository.save(country);
    }

    /**
     * Elimina un país por su id.
     */
    public void delete(String id) {
        repository.deleteById(id);
    }
}
