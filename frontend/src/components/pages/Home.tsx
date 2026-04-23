import React from "react";
import { NavLink } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import './Inicio.css';

const Inicio: React.FC = () => {
    const { perfilActivo } = useAuth();
return (
    <>    
      <div className="items-center mt-20 max-w-[120vh] min-h-[50vh] text-center">
        <h1 className="text-start font-bold text-8xl max-w-[60vh]">
           {perfilActivo && <p>Hola, {perfilActivo.nombrePerfil}</p>}
        </h1>

        <h2 className="font-bold text-3xl mt-4 pb-2 text-start">
          Que deseas hacer:
        </h2>

        <p className="text-start"><NavLink className="text-red-800 hover:text-red-600 text-5xl" to="/series"> Ver Series</NavLink></p>
        <p className="text-start"><NavLink className="text-red-800 hover:text-red-600 text-5xl" to="/peliculas"> Ver Películas</NavLink></p>                              
      </div>      
    </>
  );
};

export default Inicio;