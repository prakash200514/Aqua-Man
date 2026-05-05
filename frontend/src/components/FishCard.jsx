import React, { useContext } from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const FishCard = ({ fish }) => {
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(`/product/${fish.id}`)}
            style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '30px',
                padding: '20px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                height: '380px',
                transition: 'all 0.3s'
            }}
        >
            {/* Top Row: Price and Add to Cart */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
                <div style={{ fontSize: '1.8rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif' }}>
                    ${fish.price}
                </div>
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        addToCart(fish.id);
                    }}
                    style={{
                        width: '45px', height: '45px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer',
                        color: 'white',
                        transition: 'background 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                >
                    <ShoppingBag size={20} />
                </button>
            </div>

            {/* Fish Image */}
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 5
            }}>
                <img 
                    src={fish.image ? `http://localhost/Aquarium/backend/uploads/fish_images/${fish.image}` : 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=400&auto=format&fit=crop'} 
                    alt={fish.fish_name} 
                    style={{
                        width: '100%',
                        maxHeight: '200px',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))',
                        transform: 'scale(1.2)'
                    }} 
                />
            </div>

            {/* Bottom Info Pill */}
            <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '50px',
                padding: '10px 15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                zIndex: 10,
                marginTop: 'auto'
            }}>
                <span style={{ fontWeight: '500', paddingLeft: '10px' }}>{fish.fish_name}</span>
                <div style={{
                    width: '35px', height: '35px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <ArrowRight size={18} />
                </div>
            </div>
        </div>
    );
};

export default FishCard;
