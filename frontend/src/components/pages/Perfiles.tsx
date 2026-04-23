import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import avatarNitflex from "../../assets/images/avatar-nitflex.png";
import "./Perfiles.css";

/**
 * Interfaz que define la estructura de un perfil
 * tal y como se usa en el frontend.
 */
interface Perfil {
  nombrePerfil: string;
  avatar: string;
  esInfantil: boolean;
}

/**
 * Componente Perfiles
 *
 * - Permite listar, crear, editar, eliminar y seleccionar perfiles.
 * - Gestiona avatares mediante subida de imágenes.
 * - Se integra con el backend protegido por JWT.
 * - Permite seleccionar un perfil activo para usar la aplicación.
 */
export default function Perfiles() {
  // Token y función para seleccionar perfil desde el AuthContext
  const { token, seleccionarPerfil, perfilActivo, limpiarPerfil  } = useAuth();

  // Estado con la lista de perfiles del usuario
  const [perfiles, setPerfiles] = useState<Perfil[]>([]);
  const [perfilSeleccionado, setPerfilSeleccionado] = useState<number | null>(null);

  // Estado para mensajes de error
  const [error, setError] = useState("");

  // Control de formulario de creación / edición
  const [mostrandoFormulario, setMostrandoFormulario] = useState(false);
  const [perfilEditando, setPerfilEditando] = useState<number | null>(null);
  const esEdicion = perfilEditando !== null;

  // Estados del formulario
  const [nombrePerfil, setNombrePerfil] = useState("");
  const [esInfantil, setEsInfantil] = useState(false);
  const [loading, setLoading] = useState(false);

  // Estados relacionados con el avatar
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);


  /**
   * Cargar perfiles del usuario al montar el componente
   * o cuando cambia el token.
   */
  useEffect(() => {
    if (!token) return;

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

  /**
   * Activar visualmente el perfil correcto
   * al entrar en /perfiles o recargar la página
   */
  useEffect(() => {
    if (perfilActivo && typeof perfilActivo.index === "number") {
      setPerfilSeleccionado(perfilActivo.index);
    } else {
      setPerfilSeleccionado(null);
    }
  }, [perfilActivo]);

  /**
   * Seleccionar un perfil activo.
   *
   * - Llama al backend para generar un nuevo token asociado al perfil.
   * - Guarda el token y el perfil activo en el AuthContext.
   */
  const seleccionarPerfilActivo = async (index: number) => {
  setPerfilSeleccionado(index);

  // Pequeño delay para que se vea la animación
  setTimeout(async () => {
    try {
      const res = await fetch("http://localhost:5000/perfiles/seleccionar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ index })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error al seleccionar perfil");
        setPerfilSeleccionado(null);
        return;
      }

      seleccionarPerfil(data.token, data.perfilActivo, data.perfilIndex);
    } catch {
      setError("Error de conexión");
      setPerfilSeleccionado(null);
    }
  }, 300);
};


  /**
   * Crear o actualizar un perfil.
   *
   * - Usa FormData para permitir subir avatar.
   * - POST si es creación, PUT si es edición.
   */
  const crearPerfil = async () => {
    if (!nombrePerfil) return;

    setLoading(true);

    const url = esEdicion
      ? `http://localhost:5000/perfiles/${perfilEditando}`
      : "http://localhost:5000/perfiles";

    const method = esEdicion ? "PUT" : "POST";

    const formData = new FormData();
    formData.append("nombrePerfil", nombrePerfil);
    formData.append("esInfantil", String(esInfantil));

    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      setLoading(false);
      return;
    }

    // Reset de estados del formulario
    setNombrePerfil("");
    setAvatarPreview(null);
    setAvatarFile(null);
    setEsInfantil(false);
    setLoading(false);
    setMostrandoFormulario(false);

    if (esEdicion) {
      // Actualiza el perfil editado en la lista
      setPerfiles(prev =>
        prev.map((p, i) => (i === perfilEditando ? data : p))
      );
      setPerfilEditando(null);
    } else {
      // En creación, el backend devuelve la lista completa
      setPerfiles(data);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /**
   * Eliminar un perfil existente.
   *
   * - Pide confirmación al usuario.
   * - El backend se encarga de borrar el avatar asociado.
   */
  const eliminarPerfil = async (index: number) => {
    const confirmar = window.confirm("¿Seguro que quieres eliminar este perfil?");
    if (!confirmar) return;

    try {
      const res = await fetch(`http://localhost:5000/perfiles/${index}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error al eliminar perfil");
        return;
      }

      setPerfiles(data);

      // Si se estaba editando ese perfil, se limpia el formulario
      if (perfilEditando === index) {
        resetFormulario();
        setMostrandoFormulario(false);
      }
    } catch {
      setError("Error de conexión");
    }
  };

  /**
   * Resetea completamente el formulario.
   */
  const resetFormulario = () => {
    setPerfilEditando(null);
    setNombrePerfil("");
    setEsInfantil(false);
    setAvatarFile(null);
    setAvatarPreview(null);
    setLoading(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-5 pt-20 text-white flex flex-col items-center justify-center">
      {/* Título dinámico */}
      <h1 className="text-5xl mb-6">
        {mostrandoFormulario || perfiles.length === 0
          ? esEdicion ? "Edita tu perfil" : "Crea tu perfil"
          : "¿Quien eres? Elige tu perfil"}
      </h1>

      {/* Mensaje de error */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* ===== FORMULARIO DE CREACIÓN / EDICIÓN ===== */}
      {(mostrandoFormulario || perfiles.length === 0) ? (
        <div className="bg-gray-800 p-6 rounded w-80">
          {/* Selector de avatar */}
          <label className="block cursor-pointer mb-4">
            <div className="w-30 h-30 mx-auto rounded-md bg-gray-700 flex items-center justify-center overflow-hidden">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm text-gray-300 p-3">
                  Imagen de perfil
                </span>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) {
                  setAvatarFile(file);
                  setAvatarPreview(URL.createObjectURL(file));
                }
              }}
            />
          </label>

          {/* Nombre del perfil */}
          <input
            type="text"
            placeholder="Nombre del perfil"
            value={nombrePerfil}
            onChange={e => setNombrePerfil(e.target.value)}
            className="w-full mb-3 p-2 rounded text-black"
          />

          {/* Perfil infantil */}
          <label className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={esInfantil}
              onChange={e => setEsInfantil(e.target.checked)}
            />
            Perfil infantil
          </label>

          {/* Botón principal */}
          <button
            onClick={crearPerfil}
            disabled={loading || !nombrePerfil.trim()}
            className="w-full bg-red-600 p-2 rounded mb-2 disabled:opacity-50"
          >
            {loading ? "Creando..." : esEdicion ? "Guardar cambios" : "Crear perfil"}
          </button>

          {/* Botón de eliminar */}
          {esEdicion && (
            <button
              onClick={() => eliminarPerfil(perfilEditando!)}
              className="w-full bg-red-800 p-2 rounded mb-2"
            >
              Eliminar perfil
            </button>
          )}

          {/* Cancelar */}
          {perfiles.length > 0 && (
            <button
              onClick={() => {
                resetFormulario();
                setMostrandoFormulario(false);
              }}
              className="w-full bg-gray-600 p-2 rounded"
            >
              Cancelar
            </button>
          )}
        </div>
      ) : (
        <>
          {/* ===== SELECCIÓN DE PERFILES ===== */} 
          {perfilActivo && (
            <button
              onClick={() => {
                limpiarPerfil();
                setPerfilSeleccionado(null);
              }}
              className="mb-6 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
            >
              Cambiar perfil
            </button>
          )}
          {/* ===== LISTA DE PERFILES ===== */}
          <div className="flex gap-6">
            {perfiles.map((perfil, index) => (
              <div
                key={index}
                className={`text-center transition-opacity duration-300
                  ${perfilSeleccionado !== null && perfilSeleccionado !== index
                    ? "perfil-inactivo-wrapper"
                    : ""}
                `}
              >
                {/* Seleccionar perfil */}
                <div
                  onClick={() => seleccionarPerfilActivo(index)}                  
                  className={`
                    w-24 h-24 bg-gray-700 rounded-full mb-2
                    flex items-center justify-center cursor-pointer
                    transition-all duration-300
                    ${perfilSeleccionado === index
                      ? "perfil-activo"
                      : "hover:scale-95"}
                  `}
                >
                  {perfil.avatar ? (
                    <img
                      src={`http://localhost:5000${perfil.avatar}`}
                      alt={perfil.nombrePerfil}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <img
                      src={avatarNitflex}
                      alt="Avatar nitflex"
                      className="avatar-nitflex rounded-full"
                    />
                  )}
                </div>

                <p>{perfil.nombrePerfil}</p>

                {perfil.esInfantil && (
                  <span className="text-xs text-yellow-400 block">Infantil</span>
                )}

                <button
                  onClick={() => {
                    setPerfilEditando(index);
                    setNombrePerfil(perfil.nombrePerfil);
                    setEsInfantil(perfil.esInfantil);
                    setAvatarPreview(
                      perfil.avatar
                        ? `http://localhost:5000${perfil.avatar}`
                        : null
                    );
                    setMostrandoFormulario(true);
                  }}
                  className="text-xs text-gray-400 mt-1 hover:underline"
                  disabled={perfilSeleccionado !== null}
                >
                  Editar
                </button>
              </div>
            ))}

            {/* Añadir perfil */}
            <div
              onClick={() => {
                resetFormulario();
                setMostrandoFormulario(true);
              }}
              className={`text-center cursor-pointer transition-opacity duration-300
                ${perfilSeleccionado !== null ? "perfil-inactivo-wrapper" : ""}
              `}
            >
              <div className="w-24 h-24 bg-gray-600 rounded-full mb-2 flex items-center justify-center text-3xl">
                +
              </div>
              <p className="text-sm">Añadir perfil</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}