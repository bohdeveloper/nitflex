import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireProfile?: boolean;
}

export default function ProtectedRoute({
  children,
  requireProfile = false
}: ProtectedRouteProps) {
  const { token, perfilActivo } = useAuth();

  // No hay sesión → login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Hay sesión pero no perfil → selección de perfiles
  if (requireProfile && !perfilActivo) {
    return <Navigate to="/perfiles" replace />;
  }

  return <>{children}</>;
}