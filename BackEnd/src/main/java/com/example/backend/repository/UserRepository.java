package com.example.backend.repository;

import com.example.backend.model.User;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class UserRepository {

    // Clave = id del usuario
    private final Map<String, User> store = new HashMap<>();

    public Optional<User> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }

    public boolean existsById(String id) {
        return store.containsKey(id);
    }

    public User save(User user) {
        store.put(user.getId(), user);
        return user;
    }

    public List<User> findAll() {
        return new ArrayList<>(store.values());
    }
}
