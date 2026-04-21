// Clave de la API de TMDB obtenida desde las variables de entorno de Vite
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// URL base de la API de The Movie Database
const BASE_URL = "https://api.themoviedb.org/3";

/**
 * Función genérica para realizar peticiones a la API de TMDB.
 *
 * - Recibe un endpoint concreto de TMDB.
 * - Añade automáticamente la API key.
 * - Lanza un error si la respuesta no es correcta.
 * - Devuelve la respuesta en formato JSON.
 */
async function tmdbFetch(endpoint: string) {
  const response = await fetch(`${BASE_URL}${endpoint}&api_key=${API_KEY}`);

  // Comprobar si la respuesta es válida
  if (!response.ok) {
    throw new Error(`Error TMDB: ${response.status}`);
  }

  // Devolver datos de la API en formato JSON
  return response.json();
}

/**
 * Buscar películas por título.
 *
 * - Codifica el texto de búsqueda para evitar errores en la URL.
 * - Utiliza el idioma español (es-ES).
 * - Devuelve los resultados obtenidos desde TMDB.
 *
 * Esta función es utilizada por los componentes Pelicula y Serie.
 */
export async function searchMovie(title: string) {
  return tmdbFetch(
    `/search/movie?query=${encodeURIComponent(title)}&language=es-ES`
  );
}