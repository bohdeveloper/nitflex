import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * Componente Login
 *
 * - Permite al usuario iniciar sesión mediante email y contraseña.
 * - Envía las credenciales al backend.
 * - Guarda el token JWT en el AuthContext si el login es correcto.
 * - Redirige al usuario a la selección de perfiles.
 */
export default function Login() {
  // Función login del contexto de autenticación
  const { login } = useAuth();

  // Estados del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Hook de navegación para redirecciones programáticas
  const navigate = useNavigate();

  /**
   * Maneja el envío del formulario de login.
   *
   * - Evita el comportamiento por defecto del formulario.
   * - Envía las credenciales al endpoint /auth/login.
   * - Si el login es correcto, guarda el token y redirige a /perfiles.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      // Si el servidor devuelve error, mostrar mensaje
      if (!res.ok) {
        setError(data.message || "Error al iniciar sesión");
        return;
      }

      // Guardar el token en el contexto global de autenticación
      login(data.token);
      console.log("Acceso correcto:", data.usuario);

      // Redirigir a la página de selección de perfiles
      navigate("/perfiles");
    } catch {
      // Error de red o de conexión con el servidor
      setError("Error de conexión");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto space-y-4 mt-20"
    >
      {/* Título del formulario */}
      <h1 className="text-xl font-bold">Iniciar sesión</h1>

      {/* Campo de email */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full p-2 rounded text-black border-2 outline-none"
      />

      {/* Campo de contraseña */}
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full p-2 rounded text-black border-2 outline-none"
      />

      {/* Mensaje de error si existe */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Botón de envío */}
      <button className="w-full bg-red-600 text-white p-2 rounded">
        Entrar
      </button>
    </form>
  );
}