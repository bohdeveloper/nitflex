import { createContext, useContext, useEffect, useState } from "react";

/**
 * Información del perfil activo.
 *
 * - Representa el perfil seleccionado por el usuario (estilo Netflix).
 * - Se utiliza para controlar el acceso, el avatar y el tipo de contenido
 *   (infantil o adulto).
 */
interface PerfilActivo {
  nombrePerfil: string;
  avatar: string;
  esInfantil: boolean;
}

/**
 * Tipo del contexto de autenticación.
 *
 * - token: JWT del usuario o del perfil activo.
 * - perfilActivo: perfil actualmente seleccionado.
 * - login: guarda el token de usuario tras login o registro.
 * - seleccionarPerfil: guarda el token y el perfil activo.
 * - logout: limpia toda la sesión.
 */
interface AuthContextType {
  token: string | null;
  perfilActivo: PerfilActivo | null;
  login: (token: string) => void;
  seleccionarPerfil: (token: string, perfil: PerfilActivo) => void;
  logout: () => void;
}

// Contexto de autenticación (inicialmente indefinido)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider
 *
 * - Proveedor global del contexto de autenticación.
 * - Gestiona la sesión del usuario y del perfil activo.
 * - Persiste los datos en localStorage.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Estado del token JWT
  const [token, setToken] = useState<string | null>(null);

  // Estado del perfil activo
  const [perfilActivo, setPerfilActivo] = useState<PerfilActivo | null>(null);

  /**
   * Cargar sesión almacenada al iniciar la aplicación.
   *
   * - Recupera el token y el perfil activo desde localStorage.
   * - Permite mantener la sesión tras recargar la página.
   */
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedPerfil = localStorage.getItem("perfilActivo");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedPerfil) {
      setPerfilActivo(JSON.parse(storedPerfil));
    }
  }, []);

  /**
   * Guarda el token tras login o registro.
   *
   * - Se usa cuando el usuario se autentica,
   *   pero aún no ha seleccionado perfil.
   */
  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  /**
   * Selecciona un perfil activo.
   *
   * - Guarda el nuevo token asociado al perfil.
   * - Guarda el perfil activo en localStorage.
   * - Actualiza el estado global de la aplicación.
   */
  const seleccionarPerfil = (newToken: string, perfil: PerfilActivo) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("perfilActivo", JSON.stringify(perfil));
    setToken(newToken);
    setPerfilActivo(perfil);
  };

  /**
   * Cierra la sesión completamente.
   *
   * - Elimina token y perfil activo.
   * - Limpia localStorage.
   * - Resetea el estado global.
   */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("perfilActivo");
    setToken(null);
    setPerfilActivo(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        perfilActivo,
        login,
        seleccionarPerfil,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook personalizado para acceder al AuthContext.
 *
 * - Garantiza que se use dentro de AuthProvider.
 * - Simplifica el acceso al estado de autenticación.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}
