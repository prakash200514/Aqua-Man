import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
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
    <nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      style={{
        background: scrolled
          ? 'rgba(255, 255, 255, 0.93)'
          : 'rgba(237, 248, 255, 0.6)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(0, 153, 204, 0.15)' : '1px solid transparent',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 4px 20px rgba(0,153,204,0.1)' : 'none',
      }}
    >
      <div className="container nav-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>

        {/* Logo */}
        <Link to="/" className="nav-logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="logo-icon">
            <span style={{ color: '#fff', fontWeight: '800', fontSize: '1.2rem', fontFamily: 'Syne, sans-serif' }}>🐠</span>
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'Syne, sans-serif', color: '#1A3C52' }}>
            Aqua<span style={{ color: '#0099CC' }}>Riyum</span>
          </span>
        </Link>

        {/* Center Links */}
        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>Shop Collection</Link>
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>

          {/* Cart Button */}
          <button
            className="btn btn-outline"
            onClick={() => setIsCartOpen(true)}
            style={{
              padding: '8px 18px', borderRadius: '30px',
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'rgba(0, 153, 204, 0.08)',
              borderColor: 'rgba(0, 153, 204, 0.35)',
              color: '#0099CC'
            }}
          >
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <span style={{
                background: '#FF6B6B', color: '#fff',
                borderRadius: '50%', padding: '2px 7px',
                fontSize: '11px', fontWeight: 'bold', lineHeight: '1.4'
              }}>{totalItems}</span>
            )}
          </button>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {user.role === 'admin' && (
                <Link to="/admin" className="btn btn-outline" style={{ padding: '8px 16px' }}>Dashboard</Link>
              )}
              <div
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  cursor: 'pointer', padding: '6px 14px', borderRadius: '30px',
                  background: 'rgba(255, 107, 107, 0.09)', border: '1.5px solid rgba(255,107,107,0.3)',
                  color: '#FF6B6B', fontWeight: '600', fontSize: '0.9rem',
                  transition: 'all 0.2s'
                }}
                onClick={logout}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,107,107,0.18)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,107,107,0.09)'; }}
              >
                <User size={16} /> {user.name || 'Account'}
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
