import React, { useEffect, useState } from 'react';
import { Container, Table, Alert, Spinner } from 'react-bootstrap';
import NavbarAbogado from './NavbarAbogado';
import axios from 'axios';

function AbogadoHome() {
    const [casos, setCasos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCasos();
    }, []);

    const fetchCasos = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No hay token. Inicia sesión primero.');
                setLoading(false);
                return;
            }

            const res = await axios.get('http://localhost:8080/caso/mis-casos-abogado', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCasos(res.data);
        } catch (err) {
            setError('No se pudieron cargar los casos asignados.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <NavbarAbogado />
            <Container className="mt-4">
                <h3 className="mb-4">⚖️ Mis Casos Asignados</h3>

                {loading && (
                    <div className="text-center">
                        <Spinner animation="border" />
                        <p>Cargando casos...</p>
                    </div>
                )}

                {error && <Alert variant="danger">{error}</Alert>}

                {!loading && casos.length > 0 && (
                    <Table striped bordered hover responsive>
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Título</th>
                                <th>Descripción</th>
                                <th>Tipo</th>
                                <th>Cliente</th>
                            </tr>
                        </thead>
                        <tbody>
                            {casos.map((caso, index) => (
                                <tr key={caso.id}>
                                    <td>{index + 1}</td>
                                    <td>{caso.titulo}</td>
                                    <td>{caso.descripcion}</td>
                                    <td>{caso.esDemandado ? 'Demandado' : 'Demandante'}</td>
                                    <td>{caso.cliente ? caso.cliente.username : 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}

                {!loading && casos.length === 0 && !error && (
                    <Alert variant="info">No tienes casos asignados actualmente.</Alert>
                )}
            </Container>
        </>
    );
}

export default AbogadoHome;
