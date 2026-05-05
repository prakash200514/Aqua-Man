import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            navigate('/');
        }
    };

    return (
        <div className="auth-container fade-in">
            <div className="auth-card glass">
                <h2 style={{ marginBottom: '30px' }} className="text-gradient">Welcome Back</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        className="input-field" 
                        placeholder="Email Address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    <input 
                        type="password" 
                        className="input-field" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                        <LogIn size={18} /> Login
                    </button>
                </form>
                <p style={{ marginTop: '20px', color: 'var(--text-muted)' }}>
                    Don't have an account? <Link to="/register" className="text-gradient">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
