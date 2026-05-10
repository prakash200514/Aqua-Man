import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { inr } from '../utils/currency';

const CartOverlay = () => {
    const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const totalAmount = cart.reduce((sum, item) => sum + (parseFloat(item.price) * parseInt(item.quantity)), 0);

    const handleCheckout = () => {
        if (!user) {
            toast.error("Please login to checkout");
            setIsCartOpen(false);
            navigate('/login');
            return;
        }
        setIsCartOpen(false);
        navigate('/checkout');
    };

    return (
        <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`}>
            <div className="cart-header">
                <h3>Your Cart</h3>
                <button className="btn-outline" style={{border:'none', color:'white', padding:0}} onClick={() => setIsCartOpen(false)}>
                    <X size={24} />
                </button>
            </div>

            <div className="cart-items">
                {cart.length === 0 ? (
                    <p style={{textAlign: 'center', color: 'var(--text-muted)'}}>Your cart is empty.</p>
                ) : (
                    cart.map(item => (
                        <div key={item.cart_id} className="cart-item">
                            <img src={item.image ? `http://localhost/Aquarium/backend/uploads/fish_images/${item.image}` : 'https://via.placeholder.com/80'} alt={item.fish_name} />
                            <div className="cart-item-info">
                                <h4 style={{marginBottom:'5px'}}>{item.fish_name}</h4>
                                <p style={{color:'var(--success)', fontWeight:'bold'}}>{inr(item.price)}</p>
                                <div className="qty-controls">
                                    <button className="qty-btn" onClick={() => updateQuantity(item.cart_id, parseInt(item.quantity) - 1)}><Minus size={14}/></button>
                                    <span>{item.quantity}</span>
                                    <button className="qty-btn" onClick={() => updateQuantity(item.cart_id, parseInt(item.quantity) + 1)}><Plus size={14}/></button>
                                    <button style={{marginLeft:'auto', background:'none', border:'none', color:'var(--danger)', cursor:'pointer'}} onClick={() => removeFromCart(item.cart_id)}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {cart.length > 0 && (
                <div className="cart-footer">
                    <div style={{display:'flex', justifyContent:'space-between', marginBottom:'20px'}}>
                        <span style={{fontSize:'1.2rem', fontWeight:'500'}}>Total:</span>
                        <span style={{fontSize:'1.2rem', fontWeight:'bold', color:'var(--success)'}}>{inr(totalAmount)}</span>
                    </div>
                    <button className="btn btn-primary" style={{width:'100%'}} onClick={handleCheckout}>Checkout Now</button>
                </div>
            )}
        </div>
    );
};

export default CartOverlay;
