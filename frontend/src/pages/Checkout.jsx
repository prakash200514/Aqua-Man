import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CreditCard, MapPin, CheckCircle } from 'lucide-react';

const Checkout = () => {
    const { cart, fetchCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });
    const [isProcessing, setIsProcessing] = useState(false);

    const totalAmount = cart.reduce((sum, item) => sum + (parseFloat(item.price) * parseInt(item.quantity)), 0);

    useEffect(() => {
        if (!user) {
            toast.error("Please login to checkout");
            navigate('/login');
        }
        if (cart.length === 0) {
            navigate('/products');
        }
    }, [user, cart, navigate]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        
        try {
            // Simulated payment delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            const res = await axios.post('http://localhost/Aquarium/backend/api/orders.php', {
                user_id: user.id,
                total_amount: totalAmount,
                shipping_address: `${formData.address}, ${formData.city}, ${formData.zipCode}`
            });
            
            if (res.data.status === 'success') {
                toast.success("Order placed successfully! Your aquatic friends are on the way.");
                fetchCart();
                navigate('/');
            } else {
                toast.error("Failed to place order.");
            }
        } catch (err) {
            toast.error("An error occurred during checkout.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (!user || cart.length === 0) return null;

    return (
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '40px', textAlign: 'center', fontFamily: 'Syne, sans-serif' }}>
                Secure <span style={{ color: '#00F2FE' }}>Checkout</span>
            </h1>
            
            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', maxWidth: '1100px', margin: '0 auto' }}>
                
                {/* Left: Checkout Form */}
                <div style={{ flex: '1 1 600px' }}>
                    <form onSubmit={handlePlaceOrder} className="glass" style={{ padding: '40px', borderRadius: '24px' }}>
                        <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <MapPin color="#00F2FE" /> Shipping Information
                        </h3>
                        
                        <div className="auth-form-row">
                            <input type="text" name="fullName" placeholder="Full Name" className="input-field" required value={formData.fullName} onChange={handleChange} />
                        </div>
                        <div className="auth-form-row">
                            <input type="text" name="address" placeholder="Street Address" className="input-field" required value={formData.address} onChange={handleChange} />
                        </div>
                        <div className="auth-form-row">
                            <input type="text" name="city" placeholder="City" className="input-field" required value={formData.city} onChange={handleChange} />
                            <input type="text" name="zipCode" placeholder="ZIP Code" className="input-field" required value={formData.zipCode} onChange={handleChange} />
                        </div>

                        <h3 style={{ marginTop: '30px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <CreditCard color="#00F2FE" /> Payment Details
                        </h3>
                        
                        <div className="auth-form-row">
                            <input type="text" name="cardNumber" placeholder="Card Number" className="input-field" required maxLength="16" value={formData.cardNumber} onChange={handleChange} />
                        </div>
                        <div className="auth-form-row">
                            <input type="text" name="expiry" placeholder="MM/YY" className="input-field" required maxLength="5" value={formData.expiry} onChange={handleChange} />
                            <input type="text" name="cvv" placeholder="CVV" className="input-field" required maxLength="4" value={formData.cvv} onChange={handleChange} />
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '20px', padding: '18px' }} disabled={isProcessing}>
                            {isProcessing ? 'Processing Payment...' : `Pay $${totalAmount.toFixed(2)}`}
                        </button>
                    </form>
                </div>

                {/* Right: Order Summary */}
                <div style={{ flex: '1 1 350px' }}>
                    <div className="glass" style={{ padding: '40px', borderRadius: '24px' }}>
                        <h3 style={{ marginBottom: '30px' }}>Order Summary</h3>
                        
                        <div style={{ maxHeight: '350px', overflowY: 'auto', marginBottom: '30px', paddingRight: '10px' }}>
                            {cart.map(item => (
                                <div key={item.cart_id} style={{ display: 'flex', gap: '15px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <img 
                                        src={item.image ? `http://localhost/Aquarium/backend/uploads/fish_images/${item.image}` : 'https://via.placeholder.com/60'} 
                                        alt={item.fish_name} 
                                        style={{ width: '70px', height: '70px', borderRadius: '12px', objectFit: 'cover' }} 
                                    />
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}>{item.fish_name}</h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Qty: {item.quantity}</p>
                                        <p style={{ color: 'var(--success)', fontWeight: 'bold', marginTop: '5px' }}>${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: 'var(--text-muted)' }}>
                            <span>Subtotal</span>
                            <span>${totalAmount.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: 'var(--text-muted)' }}>
                            <span>Shipping</span>
                            <span style={{ color: '#00F2FE' }}>Free</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '1.4rem', fontWeight: 'bold' }}>
                            <span>Total</span>
                            <span style={{ color: '#FFD166' }}>${totalAmount.toFixed(2)}</span>
                        </div>
                        
                        <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--success)', fontSize: '0.9rem', justifyContent: 'center' }}>
                            <CheckCircle size={18} /> 100% Secure Checkout
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Checkout;
