import { createContext, useContext, useEffect, useState } from "react";

/**
 * Información del perfil activo.
 */
interface PerfilActivo {
  nombrePerfil: string;
  avatar: string;
  esInfantil: boolean;
  index: number;
}

interface AuthContextType {
  token: string | null;
  perfilActivo: PerfilActivo | null;
  isReady: boolean;
  login: (token: string) => void;
  seleccionarPerfil: (token: string, perfil: Omit<PerfilActivo, "index">, index: number) => void;
  limpiarPerfil: () => void;
  logout: () => void;
  actualizarPerfilActivo: (perfilActualizado: Omit<PerfilActivo, "index">) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [perfilActivo, setPerfilActivo] = useState<PerfilActivo | null>(null);
  const [isReady, setIsReady] = useState(false);

  /**
   * Cargar sesión desde localStorage
   */
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedPerfil = localStorage.getItem("perfilActivo");

    if (storedToken) setToken(storedToken);

    if (storedPerfil) {
      try {
        setPerfilActivo(JSON.parse(storedPerfil));
      } catch {
        localStorage.removeItem("perfilActivo");
      }
    }

    setIsReady(true);
  }, []);

  /**
   * Login SIN perfil (solo usuario)
   */
  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    localStorage.removeItem("perfilActivo"); // ✅ importante
    setToken(newToken);
    setPerfilActivo(null);
  };

  /**
   * Seleccionar perfil activo
   */
  const seleccionarPerfil = (
    newToken: string,
    perfil: Omit<PerfilActivo, "index">,
    index: number
  ) => {
    const perfilConIndex: PerfilActivo = { ...perfil, index };

    localStorage.setItem("token", newToken);
    localStorage.setItem("perfilActivo", JSON.stringify(perfilConIndex));

    setToken(newToken);
    setPerfilActivo(perfilConIndex);
  };

  /**
   * Actualizar solo la información del perfil activo (ej: nombre o avatar)
   * sin cambiar el token ni el índice.
   */ 
  const actualizarPerfilActivo = (
    perfilActualizado: Omit<PerfilActivo, "index">
  ) => {
    setPerfilActivo(prev => {
      if (!prev) return prev;

      const actualizado: PerfilActivo = {
        ...perfilActualizado,
        index: prev.index
      };

      localStorage.setItem("perfilActivo", JSON.stringify(actualizado));
      return actualizado;
    });
  };

  /**
   * Limpiar solo el perfil (cambio de perfil)
   */
  const limpiarPerfil = () => {
    localStorage.removeItem("perfilActivo");
    setPerfilActivo(null);
  };

  /**
   * Logout completo
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
        isReady,
        login,
        seleccionarPerfil,
        limpiarPerfil,
        logout,
        actualizarPerfilActivo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}