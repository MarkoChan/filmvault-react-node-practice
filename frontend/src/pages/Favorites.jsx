import "../styles/Favorites.css"
import { useMovieContext } from "../contexts/MovieContext"
import MovieCard from "../components/MovieCard";

function Favorites(){
    const {favorites} = useMovieContext();
    if (favorites.length > 0) {
        return (
            <div>
                <h1>Favorites</h1>
                <div className="movies-grid">
                    {favorites.map((movie) => (
                        <MovieCard movie={movie} key={movie.id}/>
                    ))}
                </div>
            </div>
            
        )
    } else {
        return (
        <div className="favorites-empty">
            <h2>No Favorited movies yet</h2>
            <p>Start adding movies to favorites and they will appear here</p>
        </div>
        )
    }
}

export default Favorites
