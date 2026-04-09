import React from "react";
import Pelicula from "../Pelicula";
import './Peliculas.css';

const Peliculas: React.FC = () => {
  return (
    <>
      {/* <h1>No te pierdas esta increíble selección</h1>
      <p>Lo mejor de lo mejor.</p> */}
      {/* <div className="peliculas"> */}
        <Pelicula titulo="Avatar" />
        <Pelicula titulo="Titanic" />
        <Pelicula titulo="El Señor de los Anillos" />
        <Pelicula titulo="Inception" />
        <Pelicula titulo="The Dark Knight" />
        <Pelicula titulo="Forrest Gump" />
        <Pelicula titulo="The Matrix" />
        <Pelicula titulo="Gladiator" />
        <Pelicula titulo="Narnia" />
        <Pelicula titulo="Harry Potter" />
        <Pelicula titulo="El Hobbit" />
        <Pelicula titulo="Piratas del Caribe" />
      {/* </div> */}
      {/* <h1>Favoritos.</h1>
      <p>Peliculas, series y mucho más.</p> */}
    </>
  );
};

export default Peliculas;