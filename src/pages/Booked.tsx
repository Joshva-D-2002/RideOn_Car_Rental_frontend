import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { getUserRentalDetails } from "../api/apiservice";
import { Toaster, toast } from "react-hot-toast";
import '../assets/styles/booked.css';

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
    const [loading, setLoading] = useState(false);
    const userId = localStorage.getItem('userId');
    const fetchRental = async (userId: number) => {
        try {
            const data = await getUserRentalDetails(userId);
            setBookingDetails(data);
            setLoading(false);
        } catch (error: any) {
            console.error(error);
            const apiMessage = error?.response?.data?.error || 'Something went wrong';
            toast.error(apiMessage);
        }
    }
    useEffect(() => {
        fetchRental(Number(userId))
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
                <Toaster position="top-right" />
            </div>
            <Footer />
        </>
    )
}

export default Booked;
