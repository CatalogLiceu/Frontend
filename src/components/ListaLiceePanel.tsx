import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Liceu } from '../models/Liceu';
import { Container, ListGroup, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ListaLiceePanel: React.FC = () => {
    const [licee, setLicee] = useState<Liceu[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLicee = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await axios.get<Liceu[]>(`${import.meta.env.VITE_API_URL}/liceu`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setLicee(response.data);
            } catch (err) {
                console.error('Error fetching licee:', err);
            }
        };

        fetchLicee();
    }, []);

    const handleLiceuClick = (liceuId: number) => {
        navigate(`/liceu/${liceuId}`);
    };

    return (
        <Container className="mt-5">
            <h1>Lista licee:</h1>
            {licee.length === 0 ? (
                <Alert variant="info">Nu exista licee.</Alert>
            ) : (
                <ListGroup>
                    {licee.map((liceu) => (
                        <ListGroup.Item 
                            key={liceu.id} 
                            onClick={() => handleLiceuClick(liceu.id)} 
                            style={{ cursor: 'pointer' }}
                        >
                            <h3>Liceu: {liceu.nume}</h3>
                            {liceu.specializari && liceu.specializari.length > 0 ? (
                                <ul>
                                    {liceu.specializari.map((specializari) => (
                                        <li key={specializari.id}>{specializari.nume}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Nu are specializari</p>
                            )}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Container>
    );
};

export default ListaLiceePanel;
