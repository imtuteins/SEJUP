import React, { useState } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Función para redirigir según el rol
  const redirectByRole = (token) => {
    try {
      const decoded = jwtDecode(token);
      const role = decoded.role;

      localStorage.setItem('rol', role);

      // Redirigir según el rol
      if (role === 'ROLE_ADMIN') {
        navigate('/admin');
      } else if (role === 'ROLE_ABOGADO') {
        navigate('/abogado');
      } else if (role === 'ROLE_CLIENTE') {
        navigate('/cliente');
      } else {
        navigate('/home');
      }
    } catch (err) {
      console.error('Error al decodificar el token:', err);
      navigate('/home');
    }
  };

  // Login clásico
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const token = await response.text();
        localStorage.setItem('token', token);
        redirectByRole(token);
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    }
  };

  // Login con Google
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const tokenGoogle = credentialResponse.credential;

    try {
      const response = await fetch('http://localhost:8080/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokenGoogle }),
      });

      const data = await response.json();
      localStorage.setItem('token', data.jwt);
      redirectByRole(data.jwt);
    } catch (error) {
      console.error('Error login Google:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg" style={{ width: '25rem' }}>
        <Card.Body>
          <h3 className="text-center mb-4">Iniciar Sesión</h3>
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Login clásico */}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Entrar
            </Button>
          </Form>

          <hr />

          {/* Login con Google */}
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => console.error('Login Google fallido')}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
