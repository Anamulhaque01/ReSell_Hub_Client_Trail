'use client';
import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function ManageOrdersPage() {
  const { theme } = useTheme();
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All Orders');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('resell_token');
      const res = await fetch('http://localhost:5000/api/seller/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setOrders(data);
      else setError(data.message || 'Failed to fetch incoming orders.');
    } catch (err) {
      setError('Network communication failed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleUpdateStatus = async (orderId, nextStatus) => {
    try {
      const token = localStorage.getItem('resell_token');
      const res = await fetch(`http://localhost:5000/api/seller/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ orderStatus: nextStatus })
      });
      if (res.ok) {
        fetchOrders();
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to update order status.');
      }
    } catch (err) {
      alert('Error changing status tracker.');
    }
  };

  // Filter orders based on dropdown selection to match image_94aebd.png functionality
  const filteredOrders = orders.filter(order => {
    if (statusFilter === 'All Orders') return true;
    return order.orderStatus?.toLowerCase() === statusFilter.toLowerCase();
  });

  const isDark = theme === 'dark';
  const bgFrame = isDark ? 'bg-[#09090b] text-white' : 'bg-white text-zinc-900';
  const cardBg = isDark ? 'bg-[#09090b] border-zinc-800' : 'bg-white border-zinc-100 shadow-sm';
  const subText = isDark ? 'text-zinc-400' : 'text-zinc-500';
  const filterSelectBg = isDark ? 'bg-[#0e0e11] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-800';

  // Dynamic Badge Color Configuration matching image_94aebd.png
  const getStatusBadge = (status) => {
    const normalize = status?.toLowerCase();
    if (normalize === 'cancelled' || normalize === 'rejected') {
      return 'bg-red-50 text-red-500 dark:bg-red-950/20 dark:text-red-400';
    }
    if (normalize === 'delivered') {
      return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400';
    }
    return 'bg-orange-50 text-orange-600 dark:bg-orange-950/20 dark:text-orange-400'; // For 'pending', 'accepted', etc.
  };

  if (loading) return <div className="p-12 text-center text-xs font-semibold tracking-widest text-zinc-500 animate-pulse">LOADING ORDERS DIRECTORY...</div>;

  return (
    <div className={`space-y-6 py-4 min-h-screen transition-colors ${bgFrame}`}>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Manage Orders</h1>
      </div>

      {/* Filter Dropdown precisely designed like image_94aebd.png */}
      <div className="w-56">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={`w-full text-xs font-medium px-3 py-2 rounded-lg border outline-none cursor-pointer shadow-sm ${filterSelectBg}`}
        >
          <option value="All Orders">All Orders</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {error && <div className="p-3 text-xs bg-red-950/40 border border-red-900 text-red-400 rounded-lg">{error}</div>}

      {/* Main Card-Based Order List Feed */}
      <div className="space-y-4 max-w-6xl">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-xs font-medium text-zinc-500 border border-dashed rounded-xl">
            No listings found matching the current order status profile context.
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div 
              key={order._id} 
              className={`border rounded-xl p-5 flex flex-col justify-between gap-4 transition-colors ${cardBg}`}
            >
              <div className="flex justify-between items-start">
                {/* Left Metadata Stack */}
                <div className="space-y-1">
                  <h3 className="text-sm font-bold tracking-tight">
                    {order.productName || 'Product Title Stack'}
                  </h3>
                  <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    Buyer: {order.buyerInfo?.name || 'Chris Wang'} • <span className={subText}>{order.buyerInfo?.email || 'buyer1@resellhub.com'}</span>
                  </p>
                  <p className={`text-[11px] font-medium font-mono ${subText}`}>
                    Order ID: #{order._id?.substring(0, 8).toUpperCase() || 'MQIORGXA'}
                  </p>
                  <p className={`text-[11px] font-medium ${subText}`}>
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '5/29/2026'} • Qty: {order.quantity || 1}
                  </p>
                </div>

                {/* Right Status & Financial Matrix */}
                <div className="text-right space-y-2 shrink-0">
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold capitalize ${getStatusBadge(order.orderStatus)}`}>
                    {order.orderStatus || 'Pending'}
                  </span>
                  <p className="text-lg font-black text-emerald-500 tracking-tight block">
                    ${order.amount || 750}
                  </p>
                </div>
              </div>

              {/* Conditional Action Triggers matching image_94aebd.png footer buttons */}
              {order.orderStatus?.toLowerCase() === 'pending' && (
                <div className="flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/40">
                  <button
                    onClick={() => handleUpdateStatus(order._id, 'Accepted')}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2 rounded transition-all shadow-sm"
                  >
                    Mark as accepted
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(order._id, 'Cancelled')}
                    className="bg-transparent hover:bg-red-50 text-red-500 border border-red-200 dark:border-red-900/40 dark:hover:bg-red-950/20 font-bold text-xs px-4 py-2 rounded transition-all"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}