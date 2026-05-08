import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Search } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart, setIsCartOpen } = useContext(CartContext);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + parseInt(item.quantity), 0);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{
        background: scrolled ? 'rgba(1, 6, 13, 0.9)' : 'rgba(1, 6, 13, 0.5)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 242, 254, 0.1)',
        transition: 'all 0.3s ease'
    }}>
      <div className="container nav-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
        
        {/* Logo */}
        <Link to="/" className="nav-logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="logo-icon">
                <span style={{ color: '#01060D', fontWeight: '800', fontSize: '1.2rem', fontFamily: 'Syne, sans-serif' }}>A</span>
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'Syne, sans-serif', color: 'white' }}>
                Aqua<span style={{ color: '#00F2FE' }}>Riyum</span>
            </span>
        </Link>

        {/* Center Links */}
        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>Shop Collection</Link>
        </div>
        
        {/* Right Actions */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          
          <button className="btn btn-outline" onClick={() => setIsCartOpen(true)} style={{ 
              padding: '8px 16px', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '8px',
              background: 'rgba(0, 242, 254, 0.1)', borderColor: 'rgba(0, 242, 254, 0.3)', color: '#00F2FE'
          }}>
            <ShoppingCart size={18} />
            {totalItems > 0 && <span style={{
                background: '#00F2FE', color: '#01060D', borderRadius: '50%', padding: '2px 6px', 
                fontSize: '12px', fontWeight: 'bold'
            }}>{totalItems}</span>}
          </button>
          
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              {user.role === 'admin' && <Link to="/admin" className="btn btn-outline" style={{ padding: '8px 16px' }}>Dashboard</Link>}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={logout}>
                  <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <User size={18} color="white" />
                  </div>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ padding: '8px 24px' }}>
              Sign In
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
