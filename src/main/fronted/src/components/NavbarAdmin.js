import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NavbarAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand>SEJUP - Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/clientes')}>Listado de Clientes</Nav.Link>
            <Nav.Link onClick={() => navigate('/abogados')}>Listado de Abogados</Nav.Link>
            <Nav.Link onClick={() => navigate('/casos')}>Listado de Casos</Nav.Link>
            <Nav.Link href="/archivos">Archivos</Nav.Link>
          </Nav>
          <Button variant="outline-light" onClick={handleLogout}>Salir</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarAdmin;
