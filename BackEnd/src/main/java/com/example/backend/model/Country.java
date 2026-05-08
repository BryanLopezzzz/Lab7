package com.example.backend.model;

import java.io.Serializable;
import java.util.List;

/**
 * CAPA MODEL
 * ---------
 * Responsabilidad: representar los datos del dominio.
 * NO contiene lógica de negocio ni acceso a datos.
 *
 * Implementa Serializable para permitir que los objetos
 * puedan ser convertidos a JSON por Spring (Jackson).
 */
public class Country implements Serializable {

    // ── Atributos ──────────────────────────────────────────────────────────
    private String id;          // Código ISO del país  (ej. "CRI", "ARG")
    private String name;        // Nombre oficial
    private String capital;     // Capital
    private long   population;  // Población
    private long   area;        // Área en km²
    private List<Double> latLng; // Coordenadas [latitud, longitud]
    private List<String> flags; // URLs de la bandera

    // ── Constructor completo ───────────────────────────────────────────────
    public Country(String id, String name, String capital,
                   long population, long area,
                   List<Double> latLng, List<String> flags) {
        this.id         = id;
        this.name       = name;
        this.capital    = capital;
        this.population = population;
        this.area       = area;
        this.latLng     = latLng;
        this.flags      = flags;
    }

    // ── Constructor vacío (requerido por Jackson para deserialización) ──────
    public Country() {}

    // ── Getters y Setters ──────────────────────────────────────────────────
    public String getId()                  { return id; }
    public void   setId(String id)         { this.id = id; }

    public String getName()                { return name; }
    public void   setName(String name)     { this.name = name; }

    public String getCapital()             { return capital; }
    public void   setCapital(String c)     { this.capital = c; }

    public long   getPopulation()          { return population; }
    public void   setPopulation(long p)    { this.population = p; }

    public long   getArea()                { return area; }
    public void   setArea(long area)       { this.area = area; }

    public List<Double> getLatLng()               { return latLng; }
    public void         setLatLng(List<Double> l) { this.latLng = l; }

    public List<String> getFlags()                { return flags; }
    public void         setFlags(List<String> f)  { this.flags = f; }
}
