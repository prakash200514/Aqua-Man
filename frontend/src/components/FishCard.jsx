import React, { useContext } from 'react';
import { ShoppingCart } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const FishCard = ({ fish }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <div className="fish-card fade-in">
            <div className="fish-img-container">
                <img src={fish.image ? `http://localhost/Aquarium/backend/uploads/fish_images/${fish.image}` : 'https://via.placeholder.com/300x220?text=Fish'} alt={fish.fish_name} />
            </div>
            <div className="fish-info">
                <div className="fish-category">{fish.category_name}</div>
                <h3 className="fish-title">{fish.fish_name}</h3>
                <div className="fish-meta">
                    <span>Size: {fish.size}</span>
                    <span>Stock: {fish.stock > 0 ? <span style={{color: 'var(--success)'}}>{fish.stock} available</span> : <span style={{color: 'var(--danger)'}}>Out of Stock</span>}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="fish-price">${fish.price}</div>
                    <button 
                        className="btn btn-primary" 
                        style={{ padding: '10px 20px', fontSize: '0.9rem', borderRadius: '12px' }}
                        onClick={() => addToCart(fish.id)}
                        disabled={fish.stock <= 0}
                    >
                        <ShoppingCart size={16} /> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FishCard;
