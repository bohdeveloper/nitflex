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
          <li><NavLink to="/inicio">Inicio</NavLink></li>
          <li><NavLink to="/series">Series</NavLink></li>  
          <li><NavLink to="/peliculas">Peliculas</NavLink></li>
        </ul>
      ) : (
        <ul className='flex flex-col items-end'>
          <li><NavLink to="/login">Iniciar sesíon</NavLink></li>
        </ul>
      )}
    </nav>
  );
};

export default Nav;