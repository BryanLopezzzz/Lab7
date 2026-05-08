package com.example.backend.repository;

import com.example.backend.model.Country;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.stream.Collectors;

/**
 * CAPA REPOSITORY
 * ---------------
 * Responsabilidad: gestionar el almacenamiento y recuperación de datos.
 * En este proyecto usamos un HashMap como base de datos en memoria.
 * En proyectos reales, aquí se usaría JPA/Hibernate con una BD real.
 *
 * La anotación @Repository indica a Spring que este componente
 * pertenece a la capa de acceso a datos y debe ser gestionado
 * como un bean (singleton por defecto).
 */
@Repository
public class CountryRepository {

    // Base de datos en memoria: clave = id del país, valor = objeto Country
    private final Map<String, Country> store = new HashMap<>();

    // ── Operaciones CRUD ───────────────────────────────────────────────────

    /**
     * Retorna todos los países almacenados.
     */
    public List<Country> findAll() {
        return new ArrayList<>(store.values());
    }

    /**
     * Busca países cuyo nombre contenga el patrón dado (búsqueda parcial).
     */
    public List<Country> findByNameContaining(String pattern) {
        return store.values().stream()
                .filter(c -> c.getName().toLowerCase()
                              .contains(pattern.toLowerCase()))
                .collect(Collectors.toList());
    }

    /**
     * Busca un país por su id.
     * Lanza excepción si no existe.
     */
    public Country findById(String id) throws Exception {
        Country c = store.get(id);
        if (c == null) {
            throw new Exception("País con id '" + id + "' no encontrado");
        }
        return c;
    }

    /**
     * Guarda (crea o actualiza) un país.
     */
    public Country save(Country country) {
        store.put(country.getId(), country);
        return country;
    }

    /**
     * Elimina un país por su id.
     */
    public void deleteById(String id) {
        store.remove(id);
    }

    /**
     * Verifica si existe un país con el id dado.
     */
    public boolean existsById(String id) {
        return store.containsKey(id);
    }
}
