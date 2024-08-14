import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Liceu } from '../models/Liceu';
import { Container, Card, Alert } from 'react-bootstrap';
import AdaugaAdministratorScolarPanel from './AdaugaAdministatorScolarPanel';

const LiceuAdministratorPlatforma: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [liceu, setLiceu] = useState<Liceu | null>(null);

    useEffect(() => {
        const fetchLiceu = async () => {
            if (id) {
                try {
                    const token = localStorage.getItem('jwt');
                    const response = await axios.get<Liceu>(`${import.meta.env.VITE_API_URL}/liceu/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setLiceu(response.data);
                } catch (err) {
                    console.error(err);
                }
            }
        };

        fetchLiceu();
    }, [id]);

    if (!liceu) {
        return <Alert variant="info">Incarcare...</Alert>;
    }

    return (
        <Container className="mt-5">
            <h1>Liceul {liceu.nume}</h1>
            <Card>
                <Card.Body>
                    <Card.Title>Nume: {liceu.nume}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Specializari:</Card.Subtitle>
                    {liceu.specializari && liceu.specializari.length > 0 ? (
                        <ul>
                            {liceu.specializari.map((specializari) => (
                                <li key={specializari.id}>
                                    {specializari.nume} (profil - {specializari.profil.nume})
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No specializări available</p>
                    )}
                    <AdaugaAdministratorScolarPanel liceuId={liceu.id}></AdaugaAdministratorScolarPanel>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default LiceuAdministratorPlatforma;
