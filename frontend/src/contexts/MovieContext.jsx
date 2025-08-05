import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    // init state
    const [favorites, setFavorites] = useState([]);
    
    useEffect(() => {
        // get and set favorites from browser storage
        const storedFavorites = localStorage.getItem("favorites");

        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites))
        }
    }, []);

    // update favorites
    useEffect(() => {
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites]);
    
    // movie favorite setters
    const addToFavorites = (movie) =>{
        setFavorites(prev => [...prev, movie]);
    }
    
    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId));
    }

    // movie favorite getters
    const isFavorite = (movieId) => {
        return favorites.some(movie=>movie.id === movieId);
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
}