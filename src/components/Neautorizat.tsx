import React from 'react';
import { Container, Alert } from 'react-bootstrap';

const Neautorizat: React.FC = () => {
    return (
        <Container className="mt-5">
            <Alert variant="danger">
                <h4>Nu aveti permisiile necesare</h4>
            </Alert>
        </Container>
    );
};

export default Neautorizat;
