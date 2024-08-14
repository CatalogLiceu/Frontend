import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form, ListGroup } from 'react-bootstrap';
import { Profil } from '../models/Profil';
import { Specializare } from '../models/Specializare';

const ProfilPanel: React.FC = () => {
    const [profiles, setProfiles] = useState<Profil[]>([]);
    const [specializari, setSpecializari] = useState<Map<number, Specializare[]>>(new Map());
    const [newProfileName, setNewProfileName] = useState('');

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
                const specializariMap = new Map<number, Specializare[]>();
                for (const profile of response.data) {
                    const specializariResponse = await axios.get<Specializare[]>(`${import.meta.env.VITE_API_URL}/profil/${profile.id}/specializari`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    specializariMap.set(profile.id, specializariResponse.data);
                }
                setSpecializari(specializariMap);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProfiles();
    }, []);

    const handleAddProfile = async () => {
        if (!newProfileName.trim()) return;

        try {
            const token = localStorage.getItem('jwt');
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/profil`,
                { nume: newProfileName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const newProfile = response.data;
            setProfiles((prev) => [...prev, newProfile]);
            const specializariResponse = await axios.get<Specializare[]>(`${import.meta.env.VITE_API_URL}/profil/${newProfile.id}/specializari`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSpecializari((prev) => new Map(prev).set(newProfile.id, specializariResponse.data));
            setNewProfileName('');
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col md={6}>
                    <h1>Profiluri licee: </h1>
                    <ListGroup>
                        {profiles.map((profile) => (
                            <ListGroup.Item key={profile.id}>
                                <div>Profil: {profile.nume}</div>
                                <ul>
                                    {specializari.get(profile.id)?.map((specializare) => (
                                        <li key={specializare.id}>Specializare {specializare.nume}</li>
                                    ))}
                                </ul>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col md={6}>
                    <h2>Adaugare profil:</h2>
                    <Form.Group controlId="formProfileName">
                        <Form.Label>Nume profil:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nume profil nou"
                            value={newProfileName}
                            onChange={(e) => setNewProfileName(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleAddProfile}>
                        Adauga
                    </Button>
                </Col>
            </Row>                
        </Container>
        
    );
};

export default ProfilPanel;
