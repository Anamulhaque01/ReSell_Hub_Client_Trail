    'use client';

    import React, { useState, useEffect } from 'react';
    import { ShoppingBag, Heart, CreditCard, Package, MoveRight } from 'lucide-react';
    import Link from 'next/link';

    export default function BuyerOverviewClient() {
    const [firstName, setFirstName] = useState('there');
    const [metrics, setMetrics] = useState({
        stats: { totalOrders: 0, wishlistCount: 0, totalSpent: 0, completedOrders: 0 },
        recentOrders: [],
        wishlist: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function initDashboard() {
        try {
            const token = localStorage.getItem('token');
            if (token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(atob(base64));
            if (payload?.name) {
                setFirstName(payload.name.split(' ')[0]);
            }
            }

            const response = await fetch('http://localhost:5000/api/buyer/overview', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            }
            });
            const result = await response.json();
            if (result.success) {
            setMetrics({
                stats: result.stats,
                recentOrders: result.recentOrders.map(o => ({
                ...o,
                title: o.productId?.title || 'Product Listing',
                date: o.createdAt ? new Date(o.createdAt).toLocaleDateString() : 'Recent'
                })),
                wishlist: result.wishlist
            });
            }
        } catch (error) {
            console.error('Error loading dashboard metrics:', error);
        } finally {
            setLoading(false);
        }
        }
        initDashboard();
    }, []);

    if (loading) {
        return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="w-5 h-5 border-2 border-neutral-300 dark:border-zinc-700 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        );
    }

    return (
        <div className="space-y-8 text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
        
        {/* Dynamic Header text block */}
        <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Welcome back, {firstName}! 👋
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Here's what's happening with your account
            </p>
        </div>

        {/* Responsive Analytics Cards with Mode fixes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white dark:bg-[#0d0d0e] border border-neutral-200/70 dark:border-zinc-800/80 rounded-xl p-5 relative group transition-colors duration-200">
            <div className="flex justify-between items-start">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                <ShoppingBag size={18} />
                </div>
                <MoveRight size={14} className="text-neutral-400 dark:text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-2xl font-bold mt-4 text-neutral-900 dark:text-white">{metrics.stats.totalOrders}</p>
            <p className="text-[11px] text-neutral-400 font-medium mt-0.5">Total Orders</p>
            </div>

            <div className="bg-white dark:bg-[#0d0d0e] border border-neutral-200/70 dark:border-zinc-800/80 rounded-xl p-5 relative group transition-colors duration-200">
            <div className="flex justify-between items-start">
                <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-500 dark:text-rose-400">
                <Heart size={18} />
                </div>
                <MoveRight size={14} className="text-neutral-400 dark:text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-2xl font-bold mt-4 text-neutral-900 dark:text-white">{metrics.stats.wishlistCount}</p>
            <p className="text-[11px] text-neutral-400 font-medium mt-0.5">Wishlist Items</p>
            </div>

            <div className="bg-white dark:bg-[#0d0d0e] border border-neutral-200/70 dark:border-zinc-800/80 rounded-xl p-5 relative group transition-colors duration-200">
            <div className="flex justify-between items-start">
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                <CreditCard size={18} />
                </div>
                <MoveRight size={14} className="text-neutral-400 dark:text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-2xl font-bold mt-4 text-neutral-900 dark:text-white">
                ${metrics.stats.totalSpent?.toLocaleString()}
            </p>
            <p className="text-[11px] text-neutral-400 font-medium mt-0.5">Total Spent</p>
            </div>

            <div className="bg-white dark:bg-[#0d0d0e] border border-neutral-200/70 dark:border-zinc-800/80 rounded-xl p-5 relative group transition-colors duration-200">
            <div className="flex justify-between items-start">
                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
                <Package size={18} />
                </div>
                <MoveRight size={14} className="text-neutral-400 dark:text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-2xl font-bold mt-4 text-neutral-900 dark:text-white">{metrics.stats.completedOrders}</p>
            <p className="text-[11px] text-neutral-400 font-medium mt-0.5">Completed Orders</p>
            </div>

        </div>

        {/* Recent Orders Cards */}
        <div className="space-y-3">
            <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-tight text-neutral-800 dark:text-neutral-200">Recent Orders</h2>
            <Link href="/dashboard/buyer/orders" className="text-xs font-semibold text-neutral-400 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1 transition-colors">
                View All <MoveRight size={12} />
            </Link>
            </div>

            <div className="space-y-2">
            {metrics.recentOrders.map((order) => (
                <div 
                key={order._id}
                className="bg-white dark:bg-[#0d0d0e] border border-neutral-200/60 dark:border-zinc-800/80 rounded-xl p-4 flex items-center justify-between transition-colors duration-200"
                >
                <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-neutral-50 dark:bg-zinc-800/50 text-neutral-400 dark:text-zinc-500">
                    <Package size={16} />
                    </div>
                    <div>
                    <h4 className="text-sm font-medium text-neutral-800 dark:text-neutral-200 tracking-tight">{order.title}</h4>
                    <p className="text-[11px] text-neutral-400 font-medium mt-0.5">{order.date}</p>
                    </div>
                </div>

                <div className="text-right space-y-1">
                    <div>
                    {order.orderStatus === 'cancelled' && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-50 dark:bg-red-950/20 text-red-500 dark:text-red-400 uppercase tracking-wide">
                        Cancelled
                        </span>
                    )}
                    {order.orderStatus === 'delivered' && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-50 dark:bg-green-950/20 text-green-500 dark:text-green-400 uppercase tracking-wide">
                        Delivered
                        </span>
                    )}
                    {order.orderStatus === 'pending' && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/20 text-amber-500 dark:text-amber-400 uppercase tracking-wide">
                        Pending
                        </span>
                    )}
                    </div>
                    <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
                    ${order.price || order.productId?.price}
                    </p>
                </div>
                </div>
            ))}
            </div>
        </div>

        {/* Wishlist Dynamic Section */}
        <div className="space-y-3">
            <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-tight text-neutral-800 dark:text-neutral-200">Wishlist</h2>
            <Link href="/dashboard/buyer/wishlist" className="text-xs font-semibold text-neutral-400 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1 transition-colors">
                View All <MoveRight size={12} />
            </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.wishlist.map((item) => (
                <div 
                key={item._id}
                className="bg-white dark:bg-[#0d0d0e] border border-neutral-200/70 dark:border-zinc-800/80 rounded-xl p-4 flex flex-col justify-between h-32 transition-colors duration-200"
                >
                <h4 className="text-sm font-medium text-neutral-800 dark:text-neutral-200 tracking-tight line-clamp-2">{item.title}</h4>
                <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
                    ${item.price}
                </p>
                </div>
            ))}
            </div>
        </div>

        </div>
    );
    }