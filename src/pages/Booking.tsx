import Navbar from "../components/NavBar"
import Footer from "../components/Footer"
import { useLocation, useNavigate } from "react-router-dom"
import '../assets/styles/booking.css'
import { useEffect, useState } from "react"
import axios from "axios"

type User = {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string,
}
const apiUrl = import.meta.env.VITE_BACKEND_API_URL;


function Booking() {

    async function handleBooking(e: React.FormEvent) {
        e.preventDefault();
        try {
            await axios.post(`${apiUrl}/rental/add`, {
                car_id: car.id,
                user_id: Number(userId),
                start_date: startDate,
                end_date: endDate,
                total_price: (new Date(endDate).getDate() - new Date(startDate).getDate()) * car.price_per_day,
                discount_id: 4,
                status: "active",
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                }
            });
            const { id, created_at, updated_at, ...carUpdate } = car;

            await axios.put(`${apiUrl}/car/update/${id}`, {
                ...carUpdate,
                status: "rented"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                }
            });

            navigate('/booked');

        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data?.error || 'Login failed. Please try again.');
            } else {
                setError('Network Error ! Please try again');

            }
        }

    }
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('authToken');
    const [user, setUser] = useState<User>();
    const [error, setError] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const location = useLocation();
    const car = location.state.car;
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${apiUrl}/user/list/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
            .then(response => {
                const nestedUser = response.data[0];
                setUser(nestedUser);
            })
            .catch(error => setError(error.message));

    }, [])
    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    }, [error]);
    return (
        <>
            <Navbar />
            <div className="booking-container">
                <div className="left-container">
                    <div className="car-details" key={car.id}>
                        <h3>{car.brand} {car.model} {car.year}</h3>
                        <img src={car.image} alt="Car Image" />
                        <div>Color : {car.color}</div>
                        <div>Price Per Day : {car.price_per_day}</div>
                        <div>Color : {car.color}</div>
                        <div>Type : {car.type}</div>
                        <div>Registeration Number : {car.registration_number}</div>
                    </div>
                </div>
                <div className="right-container">
                    <form className="booking-details" onSubmit={handleBooking}>
                        <h4>Enter your Details for Booking</h4>
                        <label>Name :</label>
                        <input type="text" name="name" placeholder="Enter your name" defaultValue={user?.first_name} disabled />
                        <label>Email :</label>
                        <input type="email" name="email" placeholder="Enter your email address" defaultValue={user?.email} disabled />
                        <label>Phone Number :</label>
                        <input type="text" name="phone_number" placeholder="Enter your phone number" defaultValue={user?.phone_number} disabled />
                        <label>Start date :</label>
                        <input type="date" name="start_date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        <label>End Date :</label>
                        <input type="date" name="end_date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        {error && <p className='error'>{error}</p>}
                        <button type="submit">Book</button>
                    </form>
                </div>
            </div >
            <Footer />
        </>
    )
}

export default Booking
