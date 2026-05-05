import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Star } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [fish, setFish] = useState(null);
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
        return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Loading...</div>;
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', paddingBottom: '120px' }}>
            
            {/* Top Bar */}
            <div style={{ padding: '40px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <button 
                    onClick={() => navigate(-1)}
                    style={{
                        width: '45px', height: '45px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.2)',
                        border: 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white',
                        cursor: 'pointer'
                    }}
                >
                    <ArrowLeft size={20} />
                </button>
                <div style={{ fontWeight: '500', fontSize: '1.1rem' }}>New Arrivals</div>
                <div style={{ width: '45px' }}></div> {/* Spacer */}
            </div>

            {/* Title & Price Section */}
            <div style={{ padding: '0 20px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif' }}>
                        {fish.fish_name}
                    </h1>
                    <div style={{ 
                        background: 'rgba(255,255,255,0.1)', 
                        padding: '6px 12px', 
                        borderRadius: '20px',
                        display: 'flex', alignItems: 'center', gap: '5px',
                        fontSize: '0.9rem'
                    }}>
                        <Star size={14} fill="#FFD166" color="#FFD166" /> 4.9
                    </div>
                </div>
                <div style={{ fontSize: '1.6rem', color: 'white' }}>
                    ${fish.price}<span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)' }}>/pc</span>
                </div>
            </div>

            {/* Image Section */}
            <div style={{ 
                flex: 1, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                position: 'relative',
                zIndex: 10,
                minHeight: '300px'
            }}>
                <img 
                    src={fish.image ? `http://localhost/Aquarium/backend/uploads/fish_images/${fish.image}` : 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=600&auto=format&fit=crop'} 
                    alt={fish.fish_name}
                    style={{
                        width: '100%',
                        maxWidth: '450px',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.6))',
                        transform: 'scale(1.1)'
                    }}
                />
            </div>

            {/* Specifications Section */}
            <div style={{ padding: '0 20px', zIndex: 5, marginTop: '-20px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '500', marginBottom: '20px' }}>Specifications</h3>
                
                <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px', scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
                    
                    {/* Spec Card 1 */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        padding: '20px',
                        minWidth: '160px',
                        display: 'flex', flexDirection: 'column'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <div style={{ width: '35px', height: '35px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '0.8rem' }}>H+</span>
                            </div>
                            <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>1d</span>
                        </div>
                        <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '5px' }}>Weight</div>
                        <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginBottom: '15px', lineHeight: '1.4' }}>Mature and healthy</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: 'auto' }}>200-250<span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: 'rgba(255,255,255,0.6)' }}>/g</span></div>
                    </div>

                    {/* Spec Card 2 */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        padding: '20px',
                        minWidth: '160px',
                        display: 'flex', flexDirection: 'column'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <div style={{ width: '35px', height: '35px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '0.8rem' }}>📏</span>
                            </div>
                            <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>1d</span>
                        </div>
                        <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '5px' }}>Size</div>
                        <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginBottom: '15px', lineHeight: '1.4' }}>Medium growth stage</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: 'auto' }}>4-6 <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: 'rgba(255,255,255,0.6)' }}>inches</span></div>
                    </div>

                    {/* Spec Card 3 */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        padding: '20px',
                        minWidth: '160px',
                        display: 'flex', flexDirection: 'column'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <div style={{ width: '35px', height: '35px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '0.8rem' }}>💧</span>
                            </div>
                            <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>1d</span>
                        </div>
                        <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '5px' }}>Water</div>
                        <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginBottom: '15px', lineHeight: '1.4' }}>Freshwater</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: 'auto' }}>7.0-7.5 <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: 'rgba(255,255,255,0.6)' }}>pH</span></div>
                    </div>

                </div>
            </div>

            {/* Sticky Add to Cart Button */}
            <div style={{
                position: 'fixed',
                bottom: '100px', // Above bottom nav
                left: '20px',
                right: '20px',
                zIndex: 100
            }}>
                <button
                    onClick={() => addToCart(fish.id)}
                    style={{
                        width: '100%',
                        padding: '18px',
                        borderRadius: '30px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        fontSize: '1.1rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                        transition: 'background 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                >
                    Add to Cart
                </button>
            </div>

        </div>
    );
};

export default ProductDetails;
