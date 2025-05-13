import '../assets/styles/login.css'
import carImage from '../assets/images/car-image.png'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/userSlice';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        try {
            const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
            const response = await axios.post(
                `${apiUrl}/login`,
                {
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = response.data;
            const userId = data.userId;
            const token = data.token
            localStorage.setItem('authToken', token);
            const userResponse = await axios.get(
                `${apiUrl}/user/list/${userId}`,
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );
            const [user] = userResponse.data;

            dispatch(loginSuccess({ user, token, isAuthenticated: true }));
            navigate('/dashboard')
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data?.error || 'Login failed. Please try again.');
            } else {
                setError('Network Error ! Please try again');

            }
        }

    }
    return (

        <div className='container'>
            <div className='login-container'>
                <h2>Welcome back</h2>
                <p> Enter your credentials to access your Account</p>
                <form onSubmit={handleLogin}>
                    <label>Email</label>
                    <input type='email' name='email' placeholder='Enter your email address' value={email} onChange={e => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input type="password" name='password' placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} />
                    <a href="#">Forget Password ?</a>
                    <button className='login-button' type='submit'>Login</button>
                </form>
                <p className='error'>{error}</p>
                <span>or</span>
                <p>Dont't have a Account ? <a href='#'>Sign Up</a></p>
            </div>
            <div className='car-picture-container'>
                <h3> RideOn! Car Rental</h3>
                <img src={carImage} alt="car image" />
                <button onClick={() => { navigate('/admin/login') }}>Login as an admin</button>

            </div>
        </div >

    );
}

export default Login;