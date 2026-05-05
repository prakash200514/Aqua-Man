import React from 'react';
import { Home, Compass, Clock, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
    const location = useLocation();

    return (
        <div style={{
            position: 'fixed',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '50px',
            display: 'flex',
            padding: '10px 20px',
            gap: '30px',
            zIndex: 1000,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }}>
            <Link to="/" style={{ color: location.pathname === '/' ? 'white' : 'rgba(255,255,255,0.4)', transition: 'all 0.3s' }}>
                <div style={{
                    background: location.pathname === '/' ? 'rgba(255,255,255,0.2)' : 'transparent',
                    padding: '12px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Home size={24} />
                </div>
            </Link>
            
            <Link to="/products" style={{ color: location.pathname.includes('/product') ? 'white' : 'rgba(255,255,255,0.4)', transition: 'all 0.3s' }}>
                <div style={{
                    background: location.pathname.includes('/product') ? 'rgba(255,255,255,0.2)' : 'transparent',
                    padding: '12px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Compass size={24} />
                </div>
            </Link>
            
            <Link to="#" style={{ color: 'rgba(255,255,255,0.4)', transition: 'all 0.3s' }}>
                <div style={{ padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Clock size={24} />
                </div>
            </Link>
            
            <Link to="/login" style={{ color: 'rgba(255,255,255,0.4)', transition: 'all 0.3s' }}>
                <div style={{ padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={24} />
                </div>
            </Link>
        </div>
    );
};

export default BottomNav;
