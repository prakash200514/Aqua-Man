import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Fish, ArrowRight } from 'lucide-react';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agreed, setAgreed] = useState(false);
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!agreed) {
            alert('Please agree to the Terms & Conditions.');
            return;
        }
        const fullName = `${firstName} ${lastName}`.trim();
        const success = await register(fullName, email, password);
        if (success) {
            navigate('/login');
        }
    };

    return (
        <div className="auth-container fade-in" style={{ padding: '40px 20px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <div className="split-auth-card">
                
                {/* Left Side (Image & Brand) */}
                <div className="auth-left">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link to="/" className="auth-left-brand" style={{ textDecoration: 'none' }}>
                            <div style={{ position: 'relative', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'var(--primary-neon)', filter: 'blur(8px)', opacity: '0.4', borderRadius: '50%' }}></div>
                                <Fish className="text-gradient" size={24} style={{ position: 'relative', zIndex: 1 }} />
                            </div>
                            <span style={{ fontSize: '1.2rem' }}>Aqua<span className="text-gradient">Riyum</span></span>
                        </Link>
                        
                        <Link to="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}>
                            Back to website <ArrowRight size={14} />
                        </Link>
                    </div>
                    
                    <div className="auth-left-text">
                        <h2>Deep Ocean Elegance,<br/>Vibrant Colors</h2>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
                            <div style={{ width: '30px', height: '3px', background: 'var(--primary-neon)', borderRadius: '2px' }}></div>
                            <div style={{ width: '15px', height: '3px', background: 'rgba(255,255,255,0.3)', borderRadius: '2px' }}></div>
                            <div style={{ width: '15px', height: '3px', background: 'rgba(255,255,255,0.3)', borderRadius: '2px' }}></div>
                        </div>
                    </div>
                </div>

                {/* Right Side (Form) */}
                <div className="auth-right">
                    <h2 style={{ fontSize: '2rem', marginBottom: '10px', fontFamily: 'Syne, sans-serif' }}>Create an account</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '0.95rem' }}>
                        Already have an account? <Link to="/login" style={{ color: 'var(--primary-neon)', textDecoration: 'none' }}>Log in</Link>
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="auth-form-row">
                            <input 
                                type="text" 
                                className="input-field" 
                                placeholder="First name" 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required 
                            />
                            <input 
                                type="text" 
                                className="input-field" 
                                placeholder="Last name" 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required 
                            />
                        </div>
                        
                        <input 
                            type="email" 
                            className="input-field" 
                            placeholder="Email address" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                        
                        <input 
                            type="password" 
                            className="input-field" 
                            placeholder="Enter your password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                            minLength="6"
                        />
                        
                        <label className="checkbox-container">
                            <input 
                                type="checkbox" 
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                required
                            />
                            <span>I agree to the <a href="#" style={{ color: 'var(--primary-neon)' }}>Terms & Conditions</a></span>
                        </label>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', borderRadius: '8px', padding: '14px', fontSize: '1rem' }}>
                            Create account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
