'use client';

import React, { useState, useEffect } from 'react';
import { 
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';

export default function AdminAnalyticsPage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(timer);
    }, []);

    // Synthetic platform datasets matching the dark UI specs
    const userGrowthData = [
        { name: 'Feb', Users: 45 },
        { name: 'Mar', Users: 95 },
        { name: 'Apr', Users: 95 },
        { name: 'May', Users: 52 },
        { name: 'Jun', Users: 72 },
        { name: 'Jul', Users: 38 },
    ];

    const monthlyOrdersData = [
        { name: 'Feb', Orders: 12 },
        { name: 'Mar', Orders: 11 },
        { name: 'Apr', Orders: 18 },
        { name: 'May', Orders: 68 },
        { name: 'Jun', Orders: 15 },
        { name: 'Jul', Orders: 10 },
    ];

    const categoryData = [
        { name: 'Mobile Phones', value: 2, color: '#3b82f6' },
        { name: 'Electronics', value: 5, color: '#10b981' },
        { name: 'Furniture', value: 3, color: '#f97316' },
        { name: 'Vehicles', value: 1, color: '#a855f7' },
        { name: 'Fashion', value: 3, color: '#ec4899' },
        { name: 'Sports', value: 2, color: '#06b6d4' },
    ];

    if (loading) {
        return (
            <div className="space-y-6 w-full p-2">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 h-72 bg-[#0b0c0e] border border-zinc-900 rounded-xl animate-pulse" />
                    <div className="h-72 bg-[#0b0c0e] border border-zinc-900 rounded-xl animate-pulse" />
                </div>
                <div className="h-72 bg-[#0b0c0e] border border-zinc-900 rounded-xl animate-pulse" />
            </div>
        );
    }

    return (
        <div className="space-y-6 w-full text-zinc-100 p-2 min-h-screen">
            
            {/* Top row: User Growth and Category Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* User Growth Line Area Graph */}
                <div className="bg-[#0b0c0e] border border-zinc-900 rounded-xl p-5 lg:col-span-2 flex flex-col justify-between">
                    <div className="mb-4">
                        <h4 className="text-sm font-semibold text-zinc-200 tracking-wide">User Growth</h4>
                    </div>
                    <div className="h-60 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={userGrowthData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#52525b" fontSize={11} tickLine={false} />
                                <YAxis stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                                <CartesianGrid stroke="#18181b" vertical={false} />
                                <Tooltip contentStyle={{ backgroundColor: '#0b0c0e', borderColor: '#27272a' }} />
                                <Area type="monotone" dataKey="Users" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#userGradient)" dot={{ r: 4, strokeWidth: 2, fill: '#0b0c0e' }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Category Donut Allocation */}
                <div className="bg-[#0b0c0e] border border-zinc-900 rounded-xl p-5 flex flex-col justify-between">
                    <div>
                        <h4 className="text-sm font-semibold text-zinc-200 tracking-wide">Category Performance</h4>
                    </div>
                    <div className="h-48 w-full relative flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={55} outerRadius={72} paddingAngle={3} dataKey="value">
                                    {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#0b0c0e', borderColor: '#27272a' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute text-center">
                            <span className="text-2xl font-bold text-zinc-100">16</span>
                            <p className="text-[10px] uppercase tracking-wider text-zinc-500">Items</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-zinc-400 px-1">
                        {categoryData.map((item) => (
                            <div key={item.name} className="flex items-center gap-1.5 truncate">
                                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                <span className="truncate">{item.name}: {item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Full-Width Monthly Orders Graph */}
            <div className="bg-[#0b0c0e] border border-zinc-900 rounded-xl p-5">
                <div className="mb-4">
                    <h4 className="text-sm font-semibold text-zinc-200 tracking-wide">Monthly Orders</h4>
                </div>
                <div className="h-60 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={monthlyOrdersData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                            <defs>
                                <linearGradient id="orderGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="#52525b" fontSize={11} tickLine={false} />
                            <YAxis stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                            <CartesianGrid stroke="#18181b" vertical={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#0b0c0e', borderColor: '#27272a' }} />
                            <Area type="monotone" dataKey="Orders" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#orderGradient)" dot={{ r: 4, strokeWidth: 2, fill: '#0b0c0e' }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
}