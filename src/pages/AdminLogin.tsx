import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../assets/styles/login.css'
import axios from "axios";

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigator = useNavigate();

    async function handleAdminLogin(e: React.FormEvent) {
        e.preventDefault();
        try {
            const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
            const response = await axios.post(`${apiUrl}/admin/login`, {
                email: email,
                password: password
            }, {
                headers: {
                    'content-type': 'application/json',
                },
            }
            );
            const data = await response.data;
            localStorage.setItem('authToken', data.token);
            navigator('/admin/dashboard');
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data?.error || 'Login failed. Please try again.');
            }
            else {
                setError('Network Error ! Please try again')
            }

        }

    }

    return (
        <div className="admin-login-container">
            <div className='login-container'>
                <h2>Admin Login</h2>
                <p> Enter your credentials to access your Account</p>
                <form onSubmit={handleAdminLogin}>
                    <label>Email</label>
                    <input type='email' name='email' placeholder='Enter your email address' value={email} onChange={e => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input type="password" name='password' placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} />
                    <button className="login-button" type='submit'>Login</button>
                </form>
                <p className='error'>{error}</p>
                <button className="back-button" onClick={() => navigator('/')}>back</button>
            </div>
        </div>
    );
}

export default AdminLogin;