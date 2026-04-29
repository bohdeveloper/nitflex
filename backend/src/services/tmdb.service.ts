import axios from "axios";

const tmdb = axios.create({
  baseURL: process.env.TMDB_BASE_URL,
  params: {
    api_key: process.env.TMDB_API_KEY,
    language: "es-ES"
  }
});

export const getTrending = async () => {
  const { data } = await tmdb.get("/trending/all/week");
  return data.results;
};

export const getPopularMovies = async () => {
  const { data } = await tmdb.get("/movie/popular");
  return data.results;
};

export const getPopularSeries = async () => {
  const { data } = await tmdb.get("/tv/popular");
  return data.results;
};