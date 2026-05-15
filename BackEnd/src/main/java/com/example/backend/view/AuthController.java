package com.example.backend.view;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepo;
    private final JwtUtil        jwtUtil;

    public AuthController(UserRepository userRepo, JwtUtil jwtUtil) {
        this.userRepo = userRepo;
        this.jwtUtil  = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String id       = body.get("id");
        String password = body.get("password");

        if (id == null || password == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Se requieren id y password"));
        }

        Optional<User> userOpt = userRepo.findById(id);

        if (userOpt.isEmpty() || !userOpt.get().getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Credenciales incorrectas"));
        }

        User user  = userOpt.get();
        String token = jwtUtil.generateToken(user.getId(), user.getRole());

        return ResponseEntity.ok(Map.of(
                "token", token,
                "id",    user.getId(),
                "role",  user.getRole()
        ));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User newUser) {
        if (newUser.getId() == null || newUser.getId().isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "El ID es requerido"));
        }
        if (newUser.getPassword() == null || newUser.getPassword().isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "La contraseña es requerida"));
        }

        String role = newUser.getRole();
        if (role == null || (!role.equals("admin") && !role.equals("writer") && !role.equals("reader"))) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Rol inválido. Use: admin, writer, reader"));
        }

        if (userRepo.existsById(newUser.getId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Ya existe un usuario con id: " + newUser.getId()));
        }

        userRepo.save(newUser);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("id", newUser.getId(), "role", newUser.getRole()));
    }
}
