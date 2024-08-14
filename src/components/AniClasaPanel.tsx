import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form, ListGroup } from 'react-bootstrap';
import { AnClasa } from '../models/AnClasa';

const AniClasaPanel: React.FC = () => {
    const [aniClasa, setAniClasa] = useState<AnClasa[]>([]);
    const [newNrClasa, setNewNrClasa] = useState<number>(0);

    useEffect(() => {
        const fetchAniClasa = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await axios.get<AnClasa[]>(`${import.meta.env.VITE_API_URL}/an_clasa`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAniClasa(response.data);
            } catch (error) {
                console.log(error);
                alert("Nu s-au putut extrage ani claselor.");
            }
        };

        fetchAniClasa();
    }, []);

    const handleAddAnClasa = async () => {
        if (!newNrClasa) return;

        try {
            const token = localStorage.getItem('jwt');
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/an_clasa`,
                { nrClasa: newNrClasa },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setAniClasa([...aniClasa, response.data]);
            setNewNrClasa(0);
            window.location.reload();
        } catch (error) {
            console.log(error);
            alert("Numarul trebuie sa fie intre 9 si 13 si anul clasei sa nu existe.");
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col md={6}>
                    <h1>Ani clasa</h1>
                    <ListGroup>
                        {aniClasa.map((anClasa) => (
                            <ListGroup.Item key={anClasa.id}>
                                Anul Clasei: {anClasa.nrClasa}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col md={6}>
                    <h2>Adauga an clasa</h2>
                    <Form.Group controlId="formAnClasaNumber">
                        <Form.Label>An clasa nou: </Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Nr. an"
                            value={newNrClasa}
                            onChange={(e) => setNewNrClasa(Number(e.target.value))}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleAddAnClasa}>
                        Adauga
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default AniClasaPanel;
