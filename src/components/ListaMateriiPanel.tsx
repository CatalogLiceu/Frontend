import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, ListGroup } from 'react-bootstrap';
import { Materie } from '../models/Materie'; 
import { Specializare } from '../models/Specializare';
import { AnClasa } from '../models/AnClasa';

const ListaMateriiPanel: React.FC = () => {
    const [materii, setMaterii] = useState<Materie[]>([]);
    const [specializari, setSpecializari] = useState<Specializare[]>([]);
    const [aniClase, setAniClase] = useState<AnClasa[]>([]);

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
            } catch (err) {
                console.error(err);
            }
        };

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

        fetchMaterii();
        fetchSpecializari();
        fetchAniClase();
    }, []);

    const getSpecializariNames = (ids: number[]) => {
        return ids
            .map(id => specializari.find(s => s.id === id)?.nume || 'Unknown')
            .join(', ');
    };

    const getAniClaseNames = (ids: number[]) => {
        return ids
            .map(id => aniClase.find(a => a.id === id)?.nrClasa || 'Unknown')
            .join(', ');
    };

    return (
        <Container className="mt-5">
            <h1>Lista materii:</h1>
            <ListGroup>
                {materii.map((materie) => (
                    <ListGroup.Item key={materie.id}>
                        <h2>Materie: {materie.nume}</h2>
                        <p><strong>Specializari:</strong> {getSpecializariNames(materie.specializari.map(s => s.id))}</p>
                        <p><strong>Ani clase:</strong> {getAniClaseNames(materie.aniClase.map(a => a.id))}</p>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default ListaMateriiPanel;
