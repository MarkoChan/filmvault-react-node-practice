import { useMovieContext } from "../contexts/MovieContext";
import "../styles/MovieCard.css"
import Dialog from "./Dialog";
import { useState } from "react";

function MovieCard({movie}){
    // init state
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext();
    const favorite = isFavorite(movie.id);
    const [open, setOpen] = useState(false); // for dialog

    // handle favorite
    const onFavoriteClick = (e) => {
        e.preventDefault();
        if (favorite) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    };

    return (
    <div className="movie-card">
        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            <div className="movie-overlay">
                <button className={`fav-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                    ❤
                </button>
                <div>
                    <button className="dialog-button" onClick={() => setOpen(true)}>
                        Show Dialog
                    </button>

                    <Dialog
                        isOpen={open}
                        onClose={() => setOpen(false)}
                        title={movie.title}
                        message={movie.overview}
                    />
                </div>
            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <h3>{movie.release_date?.split('-')[0]}</h3>
        </div>
    </div>
    );
}

export default MovieCard