import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUserRoles } from '../utilities/UserRoles';
import AdministratorPlatformaPanel from './AdministratorPlatformaPanel';

const Acasa: React.FC = () => {
    const navigate = useNavigate();
    const userRoles = getUserRoles();
    const logout = () => {
        localStorage.removeItem('jwt');
        navigate('/');
    };

    return (
        <Container className="mt-4">
            <Row className="mt-4">
                <Col className="text-center">
                    <Button variant="secondary" onClick={logout}>
                        Logout
                    </Button>
                </Col>
            </Row>
            {userRoles.includes('ROL_ADMINISTRATOR_PLATFORMA') && (
                <AdministratorPlatformaPanel />
            )}
        </Container>
    );
};

export default Acasa;