import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  ChevronRight, Star, ShoppingBag, Truck,
  ShieldCheck, Droplets, Ruler, ArrowLeft, Fish
} from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { inr } from '../utils/currency';

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
    return (
      <div style={{
        paddingTop: '150px', minHeight: '100vh',
        textAlign: 'center', color: '#5B7D90',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '16px'
      }}>
        <div style={{ fontSize: '3rem', animation: 'float 2s ease-in-out infinite' }}>🐠</div>
        <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>Loading fish details…</p>
      </div>
    );
  }

  const imgSrc = fish.image
    ? `http://localhost/Aquarium/backend/uploads/fish_images/${fish.image}`
    : 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=600&auto=format&fit=crop';

  const inStock = parseInt(fish.stock) > 0;

  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>

        {/* ── Breadcrumb ── */}
        <div
          className="fade-in"
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            fontSize: '0.88rem', color: '#5B7D90', marginBottom: '32px'
          }}
        >
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'rgba(0,153,204,0.08)', border: '1px solid rgba(0,153,204,0.2)',
              color: '#0099CC', padding: '6px 14px', borderRadius: '30px',
              cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,153,204,0.16)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,153,204,0.08)'}
          >
            <ArrowLeft size={14} /> Back
          </button>
          <ChevronRight size={14} />
          <Link to="/products" style={{ color: '#5B7D90', textDecoration: 'none' }}>Shop</Link>
          <ChevronRight size={14} />
          <span style={{ color: '#0099CC', fontWeight: '600' }}>{fish.fish_name}</span>
        </div>

        {/* ── Main Card ── */}
        <div
          className="fade-in"
          style={{
            display: 'flex', gap: '40px', flexWrap: 'wrap',
            background: '#fff', borderRadius: '24px',
            border: '1.5px solid rgba(0,153,204,0.14)',
            boxShadow: '0 8px 40px rgba(0,153,204,0.1)',
            overflow: 'hidden'
          }}
        >

          {/* ── LEFT: Image Panel ── */}
          <div style={{
            flex: '0 0 360px', minHeight: '360px',
            background: 'linear-gradient(135deg, #C8EEFF 0%, #E8F9FF 60%, #D6F8F0 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '32px', position: 'relative'
          }}>
            {/* Out of stock badge */}
            {!inStock && (
              <div style={{
                position: 'absolute', top: '16px', left: '16px',
                background: 'rgba(239,68,68,0.9)', color: '#fff',
                padding: '5px 14px', borderRadius: '20px',
                fontSize: '0.8rem', fontWeight: '700',
                boxShadow: '0 2px 10px rgba(239,68,68,0.4)'
              }}>
                Out of Stock
              </div>
            )}

            {/* Category chip */}
            <div style={{
              position: 'absolute', top: '16px', right: '16px',
              background: '#0099CC', color: '#fff',
              padding: '5px 14px', borderRadius: '20px',
              fontSize: '0.75rem', fontWeight: '700',
              textTransform: 'uppercase', letterSpacing: '1px',
              boxShadow: '0 2px 10px rgba(0,153,204,0.35)'
            }}>
              🐟 {fish.category_name}
            </div>

            {/* Fish image — fixed size */}
            <img
              src={imgSrc}
              alt={fish.fish_name}
              style={{
                width: '100%',
                height: '280px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 12px 28px rgba(0,100,180,0.25))',
                transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />

            {/* Water shimmer bottom */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '40px',
              background: 'linear-gradient(to top, rgba(255,255,255,0.7), transparent)',
              pointerEvents: 'none'
            }} />
          </div>

          {/* ── RIGHT: Details Panel ── */}
          <div style={{
            flex: '1 1 320px', padding: '36px 36px 36px 24px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
          }}>

            {/* Top section */}
            <div>
              {/* Name */}
              <h1 style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                fontWeight: '800', color: '#1A3C52',
                lineHeight: '1.2', marginBottom: '12px'
              }}>
                {fish.fish_name}
              </h1>

              {/* Rating row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#FFC94A' }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={15} fill="#FFC94A" />)}
                  <span style={{ fontWeight: '700', color: '#1A3C52', marginLeft: '4px', fontSize: '0.95rem' }}>4.9</span>
                </div>
                <span style={{ color: '#5B7D90', fontSize: '0.88rem' }}>128 reviews</span>
                <span style={{
                  background: inStock ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                  color: inStock ? '#10b981' : '#ef4444',
                  padding: '3px 12px', borderRadius: '20px',
                  fontWeight: '700', fontSize: '0.8rem'
                }}>
                  {inStock ? `✓ In Stock (${fish.stock})` : '✗ Out of Stock'}
                </span>
              </div>

              {/* Price */}
              <div style={{ marginBottom: '22px' }}>
                <span style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '2rem', fontWeight: '800', color: '#FF6B6B'
                }}>
                  {inr(fish.price)}
                </span>
                <span style={{ color: '#5B7D90', fontSize: '0.9rem', marginLeft: '8px' }}>/ piece</span>
              </div>

              {/* Description */}
              <p style={{
                color: '#5B7D90', lineHeight: '1.7',
                fontSize: '0.95rem', marginBottom: '24px',
                paddingBottom: '24px', borderBottom: '1px solid #e8f4fc'
              }}>
                The <strong style={{ color: '#1A3C52' }}>{fish.fish_name}</strong> is a stunning addition to any premium aquarium.
                Known for its vibrant coloration and graceful movement, this exotic specimen is meticulously
                cared for and guaranteed healthy upon arrival.
              </p>

              {/* Specs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                {[
                  { icon: <Ruler size={16} />, label: 'Size', value: fish.size || 'Medium' },
                  { icon: <Droplets size={16} />, label: 'Water Type', value: 'Freshwater' },
                  { icon: <Fish size={16} />, label: 'Category', value: fish.category_name },
                  { icon: <ShieldCheck size={16} />, label: 'Health', value: 'Guaranteed' },
                ].map(spec => (
                  <div key={spec.label} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    background: '#f5fbff', padding: '12px 14px',
                    borderRadius: '12px', border: '1px solid rgba(0,153,204,0.1)'
                  }}>
                    <div style={{
                      background: 'rgba(0,153,204,0.1)', padding: '7px',
                      borderRadius: '50%', color: '#0099CC', flexShrink: 0
                    }}>
                      {spec.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: '#5B7D90', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: '600' }}>
                        {spec.label}
                      </div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1A3C52' }}>{spec.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom: CTA */}
            <div>
              <button
                onClick={() => { if (inStock) addToCart(fish.id); }}
                disabled={!inStock}
                style={{
                  width: '100%', padding: '16px',
                  borderRadius: '14px', border: 'none',
                  background: inStock
                    ? 'linear-gradient(135deg, #0099CC, #00BBEE)'
                    : 'rgba(0,0,0,0.08)',
                  color: inStock ? '#fff' : '#aaa',
                  fontSize: '1rem', fontWeight: '800',
                  cursor: inStock ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: '10px',
                  boxShadow: inStock ? '0 6px 22px rgba(0,153,204,0.35)' : 'none',
                  transition: 'all 0.3s', marginBottom: '14px'
                }}
                onMouseEnter={e => { if (inStock) e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { if (inStock) e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <ShoppingBag size={20} />
                {inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>

              {/* Trust badges */}
              <div style={{
                display: 'flex', gap: '20px', justifyContent: 'center',
                flexWrap: 'wrap', color: '#5B7D90', fontSize: '0.82rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Truck size={14} color="#00C9A7" /> Safe Live Delivery
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={14} color="#00C9A7" /> Health Guarantee
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Star size={14} color="#FFC94A" fill="#FFC94A" /> Premium Quality
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
