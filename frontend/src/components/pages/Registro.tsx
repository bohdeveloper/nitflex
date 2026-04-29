import { useState } from "react"; "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * Tipo que define los errores del formulario.
 *
 * - Cada propiedad representa un campo inválido.
 * - Se utiliza para aplicar estilos de error en los inputs.
 */
type FormErrores = {
  nombre?: boolean;
  apellido1?: boolean;
  apellido2?: boolean;
  email?: boolean;
  password?: boolean;
  fechaNacimiento?: boolean;
};

/**
 * Componente Registro
 *
 * - Permite crear una cuenta de usuario.
 * - Incluye validación básica en frontend.
 * - Envía los datos al backend.
 * - Guarda el token recibido en el AuthContext.
 * - Redirige a la selección de perfiles tras el registro.
 */
export default function Registro() {
  // Estados de los campos del formulario
  const [nombre, setNombre] = useState("");
  const [apellido1, setApellido1] = useState("");
  const [apellido2, setApellido2] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  // Estados para errores
  const [error, setError] = useState("");
  const [errores, setErrores] = useState<FormErrores>({});
  const [formError, setFormError] = useState<string | null>(null);

  // Función de login del contexto de autenticación
  const { login } = useAuth();

  // Hook de navegación
  const navigate = useNavigate();

  /**
   * Valida el formulario antes de enviarlo.
   *
   * - Comprueba que los campos obligatorios no estén vacíos.
   * - Marca los campos con error para mostrar feedback visual.
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrores = {};

    if (!nombre.trim()) newErrors.nombre = true;
    if (!apellido1.trim()) newErrors.apellido1 = true;
    if (!apellido2.trim()) newErrors.apellido2 = true;
    if (!email.trim()) newErrors.email = true;
    if (!password.trim()) newErrors.password = true;
    if (!fechaNacimiento) newErrors.fechaNacimiento = true;

    setErrores(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setFormError("Los campos requeridos son obligatorios");
      return false;
    }

    setFormError(null);
    return true;
  };

  /**
   * Maneja el envío del formulario.
   *
   * - Llama al endpoint POST /auth/registro.
   * - Maneja errores de validación y de servidor.
   * - Guarda el token recibido y redirige a /perfiles.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await fetch("http://localhost:5000/auth/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre,
          apellido1,
          apellido2,
          email,
          password,
          fechaNacimiento
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error al registrarse");
        return;
      }

      // Guardar el token del usuario en el contexto global
      login(data.token);
      console.log("Usuario registrado:", data.usuario);

      // Redirigir a la gestión de perfiles
      navigate("/perfiles");
    } catch {
      // Error de red o servidor no disponible
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto space-y-4">
      {/* Título del formulario */}
      <h1 className="text-xl font-bold text-white">Termina de configurar tu cuenta</h1>

      {/* Nombre */}
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-white mb-1">
          Nombre <span className="text-red-500">*</span>
        </label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          className={`w-full p-2 rounded text-black border-2 outline-none
            ${errores.nombre
              ? "border-red-500 focus:ring-2 focus:ring-red-500"
              : "border-gray-300 focus:ring-2 focus:ring-gray-400"
            }`}
        />
      </div>

      {/* Primer apellido */}
      <div>
        <label htmlFor="apellido1" className="block text-sm font-medium text-white mb-1">
          Primer apellido <span className="text-red-500">*</span>
        </label>
        <input
          id="apellido1"
          type="text"
          value={apellido1}
          onChange={e => setApellido1(e.target.value)}
          className={`w-full p-2 rounded text-black border-2 outline-none
            ${errores.apellido1
              ? "border-red-500 focus:ring-2 focus:ring-red-500"
              : "border-gray-300 focus:ring-2 focus:ring-gray-400"
            }`}
        />
      </div>

      {/* Segundo apellido */}
      <div>
        <label htmlFor="apellido2" className="block text-sm font-medium text-white mb-1">
          Segundo apellido <span className="text-red-500">*</span>
        </label>
        <input
          id="apellido2"
          type="text"
          value={apellido2}
          onChange={e => setApellido2(e.target.value)}
          className={`w-full p-2 rounded text-black border-2 outline-none
            ${errores.apellido2
              ? "border-red-500 focus:ring-2 focus:ring-red-500"
              : "border-gray-300 focus:ring-2 focus:ring-gray-400"
            }`}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={`w-full p-2 rounded text-black border-2 outline-none
            ${errores.email
              ? "border-red-500 focus:ring-2 focus:ring-red-500"
              : "border-gray-300 focus:ring-2 focus:ring-gray-400"
            }`}
        />
      </div>

      {/* Contraseña */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
          Contraseña <span className="text-red-500">*</span>
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={`w-full p-2 rounded text-black border-2 outline-none
            ${errores.password
              ? "border-red-500 focus:ring-2 focus:ring-red-500"
              : "border-gray-300 focus:ring-2 focus:ring-gray-400"
            }`}
        />
      </div>

      {/* Fecha de nacimiento */}
      <div>
        <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-white mb-1">
          Fecha de nacimiento <span className="text-red-500">*</span>
        </label>
        <input
          id="fechaNacimiento"
          type="date"
          value={fechaNacimiento}
          max={new Date().toISOString().split("T")[0]}
          onChange={e => setFechaNacimiento(e.target.value)}
          onKeyDown={e => e.preventDefault()}
          className={`w-full p-2 rounded text-black border-2 outline-none
            ${errores.fechaNacimiento
              ? "border-red-500 focus:ring-2 focus:ring-red-500"
              : "border-gray-300 focus:ring-2 focus:ring-gray-400"
            }`}
        />
      </div>

      {/* Mensajes de error */}
      {error && (
        <p className="text-red-500 text-sm text-center">
          {error}
        </p>
      )}

      {formError && (
        <p className="text-red-500 text-sm text-center">
          {formError}
        </p>
      )}

      {/* Botón de envío */}
      <button className="w-full bg-red-600 hover:bg-red-700 transition text-white p-2 rounded">
        Crear cuenta
      </button>
    </form>
  );
}
