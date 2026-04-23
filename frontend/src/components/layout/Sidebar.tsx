import React from 'react';
import { NavLink } from 'react-router-dom';
import { useMe } from "../../hooks/useMe";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt, FaUser, FaQuestionCircle } from "react-icons/fa";
import './Sidebar.css';

/**
 * Props del componente Sidebar.
 *
 * - onLogout: función que ejecuta el cierre de sesión
 *   (normalmente limpiando el contexto de autenticación).
 */
interface SidebarProps {
  onLogout: () => void;
}

/**
 * Componente Sidebar
 *
 * - Muestra un menú lateral con opciones del usuario autenticado.
 * - Obtiene los datos del usuario mediante el hook useMe.
 * - Permite navegar entre secciones y cerrar sesión.
 */
const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  // Hook personalizado para obtener los datos del usuario autenticado
  const usuario = useMe();

  // Hook de React Router para navegación programática
  const navigate = useNavigate();

  return (
    <>
      <aside>
        {/* Cabecera del sidebar con el nombre del usuario */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <p className="text-white text-2xl">·</p>
          <span className="w-10 h-[1px] bg-red-600"></span>

          {/* Mostrar el nombre del usuario si existe */}
          <h2 className="pb-1 text-red-800 text-4xl">
            {usuario && <p>{usuario.nombre}</p>}
          </h2>
        </div>

        {/* Opciones de navegación */}
        <ul className="pl-5">
          {/* Acceso a la gestión de perfiles */}
          <li className="flex items-center gap-3 text-gray-300 hover:text-white transition p-2 rounded">
            <FaPencilAlt size={18} />
            <NavLink to="/perfiles">Perfiles</NavLink>
          </li>

          {/* Enlace a la sección de cuenta (puede ser un placeholder) */}
          <li className="flex items-center gap-3 text-gray-300 hover:text-white transition p-2 rounded">
            <FaUser size={18} />
            <NavLink to="/cuenta">Cuenta</NavLink>
          </li>

          {/* Enlace a la sección de ayuda */}
          <li className="flex items-center gap-3 text-gray-300 hover:text-white transition p-2 rounded">
            <FaQuestionCircle size={18} />
            Centro de ayuda
          </li>

          <span className=" h-[1px] bg-white my-4 block"></span>

          {/* Cierre de sesión */}
          <li
            className="text-gray-300 cursor-pointer hover:text-white transition p-2 rounded"
            onClick={() => {
              onLogout();      // Ejecuta logout desde el contexto
              navigate("/");   // Redirige al inicio
            }}
          >
            Cerrar sesión
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;