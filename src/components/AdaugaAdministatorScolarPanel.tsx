import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

interface AdaugaAdministratorScolarPanelProps {
    liceuId: number;
}

const AdaugaAdministratorScolarPanel: React.FC<AdaugaAdministratorScolarPanelProps> = ({ liceuId }) => {
    const [nume, setNume] = useState<string>('');
    const [prenume, setPrenume] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [porecla, setPorecla] = useState<string>('');
    const [parola, setParola] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
  
        if (!nume || !prenume || !email || !porecla || !parola) {
            alert('Nu ati introdus toate campurile.');
            return;
        }
    
        try {
            const token = localStorage.getItem('jwt');
            if (!token) {
                console.error('JWT inexistent');
                return;
            }
            await axios.post(
                `${import.meta.env.VITE_API_URL}/administrator_scolar`,
                {
                    cerereInregistrareUtilizator: {
                        nume,
                        prenume,
                        email,
                        porecla,
                        parola
                    },
                    idLiceu: liceuId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            setNume('');
            setPrenume('');
            setEmail('');
            setPorecla('');
            setParola('');
    
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container className="mt-5">
            <h2>Adauga administrator scolar</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formNume">
                    <Form.Label>Nume:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nume"
                        value={nume}
                        onChange={(e) => setNume(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formPrenume">
                    <Form.Label>Prenume:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Prenume"
                        value={prenume}
                        onChange={(e) => setPrenume(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formPorecla">
                    <Form.Label>Porecla:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Porecla"
                        value={porecla}
                        onChange={(e) => setPorecla(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formParola">
                    <Form.Label>Parola:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Parola"
                        value={parola}
                        onChange={(e) => setParola(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Adauga
                </Button>
            </Form>
        </Container>
    );
};

export default AdaugaAdministratorScolarPanel;
