import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import React, { useEffect, useState } from "react";
import { getUserRentalDetails } from "../api/apiService";
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
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');
    const fetchRental = async (userId: number) => {
        try {
            const data = await getUserRentalDetails(userId);
            setBookingDetails(data);
            setLoading(false);
        } catch (error: any) {
            console.error(error);
            const apiMessage = error?.response?.data?.error ?? 'Something went wrong';
            toast.error(apiMessage);
        }
    }
    useEffect(() => {
        fetchRental(Number(userId))
    }, [])

    function handleCancel(id: number) {
        return id;
    }
    let content;

    if (loading) {
        content = <h2 className="Loading">Loading ...................</h2>;
    } else if (bookingDetails.length === 0) {
        content = <h2 className="NotFound">No booking details found</h2>;
    } else {
        content = (
            <ul className="list">
                {bookingDetails.map((booking) => (
                    <li className="card" key={booking.id}>
                        <h3>{`${booking.brand} ${booking.model} ${booking.year}`}</h3>
                        <img
                            src={booking.image}
                            alt={`${booking.brand} ${booking.model} Car`}
                        />
                        <div className="status">{booking.status}</div>
                        <div>Color: {booking.color}</div>
                        <div>Total Price: {booking.total_price}</div>
                        <div>Type: {booking.type}</div>
                        <div>Registration Number: {booking.registration_number}</div>
                        <div>
                            Booked From: {new Date(booking.start_date).toLocaleDateString()}
                        </div>
                        <div>
                            End Date: {new Date(booking.end_date).toLocaleDateString()}
                        </div>
                        <button onClick={() => handleCancel(booking.id)}>Cancel</button>
                    </li>
                ))}
            </ul>
        );
    }


    return (
        <>
            <Navbar />
            <div className="booked-container">
                {content}
                <Toaster position="top-right" />
            </div>
            <Footer />
        </>
    )
}

export default Booked;
