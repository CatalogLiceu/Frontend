import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, ListGroup } from 'react-bootstrap';
import { Utilizator } from '../models/Utilizator';

const SchimbareDateUtilizatorPanel: React.FC = () => {
    const [users, setUsers] = useState<Utilizator[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<Utilizator[]>([]);
    const [poreclaInput, setPoreclaInput] = useState<string>('');
    const [selectedUser, setSelectedUser] = useState<Utilizator | null>(null);
    const [nume, setNume] = useState<string>('');
    const [prenume, setPrenume] = useState<string>('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await axios.get<Utilizator[]>(`${import.meta.env.VITE_API_URL}/utilizator`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (poreclaInput.length >= 3) {
            const filtered = users.filter(user =>
                user.porecla.toLowerCase().includes(poreclaInput.toLowerCase())
            );
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers([]);
            setSelectedUser(null);
            setNume('');
            setPrenume('');
        }
    }, [poreclaInput, users]);

    const handleUserSelect = (user: Utilizator) => {
        setSelectedUser(user);
        setNume(user.nume);
        setPrenume(user.prenume);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!selectedUser) {
            alert('Utilizatorul nu a fost selectat.');
            return;
        }

        if (!nume || !prenume) {
            alert('Introduceti toate campurile.');
            return;
        }

        try {
            const token = localStorage.getItem('jwt');
            await axios.put(
                `${import.meta.env.VITE_API_URL}/utilizator/${selectedUser.id}`,
                { nume, prenume },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setNume('');
            setPrenume('');
            setSelectedUser(null);
            setPoreclaInput('');
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container className="mt-5">
            <h1>Schimbare date utilizator:</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formPorecla">
                    <Form.Label>Cautare dupa porecla:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Introduceti min. 3 litere"
                        value={poreclaInput}
                        onChange={(e) => setPoreclaInput(e.target.value)}
                    />
                </Form.Group>

                {filteredUsers.length > 0 && poreclaInput.length >= 3 && (
                    <ListGroup className="mt-3">
                        {filteredUsers.map((user) => (
                            <ListGroup.Item
                                key={user.id}
                                onClick={() => handleUserSelect(user)}
                                style={{ cursor: 'pointer' }}
                            >
                                {user.porecla} - {user.nume} {user.prenume}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}

                {selectedUser && poreclaInput.length >= 3 && (
                    <>
                        <Form.Group controlId="formNume">
                            <Form.Label>Nume:</Form.Label>
                            <Form.Control
                                type="text"
                                value={nume}
                                placeholder="Introduceti nume"
                                onChange={(e) => setNume(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPrenume">
                            <Form.Label>Prenume:</Form.Label>
                            <Form.Control
                                type="text"
                                value={prenume}
                                placeholder="Introduceti prenume"
                                onChange={(e) => setPrenume(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Actualizare
                        </Button>
                    </>
                )}
            </Form>
        </Container>
    );
};

export default SchimbareDateUtilizatorPanel;
