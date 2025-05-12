import { Link } from "react-router-dom";
import logo from '../assets/images/Ride_on_logo.png'
import { useNavigate } from "react-router-dom";
import '../assets/styles/navbar.css';
function Navbar() {
    const navigate = useNavigate();
    function handleLogout() {
        localStorage.removeItem('authToken');
        navigate('/')
    }
    return (
        <>
            <nav className="navbar">
                <div className="navbar-left">
                    <Link to={'/'} className="logo">
                        <img src={logo} alt="Ride_on_logo image" />
                    </Link>
                    <h1>RideOn</h1>
                </div>
                <div className="navbar-center">
                    <Link to={'/cars'} className="nav_link">View Available Cars</Link>
                    <Link to={'/rented/history'} className="nav_link">Rented Cars</Link>
                    <Link to={'/bookings'} className="nav_link">Your Bookings</Link>
                </div>
                <div className="navbar-right">
                    <button onClick={handleLogout}>LogOut</button>
                </div>
            </nav>
        </>
    );
}

export default Navbar;