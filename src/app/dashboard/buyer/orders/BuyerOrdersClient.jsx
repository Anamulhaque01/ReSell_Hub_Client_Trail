'use client';

import React, { useState, useEffect } from 'react';
import { Package, X, Check, Loader2, AlertCircle, Search } from 'lucide-react';

export default function BuyerOrdersClient() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  
  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const statusMilestones = ['Pending', 'Accepted', 'Processing', 'Shipped', 'Delivered'];

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/buyer/overview`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
      const result = await response.json();
      if (result.success) {
        const mapped = result.recentOrders.map(o => ({
          _id: o._id,
          orderIdString: o._id ? `#${o._id.slice(-8).toUpperCase()}` : '#MQIPJFD1',
          title: o.productId?.title || 'Product Listing',
          date: o.createdAt ? new Date(o.createdAt).toLocaleDateString() : '6/18/2026',
          status: o.orderStatus || 'pending',
          price: o.price || o.productId?.price || 0,
          quantity: o.quantity || 1
        }));
        setOrders(mapped);
        setFilteredOrders(mapped);
      }
    } catch (error) {
      console.error('Error fetching order pipelines:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter and Search Pipeline Logic
  useEffect(() => {
    let result = orders;

    if (activeFilter !== 'All') {
      result = result.filter(o => o.status.toLowerCase() === activeFilter.toLowerCase());
    }

    if (searchQuery.trim() !== '') {
      result = result.filter(o => 
        o.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.orderIdString.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredOrders(result);
  }, [searchQuery, activeFilter, orders]);

  const handleCancelOrder = async (orderId) => {
    if (!confirm('Are you sure you want to cancel this order?')) return;
    
    setActionLoading(orderId);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/buyer/orders/${orderId}/cancel`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
      const result = await response.json();
      
      if (result.success) {
        fetchOrders();
      } else {
        alert(result.message || 'Failed to cancel order.');
      }
    } catch (error) {
      console.error('Cancellation error:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const getMilestoneIndex = (currentStatus) => {
    const statusMap = {
      'pending': 0,
      'accepted': 1,
      'processing': 2,
      'shipped': 3,
      'delivered': 4
    };
    return statusMap[currentStatus.toLowerCase()] ?? -1;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6 text-neutral-900 dark:text-neutral-100 font-sans antialiased transition-colors duration-200">
      
      {/* Fixed Invisible Heading: Adapts text color smoothly to light/dark */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">My Orders</h1>
      </div>

      {/* Theme-Adaptive Search Bar Container */}
      <div className="relative w-full">
        <Search className="absolute left-4 top-3.5 h-4 w-4 text-neutral-400 dark:text-zinc-500" />
        <input
          type="text"
          placeholder="Search orders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white dark:bg-[#0d0d0e] border border-neutral-200 dark:border-zinc-800/80 rounded-xl py-3 pl-11 pr-4 text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-zinc-500 focus:outline-none focus:border-neutral-400 dark:focus:border-zinc-700 shadow-sm dark:shadow-none transition-colors"
        />
      </div>

      {/* Theme-Adaptive Filter Badges */}
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
        {['All', 'Pending', 'Accepted', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              activeFilter === tab
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                : 'bg-neutral-100 dark:bg-zinc-900/40 text-neutral-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-zinc-800/50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders Item / Empty View Pipeline */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const currentMilestoneIndex = getMilestoneIndex(order.status);
          const isCancelled = order.status.toLowerCase() === 'cancelled';

          return (
            <div 
              key={order._id}
              className="bg-white dark:bg-[#0d0d0e] border border-neutral-200 dark:border-zinc-800/80 rounded-xl p-6 space-y-6 relative shadow-sm dark:shadow-none transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-neutral-50 dark:bg-zinc-900/60 border border-neutral-200 dark:border-zinc-800/40 text-blue-500 mt-0.5">
                    <Package size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">{order.title}</h3>
                    <p className="text-xs font-semibold text-neutral-400 dark:text-zinc-500 mt-0.5">Order {order.orderIdString}</p>
                    <p className="text-xs font-medium text-neutral-400 dark:text-zinc-500 mt-1">Placed: {order.date}</p>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <div>
                    {isCancelled ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/30 uppercase tracking-wide">
                        Cancelled
                      </span>
                    ) : order.status.toLowerCase() === 'delivered' ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-900/30 uppercase tracking-wide">
                        Delivered
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/30 uppercase tracking-wide">
                        Pending
                      </span>
                    )}
                  </div>
                  <p className="text-lg font-black text-blue-600 dark:text-blue-500 pt-1">${order.price}</p>
                  <p className="text-[11px] text-neutral-400 dark:text-zinc-500 font-medium">Qty: {order.quantity}</p>
                </div>
              </div>

              {/* Horizontal Milestones Track line (Adapts color codes) */}
              {!isCancelled && (
                <div className="pt-2 pb-4 hidden md:block">
                  <div className="relative flex items-center justify-between w-full">
                    <div className="absolute left-0 right-0 top-3.5 h-0.5 bg-neutral-100 dark:bg-zinc-800 -z-0" />
                    
                    {statusMilestones.map((milestone, idx) => {
                      const isCompleted = idx <= currentMilestoneIndex;
                      const isCurrent = idx === currentMilestoneIndex;

                      return (
                        <div key={milestone} className="flex flex-col items-center relative z-10 flex-1">
                          <div 
                            className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all ${
                              isCompleted 
                                ? 'bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-500/20' 
                                : 'bg-white dark:bg-[#0d0d0e] border-neutral-300 dark:border-zinc-700 text-neutral-400 dark:text-zinc-500'
                            }`}
                          >
                            {isCompleted ? <Check size={12} strokeWidth={3} /> : <div className="w-1.5 h-1.5 bg-neutral-300 dark:bg-zinc-600 rounded-full" />}
                          </div>
                          <span 
                            className={`text-[10px] font-bold mt-2 tracking-wide transition-colors ${
                              isCurrent ? 'text-blue-600 dark:text-blue-400' : isCompleted ? 'text-neutral-700 dark:text-zinc-300' : 'text-neutral-400 dark:text-zinc-600'
                            }`}
                          >
                            {milestone}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Action triggers */}
              {!isCancelled && currentMilestoneIndex < 3 && (
                <div className="pt-2 border-t border-neutral-100 dark:border-zinc-800/40">
                  <button
                    disabled={actionLoading === order._id}
                    onClick={() => handleCancelOrder(order._id)}
                    className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors disabled:opacity-50"
                  >
                    {actionLoading === order._id ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : (
                      <X size={13} strokeWidth={2.5} />
                    )}
                    <span>Cancel Order</span>
                  </button>
                </div>
              )}

            </div>
          );
        })}

        {/* Clean, Fixed Middle Block Empty State: Blends beautifully into light & dark layouts */}
        {filteredOrders.length === 0 && (
          <div className="bg-white dark:bg-[#0d0d0e] border border-dashed border-neutral-200 dark:border-zinc-800 rounded-xl p-12 text-center max-w-xl mx-auto space-y-3 shadow-sm dark:shadow-none transition-all">
            <div className="w-10 h-10 rounded-full bg-neutral-50 dark:bg-zinc-900/60 border border-neutral-200 dark:border-zinc-800 flex items-center justify-center text-neutral-400 dark:text-zinc-500 mx-auto">
              <AlertCircle size={18} />
            </div>
            <p className="text-sm font-semibold text-neutral-500 dark:text-zinc-400">
              No orders matched your active criteria filter parameters.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}