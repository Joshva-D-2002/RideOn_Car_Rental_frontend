import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login';
import AdminLogin from '../pages/AdminLogin';
import Dashboard from '../pages/DashBoard';
import AvailableCars from '../pages/AvailableCars';
import Booked from '../pages/Booked';
import RentedCars from '../pages/RentedCars';
import Booking from '../pages/Booking';
import Auth from './Auth';

const ProtectedDashboard = Auth(Dashboard);
const ProtectedCars = Auth(AvailableCars);
const ProtectedBooked = Auth(Booked);
const ProtectedRented = Auth(RentedCars);
const ProtectedBooking = Auth(Booking);
const ProtectedAdminDashboard = Auth(() => <h1>Hii</h1>);

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />}></Route>
                <Route path='/admin/login' element={<AdminLogin />}></Route>
                <Route path='/dashboard' element={<ProtectedDashboard />} />
                <Route path='/cars' element={<ProtectedCars />} />
                <Route path='/booked' element={<ProtectedBooked />} />
                <Route path='/rented' element={<ProtectedRented />} />
                <Route path='/booking/:carId' element={<ProtectedBooking />} />
                <Route path='/admin/dashboard' element={<ProtectedAdminDashboard />} />

            </Routes>
        </BrowserRouter>
    );
}

export default Router;