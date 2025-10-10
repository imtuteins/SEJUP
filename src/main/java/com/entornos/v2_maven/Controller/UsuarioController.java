package com.entornos.v2_maven.Controller;

import com.entornos.v2_maven.Entity.Usuario;
import com.entornos.v2_maven.Service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/admin")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/usuarios")
    public ResponseEntity<List<Usuario>> getAllUsers() {
        List<Usuario> usuarios = usuarioService.findAll();
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/usuarios-view")
    public String getAllUsers(Model model) {
        model.addAttribute("usuarios", usuarioService.findAll());
        return "usuarios";

    }
}
