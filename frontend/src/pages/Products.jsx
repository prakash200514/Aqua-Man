import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FishCard from '../components/FishCard';

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
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 className="text-gradient">Our Complete Collection</h1>
                <p style={{ color: 'var(--text-muted)' }}>Explore the finest aquatic life for your aquarium.</p>
            </div>

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
                <button 
                    className={`btn ${selectedCategory === '' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setSelectedCategory('')}
                >
                    All
                </button>
                {categories.map(cat => (
                    <button 
                        key={cat.id} 
                        className={`btn ${selectedCategory === cat.id ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setSelectedCategory(cat.id)}
                    >
                        {cat.category_name}
                    </button>
                ))}
            </div>

            {fishes.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px', color: 'var(--text-muted)' }}>
                    <h3>No fishes found in this category.</h3>
                </div>
            ) : (
                <div className="grid-3">
                    {fishes.map(fish => (
                        <FishCard key={fish.id} fish={fish} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;
