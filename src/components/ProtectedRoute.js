import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = sessionStorage.getItem('sessionRole');

  if (!role || !allowedRoles.includes(role)) {
    
    return <Navigate to="/" />;
  }

  
  return children;
};

export default ProtectedRoute;
