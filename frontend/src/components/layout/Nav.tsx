import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import './Nav.css';

const Nav: React.FC = () => {
  const { token, perfilActivo } = useAuth();
  
return (
    <nav>
      {token && perfilActivo ? (
        <ul>
          <li className="nav-li">
            <NavLink to="/series">Series</NavLink>
          </li>
          <li className="nav-li">
            <NavLink to="/peliculas">Películas</NavLink>
          </li>
        </ul>
      ) : !token ? (
        <ul className="flex items-center justify-end">
          <li>
            <NavLink
              to="/login"
              className="login w-full bg-red-600 text-white p-3 rounded"
            >
              Iniciar sesión
            </NavLink>
          </li>
        </ul>
      ) : null}
    </nav>
  );
};

export default Nav;