import { useEffect, useState } from "react";
import { searchMovie } from "../services/tmdb";
import "./Serie.css";

/**
 * Props del componente Serie.
 *
 * - titulo: texto que se utilizará para buscar series en TMDB.
 */
type SerieProps = {
  titulo: string;
};

/**
 * Componente Serie
 *
 * - Realiza una búsqueda de series en TMDB a partir de un título.
 * - Muestra los pósters de las series encontradas.
 * - Se actualiza automáticamente cuando cambia el título recibido por props.
 *
 * Nota:
 * - Actualmente reutiliza la función searchMovie del servicio TMDB.
 * - En una evolución futura podría usarse un endpoint específico de series.
 */
export const Serie: React.FC<SerieProps> = ({ titulo }) => {
  // URL base para construir las imágenes de los pósters desde TMDB
  const POSTER_BASE = "https://image.tmdb.org/t/p/w500";

  // Estado que almacena las series obtenidas de la API
  const [series, setSeries] = useState<any[]>([]);

  /**
   * Efecto que se ejecuta cada vez que cambia el título.
   *
   * - Llama al servicio searchMovie.
   * - Guarda los resultados en el estado local.
   * - Muestra la respuesta completa por consola (debug).
   */
  useEffect(() => {
    // Buscar series por título y almacenar los resultados
    searchMovie(titulo)
      .then(data => setSeries(data.results))
      .catch(err => console.error(err));

    // Segunda llamada únicamente para depuración
    searchMovie(titulo).then(data => {
      console.log(data);
    });
  }, [titulo]);

  return (
    <div className="series">
      {series
        // Filtrar solo las series que tengan póster disponible
        .filter(serie => serie.poster_path)
        .map(serie => (
          <div key={serie.id} className="serie-item">
            {/* Póster de la serie */}
            <img
              src={`${POSTER_BASE}${serie.poster_path}`}
              alt={serie.title}
            />

            {/* Título comentado (opcional para UI futura) */}
            {/* <h3>{serie.title}</h3> */}
          </div>
        ))}
    </div>
  );
};

export default Serie;