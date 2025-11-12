    package com.entornos.v2_maven.Service;

    import com.entornos.v2_maven.Entity.Usuario;
    import com.entornos.v2_maven.Repository.UsuarioRepository;
    import lombok.NoArgsConstructor;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.security.core.authority.SimpleGrantedAuthority;
    import org.springframework.security.core.userdetails.User;
    import org.springframework.security.core.userdetails.UserDetails;
    import org.springframework.security.core.userdetails.UserDetailsService;
    import org.springframework.security.core.userdetails.UsernameNotFoundException;
    import org.springframework.stereotype.Service;

    import java.util.Collections;
    import java.util.List;
    import java.util.Optional;

    @NoArgsConstructor
    @Service
    public class UsuarioService implements UserDetailsService {

        private UsuarioRepository usuarioRepository;

        @Autowired
        public UsuarioService(UsuarioRepository usuarioRepository) {
            this.usuarioRepository = usuarioRepository;
        }


        @Override
        public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
            Usuario usuario = usuarioRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));

            SimpleGrantedAuthority authority = new SimpleGrantedAuthority(usuario.getRol().getName().toString());

            return new User(
                    usuario.getUsername(),
                    usuario.getPassword(),
                    Collections.singleton(authority)
            );
        }

        public boolean existsByUsername(String username) {
            return usuarioRepository.existsByUsername(username);
        }

        public void save(Usuario usuario) {
            usuarioRepository.save(usuario);
        }

        public List<Usuario> findAll() {
            return usuarioRepository.findAll();
        }

        public Usuario obtenerUsuarioPorUsername(String username) {
            return usuarioRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));
        }

        public Optional<Usuario> findByUsername(String username) {
            return usuarioRepository.findByUsername(username);
        }
    }
