'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

const CATEGORIES = ['All Categories', 'Electronics', 'Furniture', 'Vehicles', 'Fashion', 'Mobile Phones'];
const CONDITIONS = ['All Conditions', 'New', 'Like-New', 'Good', 'Fair', 'Poor'];
const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest First' },
    { value: 'priceLowHigh', label: 'Price: Low to High' },
    { value: 'priceHighLow', label: 'Price: High to Low' }
];

export default function AllProductsPage() {
    const { token } = useAuth();
    const [products, setProducts] = useState([]);
    const [wishlistIds, setWishlistIds] = useState([]); 
    const [totalCount, setTotalCount] = useState(0);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All Categories');
    const [condition, setCondition] = useState('All Conditions');
    const [sortOrder, setSortOrder] = useState('newest');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let url = `${process.env.NEXT_PUBLIC_API_URL}/products?page=${page}&limit=9&sort=${sortOrder}`;
                if (search) url += `&search=${encodeURIComponent(search)}`;
                if (category !== 'All Categories') url += `&category=${encodeURIComponent(category)}`;
                if (condition !== 'All Conditions') url += `&condition=${encodeURIComponent(condition)}`;
                if (minPrice) url += `&minPrice=${minPrice}`;
                if (maxPrice) url += `&maxPrice=${maxPrice}`;

                const res = await fetch(url);
                const data = await res.json();
                if (res.ok) {
                    setProducts(data.products || []);
                    setTotalPages(data.totalPages || 1);
                    setTotalCount(data.totalCount || 0);
                }
            } catch (err) {
                console.error("Error loading products:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [page, search, category, condition, sortOrder, minPrice, maxPrice]);

    useEffect(() => {
        if (!token) {
            setWishlistIds([]);
            return;
        }
        const fetchCurrentWishlist = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/buyer/wishlist`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await response.json();
                if (Array.isArray(data)) {
                    setWishlistIds(data.map(item => item._id));
                }
            } catch (err) {
                console.error("Error reading wishlist context states:", err);
            }
        };
        fetchCurrentWishlist();
    }, [token]);

    const handleToggleWishlist = async (productId) => {
        if (!token) {
            alert("Please sign in to save items to your wishlist!");
            return;
        }

        const isSaved = wishlistIds.includes(productId);

        try {
            if (isSaved) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/buyer/wishlist/${productId}`, {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    setWishlistIds(prev => prev.filter(id => id !== productId));
                }
            } else {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/buyer/wishlist`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ productId })
                });
                if (res.ok) {
                    setWishlistIds(prev => [...prev, productId]);
                }
            }
        } catch (err) {
            console.error("Failed to update wishlist item state:", err);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-neutral-950 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                
                <section className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-5 mb-8 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Search by product name..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            className="w-full px-4 py-2 text-sm bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                        />
                        <select
                            value={category}
                            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
                            className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none text-gray-900 dark:text-white"
                        >
                            {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                        <select
                            value={condition}
                            onChange={(e) => { setCondition(e.target.value); setPage(1); }}
                            className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none text-gray-900 dark:text-white"
                        >
                            {CONDITIONS.map((cond) => <option key={cond} value={cond}>{cond}</option>)}
                        </select>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-gray-100 dark:border-zinc-800">
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                placeholder="Min Price"
                                value={minPrice}
                                onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
                                className="w-24 px-3 py-1.5 text-xs bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-gray-900 dark:text-white"
                            />
                            <span className="text-gray-400 text-xs">to</span>
                            <input
                                type="number"
                                placeholder="Max Price"
                                value={maxPrice}
                                onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
                                className="w-24 px-3 py-1.5 text-xs bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-gray-900 dark:text-white"
                            />
                        </div>
                        <select
                            value={sortOrder}
                            onChange={(e) => { setSortOrder(e.target.value); setPage(1); }}
                            className="px-3 py-1.5 text-xs bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none text-gray-900 dark:text-white"
                        >
                            {SORT_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                    </div>
                </section>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-white dark:bg-zinc-900 h-80 rounded-xl border border-gray-200 dark:border-zinc-800" />
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800">
                        <p className="text-gray-500 dark:text-gray-400 text-sm">No products found matching your current search parameters.</p>
                    </div>
                ) : (
                    <AnimatePresence mode='popLayout'>
                        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    key={product._id}
                                    className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden flex flex-col hover:shadow-md transition-shadow group h-full"
                                >
                                    <div className="relative aspect-[4/3] bg-gray-100 dark:bg-zinc-800 overflow-hidden">
                                        <img
                                            src={product.images?.[0] || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3'}
                                            alt={product.title}
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <span className="absolute top-2 left-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-medium border border-gray-100 dark:border-zinc-800 text-gray-700 dark:text-zinc-300">
                                            {product.condition}
                                        </span>
                                    </div>

                                    <div className="p-4 flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{product.category}</span>
                                                <span className="text-xs font-bold text-gray-900 dark:text-white">${product.price?.toLocaleString()}</span>
                                            </div>
                                            <h3 className="text-sm font-bold text-gray-800 dark:text-zinc-100 tracking-tight line-clamp-1">{product.title}</h3>
                                            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1 line-clamp-2">{product.description}</p>
                                        </div>

                                        <div className="flex items-center gap-2 mt-4">
                                            <button
                                                onClick={() => window.location.href = `/products/${product._id}`}
                                                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold tracking-wide transition-colors text-center shadow-sm active:scale-[0.99]"
                                            >
                                                View Deal
                                            </button>

                                            <button
                                                onClick={() => handleToggleWishlist(product._id)}
                                                className={`p-2 rounded-lg border transition-all duration-200 flex items-center justify-center active:scale-95 ${
                                                    wishlistIds.includes(product._id)
                                                        ? 'bg-rose-500/10 border-rose-500/30 text-rose-500'
                                                        : 'border-gray-200 dark:border-zinc-800 text-gray-400 hover:text-rose-500 hover:bg-gray-50 dark:hover:bg-zinc-800'
                                                }`}
                                                title={wishlistIds.includes(product._id) ? "Remove from Wishlist" : "Save to Wishlist"}
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    fill={wishlistIds.includes(product._id) ? "currentColor" : "none"}
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                )}

                {totalPages > 1 && (
                    <section className="flex justify-center items-center space-x-2 mt-12">
                        <button
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            disabled={page === 1}
                            className="px-3 py-1.5 border border-gray-200 dark:border-zinc-800 rounded-lg text-xs disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                            Prev
                        </button>
                        <span className="text-xs font-mono px-3 text-gray-900 dark:text-white">{page} / {totalPages}</span>
                        <button
                            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                            disabled={page === totalPages}
                            className="px-3 py-1.5 border border-gray-200 dark:border-zinc-800 rounded-lg text-xs disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                            Next
                        </button>
                    </section>
                )}

            </div>
        </main>
    );
}