import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('aquariyum_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post('http://localhost/Aquarium/backend/auth/login.php', { email, password });
            if (res.data.status === 'success') {
                setUser(res.data.user);
                localStorage.setItem('aquariyum_user', JSON.stringify(res.data.user));
                toast.success(res.data.message);
                return true;
            } else {
                toast.error(res.data.message);
                return false;
            }
        } catch (err) {
            toast.error('Login failed.');
            return false;
        }
    };

    const register = async (name, email, password) => {
        try {
            const res = await axios.post('http://localhost/Aquarium/backend/auth/register.php', { name, email, password });
            if (res.data.status === 'success') {
                toast.success(res.data.message);
                return true;
            } else {
                toast.error(res.data.message);
                return false;
            }
        } catch (err) {
            toast.error('Registration failed.');
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('aquariyum_user');
        toast.success('Logged out successfully.');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
