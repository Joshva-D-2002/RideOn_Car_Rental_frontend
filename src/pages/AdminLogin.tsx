import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../assets/styles/login.css'

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigator = useNavigate();

    async function handleAdminLogin(e: React.FormEvent) {
        e.preventDefault();
        try {
            const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
            const response = await fetch(`${apiUrl}/admin/login`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.error);
                return;
            }
            localStorage.setItem('authToken', data.token);

            navigator('/admin/dashboard');
        }
        catch (error) {
            setError('Network Error ! Please try again')

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