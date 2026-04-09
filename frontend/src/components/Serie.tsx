
import { useEffect } from "react";
import { searchMovie } from "../services/tmdb";
import { useState } from "react";
import './Serie.css';

type SerieProps = {
    titulo: string;
};  

export const Serie: React.FC<SerieProps> = ({ titulo }) => {
    const POSTER_BASE = "https://image.tmdb.org/t/p/w500";
    const [series, setSeries] = useState<any[]>([]);

    useEffect(() => {
        searchMovie(titulo)
            .then(data => setSeries(data.results))
            .catch(err => console.error(err));
        
        searchMovie(titulo).then(data => {
            console.log(data);
        });

    }, [titulo]);

    return (
    <div className="series">
        {series
        .filter(serie => serie.poster_path)
        .map(serie => (
            <div key={serie.id} className="serie-item">
            <img
                src={`${POSTER_BASE}${serie.poster_path}`}
                alt={serie.title}
            />
            {/* <h3>{movie.title}</h3> */}
            </div>
        ))}
    </div>
    );

};

export default Serie;