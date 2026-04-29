import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export function useHomeContent() {
  const { token } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    Promise.all([
      fetch("http://localhost:5000/tmdb/trending", {
        headers: { Authorization: `Bearer ${token}` }
      }).then(r => r.json()),

      fetch("http://localhost:5000/tmdb/movies/popular", {
        headers: { Authorization: `Bearer ${token}` }
      }).then(r => r.json()),

      fetch("http://localhost:5000/tmdb/series/popular", {
        headers: { Authorization: `Bearer ${token}` }
      }).then(r => r.json())
    ])      
    .then(([trending, movies, series]) => {
      setData({
        trending: Array.isArray(trending) ? trending : [],
        movies: Array.isArray(movies) ? movies : [],
        series: Array.isArray(series) ? series : []
      });
      setLoading(false);
    });
  }, [token]);

  return { data, loading };
}