import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Home = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
            
            {/* Top Bar Area */}
            <div style={{ padding: '40px 30px', display: 'flex', justifyContent: 'flex-end', position: 'relative', zIndex: 10 }}>
                <div style={{
                    background: 'rgba(255,255,255,0.1)',
                    padding: '8px 24px',
                    borderRadius: '30px',
                    color: 'white',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                }}>
                    Skip
                </div>
            </div>

            {/* Giant Background Typography */}
            <div style={{
                position: 'absolute',
                top: '15%',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '9rem',
                fontWeight: '800',
                fontFamily: 'Outfit, sans-serif',
                color: '#FFA9BB',
                zIndex: 1,
                lineHeight: 1,
                letterSpacing: '-0.05em',
                display: 'flex',
                alignItems: 'center'
            }}>
                <div style={{ position: 'relative' }}>
                    <div style={{
                        position: 'absolute',
                        top: '50%', left: '0',
                        transform: 'translateY(-50%)',
                        width: '120px', height: '120px',
                        border: '25px solid #FF3B5C',
                        borderRadius: '50%',
                        zIndex: -1,
                        opacity: 0.8
                    }}></div>
                    <div style={{
                        position: 'absolute',
                        top: '-20%', right: '-10%',
                        width: '80px', height: '80px',
                        border: '15px solid #E95A78',
                        borderRadius: '50%',
                        zIndex: -1,
                        opacity: 0.6
                    }}></div>
                    Fish
                </div>
            </div>

            {/* Floating Fish Image */}
            <div style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                zIndex: 5,
                marginTop: '10vh'
            }}>
                <img 
                    src="https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=600&auto=format&fit=crop" 
                    alt="Vibrant Fish" 
                    className="floating"
                    style={{
                        width: '350px',
                        height: 'auto',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.5)) hue-rotate(-20deg) saturate(2)',
                        transform: 'rotate(-5deg)'
                    }} 
                />
            </div>

            {/* Bottom Content Area */}
            <div style={{
                background: 'linear-gradient(to top, #150308 0%, rgba(21, 3, 8, 0.8) 70%, transparent 100%)',
                padding: '40px 30px',
                paddingBottom: '50px',
                position: 'relative',
                zIndex: 10
            }}>
                <h1 style={{
                    fontSize: '2.8rem',
                    color: 'white',
                    marginBottom: '15px',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: '700',
                    lineHeight: '1.2'
                }}>
                    Build Your Dream<br/>Aquarium
                </h1>
                
                <p style={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '1.1rem',
                    marginBottom: '40px',
                    maxWidth: '80%',
                    lineHeight: '1.5'
                }}>
                    Shop premium fish, tanks, and accessories delivered safely to your doorstep.
                </p>

                {/* Get Started Button */}
                <Link to="/products" style={{ textDecoration: 'none' }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '50px',
                        padding: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                    >
                        <div style={{
                            background: 'rgba(255,255,255,0.1)',
                            width: '50px', height: '50px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                        }}>
                            <ChevronRight size={24} />
                        </div>
                        
                        <span style={{
                            color: 'white',
                            fontSize: '1.2rem',
                            fontWeight: '500',
                            flex: 1,
                            textAlign: 'center'
                        }}>
                            Get Started
                        </span>
                        
                        <div style={{
                            width: '50px',
                            display: 'flex',
                            justifyContent: 'center',
                            color: 'rgba(255,255,255,0.5)'
                        }}>
                            <ChevronRight size={20} style={{ marginLeft: '-15px' }}/>
                            <ChevronRight size={20} style={{ marginLeft: '-10px' }}/>
                            <ChevronRight size={20} style={{ marginLeft: '-10px' }}/>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Home;

