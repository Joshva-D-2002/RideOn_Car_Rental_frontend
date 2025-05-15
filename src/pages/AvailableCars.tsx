import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import '../assets/styles/availablecars.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Car = {
    id: number,
    brand: string,
    model: string,
    year: number,
    color: string,
    image: string,
    price_per_day: string,
    status: string,
    type: string,
    registration_number: string,
}

function AvailableCars() {
    const [cars, setCars] = useState<Car[]>([]);
    const [Loading, setLoading] = useState(true);

    const navigate = useNavigate();

    function handleBooking(car: Object) {
        navigate('/booking', { state: { car } });
    }

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
        const token = localStorage.getItem('authToken');
        axios.get(`${apiUrl}/car/list`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        }).then(response => {
            setCars(response.data);
            setLoading(false);
        }).catch(error => {
            console.log(error.message);
        });
    }, []);
    return (
        <>
            <Navbar />
            <div className="content-container">
                <ul className="list">
                    {Loading ? <h2 className="Loading">
                        Loading ...................
                    </h2> :
                        cars
                            .filter(car => car.status === "available")
                            .map(car => (
                                <li className="card" key={car.id}>
                                    <h3>{car.brand} {car.model} {car.year}</h3>
                                    <img src={car.image} alt="Car Image" />
                                    <div className="status">{car.status}</div>
                                    <div>Color : {car.color}</div>
                                    <div>Price Per Day : {car.price_per_day}</div>
                                    <div>Color : {car.color}</div>
                                    <div>Type : {car.type}</div>
                                    <div>Registeration Number : {car.registration_number}</div>
                                    <button onClick={() => handleBooking(car)}>
                                        Book
                                    </button>
                                </li>
                            ))
                    }
                </ul>
            </div>
            <Footer />
        </>
    )
}

export default AvailableCars;
