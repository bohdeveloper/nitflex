import React from "react";
import Serie from "../Serie";
import './Series.css';

const Series: React.FC = () => {
  return (
    <>
      {/* <h1>No te pierdas esta increíble selección</h1>
      <p>Lo mejor de lo mejor.</p> */}
      {/* <div className="peliculas"> */}
        <Serie titulo="Vikings" />
        <Serie titulo="The Witcher" />
        <Serie titulo="Stranger Things" />
        <Serie titulo="The Crown" />
      {/* </div> */}
      {/* <h1>Favoritos.</h1>
      <p>Peliculas, series y mucho más.</p> */}
    </>
  );
};

export default Series;