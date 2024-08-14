import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, ListGroup } from 'react-bootstrap';
import { Materie } from '../models/Materie';

const SchimbareDateMateriePanel: React.FC = () => {
    const [materii, setMaterii] = useState<Materie[]>([]);
    const [filteredMaterii, setFilteredMaterii] = useState<Materie[]>([]);
    const [selectedMaterie, setSelectedMaterie] = useState<Materie | null>(null);
    const [nume, setNume] = useState<string>('');
    const [numeInput, setNumeInput] = useState<string>('');
    const getAuthHeaders = () => {
        const token = localStorage.getItem('jwt');
        return {
            Authorization: `Bearer ${token}`
        };
    };

    useEffect(() => {
        const fetchMaterii = async () => {
            try {
                const response = await axios.get<Materie[]>(`${import.meta.env.VITE_API_URL}/materie`, {
                    headers: getAuthHeaders(),
                });
                setMaterii(response.data);
                setFilteredMaterii(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMaterii();
    }, []);

    useEffect(() => {
        if (numeInput.length >= 3) {
            const filtered = materii.filter(materie =>
                materie.nume.toLowerCase().includes(numeInput.toLowerCase())
            );
            setFilteredMaterii(filtered);
        } else {
            setFilteredMaterii([]);
        }
    }, [numeInput, materii]);

    const handleMaterieSelect = (materie: Materie) => {
        setSelectedMaterie(materie);
        setNume(materie.nume);
    };

    const handleUpdateMaterie = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!selectedMaterie) {
            alert('Nicio materie nu a fost selectata');
            return;
        }

        if (!nume) {
            alert('Introduceti un nume pt. materie.');
            return;
        }

        try {
            await axios.put(
                `${import.meta.env.VITE_API_URL}/materie/${selectedMaterie.id}`,
                { nume },
                {
                    headers: getAuthHeaders(),
                }
            );
            setNume('');
            setSelectedMaterie(null);
            const response = await axios.get<Materie[]>(`${import.meta.env.VITE_API_URL}/materie`, {
                headers: getAuthHeaders(),
            });
            setMaterii(response.data);
            setFilteredMaterii(response.data);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container className="mt-5">
            <h1>Schimbare nume materie:</h1>

            <Form>
                <Form.Group controlId="formMaterieSearch">
                    <Form.Label>Cautare materie:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Introduceti min. 3 litere"
                        value={numeInput}
                        onChange={(e) => setNumeInput(e.target.value)}
                    />
                </Form.Group>

                {filteredMaterii.length > 0 && (
                    <ListGroup className="mt-3">
                        {filteredMaterii.map((materie) => (
                            <ListGroup.Item
                                key={materie.id}
                                onClick={() => handleMaterieSelect(materie)}
                                style={{ cursor: 'pointer' }}
                            >
                                Materie: {materie.nume}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Form>

            {selectedMaterie && (
                <Form onSubmit={handleUpdateMaterie} className="mt-4">
                    <Form.Group controlId="formNumeUpdate">
                        <Form.Label>Nume nou materie:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nume materie"
                            value={nume}
                            onChange={(e) => setNume(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Actualizare
                    </Button>
                </Form>
            )}
        </Container>
    );
};

export default SchimbareDateMateriePanel;
