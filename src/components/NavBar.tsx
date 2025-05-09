import { Link } from "react-router-dom";
import logo from '../assets/images/Ride_on_logo.png'
import { useState } from "react";
function Navbar() {
    const [search, setSearch] = useState('');

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        try {
            const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
            const token = localStorage.getItem('authToken')
            console.log(token);
            const response = await fetch(`${apiUrl}/car/list`, {
                method: 'GET',
                headers: {
                    'Authorization': `${token}`
                },
            });
            const data = response.json();
            if (!response.ok) {

            }
            console.log(data)
        }
        catch (error) {

        }
    }
    return (
        <>
            <nav className="navbar">
                <div className="navbar-left">
                    <Link to={'/'} className="logo">
                        <img src={logo} alt="Ride_on_logo image" />
                    </Link>
                </div>
                <div className="navbar-center">
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            placeholder="Search cars ...."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-input"
                        />
                        <button type="submit" className="search-botton">Search</button>
                    </form>
                </div>
                <div className="navbar-right">

                </div>
            </nav>
        </>
    );
}

export default Navbar;