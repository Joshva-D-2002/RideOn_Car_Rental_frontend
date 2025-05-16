import React from 'react';
import '../assets/styles/login.css'
import carImage from '../assets/images/car-image.png'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/userSlice';
import { getuserApi, loginApi } from '../api/apiservice';
import { Toaster, toast } from 'react-hot-toast';

type LoginData = {
    email: string,
    password: string,
}

const intitialLoginData: LoginData = {
    email: '',
    password: ''
}

function Login() {
    const [loginData, setLoginData] = useState<LoginData>(intitialLoginData)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        try {
            const data = await loginApi(loginData);
            const userId = data.userId;
            const token = data.token
            localStorage.setItem('authToken', token);
            localStorage.setItem('userId', userId);
            const response = await getuserApi(userId);
            const user = response[0];
            dispatch(loginSuccess({ user, token, isAuthenticated: true }));
            navigate('/dashboard')

        } catch (error: any) {
            console.error(error);
            const apiMessage = error?.response?.data?.error || 'Something went wrong';
            toast.error(apiMessage);

        }

    }
    return (

        <div className='container'>
            <div className='login-container'>
                <h2>Welcome back</h2>
                <p> Enter your credentials to access your Account</p>
                <form onSubmit={handleLogin}>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' placeholder='Enter your email address' value={loginData.email} onChange={e => setLoginData((prev) => ({ ...prev, email: e.target.value }))} />
                    <label htmlFor='password'>Password</label>
                    <input type="password" id='password' name='password' placeholder='Enter your password' value={loginData.password} onChange={e => setLoginData((prev) => ({ ...prev, password: e.target.value }))} />
                    <a href="#">Forget Password ?</a>
                    <button className='login-button' type='submit'>Login</button>
                </form>
                <span>or</span>
                <p>Dont't have a Account ? <a href='#'>Sign Up</a></p>
            </div>
            <div className='car-picture-container'>
                <h3> RideOn! Car Rental</h3>
                <img src={carImage} alt="car image" />
                <button onClick={() => { navigate('/admin/login') }}>Login as an admin</button>
            </div>
            <Toaster position="top-right" />
        </div >


    );
}

export default Login;