import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FishCard from '../components/FishCard';
import { ArrowRight, Sparkles, Waves, Fish } from 'lucide-react';

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
        for (let i = 0; i < 18; i++) {
            const size = Math.random() * 22 + 6;
            const left = Math.random() * 100;
            const delay = Math.random() * 12;
            const duration = Math.random() * 12 + 12;
            bubbles.push(
                <div key={i} className="bubble" style={{
                    width: `${size}px`, height: `${size}px`,
                    left: `${left}%`, animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`
                }} />
            );
        }
        return bubbles;
    };

    return (
        <div style={{ background: 'transparent' }}>

            {/* ── Hero ── */}
            <header style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                position: 'relative',
                paddingTop: '140px',
                overflow: 'hidden'
            }}>
                {/* Light gradient overlay over video bg */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'linear-gradient(to bottom, rgba(237, 248, 255, 0.35), rgba(237, 248, 255, 0.88))',
                    zIndex: 0
                }} />

                {renderBubbles()}

                <div className="container fade-in" style={{ position: 'relative', zIndex: 10, maxWidth: '900px' }}>

                    {/* Badge */}
                    <div className="glow-pulse" style={{ display: 'inline-block', marginBottom: '30px' }}>
                        <span style={{
                            background: 'rgba(0, 153, 204, 0.1)',
                            border: '1.5px solid #0099CC',
                            padding: '10px 26px',
                            borderRadius: '50px',
                            color: '#0099CC',
                            fontWeight: '700',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            fontSize: '0.85rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <Sparkles size={15} /> Premium Quality
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 style={{
                        fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                        lineHeight: '1.1',
                        marginBottom: '24px',
                        textTransform: 'uppercase',
                        color: '#1A3C52',
                        fontFamily: 'Syne, sans-serif',
                        fontWeight: '800'
                    }}>
                        Dive Into The <br />
                        <span style={{
                            background: 'linear-gradient(135deg, #0099CC 0%, #00C9A7 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>Grand Aquarium</span>
                    </h1>

                    {/* Sub-text */}
                    <p style={{
                        fontSize: '1.25rem',
                        color: '#5B7D90',
                        marginBottom: '50px',
                        maxWidth: '680px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        lineHeight: '1.7'
                    }}>
                        Immerse yourself in a world of vibrant marine life. Shop the most healthy, exotic, and exceptionally colorful aquarium fishes from our premier online collection. 🐡
                    </p>

                    {/* CTA */}
                    <Link to="/products" style={{ textDecoration: 'none' }}>
                        <button
                            style={{
                                background: 'linear-gradient(135deg, #0099CC, #00BBEE)',
                                color: '#fff',
                                padding: '18px 48px',
                                borderRadius: '50px',
                                border: 'none',
                                fontSize: '1.15rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '12px',
                                boxShadow: '0 10px 32px rgba(0, 153, 204, 0.4)',
                                transition: 'all 0.3s ease',
                                letterSpacing: '0.5px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 18px 40px rgba(0, 153, 204, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 32px rgba(0, 153, 204, 0.4)';
                            }}
                        >
                            Shop Collection <ArrowRight size={22} />
                        </button>
                    </Link>

                    {/* Stats row */}
                    <div style={{
                        display: 'flex', gap: '50px', justifyContent: 'center',
                        marginTop: '70px', flexWrap: 'wrap'
                    }}>
                        {[
                            { icon: '🐠', value: '200+', label: 'Fish Species' },
                            { icon: '⭐', value: '4.9', label: 'Rating' },
                            { icon: '📦', value: '5K+', label: 'Happy Owners' },
                        ].map((s) => (
                            <div key={s.label} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', marginBottom: '4px' }}>{s.icon}</div>
                                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0099CC', fontFamily: 'Syne, sans-serif' }}>{s.value}</div>
                                <div style={{ fontSize: '0.9rem', color: '#5B7D90', fontWeight: '500' }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            {/* ── Featured Section ── */}
            <section className="container" style={{ padding: '110px 20px', position: 'relative' }}>

                {/* Section divider */}
                <div style={{
                    position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                    width: '2px', height: '70px',
                    background: 'linear-gradient(to bottom, transparent, #0099CC)'
                }} />

                <div style={{ textAlign: 'center', marginBottom: '70px', marginTop: '40px' }}>
                    <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        background: 'rgba(0,201,167,0.1)', border: '1.5px solid #00C9A7',
                        padding: '6px 18px', borderRadius: '30px',
                        color: '#00C9A7', fontWeight: '700', fontSize: '0.8rem',
                        letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px'
                    }}>
                        <Fish size={14} /> Top Picks
                    </span>
                    <h2 style={{
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        marginBottom: '14px',
                        fontFamily: 'Syne, sans-serif',
                        color: '#1A3C52'
                    }}>
                        Trending <span style={{ color: '#0099CC' }}>Exotics</span>
                    </h2>
                    <p style={{ color: '#5B7D90', fontSize: '1.1rem', maxWidth: '580px', margin: '0 auto', lineHeight: '1.7' }}>
                        Discover our most vibrant and sought-after underwater companions, curated for the grandest aquariums.
                    </p>
                </div>

                {/* Cards grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '36px'
                }}>
                    {featuredFishes.map(fish => (
                        <FishCard key={fish.id} fish={fish} />
                    ))}
                </div>

                {/* CTA */}
                <div style={{ textAlign: 'center', marginTop: '70px' }}>
                    <Link to="/products" style={{ textDecoration: 'none' }}>
                        <button
                            style={{
                                background: 'rgba(0, 153, 204, 0.07)',
                                border: '1.5px solid #0099CC',
                                color: '#0099CC',
                                padding: '14px 42px',
                                borderRadius: '50px',
                                fontSize: '1.05rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(0, 153, 204, 0.15)';
                                e.currentTarget.style.boxShadow = '0 0 22px rgba(0,153,204,0.2)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(0, 153, 204, 0.07)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <Waves size={18} /> View Full Gallery
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
