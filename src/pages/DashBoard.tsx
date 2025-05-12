import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";
import carImage1 from '../assets/images/car-image.png'
import { useEffect, useState } from "react";
import axios from "axios";
function Dashboard() {
    type User = {
        first_name: string;
    };
    const [user, setUser] = useState<User | null>(null);;
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('authToken');
                const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

                const response = await axios.get(`${apiUrl}/user/list/${userId}`, {
                    headers: {
                        'Authorization': `${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                const userData = await response.data;
                setUser(userData);
                console.log(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [])
    return (
        <>
            <Navbar />

            <div className="main-container">
                <h2>Hello {user ? user.first_name : "Loading"}</h2>
                <div className="content-container">
                    <p>I am here man help</p>
                    <img src={carImage1} alt="Car Image" />
                </div>
                <br />
                <AboutUs />
                <Footer />
            </div>
        </>
    );
}

export default Dashboard;