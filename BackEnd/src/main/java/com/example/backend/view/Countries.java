package com.example.backend.view;

import com.example.backend.controller.CountryService;
import com.example.backend.model.Country;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CAPA VIEW (exposición web / presentación)
 * -----------------------------------------
 * Responsabilidad: recibir peticiones HTTP y devolver respuestas JSON.
 * Delega toda la lógica al CountryService (capa controller).
 *
 * @RestController = @Controller + @ResponseBody
 *   Indica que esta clase es un controlador REST y que cada método
 *   retorna datos directamente en el cuerpo de la respuesta (JSON).
 *
 * @RequestMapping("/countries") define la ruta base para todos los endpoints.
 *
 * @CrossOrigin permite peticiones desde el FrontEnd (otro puerto/dominio).
 * Esto es necesario para la arquitectura SPA separada (CORS).
 *
 * ENDPOINTS EXPUESTOS (Sub-Laboratorio 1):
 *   GET    /countries              → obtener todos los países
 *   GET    /countries?name=xxx     → buscar por nombre
 *   GET    /countries/{id}         → obtener un país por id
 *   POST   /countries              → crear un nuevo país
 *   PUT    /countries/{id}         → actualizar un país
 *   DELETE /countries/{id}         → eliminar un país
 */
@RestController
@RequestMapping("/countries")
@CrossOrigin(origins = "*")  // Permite CORS para el FrontEnd SPA
public class Countries {

    // Spring inyecta el servicio automáticamente
    private final CountryService service;

    public Countries(CountryService service) {
        this.service = service;
    }

    // ── 1. GET /countries  ──────────────────────────────────────────────────
    // GET /countries?name=    → todos los países
    // GET /countries?name=Rep → países cuyo nombre contenga "Rep"
    @GetMapping
    public ResponseEntity<List<Country>> find(
            @RequestParam(defaultValue = "") String name) {
        List<Country> result = service.find(name);
        return ResponseEntity.ok(result);
    }

    // ── 2. GET /countries/{id}  ─────────────────────────────────────────────
    @GetMapping("/{id}")
    public ResponseEntity<?> read(@PathVariable String id) {
        try {
            Country country = service.read(id);
            return ResponseEntity.ok(country);
        } catch (Exception e) {
            // 404 Not Found con mensaje descriptivo
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    // ── 3. POST /countries  ─────────────────────────────────────────────────
    // Recibe un JSON con los datos del nuevo país en el body
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Country country) {
        try {
            Country created = service.create(country);
            // 201 Created es el código correcto al crear un recurso nuevo
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            // 409 Conflict si el id ya existe
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(e.getMessage());
        }
    }

    // ── 4. PUT /countries/{id}  ─────────────────────────────────────────────
    // Reemplaza completamente el recurso con los datos del body
    @PutMapping("/{id}")
    public ResponseEntity<?> update(
            @PathVariable String id,
            @RequestBody Country country) {
        try {
            Country updated = service.update(id, country);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    // ── 5. DELETE /countries/{id}  ──────────────────────────────────────────
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        // 204 No Content: operación exitosa sin cuerpo en la respuesta
        return ResponseEntity.noContent().build();
    }
}
