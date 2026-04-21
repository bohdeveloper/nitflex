import { useEffect, useState } from "react";
import { searchMovie } from "../services/tmdb";
import "./Pelicula.css";

/**
 * Props del componente Pelicula.
 *
 * - titulo: texto que se utilizará para buscar películas en TMDB.
 */
type PeliculaProps = {
  titulo: string;
};

/**
 * Componente Pelicula
 *
 * - Realiza una búsqueda de películas en TMDB a partir de un título.
 * - Muestra los pósters de las películas encontradas.
 * - Se actualiza automáticamente cuando cambia el título recibido por props.
 */
export const Pelicula: React.FC<PeliculaProps> = ({ titulo }) => {
  // URL base para construir las imágenes de los pósters desde TMDB
  const POSTER_BASE = "https://image.tmdb.org/t/p/w500";

  // Estado para almacenar la lista de películas obtenidas de la API
  const [movies, setMovies] = useState<any[]>([]);

  /**
   * Efecto que se ejecuta cada vez que cambia el título.
   *
   * - Llama al servicio searchMovie.
   * - Guarda el resultado en el estado.
   * - Muestra la respuesta completa por consola (debug).
   */
  useEffect(() => {
    // Buscar películas por título y guardar los resultados
    searchMovie(titulo)
      .then(data => setMovies(data.results))
      .catch(err => console.error(err));

    // Segunda llamada solo para depuración
    searchMovie(titulo).then(data => {
      console.log(data);
    });
  }, [titulo]);

  return (
    <div className="peliculas">
      {movies
        // Filtrar solo las películas que tienen póster
        .filter(movie => movie.poster_path)
        .map(movie => (
          <div key={movie.id} className="pelicula-item">
            {/* Imagen del póster de la película */}
            <img
              src={`${POSTER_BASE}${movie.poster_path}`}
              alt={movie.title}
            />

            {/* Título desactivado (opcional) */}
            {/* <h3>{movie.title}</h3> */}
          </div>
        ))}
    </div>
  );
};

export default Pelicula;