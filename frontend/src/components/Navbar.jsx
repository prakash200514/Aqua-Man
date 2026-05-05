import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Fish } from 'lucide-react';
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
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <Link to="/" className="nav-logo">
          <div style={{ position: 'relative', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'var(--primary-neon)', filter: 'blur(10px)', opacity: '0.4', borderRadius: '50%' }}></div>
            <Fish className="text-gradient" size={32} style={{ position: 'relative', zIndex: 1 }} />
          </div>
          <span>Aqua<span className="text-gradient">Riyum</span></span>
        </Link>
        <div className="nav-links">
          <Link to="/" style={{ color: location.pathname === '/' ? 'var(--primary-neon)' : '' }}>Home</Link>
          <Link to="/products" style={{ color: location.pathname === '/products' ? 'var(--primary-neon)' : '' }}>Grand Gallery</Link>
          
          <button className="btn btn-outline" onClick={() => setIsCartOpen(true)} style={{ padding: '8px 20px' }}>
            <ShoppingCart size={18} />
            {totalItems > 0 && <span style={{background: 'var(--accent-coral)', color: '#fff', borderRadius: '50%', padding: '2px 6px', fontSize: '12px', fontWeight: 'bold'}}>{totalItems}</span>}
          </button>
          
          {user ? (
            <>
              {user.role === 'admin' && <Link to="/admin" className="btn btn-primary" style={{ padding: '8px 20px' }}>Dashboard</Link>}
              <button className="btn btn-outline" onClick={logout} style={{ padding: '8px 20px', borderColor: 'rgba(255,255,255,0.2)', color: 'var(--text-main)' }}>
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ padding: '8px 24px' }}>
              <User size={18} /> Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
