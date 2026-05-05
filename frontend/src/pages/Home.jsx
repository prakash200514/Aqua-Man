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

    // Create some floating bubbles dynamically
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
            <header className="hero fade-in">
                <img src="/hero_bg.png" alt="Grand Aquarium" className="hero-bg" />
                <div className="hero-overlay"></div>
                {renderBubbles()}
                
                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="glow-pulse" style={{ display: 'inline-block', marginBottom: '20px' }}>
                        <span style={{ 
                            background: 'rgba(0, 242, 254, 0.1)', 
                            border: '1px solid var(--primary-neon)', 
                            padding: '8px 20px', 
                            borderRadius: '50px',
                            color: 'var(--primary-neon)',
                            fontWeight: '600',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}><Sparkles size={16} /> Premium Quality</span>
                    </div>
                    <h1 className="floating">
                        The Grand Collection <br /> of <span className="text-gradient">Colour Fishes</span>
                    </h1>
                    <p>Immerse yourself in a world of vibrant marine life. Buy the most healthy, exotic, and exceptionally colorful aquarium fishes from our grand showroom.</p>
                    <Link to="/products" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '18px 45px' }}>
                        Explore Collection <ArrowRight size={24} />
                    </Link>
                </div>
            </header>

            <section className="container" style={{ padding: '120px 20px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '1px', height: '80px', background: 'linear-gradient(to bottom, transparent, var(--primary-neon))' }}></div>
                
                <div style={{ textAlign: 'center', marginBottom: '70px', marginTop: '40px' }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '15px' }}>Trending <span className="text-gradient-gold">Exotics</span></h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Discover our most vibrant and sought-after underwater companions, curated for the grandest aquariums.</p>
                </div>
                
                <div className="grid-3">
                    {featuredFishes.map(fish => (
                        <FishCard key={fish.id} fish={fish} />
                    ))}
                </div>
                
                <div style={{ textAlign: 'center', marginTop: '70px' }}>
                    <Link to="/products" className="btn btn-outline" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>
                        View Full Gallery
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
