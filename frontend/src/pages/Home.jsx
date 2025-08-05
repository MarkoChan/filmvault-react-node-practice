import { useState, useEffect } from "react";
import MovieCard from '../components/MovieCard'
import ReactPaginate from 'react-paginate';
import "../styles/Home.css"
import { getPopMovies, getSearchedMovies } from "../services/api";


function Home(){
    // init states
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isSearching, setIsSearching] = useState(false);

    // func to load popular movies at page 1
    const loadPopMovies = async () => {
            try {
                const popularMovies = await getPopMovies();
                setMovies(popularMovies.results);
                setTotalPages(popularMovies.total_pages);
                setIsSearching(false);
                setCurrentPage(1);
                setSearchQuery("");
                setError(null);
            } catch (error) {
                console.log(error);
                setError("Failed to load movies...");
            } finally {
                setLoading(false);
            }
        }
    
    // func to load searched movies at page 1
    const handleSearch = async (e) => {
        // stop page from reloading
        e.preventDefault();

        // check if user searched nothing
        if (!searchQuery.trim()) {
            loadPopMovies();
            return;
        };

        // wait until previous search is done loading
        if (loading) return;
        setLoading(true);

        try {
            // get and set searched movies
            const searchResults = await getSearchedMovies(searchQuery);
            setMovies(searchResults.results);
            setTotalPages(searchResults.total_pages);
            setCurrentPage(1);
            setIsSearching(true);
            setError(null);
        } catch (error) {
            console.log(error);
            setError("Failed to search movies...");
        } finally {
            setLoading(false);
        }
    };

    // handle when page is changed
    const handlePageClick = async (e) => {
        // wait until content is loaded
        if (loading) return;
        setLoading(true);

        // get new page
        const selectedPage = e.selected + 1;
        setCurrentPage(selectedPage);

        // check if we are searching still
        if (isSearching) {
            // get and set new page of searched movies
            try {
                const searchResults = await getSearchedMovies(searchQuery, selectedPage);
                setMovies(searchResults.results);
            } catch (error) {
                console.log(error);
                setError("Failed to search movies...");
            }
        } else {
            // get and set new page of popular movies
            try {
                const popResults = await getPopMovies(selectedPage);
                setMovies(popResults.results);
            } catch (error) {
                console.log(error);
                setError("Failed to search movies...");
            }
        }
        setLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // load popular movies if search is cleared
    useEffect(() => {
      loadPopMovies();
    }, []);


    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text"
                    placeholder="Search..."
                    className="search-input"
                    value = {searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-btn">
                    Search
                </button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="movies-grid">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.id}/>
                    ))}
                </div>
            )}
           
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                forcePage={currentPage - 1}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </div>
    )
}

export default Home