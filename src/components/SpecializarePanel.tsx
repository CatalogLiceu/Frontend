import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Specializare } from '../models/Specializare';
import { Profil } from '../models/Profil';

const SpecializarePanel: React.FC = () => {
    const [, setSpecializari] = useState<Specializare[]>([]);
    const [newSpecializare, setNewSpecializare] = useState('');
    const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
    const [profiles, setProfiles] = useState<Profil[]>([]);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await axios.get<Profil[]>(`${import.meta.env.VITE_API_URL}/profil`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfiles(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProfiles();
    }, []);
    useEffect(() => {
        if (selectedProfile === null) return;

        const fetchSpecializari = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await axios.get<Specializare[]>(`${import.meta.env.VITE_API_URL}/profil/${selectedProfile}/specializari`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSpecializari(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSpecializari();
    }, [selectedProfile]);
    const handleAddSpecializare = async () => {
        if (!newSpecializare.trim() || selectedProfile === null) return;

        try {
            const token = localStorage.getItem('jwt');
            await axios.post(
                `${import.meta.env.VITE_API_URL}/specializare`,
                { nume: newSpecializare, idProfil: selectedProfile },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const response = await axios.get<Specializare[]>(`${import.meta.env.VITE_API_URL}/profil/${selectedProfile}/specializari`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSpecializari(response.data);
            setNewSpecializare('');
            window.location.reload();
        } catch (error) {
            console.error('Error adding specializare', error);
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                <h1>Adauga specializare</h1>
                <Col md={6}>
                    
                    <Form.Group controlId="formProfileSelect">
                        <Form.Label>Selecteaza profil: </Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => setSelectedProfile(Number(e.target.value))}
                            value={selectedProfile ?? ''}
                        >
                            <option value="">Selecteaza un profil</option>
                            {profiles.map((profile) => (
                                <option key={profile.id} value={profile.id}>
                                    {profile.nume}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    
                    <Form.Group controlId="formSpecializareName">
                        <Form.Label>Nume specializare: </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nume specializare noua"
                            value={newSpecializare}
                            onChange={(e) => setNewSpecializare(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleAddSpecializare}>
                        Adauga
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default SpecializarePanel;
