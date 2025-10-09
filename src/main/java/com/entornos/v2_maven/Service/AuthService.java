package com.entornos.v2_maven.Service;

import com.entornos.v2_maven.Dtos.NewUsuarioDto;
import com.entornos.v2_maven.Entity.Rol;
import com.entornos.v2_maven.Entity.Usuario;
import com.entornos.v2_maven.Enums.RoleList;
import com.entornos.v2_maven.Repository.RolRepository;
import com.entornos.v2_maven.jwt.JwtUtil;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UsuarioService userService;
    private final RolRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public AuthService(UsuarioService userService, RolRepository roleRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.userService = userService;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }

    public String authenticate(String username, String password) {
        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(username, password);
        Authentication authResult = authenticationManagerBuilder.getObject().authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(authResult);
        return jwtUtil.generateToken(authResult);
    }

    public void registerUser(NewUsuarioDto newUserDto) {

       if (userService.existsByUsername(newUserDto.getUsername())) {
           throw new IllegalArgumentException("Username " + newUserDto.getUsername() + " already exists");
       }
        Rol rolUser = roleRepository
                .findByName(RoleList.ROLE_CLIENTE)
                .orElseThrow(() -> new RuntimeException("Rol no encontrado"));
        Usuario usuario = new Usuario(
                newUserDto.getUsername(),
                passwordEncoder.encode(newUserDto.getPassword()),
                rolUser
        );
       userService.save(usuario);
    }
}
