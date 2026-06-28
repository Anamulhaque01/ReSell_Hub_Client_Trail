'use strict';
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Rehydrate state on hard context/page refresh configurations safely
    useEffect(() => {
        const storedUser = localStorage.getItem('resell_user');
        const storedToken = localStorage.getItem('resell_token');

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
        setLoading(false);
    }, []);

    // Standard Login Action Wrapper
    // Inside your login wrapper change:
    const login = async (email, password) => { // Accept password parameter explicitly
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }), // Send password array block
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Authentication error failed');

            localStorage.setItem('resell_user', JSON.stringify(data.user));
            localStorage.setItem('resell_token', data.token);
            setUser(data.user);
            setToken(data.token);
            return data.user;
        } finally {
            setLoading(false);
        }
    };

    // Standard Registration Action Wrapper
    const registerUser = async (userData) => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Registration pipeline failed');

            localStorage.setItem('resell_user', JSON.stringify(data.user));
            localStorage.setItem('resell_token', data.token);
            setUser(data.user);
            setToken(data.token);
            return data.user;
        } finally {
            setLoading(false);
        }
    };

    // Secure user logout operation parameters
    const logout = () => {
        localStorage.removeItem('resell_user');
        localStorage.removeItem('resell_token');
        setUser(null);
        setToken(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, registerUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);