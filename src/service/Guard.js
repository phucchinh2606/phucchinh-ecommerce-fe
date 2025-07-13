import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import ApiService from "./ApiService";

export const ProtectedRoute = ({ element: Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(ApiService.isAuthenticated());
      setIsLoading(false);
    };

    checkAuth();

    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    Component
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export const AdminRoute = ({ element: Component }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      setIsAdmin(ApiService.isAdmin());
      setIsLoading(false);
    };

    checkAuth();

    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAdmin ? (
    Component
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
