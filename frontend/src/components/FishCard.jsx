import React, { useContext } from 'react';
import { ShoppingBag, Star } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const FishCard = ({ fish }) => {
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(`/product/${fish.id}`)}
            style={{
                background: 'rgba(4, 18, 34, 0.6)',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                border: '1px solid rgba(0, 242, 254, 0.1)',
                transition: 'all 0.3s ease',
                height: '100%'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = 'rgba(0, 242, 254, 0.4)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 242, 254, 0.15)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(0, 242, 254, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            {/* Image Container */}
            <div style={{
                height: '240px',
                position: 'relative',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), transparent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}>
                {fish.stock <= 0 && (
                    <div style={{
                        position: 'absolute', top: '15px', left: '15px',
                        background: 'rgba(239, 68, 68, 0.9)', color: 'white',
                        padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', zIndex: 10
                    }}>
                        Out of Stock
                    </div>
                )}
                
                <img 
                    src={fish.image ? `http://localhost/Aquarium/backend/uploads/fish_images/${fish.image}` : 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=400&auto=format&fit=crop'} 
                    alt={fish.fish_name} 
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
                        transition: 'transform 0.5s'
                    }} 
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
            </div>

            {/* Content Container */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, background: 'rgba(1, 6, 13, 0.5)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.8rem', color: '#00F2FE', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
                        {fish.category_name}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: '#FFD166' }}>
                        <Star size={14} fill="#FFD166" /> 4.9
                    </div>
                </div>
                
                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '5px', fontFamily: 'Syne, sans-serif' }}>
                    {fish.fish_name}
                </h3>
                
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginBottom: '20px', flex: 1 }}>
                    Size: {fish.size}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white' }}>
                        ${fish.price}
                    </div>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            if(fish.stock > 0) addToCart(fish.id);
                        }}
                        disabled={fish.stock <= 0}
                        style={{
                            background: fish.stock > 0 ? 'linear-gradient(135deg, #00F2FE, #00A3FF)' : 'rgba(255,255,255,0.1)',
                            color: fish.stock > 0 ? '#01060D' : 'rgba(255,255,255,0.3)',
                            border: 'none',
                            padding: '10px 16px',
                            borderRadius: '8px',
                            display: 'flex', alignItems: 'center', gap: '8px',
                            cursor: fish.stock > 0 ? 'pointer' : 'not-allowed',
                            fontWeight: '600',
                            transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => { if(fish.stock > 0) e.currentTarget.style.filter = 'brightness(1.1)' }}
                        onMouseLeave={(e) => { if(fish.stock > 0) e.currentTarget.style.filter = 'brightness(1)' }}
                    >
                        <ShoppingBag size={18} /> Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FishCard;
