import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

/**
 * Hook personalizado useMe
 *
 * - Obtiene los datos del usuario autenticado.
 * - Consume el endpoint protegido /auth/me.
 * - Devuelve la información del usuario asociada al token actual.
 */
export function useMe() {
  // Obtener el token del contexto de autenticación
  const { token } = useAuth();

  // Estado que almacena los datos del usuario
  const [usuario, setUsuario] = useState<any>(null);

  /**
   * Efecto que se ejecuta cuando cambia el token.
   *
   * - Si no hay token, no realiza la petición.
   * - Si hay token, solicita los datos del usuario autenticado.
   */
  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:5000/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setUsuario(data));
  }, [token]);

  // Devuelve la información del usuario
  return usuario;
}