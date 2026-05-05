import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FishCard from '../components/FishCard';
import { Filter } from 'lucide-react';

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
        <div className="container" style={{ paddingTop: '150px', paddingBottom: '100px', minHeight: '100vh' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }} className="fade-in">
                <h1 style={{ fontSize: '3.5rem', marginBottom: '15px' }}>The <span className="text-gradient">Grand Gallery</span></h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Filter through our exclusive collection of the most vibrant and beautiful aquatic life.</p>
            </div>

            <div className="filters-wrapper fade-in" style={{ animationDelay: '0.2s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary-neon)', marginRight: '10px', fontWeight: '600' }}>
                    <Filter size={20} /> Filter By:
                </div>
                <button 
                    className={`filter-btn ${selectedCategory === '' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('')}
                >
                    All Collection
                </button>
                {categories.map(cat => (
                    <button 
                        key={cat.id} 
                        className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat.id)}
                    >
                        {cat.category_name}
                    </button>
                ))}
            </div>

            {fishes.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px', border: '1px solid var(--glass-border)', borderRadius: '24px', background: 'var(--glass-bg)' }} className="fade-in">
                    <h3 style={{ fontSize: '2rem', color: 'var(--text-muted)', marginBottom: '15px' }}>No fishes found</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Try selecting a different category from our grand collection.</p>
                </div>
            ) : (
                <div className="grid-3 fade-in" style={{ animationDelay: '0.4s' }}>
                    {fishes.map(fish => (
                        <FishCard key={fish.id} fish={fish} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;
