import { Link } from "react-router-dom";
import "../styles/NavBar.css" 

function NavBar(){
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">FilmVault</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/favorites" className="nav-link">Favorites</Link>
            </div>
        </nav>
    )
}

export default NavBar