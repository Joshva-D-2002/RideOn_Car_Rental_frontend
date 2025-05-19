import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import React, { useState, useEffect } from "react";
import '../assets/styles/availablecars.css'
import { useNavigate } from "react-router-dom";
import { getCarListApi } from "../api/apiService";
import { Toaster, toast } from "react-hot-toast";

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

    function handleBooking(carId: number) {
        navigate(`/booking/${carId}`,);
    }

    const fetchCarList = async () => {
        try {
            const data = await getCarListApi();
            setCars(data);
            setLoading(false);

        } catch (error: any) {
            console.error(error);
            const apiMessage = error?.response?.data?.error ?? 'Something went wrong';
            toast.error(apiMessage);
        }
    };

    useEffect(() => {
        fetchCarList();

    }, []);
    return (
        <>
            <Navbar />
            <div className="available-container">
                <ul className="list">
                    {Loading ? <h2 className="Loading">
                        Loading ...................
                    </h2> :
                        cars
                            .filter(car => car.status === "available")
                            .map(car => (
                                <li className="card" key={car.id}>
                                    <h3>{car.brand} {car.model} {car.year}</h3>
                                    <img src={car.image} alt={`${car.brand} ${car.model} Car`} />
                                    <div className="status">{car.status}</div>
                                    <div>Color : {car.color}</div>
                                    <div>Price Per Day : {car.price_per_day}</div>
                                    <div>Color : {car.color}</div>
                                    <div>Type : {car.type}</div>
                                    <div>Registeration Number : {car.registration_number}</div>
                                    <button onClick={() => handleBooking(car.id)}>
                                        Book
                                    </button>
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

export default AvailableCars;
