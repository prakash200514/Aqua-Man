import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FishCard from '../components/FishCard';
import { Bell } from 'lucide-react';

const Products = () => {
    const [fishes, setFishes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('http://localhost/Aquarium/backend/api/categories.php');
                if (res.data.status === 'success') setCategories(res.data.categories);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchFishes = async () => {
            try {
                let url = 'http://localhost/Aquarium/backend/api/fishes.php';
                if (selectedCategory) {
                    url += `?category=${selectedCategory}`;
                }
                const res = await axios.get(url);
                if (res.data.status === 'success') setFishes(res.data.fishes);
            } catch (err) {
                console.error(err);
            }
        };
        fetchFishes();
    }, [selectedCategory]);

    return (
        <div style={{ paddingTop: '80px', paddingBottom: '120px', minHeight: '100vh', paddingLeft: '20px', paddingRight: '20px' }}>
            
            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <img 
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" 
                        alt="User" 
                        style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover' }} 
                    />
                    <div>
                        <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Hello Jobby 👋</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>Good Morning</div>
                    </div>
                </div>
                
                <div style={{
                    width: '45px', height: '45px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative'
                }}>
                    <Bell size={20} color="white" />
                    <div style={{
                        position: 'absolute', top: '10px', right: '12px',
                        width: '8px', height: '8px', background: '#FF3B5C',
                        borderRadius: '50%'
                    }}></div>
                </div>
            </div>

            {/* Discover Header */}
            <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                marginBottom: '30px',
                fontFamily: 'Outfit, sans-serif',
                lineHeight: '1.2'
            }}>
                Discover our<br />grand collection.
            </h1>

            {/* Categories */}
            <div style={{
                display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '30px',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}>
                <button 
                    onClick={() => setSelectedCategory('')}
                    style={{
                        padding: '12px 24px',
                        borderRadius: '30px',
                        border: 'none',
                        background: selectedCategory === '' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
                        color: 'white',
                        fontSize: '0.95rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.3s'
                    }}
                >
                    All
                </button>
                {categories.map(cat => (
                    <button 
                        key={cat.id} 
                        onClick={() => setSelectedCategory(cat.id)}
                        style={{
                            padding: '12px 24px',
                            borderRadius: '30px',
                            border: 'none',
                            background: selectedCategory === cat.id ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
                            color: 'white',
                            fontSize: '0.95rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.3s'
                        }}
                    >
                        {cat.category_name}
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: '600' }}>Featured</h2>
                <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>See All</span>
            </div>

            {fishes.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px', background: 'rgba(255,255,255,0.05)', borderRadius: '24px' }}>
                    <p style={{ color: 'rgba(255,255,255,0.6)' }}>No fishes found</p>
                </div>
            ) : (
                <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '20px' }}>
                    {fishes.map(fish => (
                        <div key={fish.id} style={{ minWidth: '280px' }}>
                            <FishCard fish={fish} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;

