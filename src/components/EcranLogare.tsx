import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EcranLogare: React.FC = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [, setJwt] = useState<string | null>(null);
    const navigate = useNavigate();
    const handleLogin = async () => {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        if (!username || !password) {
            alert('Introduceti porecla si parola.');
            return;
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/autentificare/login`, {
                porecla: username,
                parola: password,
            });
            console.log('JWT:', response.data);
            setJwt(response.data.token);
            localStorage.setItem('jwt', response.data.token);
            navigate('/acasa');
        } catch (error) {
            console.error('Logare esuata:', error);
        }
    };

    return (
        <div>
            <h1>Logare</h1>
            <div>
                <label htmlFor="Porecla:">Username:</label>
                <input
                    id="username"
                    type="text"
                    ref={usernameRef}
                    placeholder="Introduceti porecla dvs."
                />
            </div>
            <div>
                <label htmlFor="password">Parola:</label>
                <input
                    id="password"
                    type="password"
                    ref={passwordRef}
                    placeholder="Introduceti parola dvs."
                />
            </div>
            <button onClick={handleLogin}>Logare</button>
        </div>
    );
};

export default EcranLogare;