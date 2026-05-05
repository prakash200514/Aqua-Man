import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { user } = useContext(AuthContext);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const fetchCart = async () => {
        if (!user) return;
        try {
            const res = await axios.get(`http://localhost/Aquarium/backend/api/cart.php?user_id=${user.id}`);
            if (res.data.status === 'success') {
                setCart(res.data.cart);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCart([]);
        }
    }, [user]);

    const addToCart = async (fish_id, quantity = 1) => {
        if (!user) {
            toast.error("Please login to add to cart");
            return;
        }
        try {
            const res = await axios.post('http://localhost/Aquarium/backend/api/cart.php', {
                user_id: user.id,
                fish_id,
                quantity
            });
            if (res.data.status === 'success') {
                toast.success(res.data.message);
                fetchCart();
                setIsCartOpen(true);
            }
        } catch (err) {
            toast.error("Failed to add to cart");
        }
    };

    const updateQuantity = async (cart_id, quantity) => {
        if (quantity < 1) return;
        try {
            await axios.put('http://localhost/Aquarium/backend/api/cart.php', { cart_id, quantity });
            fetchCart();
        } catch (err) {
            console.error(err);
        }
    };

    const removeFromCart = async (cart_id) => {
        try {
            await axios.delete('http://localhost/Aquarium/backend/api/cart.php', { data: { cart_id } });
            toast.info("Item removed from cart");
            fetchCart();
        } catch (err) {
            console.error(err);
        }
    };

    const clearCartLocal = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, isCartOpen, setIsCartOpen, addToCart, updateQuantity, removeFromCart, fetchCart, clearCartLocal }}>
            {children}
        </CartContext.Provider>
    );
};
