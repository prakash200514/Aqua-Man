import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await register(name, email, password);
        if (success) {
            navigate('/login');
        }
    };

    return (
        <div className="auth-container fade-in">
            <div className="auth-card glass">
                <h2 style={{ marginBottom: '30px' }} className="text-gradient">Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        className="input-field" 
                        placeholder="Full Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required 
                    />
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
                        minLength="6"
                    />
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                        <UserPlus size={18} /> Register
                    </button>
                </form>
                <p style={{ marginTop: '20px', color: 'var(--text-muted)' }}>
                    Already have an account? <Link to="/login" className="text-gradient">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
