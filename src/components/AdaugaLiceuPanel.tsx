import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { Specializare } from '../models/Specializare';

const AdaugaLiceuPanel: React.FC = () => {
    const [nume, setNume] = useState<string>('');
    const [specializari, setSpecializari] = useState<Specializare[]>([]);
    const [selectedSpecializari, setSelectedSpecializari] = useState<number[]>([]);

    useEffect(() => {
        const fetchSpecializari = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await axios.get<Specializare[]>(`${import.meta.env.VITE_API_URL}/specializare`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSpecializari(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchSpecializari();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!nume || selectedSpecializari.length === 0) {
            alert('Introduceti un nume si cel putin o specializare.');
            return;
        }

        try {
            const token = localStorage.getItem('jwt');
            await axios.post(`${import.meta.env.VITE_API_URL}/liceu`, 
                {
                    nume,
                    idSpecializari: selectedSpecializari
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setNume('');
            setSelectedSpecializari([]);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    const handleCheckboxChange = (specializareId: number) => {
        setSelectedSpecializari((prevSelected) =>
            prevSelected.includes(specializareId)
                ? prevSelected.filter((id) => id !== specializareId)
                : [...prevSelected, specializareId]
        );
    };

    return (
        <Container className="mt-5">
            <h1>Adaugare liceu</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formNumeLiceu">
                    <Form.Label>Nume liceu:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nume Liceu"
                        value={nume}
                        onChange={(e) => setNume(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formSpecializari">
                    <Form.Label>Specializari:</Form.Label>
                    {specializari.map((specializare) => (
                        <Form.Check
                            key={specializare.id}
                            type="checkbox"
                            label={specializare.nume}
                            value={specializare.id}
                            checked={selectedSpecializari.includes(specializare.id)}
                            onChange={() => handleCheckboxChange(specializare.id)}
                        />
                    ))}
                </Form.Group>

                <Button variant="primary" type="submit">
                    Adauga
                </Button>
            </Form>
        </Container>
    );
};

export default AdaugaLiceuPanel;
