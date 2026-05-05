import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FishCard from '../components/FishCard';

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

    return (
        <div>
            <header className="hero fade-in">
                <div className="container">
                    <h1 className="text-gradient floating">Discover Ocean's Beauty</h1>
                    <p>Buy beautiful, healthy aquarium fishes online. Experience the premium grand showroom of AquaRiyum.</p>
                    <Link to="/products" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '15px 40px' }}>
                        Explore Collection
                    </Link>
                </div>
            </header>

            <section className="container" style={{ padding: '80px 20px' }}>
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Featured <span className="text-gradient">Fishes</span></h2>
                    <p style={{ color: 'var(--text-muted)' }}>Our most loved underwater companions.</p>
                </div>
                
                <div className="grid-3">
                    {featuredFishes.map(fish => (
                        <FishCard key={fish.id} fish={fish} />
                    ))}
                </div>
                
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <Link to="/products" className="btn btn-outline">View All Fishes</Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
