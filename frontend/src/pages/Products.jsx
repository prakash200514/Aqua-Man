import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FishCard from '../components/FishCard';
import { Filter, ChevronRight } from 'lucide-react';

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
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh' }}>
            <div style={{ marginBottom: '40px' }} className="fade-in">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginBottom: '15px' }}>
                    <span>Home</span> <ChevronRight size={14} /> <span style={{ color: '#00F2FE' }}>Grand Gallery</span>
                </div>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '15px', fontFamily: 'Syne, sans-serif' }}>Shop <span style={{ color: '#00F2FE' }}>Collection</span></h1>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', maxWidth: '600px' }}>Filter through our exclusive collection of the most vibrant and beautiful aquatic life.</p>
            </div>

            <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
                
                {/* Sidebar Filters */}
                <div style={{
                    width: '280px',
                    flexShrink: 0,
                    background: 'rgba(4, 18, 34, 0.4)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0, 242, 254, 0.1)',
                    borderRadius: '20px',
                    padding: '30px',
                    position: 'sticky',
                    top: '100px'
                }} className="fade-in" style={{ animationDelay: '0.2s' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#00F2FE', fontSize: '1.2rem', fontWeight: '600', marginBottom: '25px' }}>
                        <Filter size={20} /> Categories
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <button 
                            onClick={() => setSelectedCategory('')}
                            style={{
                                background: selectedCategory === '' ? 'rgba(0, 242, 254, 0.1)' : 'transparent',
                                border: 'none',
                                color: selectedCategory === '' ? '#00F2FE' : 'white',
                                padding: '12px 15px',
                                borderRadius: '10px',
                                textAlign: 'left',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                transition: 'all 0.3s',
                                display: 'flex', justifyContent: 'space-between'
                            }}
                            onMouseEnter={(e) => { if(selectedCategory !== '') e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                            onMouseLeave={(e) => { if(selectedCategory !== '') e.currentTarget.style.background = 'transparent' }}
                        >
                            All Collection
                        </button>
                        
                        {categories.map(cat => (
                            <button 
                                key={cat.id} 
                                onClick={() => setSelectedCategory(cat.id)}
                                style={{
                                    background: selectedCategory === cat.id ? 'rgba(0, 242, 254, 0.1)' : 'transparent',
                                    border: 'none',
                                    color: selectedCategory === cat.id ? '#00F2FE' : 'white',
                                    padding: '12px 15px',
                                    borderRadius: '10px',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    transition: 'all 0.3s'
                                }}
                                onMouseEnter={(e) => { if(selectedCategory !== cat.id) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                                onMouseLeave={(e) => { if(selectedCategory !== cat.id) e.currentTarget.style.background = 'transparent' }}
                            >
                                {cat.category_name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Product Grid */}
                <div style={{ flex: 1 }}>
                    {fishes.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '80px', border: '1px solid rgba(0, 242, 254, 0.1)', borderRadius: '24px', background: 'rgba(4, 18, 34, 0.4)' }} className="fade-in">
                            <h3 style={{ fontSize: '2rem', color: 'white', marginBottom: '15px' }}>No fishes found</h3>
                            <p style={{ color: 'rgba(255,255,255,0.6)' }}>Try selecting a different category from our grand collection.</p>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: '30px'
                        }} className="fade-in" style={{ animationDelay: '0.4s' }}>
                            {fishes.map(fish => (
                                <FishCard key={fish.id} fish={fish} />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Products;

