package com.example.backend.model;

import java.io.Serializable;

public class User implements Serializable {

    private String id;
    private String password;
    private String role;

    public User() {}

    public User(String id, String password, String role) {
        this.id       = id;
        this.password = password;
        this.role     = role;
    }

    public String getId()                  { return id; }
    public void   setId(String id)         { this.id = id; }

    public String getPassword()            { return password; }
    public void   setPassword(String p)    { this.password = p; }

    public String getRole()                { return role; }
    public void   setRole(String role)     { this.role = role; }
}
