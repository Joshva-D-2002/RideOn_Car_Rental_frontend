import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../assets/styles/login.css'
import { AdmilLoginApi } from "../api/apiService";
import { Toaster, toast } from "react-hot-toast";

type LoginData = {
    email: string,
    password: string,
}

const intitialLoginData: LoginData = {
    email: '',
    password: ''
}

function AdminLogin() {
    const [loginData, setLoginData] = useState<LoginData>(intitialLoginData)

    const navigate = useNavigate();

    async function handleAdminLogin(e: React.FormEvent) {
        e.preventDefault();
        try {
            const data = await AdmilLoginApi(loginData);
            const userId = data.userId;
            const token = data.token
            console.log(data);
            localStorage.setItem('authToken', token);
            localStorage.setItem('userId', userId);
            navigate('/admin/dashboard');

        } catch (error: any) {
            console.error(error);
            const apiMessage = error?.response?.data?.error ?? 'Something went wrong';
            toast.error(apiMessage);
        }

    }

    return (
        <div className="admin-login-container">
            <div className='login-container'>
                <h2>Admin Login</h2>
                <p> Enter your credentials to access your Account</p>
                <form onSubmit={handleAdminLogin}>
                    <label htmlFor="email">Email</label>
                    <input type='email' id="email" name='email' placeholder='Enter your email address' value={loginData.email} onChange={e => setLoginData((prev) => ({ ...prev, email: e.target.value }))} />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name='password' placeholder='Enter your password' value={loginData.password} onChange={e => setLoginData((prev) => ({ ...prev, password: e.target.value }))} />
                    <button className="login-button" type='submit'>Login</button>
                </form>
                <button className="back-button" onClick={() => navigate('/')}>back</button>
            </div>
            <Toaster position="top-right" />
        </div>
    );
}

export default AdminLogin;