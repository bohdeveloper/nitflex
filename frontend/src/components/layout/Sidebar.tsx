import React from 'react';
import { NavLink } from 'react-router-dom';
import { useMe } from "../../hooks/useMe";
import { useNavigate } from "react-router-dom";
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
          <li className="text-gray-300">
            <NavLink to="/perfiles">Perfiles</NavLink>
          </li>

          {/* Enlace a la sección de ayuda */}
          <li className="text-gray-300">
            <NavLink to="/ayuda">Ayuda</NavLink>
          </li>

          {/* Cierre de sesión */}
          <li
            className="text-gray-300 cursor-pointer"
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