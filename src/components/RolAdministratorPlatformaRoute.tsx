import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRoles } from '../utilities/UserRoles';

const RolAdministratorPlatformaRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const userRoles = getUserRoles();
    const hasAccess = userRoles.includes('ROL_ADMINISTRATOR_PLATFORMA');

    return hasAccess ? <>{children}</> : <Navigate to="/unauthorized" />;
};

export default RolAdministratorPlatformaRoute;
