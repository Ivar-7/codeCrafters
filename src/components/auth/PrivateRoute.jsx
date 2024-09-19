// src/components/auth/PrivateRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from './useAuth'; 

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show a loading spinner or placeholder while checking authentication status
  if (loading) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect to /signup, preserving the original location
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the component passed in the props
  return <>{Component}</>;
};

export default PrivateRoute;
