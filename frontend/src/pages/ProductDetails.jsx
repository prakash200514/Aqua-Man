import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ChevronRight, Star, ShoppingBag, Truck, ShieldCheck, Droplets, Ruler, Scale } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [fish, setFish] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchFish = async () => {
            try {
                const res = await axios.get('http://localhost/Aquarium/backend/api/fishes.php');
                if (res.data.status === 'success') {
                    const found = res.data.fishes.find(f => f.id.toString() === id);
                    setFish(found);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchFish();
    }, [id]);

    if (!fish) {
        return <div style={{ paddingTop: '150px', minHeight: '100vh', textAlign: 'center', color: 'white' }}>Loading grand collection...</div>;
    }

    return (
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '120px', minHeight: '100vh' }}>
            
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginBottom: '40px' }} className="fade-in">
                <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link> <ChevronRight size={14} /> 
                <Link to="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Gallery</Link> <ChevronRight size={14} /> 
                <span style={{ color: '#00F2FE' }}>{fish.fish_name}</span>
            </div>

            <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap' }} className="fade-in" style={{ animationDelay: '0.2s' }}>
                
                {/* Left: Image Gallery */}
                <div style={{ flex: '1 1 500px' }}>
                    <div style={{
                        background: 'linear-gradient(145deg, rgba(4,18,34,0.8), rgba(1,6,13,0.8))',
                        border: '1px solid rgba(0,242,254,0.1)',
                        borderRadius: '24px',
                        padding: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        minHeight: '400px',
                        overflow: 'hidden'
                    }}>
                        {fish.stock <= 0 && (
                            <div style={{
                                position: 'absolute', top: '20px', left: '20px',
                                background: 'rgba(239, 68, 68, 0.9)', color: 'white',
                                padding: '6px 16px', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold',
                                zIndex: 10
                            }}>
                                Out of Stock
                            </div>
                        )}
                        <img 
                            src={fish.image ? `http://localhost/Aquarium/backend/uploads/fish_images/${fish.image}` : 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=800&auto=format&fit=crop'} 
                            alt={fish.fish_name}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '450px',
                                objectFit: 'cover',
                                borderRadius: '16px',
                                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))',
                                transition: 'transform 0.5s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                    </div>
                </div>

                {/* Right: Product Details */}
                <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ color: '#00F2FE', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', fontWeight: '600', marginBottom: '10px' }}>
                        {fish.category_name}
                    </div>
                    
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '800', fontFamily: 'Syne, sans-serif', marginBottom: '15px', lineHeight: '1.1' }}>
                        {fish.fish_name}
                    </h1>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#FFD166' }}>
                            <Star size={18} fill="#FFD166" /> 
                            <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>4.9</span>
                        </div>
                        <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.2)' }}></div>
                        <div style={{ color: 'rgba(255,255,255,0.6)' }}>128 Reviews</div>
                    </div>

                    <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'white', marginBottom: '40px' }}>
                        ${fish.price} <span style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.5)', fontWeight: 'normal' }}>/ piece</span>
                    </div>

                    <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', marginBottom: '40px' }}>
                        The {fish.fish_name} is a stunning addition to any premium aquarium. Known for its vibrant coloration and graceful movement, this exotic specimen is meticulously cared for and guaranteed healthy upon arrival.
                    </p>

                    {/* Quick Specs */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px' }}>
                            <div style={{ background: 'rgba(0,242,254,0.1)', padding: '10px', borderRadius: '50%', color: '#00F2FE' }}>
                                <Ruler size={20} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>Average Size</div>
                                <div style={{ fontWeight: '600' }}>{fish.size}</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px' }}>
                            <div style={{ background: 'rgba(0,242,254,0.1)', padding: '10px', borderRadius: '50%', color: '#00F2FE' }}>
                                <Droplets size={20} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>Water Type</div>
                                <div style={{ fontWeight: '600' }}>Freshwater</div>
                            </div>
                        </div>
                    </div>

                    {/* Action Area */}
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginTop: 'auto' }}>
                        <button
                            onClick={() => {
                                for(let i=0; i<quantity; i++) addToCart(fish.id);
                            }}
                            disabled={fish.stock <= 0}
                            style={{
                                flex: 1,
                                padding: '20px',
                                borderRadius: '16px',
                                background: fish.stock > 0 ? 'linear-gradient(135deg, #00F2FE, #00A3FF)' : 'rgba(255,255,255,0.1)',
                                color: fish.stock > 0 ? '#01060D' : 'rgba(255,255,255,0.4)',
                                border: 'none',
                                fontSize: '1.2rem',
                                fontWeight: '700',
                                cursor: fish.stock > 0 ? 'pointer' : 'not-allowed',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '12px',
                                boxShadow: fish.stock > 0 ? '0 10px 30px rgba(0,242,254,0.3)' : 'none',
                                transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => { if(fish.stock > 0) e.currentTarget.style.transform = 'translateY(-3px)' }}
                            onMouseLeave={(e) => { if(fish.stock > 0) e.currentTarget.style.transform = 'translateY(0)' }}
                        >
                            <ShoppingBag size={22} /> {fish.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginTop: '30px', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Truck size={16} color="#00F2FE" /> Safe Live Delivery</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} color="#00F2FE" /> Health Guarantee</div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetails;
