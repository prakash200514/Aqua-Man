import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FishCard from '../components/FishCard';
import { ArrowRight, Sparkles } from 'lucide-react';

const Home = () => {
    const [featuredFishes, setFeaturedFishes] = useState([]);

    useEffect(() => {
        const fetchFishes = async () => {
            try {
                const res = await axios.get('http://localhost/Aquarium/backend/api/fishes.php');
                if (res.data.status === 'success') {
                    setFeaturedFishes(res.data.fishes.slice(0, 3));
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchFishes();
    }, []);

    const renderBubbles = () => {
        let bubbles = [];
        for (let i = 0; i < 15; i++) {
            const size = Math.random() * 20 + 5;
            const left = Math.random() * 100;
            const delay = Math.random() * 10;
            const duration = Math.random() * 10 + 10;
            bubbles.push(
                <div key={i} className="bubble" style={{
                    width: `${size}px`, height: `${size}px`,
                    left: `${left}%`, animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`
                }}></div>
            );
        }
        return bubbles;
    };

    return (
        <div>
            {/* Cinematic Hero Section */}
            <header style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                position: 'relative',
                paddingTop: '80px',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'linear-gradient(to bottom, rgba(1, 6, 13, 0.4), rgba(1, 6, 13, 1))',
                    zIndex: -1
                }}></div>
                {renderBubbles()}
                
                <div className="container fade-in" style={{ position: 'relative', zIndex: 10, maxWidth: '900px' }}>
                    <div className="glow-pulse" style={{ display: 'inline-block', marginBottom: '30px' }}>
                        <span style={{ 
                            background: 'rgba(0, 242, 254, 0.1)', 
                            border: '1px solid #00F2FE', 
                            padding: '10px 24px', 
                            borderRadius: '50px',
                            color: '#00F2FE',
                            fontWeight: '600',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}><Sparkles size={16} /> Premium Quality</span>
                    </div>
                    
                    <h1 style={{
                        fontSize: '5rem',
                        lineHeight: '1.1',
                        marginBottom: '24px',
                        textTransform: 'uppercase',
                        color: 'white',
                        fontFamily: 'Syne, sans-serif',
                        fontWeight: '800'
                    }}>
                        Dive Into The <br />
                        <span style={{
                            background: 'linear-gradient(135deg, #00F2FE 0%, #00A3FF 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>Grand Aquarium</span>
                    </h1>
                    
                    <p style={{
                        fontSize: '1.3rem',
                        color: 'rgba(255,255,255,0.7)',
                        marginBottom: '50px',
                        maxWidth: '700px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        lineHeight: '1.6'
                    }}>
                        Immerse yourself in a world of vibrant marine life. Shop the most healthy, exotic, and exceptionally colorful aquarium fishes from our premier online collection.
                    </p>
                    
                    <Link to="/products" style={{ textDecoration: 'none' }}>
                        <button style={{
                            background: 'linear-gradient(135deg, #00F2FE, #00A3FF)',
                            color: '#01060D',
                            padding: '18px 45px',
                            borderRadius: '50px',
                            border: 'none',
                            fontSize: '1.2rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px',
                            boxShadow: '0 10px 30px rgba(0, 242, 254, 0.4)',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            Shop Collection <ArrowRight size={24} />
                        </button>
                    </Link>
                </div>
            </header>

            {/* Featured Grid Section */}
            <section className="container" style={{ padding: '120px 20px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '1px', height: '80px', background: 'linear-gradient(to bottom, transparent, #00F2FE)' }}></div>
                
                <div style={{ textAlign: 'center', marginBottom: '70px', marginTop: '40px' }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '15px', fontFamily: 'Syne, sans-serif' }}>Trending <span style={{ color: '#00F2FE' }}>Exotics</span></h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Discover our most vibrant and sought-after underwater companions, curated for the grandest aquariums.</p>
                </div>
                
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '40px'
                }}>
                    {featuredFishes.map(fish => (
                        <FishCard key={fish.id} fish={fish} />
                    ))}
                </div>
                
                <div style={{ textAlign: 'center', marginTop: '70px' }}>
                    <Link to="/products" style={{ textDecoration: 'none' }}>
                        <button style={{
                            background: 'rgba(0, 242, 254, 0.05)',
                            border: '1px solid #00F2FE',
                            color: '#00F2FE',
                            padding: '15px 40px',
                            borderRadius: '50px',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0, 242, 254, 0.15)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 242, 254, 0.2)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0, 242, 254, 0.05)'; e.currentTarget.style.boxShadow = 'none'; }}
                        >
                            View Full Gallery
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;

