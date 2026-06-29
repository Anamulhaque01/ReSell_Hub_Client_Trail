// src/app/products/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ['All Categories', 'Electronics', 'Furniture', 'Vehicles', 'Fashion', 'Mobile Phones'];
const CONDITIONS = ['All Conditions', 'New', 'Like-New', 'Good', 'Fair', 'Poor'];
const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest First' },
    { value: 'priceLowHigh', label: 'Price: Low to High' },
    { value: 'priceHighLow', label: 'Price: High to Low' }
];

export default function AllProductsPage() {
    const [products, setProducts] = useState([]);
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
                // Construct clean explicit params matching assignment spec
                const query = new URLSearchParams();
                
                if (search.trim()) query.append('search', search.trim());
                if (category !== 'All Categories') query.append('category', category);
                if (condition !== 'All Conditions') query.append('condition', condition);
                if (sortOrder) query.append('sort', sortOrder);
                if (minPrice) query.append('minPrice', minPrice);
                if (maxPrice) query.append('maxPrice', maxPrice);
                
                query.append('page', page.toString());
                query.append('limit', '8');

                const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
                const response = await fetch(`${baseUrl}/products?${query.toString()}`);
                const data = await response.json();

                // Flexible adaptation layer for any database array configuration
                if (Array.isArray(data)) {
                    setProducts(data);
                    setTotalCount(data.length);
                    setTotalPages(1);
                } else if (data && data.success) {
                    setProducts(data.products || []);
                    setTotalCount(data.meta?.totalProducts ?? (data.products?.length || 0));
                    setTotalPages(data.meta?.totalPages ?? 1);
                } else if (data && data.products) {
                    setProducts(data.products);
                    setTotalCount(data.products.length);
                    setTotalPages(1);
                } else {
                    setProducts([]);
                    setTotalCount(0);
                }
            } catch (error) {
                console.error("Error loading products from database:", error);
                setProducts([]);
                setTotalCount(0);
            } finally {
                setLoading(false);
            }
        };

        // Simple debounce handler window for clean searching text states
        const timer = setTimeout(() => {
            fetchProducts();
        }, 300);

        return () => clearTimeout(timer);
    }, [search, category, condition, sortOrder, minPrice, maxPrice, page]);

    const getConditionColor = (cond) => {
        switch (cond?.toLowerCase()) {
            case 'new': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            case 'like-new': return 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20';
            case 'good': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'fair': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            case 'poor': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
            default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
        }
    };

    return (
        <main className="min-h-screen bg-white dark:bg-[#0b0b0c] text-gray-900 dark:text-gray-100 py-10 px-4 sm:px-8 lg:px-16 transition-colors duration-200">
            <div className="max-w-[1400px] mx-auto">

                {/* Title Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold tracking-tight">Browse Products</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{totalCount} items found</p>
                </div>

                {/* Global Filter Bar Layout Section */}
                <section className="space-y-3 mb-8">
                    <div className="w-full">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            className="w-full px-4 py-2.5 bg-white dark:bg-[#121214] border border-gray-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all text-gray-900 dark:text-white"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-sm">
                        <select
                            value={category}
                            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
                            className="px-3 py-2 bg-white dark:bg-[#121214] border border-gray-200 dark:border-zinc-800 rounded-lg focus:outline-none cursor-pointer text-gray-900 dark:text-white"
                        >
                            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>

                        <select
                            value={condition}
                            onChange={(e) => { setCondition(e.target.value); setPage(1); }}
                            className="px-3 py-2 bg-white dark:bg-[#121214] border border-gray-200 dark:border-zinc-800 rounded-lg focus:outline-none cursor-pointer text-gray-900 dark:text-white"
                        >
                            {CONDITIONS.map(cond => <option key={cond} value={cond}>{cond}</option>)}
                        </select>

                        <select
                            value={sortOrder}
                            onChange={(e) => { setSortOrder(e.target.value); setPage(1); }}
                            className="px-3 py-2 bg-white dark:bg-[#121214] border border-gray-200 dark:border-zinc-800 rounded-lg focus:outline-none cursor-pointer text-gray-900 dark:text-white"
                        >
                            {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>

                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                placeholder="Min ৳"
                                value={minPrice}
                                onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
                                className="w-24 px-3 py-2 bg-white dark:bg-[#121214] border border-gray-200 dark:border-zinc-800 rounded-lg focus:outline-none text-center text-gray-900 dark:text-white"
                            />
                            <span className="text-gray-400">—</span>
                            <input
                                type="number"
                                placeholder="Max ৳"
                                value={maxPrice}
                                onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
                                className="w-24 px-3 py-2 bg-white dark:bg-[#121214] border border-gray-200 dark:border-zinc-800 rounded-lg focus:outline-none text-center text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>
                </section>

                {/* Catalog Grid Area */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {[...Array(4)].map((_, idx) => (
                            <div key={idx} className="animate-pulse bg-gray-50 dark:bg-[#121214] border border-gray-200 dark:border-zinc-800 rounded-xl p-3 h-[440px] flex flex-col justify-between">
                                <div className="w-full h-48 bg-gray-200 dark:bg-zinc-800 rounded-lg" />
                                <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-3/4 my-2" />
                                <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/2" />
                                <div className="h-10 bg-gray-200 dark:bg-zinc-800 rounded w-full mt-4" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout">
                        {products.length === 0 ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 border border-dashed border-gray-200 dark:border-zinc-800 rounded-xl w-full">
                                <p className="text-gray-400">No items found matching your filter selection inside the database.</p>
                            </motion.div>
                        ) : (
                            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                                {products.map((product) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        key={product._id}
                                        className="bg-white dark:bg-[#121214] border border-gray-100 dark:border-[#1d1d22] rounded-xl p-3 flex flex-col justify-between h-[440px] shadow-sm relative group"
                                    >
                                        <div className="w-full h-48 rounded-lg overflow-hidden relative bg-white flex items-center justify-center border border-gray-100 dark:border-zinc-800">
                                            <img
                                                src={product.images?.[0] || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80'}
                                                alt={product.title}
                                                className="max-h-full max-w-full object-contain p-2"
                                                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80' }}
                                            />
                                            <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded border ${getConditionColor(product.condition)}`}>
                                                {product.condition}
                                            </span>
                                        </div>

                                        <div className="mt-3 flex-grow flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-blue-500 transition-colors">
                                                    {product.title}
                                                </h3>
                                                <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 mt-1">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                    <span>{product.sellerInfo?.location || product.location || 'Khulna, BD'}</span>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-baseline mt-2">
                                                <span className="text-lg font-bold text-blue-600 dark:text-blue-500 font-mono">
                                                    ৳{Number(product.price).toLocaleString()}
                                                </span>
                                                <span className="text-[11px] text-gray-400 dark:text-gray-500">
                                                    {product.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 mt-3">
                                            <button
                                                onClick={() => window.location.href = `/products/${product._id}`}
                                                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold tracking-wide transition-colors text-center"
                                            >
                                                View Deal
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}

                {/* Pagination Navigation Section */}
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