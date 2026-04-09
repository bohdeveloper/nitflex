import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import './Registro.css'

export default function Registro() {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();


/* Llamada POST / Manejo de errores / Guardado del token */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/auth/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombreCompleto, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error al registrarse");
        return;
      }
      // Guardamos el token de usuario
      login(data.token);
      console.log("Usuario registrado:", data.usuario);

      // Redirigimos al inicio
      navigate("/");

    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
      <h1 className="text-xl font-bold">Registro</h1>

      <input
        type="nombreCompleto"
        placeholder="Nombre"
        value={nombreCompleto}
        onChange={e => setNombreCompleto(e.target.value)}
        className="w-full p-2 border rounded text-black"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full p-2 border rounded text-black"
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full p-2 border rounded text-black"
      />

      {error && <p className="text-red-500">{error}</p>}

      <button className="w-full bg-red-600 text-white p-2 rounded">
        Crear cuenta
      </button>
    </form>
  );
}