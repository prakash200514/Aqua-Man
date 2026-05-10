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
                background: '#FFFFFF',
                borderRadius: '20px',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                border: '1.5px solid rgba(0, 153, 204, 0.15)',
                boxShadow: '0 4px 20px rgba(0, 153, 204, 0.1)',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                height: '100%'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = 'rgba(0, 153, 204, 0.45)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 153, 204, 0.2)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(0, 153, 204, 0.15)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 153, 204, 0.1)';
            }}
        >
            {/* Image Container */}
            <div style={{
                height: '240px',
                position: 'relative',
                background: 'linear-gradient(135deg, #C8EEFF 0%, #E8F9FF 60%, #D6F8F0 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                overflow: 'hidden'
            }}>
                {/* Decorative water ripple */}
                <div style={{
                    position: 'absolute',
                    bottom: 0, left: 0, right: 0,
                    height: '30px',
                    background: 'linear-gradient(to top, rgba(255,255,255,0.8), transparent)',
                    zIndex: 2
                }} />

                {fish.stock <= 0 && (
                    <div style={{
                        position: 'absolute', top: '14px', left: '14px',
                        background: 'rgba(255, 107, 107, 0.9)', color: 'white',
                        padding: '4px 12px', borderRadius: '20px',
                        fontSize: '0.78rem', fontWeight: 'bold', zIndex: 10,
                        boxShadow: '0 2px 8px rgba(255,107,107,0.4)'
                    }}>
                        Out of Stock
                    </div>
                )}

                <img
                    src={fish.image
                        ? `http://localhost/Aquarium/backend/uploads/fish_images/${fish.image}`
                        : 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=400&auto=format&fit=crop'}
                    alt={fish.fish_name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 8px 18px rgba(0,100,180,0.2))',
                        transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                        position: 'relative',
                        zIndex: 1
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
            </div>

            {/* Content */}
            <div style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                background: '#FFFFFF',
                borderTop: '1px solid rgba(0, 153, 204, 0.08)'
            }}>
                {/* Category & Rating */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{
                        fontSize: '0.75rem',
                        background: 'rgba(0, 153, 204, 0.1)',
                        color: '#0099CC',
                        padding: '3px 10px',
                        borderRadius: '20px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.8px'
                    }}>
                        🐟 {fish.category_name}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: '#FFC94A' }}>
                        <Star size={14} fill="#FFC94A" /> 4.9
                    </div>
                </div>

                {/* Fish Name */}
                <h3 style={{
                    fontSize: '1.35rem',
                    fontWeight: '700',
                    marginBottom: '5px',
                    fontFamily: 'Syne, sans-serif',
                    color: '#1A3C52'
                }}>
                    {fish.fish_name}
                </h3>

                {/* Size */}
                <p style={{ fontSize: '0.88rem', color: '#5B7D90', marginBottom: '18px', flex: 1 }}>
                    📏 Size: {fish.size}
                </p>

                {/* Price & Button */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#FF6B6B' }}>
                        ${fish.price}
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (fish.stock > 0) addToCart(fish.id);
                        }}
                        disabled={fish.stock <= 0}
                        style={{
                            background: fish.stock > 0
                                ? 'linear-gradient(135deg, #0099CC, #00BBEE)'
                                : 'rgba(0,0,0,0.07)',
                            color: fish.stock > 0 ? '#fff' : '#aaa',
                            border: 'none',
                            padding: '10px 18px',
                            borderRadius: '12px',
                            display: 'flex', alignItems: 'center', gap: '8px',
                            cursor: fish.stock > 0 ? 'pointer' : 'not-allowed',
                            fontWeight: '700',
                            fontSize: '0.9rem',
                            transition: 'all 0.25s',
                            boxShadow: fish.stock > 0 ? '0 4px 14px rgba(0,153,204,0.3)' : 'none'
                        }}
                        onMouseEnter={(e) => { if (fish.stock > 0) e.currentTarget.style.filter = 'brightness(1.1)'; }}
                        onMouseLeave={(e) => { if (fish.stock > 0) e.currentTarget.style.filter = 'brightness(1)'; }}
                    >
                        <ShoppingBag size={16} /> Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FishCard;
