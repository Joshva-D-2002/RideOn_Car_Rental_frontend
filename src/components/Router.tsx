import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login';
import AdminLogin from '../pages/AdminLogin';
import Dashboard from '../pages/DashBoard';
function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />}></Route>
                <Route path='/dashboard' element={<Dashboard />}></Route>
                <Route path='/admin/login' element={<AdminLogin />}></Route>
                <Route path='/admin/dashboard' element={<h1>Hii</h1>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;