import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Fish } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart, setIsCartOpen } = useContext(CartContext);
  const [scrolled, setScrolled] = useState(false);

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
          <Fish className="text-gradient" size={32} />
          <span>Aqua<span className="text-gradient">Riyum</span></span>
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Fishes</Link>
          
          <button className="btn btn-outline" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart size={20} />
            {totalItems > 0 && <span style={{background: 'var(--primary-color)', color: '#000', borderRadius: '50%', padding: '2px 6px', fontSize: '12px'}}>{totalItems}</span>}
          </button>
          
          {user ? (
            <>
              {user.role === 'admin' && <Link to="/admin" className="btn btn-primary">Dashboard</Link>}
              <button className="btn btn-outline" onClick={logout}><LogOut size={20} /> Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary"><User size={20} /> Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
