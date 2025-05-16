import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import '../assets/styles/rentedcars.css'
import { getCarListApi } from "../api/apiservice";
import { toast, Toaster } from "react-hot-toast";

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

function RentedCars() {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const fetchCarList = async () => {
        try {
            const data = await getCarListApi();
            setCars(data);
            setLoading(false);

        } catch (error: any) {
            console.error(error);
            const apiMessage = error?.response?.data?.error || 'Something went wrong';
            toast.error(apiMessage);
        }
    };
    useEffect(() => {
        fetchCarList();
    }, []);
    return (
        <>
            <Navbar />
            <div className="rented-container">
                <ul className="list">
                    {loading ? <h2 className="Loading">Loading ...................</h2> : cars.length === 0 ?
                        <h2 className="NotFound">No rented cars found</h2> :
                        cars
                            .filter(car => car.status === "rented")
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

export default RentedCars;
