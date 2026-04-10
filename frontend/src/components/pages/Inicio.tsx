import React from "react";
import { NavLink } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { useMe } from "../../hooks/useMe";
import './Inicio.css';

const Inicio: React.FC = () => {
    const { token } = useAuth();
    const usuario = useMe();
return (
    <>
    {token ? (      
      <div className="items-center mt-20 max-w-[120vh] min-h-[50vh] text-center">
        <h1 className="text-start font-bold text-8xl max-w-[60vh]">
           {usuario && <p>Hola, {usuario.nombreCompleto}</p>}
        </h1>

        <h2 className="font-bold text-3xl mt-4 pb-2 text-start">
          Que deseas hacer:
        </h2>

        <p className="text-start"><NavLink className="text-red-800 hover:text-red-600 text-5xl" to="/series"> Ver Series</NavLink></p>
        <p className="text-start"><NavLink className="text-red-800 hover:text-red-600 text-5xl" to="/peliculas"> Ver Películas</NavLink></p>                              
      </div>      
    ) : (
      <div className="items-center mt-20 max-w-[120vh] min-h-[50vh] text-center">
        <h1 className="font-bold text-8xl">
          Películas y series en un mismo sitio
        </h1>

        <h2 className="font-bold text-3xl mt-4">
          A partir de 4,99 €. Cancela cuando quieras.
        </h2>
        
        <div className="flex items-center justify-center gap-2 mt-6">
          <p className="text-white text-2xl">
            si es tu primera visita
          </p>
          <span className="w-10 h-[1px] bg-red-600"></span>
          <NavLink className="text-red-800 hover:text-red-600 text-2xl" to="/registro"> Registrate</NavLink>
        </div>
      </div>
    )}
  </>
  );
};

export default Inicio;