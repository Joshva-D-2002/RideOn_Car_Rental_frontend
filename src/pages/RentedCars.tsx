import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import '../assets/styles/rentedcars.css'

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
    start_date: string,
    end_date: string
}

function RentedCars() {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
        const token = localStorage.getItem('authToken');
        axios.get(`${apiUrl}/car/rented`, {
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
            <div className="rented-container">
                <ul className="list">
                    {loading ? <h2 className="Loading">Loading ...................</h2> : cars.length === 0 ?
                        <h2 className="NotFound">No rented cars found</h2> :
                        cars
                            .filter(car => new Date(car.end_date) > new Date())
                            .map(car => (
                                <li className="cards" key={car.id}>
                                    <h3>{car.brand} {car.model} {car.year}</h3>
                                    <img src={car.image} alt="Car Image" />
                                    <div className="rented-status">{car.status}</div>
                                    <div>Color : {car.color}</div>
                                    <div>Price Per Day : {car.price_per_day}</div>
                                    <div>Color : {car.color}</div>
                                    <div>Type : {car.type}</div>
                                    <div>Registeration Number : {car.registration_number}</div>
                                    <div>
                                        Booked From : {new Date(car.start_date).toLocaleDateString()}
                                    </div>
                                    <div>
                                        Available From: {new Date(car.end_date).toLocaleDateString()}
                                    </div>
                                </li>
                            ))
                    }
                </ul>
            </div>
            <Footer />
        </>
    )
}

export default RentedCars;
