import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { Specializare } from '../models/Specializare';
import { AnClasa } from '../models/AnClasa';

const AdaugaMateriePanel: React.FC = () => {
    const [specializari, setSpecializari] = useState<Specializare[]>([]);
    const [aniClase, setAniClase] = useState<AnClasa[]>([]);
    const [nume, setNume] = useState<string>('');
    const [selectedSpecializari, setSelectedSpecializari] = useState<number[]>([]);
    const [selectedAniClase, setSelectedAniClase] = useState<number[]>([]);

    const getAuthHeaders = () => {
        const token = localStorage.getItem('jwt');
        return {
            Authorization: `Bearer ${token}`
        };
    };

    useEffect(() => {
        const fetchSpecializari = async () => {
            try {
                const response = await axios.get<Specializare[]>(`${import.meta.env.VITE_API_URL}/specializare`, {
                    headers: getAuthHeaders(),
                });
                setSpecializari(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        const fetchAniClase = async () => {
            try {
                const response = await axios.get<AnClasa[]>(`${import.meta.env.VITE_API_URL}/an_clasa`, {
                    headers: getAuthHeaders(),
                });
                setAniClase(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchSpecializari();
        fetchAniClase();
    }, []);

    const handleCreateMaterie = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!nume || selectedSpecializari.length == 0 || selectedAniClase.length == 0) {
            alert('Nu ati introdus toate campurile.');
            return;
        }

        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/materie`,
                {
                    idSpecializari: selectedSpecializari,
                    idAniClase: selectedAniClase,
                    nume: nume
                },
                {
                    headers: getAuthHeaders(),
                }
            );
            setNume('');
            setSelectedSpecializari([]);
            setSelectedAniClase([]);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container className="mt-5">
            <h1>Adauga materie</h1>

            <Form onSubmit={handleCreateMaterie}>
                <Form.Group controlId="formNume">
                    <Form.Label>Nume:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nume materie"
                        value={nume}
                        onChange={(e) => setNume(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formSpecializari">
                    <Form.Label>Specializari:</Form.Label>
                    {specializari.map(s => (
                        <Form.Check
                            key={s.id}
                            type="checkbox"
                            label={s.nume}
                            checked={selectedSpecializari.includes(s.id)}
                            onChange={() => {
                                setSelectedSpecializari(prev =>
                                    prev.includes(s.id)
                                        ? prev.filter(id => id !== s.id)
                                        : [...prev, s.id]
                                );
                            }}
                        />
                    ))}
                </Form.Group>

                <Form.Group controlId="formAniClase">
                    <Form.Label>Ani:</Form.Label>
                    {aniClase.map(a => (
                        <Form.Check
                            key={a.id}
                            type="checkbox"
                            label={a.nrClasa}
                            checked={selectedAniClase.includes(a.id)}
                            onChange={() => {
                                setSelectedAniClase(prev =>
                                    prev.includes(a.id)
                                        ? prev.filter(id => id !== a.id)
                                        : [...prev, a.id]
                                );
                            }}
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

export default AdaugaMateriePanel;
