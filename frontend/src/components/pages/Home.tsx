import React from "react";
import { useHomeContent } from "../../hooks/useHomeContent";
import Row from "../Row";

const Inicio: React.FC = () => {
    const { data, loading } = useHomeContent();

    if (loading) {
      return <p className="text-white mt-20">Cargando contenido...</p>;
    }

return (
    <div className="w-full px-10">
      <h2 className="text-white text-2xl mb-2">Tendencias</h2>
      <Row items={data.trending} />

      <h2 className="text-white text-2xl mt-6 mb-2">Películas populares</h2>
      <Row items={data.movies} />

      <h2 className="text-white text-2xl mt-6 mb-2">Series populares</h2>
      <Row items={data.series} />
    </div>
  );

};

export default Inicio;