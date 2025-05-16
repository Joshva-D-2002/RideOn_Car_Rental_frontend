import Navbar from "../components/NavBar"
import Footer from "../components/Footer"
import { useNavigate, useParams } from "react-router-dom"
import '../assets/styles/booking.css'
import { useEffect, useState } from "react"
import { getCarApi, getuserApi, addBookingApi, carStatusUpdateApi } from "../api/apiservice"
import toast from "react-hot-toast"

type User = {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string,
}

const initialUserstate: User = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
}

type Car = {
    id: number,
    brand: string,
    model: string,
    year: number,
    color: string,
    image: string,
    price_per_day: number,
    status: string,
    type: string,
    registration_number: string
};
const initialCarstate: Car = {
    id: 0,
    brand: '',
    model: '',
    year: 0,
    color: '',
    image: '',
    price_per_day: 0,
    status: '',
    type: '',
    registration_number: ''
};

type Rental = {
    car_id: number,
    user_id: number,
    start_date: string,
    end_date: string,
    total_price: number
    discount_id: number,
    status: string

};

const initialBookingState: Rental = {
    car_id: 0,
    user_id: 0,
    start_date: '',
    end_date: '',
    total_price: 0,
    discount_id: 4,
    status: 'active'
};

function Booking() {
    const [bookingState, setBookingState] = useState<Rental>(initialBookingState);
    const [car, setCar] = useState<Car>(initialCarstate);
    const [user, setUser] = useState<User>(initialUserstate);
    const navigate = useNavigate();
    const { carId } = useParams();
    const fetchCarAndUserDetails = async () => {
        try {
            const carDetails = await getCarApi(Number(carId));
            setCar(carDetails);
            const userId = localStorage.getItem('userId');
            const userDetails = await getuserApi(Number(userId));
            const user = userDetails[0];
            setUser(user);
            setBookingState((prev) => ({
                ...prev,
                car_id: carDetails.id,
                user_id: user.id
            }));
        }
        catch (error: any) {
            console.error(error);
            const apiMessage = error?.response?.data?.error || 'Something went wrong';
            toast.error(apiMessage);
        }
    }
    useEffect(() => {
        fetchCarAndUserDetails();
    }, []);

    async function handleBooking(e: React.FormEvent) {
        e.preventDefault();
        setBookingState(prev => {
            const start = new Date(prev.start_date);
            const end = new Date(prev.end_date);

            const dayDiff = end.getDate() - start.getDate();

            const totalPrice = dayDiff * car.price_per_day;
            return {
                ...prev,
                total_price: totalPrice
            };
        });
        try {
            const bookingresponse = await addBookingApi(bookingState);
            toast.success(bookingresponse)
            await carStatusUpdateApi(car.id);
            navigate('/booked');
        }
        catch (error: any) {
            console.error(error);
            const apiMessage = error?.response?.data?.error || 'Something went wrong';
            toast.error(apiMessage);
        }

    }

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
                        <input type="text" name="name" placeholder="Enter your name" defaultValue={user.first_name} disabled />
                        <label>Email :</label>
                        <input type="email" name="email" placeholder="Enter your email address" defaultValue={user.email} disabled />
                        <label>Phone Number :</label>
                        <input type="text" name="phone_number" placeholder="Enter your phone number" defaultValue={user.phone_number} disabled />
                        <label>Start date :</label>
                        <input type="date" name="start_date" value={bookingState.start_date} onChange={(e) => setBookingState((prev) => ({ ...prev, start_date: e.target.value }))} />
                        <label>End Date :</label>
                        <input type="date" name="end_date" value={bookingState.end_date} onChange={(e) => setBookingState((prev) => ({ ...prev, end_date: e.target.value }))} />
                        <button type="submit">Book</button>
                    </form>
                </div>
            </div >
            <Footer />
        </>
    )
}

export default Booking
