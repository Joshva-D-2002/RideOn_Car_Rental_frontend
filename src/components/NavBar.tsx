import React, { useState } from "react";
import logo from '../assets/images/Ride_on_logo.png'
import { useNavigate, Link } from "react-router-dom";
import '../assets/styles/navbar.css';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: { userSlice: { user: any } }) => state.userSlice.user);
    const [showDropdown, setShowDropdown] = useState(false);
    function handleLogout() {
        dispatch(logout())
        localStorage.clear();
        navigate('/', { replace: true })
    }
    const toggleDropdown = () => {
        setShowDropdown(prev => !prev);
    };
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to={'/dashboard'} className="logo">
                    <img src={logo} alt="RideOn logo" />
                </Link>
                <h1>RideOn</h1>
            </div>
            <div className="navbar-center">
                <Link to={'/cars'} className="nav_link">View Available Cars</Link>
                <Link to={'/rented'} className="nav_link">Rented Cars</Link>
                <Link to={'/booked'} className="nav_link">Your Bookings</Link>
            </div>
            <div className="navbar-right">
                <div className="profile-dropdown">
                    <button onClick={toggleDropdown} className="dropdown-toggle">
                        {user?.first_name + " " + user?.last_name} &#9662;
                    </button>
                    {showDropdown && (
                        <div className="dropdown-menu">
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;