import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import './Nav.css';

const Nav: React.FC = () => {
  const { token } = useAuth();
  return (
    <nav>
      {token ? (
        <ul>
          <li className='nav-li'><NavLink to="/inicio">Inicio</NavLink></li>
          <li className='nav-li'><NavLink to="/series">Series</NavLink></li>  
          <li className='nav-li'><NavLink to="/peliculas">Peliculas</NavLink></li>
        </ul>
      ) : (
        <ul className='flex items-center justify-end'>
          <li>
            <NavLink to="/login" className="login w-full bg-red-600 text-white p-3 rounded">Iniciar sesión</NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Nav;