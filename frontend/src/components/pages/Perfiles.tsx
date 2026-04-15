import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import avatarNitflex from "../../assets/images/avatar-nitflex.png";
import './Perfiles.css';

interface Perfil {
  nombrePerfil: string;
  avatar: string;
  esInfantil: boolean;
}

export default function Perfiles() {
  const { token } = useAuth();
  const [perfiles, setPerfiles] = useState<Perfil[]>([]);
  const [error, setError] = useState("");

  const [mostrandoFormulario, setMostrandoFormulario] = useState(false);
  const [nombrePerfil, setNombrePerfil] = useState("");
  const [esInfantil, setEsInfantil] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPerfiles = async () => {
      try {
        const res = await fetch("http://localhost:5000/perfiles", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Error al cargar perfiles");
          return;
        }

        setPerfiles(data);
      } catch {
        setError("Error de conexión");
      }
    };

    fetchPerfiles();
  }, [token]);

  const crearPerfil = async () => {
    if (!nombrePerfil) return;

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/perfiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          nombrePerfil,
          esInfantil
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error al crear perfil");
        return;
      }

      setPerfiles(data);
      setNombrePerfil("");
      setEsInfantil(false);
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
    setMostrandoFormulario(false);
  };

  return (
<div className="p-5 pt-20 bg-black text-white flex flex-col items-center justify-center">      
  <h1 className="text-2xl mb-6">
    {mostrandoFormulario || perfiles.length === 0
      ? "Crear perfil"
      : "¿Quién está viendo?"}
  </h1>

  {error && <p className="text-red-500 mb-4">{error}</p>}

  {(mostrandoFormulario || perfiles.length === 0) ? (
    /* ===== FORMULARIO ===== */
    <div className="bg-gray-800 p-6 rounded w-80">
      <input
        type="text"
        placeholder="Nombre del perfil"
        value={nombrePerfil}
        onChange={e => setNombrePerfil(e.target.value)}
        className="w-full mb-3 p-2 rounded text-black"
      />

      <label className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={esInfantil}
          onChange={e => setEsInfantil(e.target.checked)}
        />
        Perfil infantil
      </label>

      <button
        onClick={crearPerfil}
        disabled={loading}
        className="w-full bg-red-600 p-2 rounded mb-2"
      >
        {loading ? "Creando..." : "Crear perfil"}
      </button>

      {perfiles.length > 0 && (
        <button
          onClick={() => setMostrandoFormulario(false)}
          className="w-full bg-gray-600 p-2 rounded"
        >
          Cancelar
        </button>
      )}
    </div>
  ) : (
    /* ===== LISTA DE PERFILES ===== */
    <div className="flex gap-6">
      {perfiles.map((perfil, index) => (
        <div key={index} className="text-center cursor-pointer">
          <div className="w-24 h-24 bg-gray-700 rounded-md mb-2 flex items-center justify-center">
            <img src={avatarNitflex} alt="Avatar nitflex" className="avatar-nitflex" />
          </div>
          <p>{perfil.nombrePerfil}</p>
          {perfil.esInfantil && (
            <span className="text-xs text-yellow-400">Infantil</span>
          )}
        </div>
      ))}

      {/* Añadir perfil */}
      <div
        onClick={() => setMostrandoFormulario(true)}
        className="text-center cursor-pointer"
      >
        <div className="w-24 h-24 bg-gray-600 rounded-md mb-2 flex items-center justify-center text-3xl">
          +
        </div>
        <p className="text-sm">Añadir perfil</p>
      </div>
    </div>
  )}
</div>
  );
}