
import { useEffect } from "react";
import { searchMovie } from "../services/tmdb";
import { useState } from "react";
import './Pelicula.css';

type PeliculaProps = {
    titulo: string;
};  

export const Pelicula: React.FC<PeliculaProps> = ({ titulo }) => {
    const POSTER_BASE = "https://image.tmdb.org/t/p/w500";
    const [movies, setMovies] = useState<any[]>([]);

    useEffect(() => {
        searchMovie(titulo)
            .then(data => setMovies(data.results))
            .catch(err => console.error(err));
        
        searchMovie(titulo).then(data => {
            console.log(data);
        });

    }, [titulo]);

    return (
    <div className="peliculas">
        {movies
        .filter(movie => movie.poster_path)
        .map(movie => (
            <div key={movie.id} className="pelicula-item">
            <img
                src={`${POSTER_BASE}${movie.poster_path}`}
                alt={movie.title}
            />
            {/* <h3>{movie.title}</h3> */}
            </div>
        ))}
    </div>
    );

};

export default Pelicula;