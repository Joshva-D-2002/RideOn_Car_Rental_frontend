import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import '../assets/styles/availablecars.css'

type Booking = {
    id: number,
    model: string,
    brand: string,
    year: number,
    image: string,
    status: string,
    color: string,
    type: string,
    registration_number: string,
    start_date: string,
    end_date: string,
    total_price: number
}

function Booked() {
    const [bookingDetails, setBookingDetails] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    useEffect(() => {
        axios.get(`${apiUrl}/rental/user/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        }).then(response => {
            setBookingDetails(response.data);
            setLoading(false);
        }).catch(error => {
            console.log(error.message);
        });
    }, [])

    function handleCancel(id: number) {
        
    }
    return (
        <>
            <Navbar />
            <div className="booked-container">
                <ul className="list">
                    {loading ? <h2 className="Loading">Loading ...................</h2> : bookingDetails.length === 0 ?
                        <h2 className="NotFound">No booking Details found</h2> :
                        bookingDetails.map(booking => (
                            <li className="card" key={booking.id}>
                                <h3>{booking.brand} {booking.model} {booking.year}</h3>
                                <img src={booking.image} alt="car Image" />
                                <div className="status">{booking.status}</div>
                                <div>Color : {booking.color}</div>
                                <div>Total Price : {booking.total_price}</div>
                                <div>Color : {booking.color}</div>
                                <div>Type : {booking.type}</div>
                                <div>Registeration Number : {booking.registration_number}</div>
                                <div>
                                    Booked From : {new Date(booking.start_date).toLocaleDateString()}
                                </div>
                                <div>
                                    End Date: {new Date(booking.end_date).toLocaleDateString()}
                                </div>
                                <button onClick={() => handleCancel(booking.id)}>Cancel</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <Footer />
        </>
    )
}

export default Booked;
