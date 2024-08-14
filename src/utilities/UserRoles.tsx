import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    roles: string[];
}

export const getUserRoles = (): string[] => {
    const token = localStorage.getItem('jwt');
    if (!token) return [];

    try {
        const decoded: DecodedToken = jwtDecode(token);
        return decoded.roles || [];
    } catch (error) {
        console.error('Error decoding token', error);
        return [];
    }
};