import React from "react";
import { NavLink } from 'react-router-dom';
import './Inicio.css';

const Inicio: React.FC = () => {
return (
    <>
      <div className="items-center mt-20 max-w-[120vh] min-h-[50vh] text-center">
        <h1 className="font-bold text-8xl">
          Películas y series en un mismo sitio
        </h1>

        <h2 className="font-bold text-3xl mt-4">
          A partir de 4,99 €. Cancela cuando quieras.
        </h2>
        
        <div className="flex items-center justify-center gap-2 mt-6">
          <p className="text-white text-2xl">
            Si es tu primera visita
          </p>
          <span className="w-10 h-[1px] bg-red-600"></span>
          <NavLink className="text-red-800 hover:text-red-600 text-2xl" to="/registro"> Empezar</NavLink>
        </div>
      </div>
    </>
  );
};

export default Inicio;