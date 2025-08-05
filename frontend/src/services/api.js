// gets popular movie data from backend
export const getPopMovies = async (page = 1) => {
    const response = await fetch(`http://localhost:5000/api/popular?page=${page}`);
    const data = await response.json();
    return data;
}

// gets searched movie data from backend
export const getSearchedMovies = async (query, page = 1) => {
    const response = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}&page=${page}`);
    const data = await response.json();
    return data;
}
