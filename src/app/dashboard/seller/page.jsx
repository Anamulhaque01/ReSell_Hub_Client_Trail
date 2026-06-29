'use client';
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
// Import your custom hook to track active layout state
import { useTheme } from '@/context/ThemeContext';

export default function SellerDashboardOverview() {
  const { theme } = useTheme();
  const [data, setData] = useState({
    stats: {
      totalProducts: 0,
      totalSales: 0,
      totalRevenue: 0,
      pendingOrders: 0,
      activeListings: 0,
      approvedCount: 0,
      pendingApprovalCount: 0,
      rejectedCount: 0
    },
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardMetrics() {
      try {
        const response = await fetch('/api/seller/stats', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('resell_token')}`
          }
        });
        if (response.ok) {
          const resData = await response.json();
          setData(resData);
        }
      } catch (error) {
        console.error("Error reading dashboard tracking summary data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardMetrics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-6 w-6 border-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Dynamic theme wrapper styles
  const cardBg = theme === 'dark' ? 'bg-[#0e0e11] border-zinc-800/80' : 'bg-white border-zinc-200 shadow-sm';
  const textMain = theme === 'dark' ? 'text-white' : 'text-zinc-900';
  const textMuted = theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500';

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Profile Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold tracking-tight ${textMain}`}>Seller Dashboard</h1>
          <p className={`${textMuted} text-xs mt-1`}>Welcome back, Alex!</p>
        </div>
        <Link 
          href="/dashboard/seller/add-product"
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-2 rounded transition-colors inline-flex items-center gap-2"
        >
          <span className="text-sm font-semibold">+</span> Add Product
        </Link>
      </div>

      {/* Grid Container Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className={`border rounded-xl p-5 relative overflow-hidden transition-colors ${cardBg}`}>
          <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs mb-4 ${
            theme === 'dark' ? 'bg-blue-950/40 border border-blue-900/40 text-blue-400' : 'bg-blue-50 text-blue-600'
          }`}>
            📦
          </div>
          <p className={`text-3xl font-bold tracking-tight ${textMain}`}>{data.stats.totalProducts}</p>
          <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mt-1">My Products</p>
        </div>

        {/* Metric 2 */}
        <div className={`border rounded-xl p-5 relative overflow-hidden transition-colors ${cardBg}`}>
          <span className={`absolute top-3 right-3 h-4 w-4 text-[9px] rounded-full flex items-center justify-center font-bold border ${
            theme === 'dark' ? 'bg-red-950 text-red-400 border-red-900' : 'bg-red-50 text-red-600 border-red-200'
          }`}>
            1
          </span>
          <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs mb-4 ${
            theme === 'dark' ? 'bg-purple-950/40 border border-purple-900/40 text-purple-400' : 'bg-purple-50 text-purple-600'
          }`}>
            💼
          </div>
          <p className={`text-3xl font-bold tracking-tight ${textMain}`}>{data.stats.totalSales}</p>
          <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mt-1">Total Orders</p>
        </div>

        {/* Metric 3 */}
        <div className={`border rounded-xl p-5 relative overflow-hidden transition-colors ${cardBg}`}>
          <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs mb-4 ${
            theme === 'dark' ? 'bg-emerald-950/40 border border-emerald-900/40 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
          }`}>
            $
          </div>
          <p className={`text-3xl font-bold tracking-tight ${textMain}`}>${data.stats.totalRevenue.toLocaleString()}</p>
          <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mt-1">Total Revenue</p>
        </div>

        {/* Metric 4 */}
        <div className={`border rounded-xl p-5 relative overflow-hidden transition-colors ${cardBg}`}>
          <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs mb-4 ${
            theme === 'dark' ? 'bg-cyan-950/40 border border-cyan-900/40 text-cyan-400' : 'bg-cyan-50 text-cyan-600'
          }`}>
            📈
          </div>
          <p className={`text-3xl font-bold tracking-tight ${textMain}`}>{data.stats.activeListings}</p>
          <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mt-1">Active Listings</p>
        </div>
      </div>

      {/* Recent Orders Processing Table Block Framework */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className={`text-sm font-semibold tracking-wide ${theme === 'dark' ? 'text-zinc-200' : 'text-zinc-700'}`}>Recent Orders</h3>
          <Link href="/dashboard/seller/orders" className="text-xs font-medium text-blue-500 hover:underline inline-flex items-center gap-1">
            View All <span className="text-[10px]">→</span>
          </Link>
        </div>

        <div className={`border rounded-xl divide-y transition-colors ${cardBg} ${theme === 'dark' ? 'divide-zinc-900' : 'divide-zinc-100'}`}>
          {data.recentOrders.length === 0 ? (
            <div className={`p-6 text-center text-xs ${textMuted}`}>No active incoming orders recorded.</div>
          ) : (
            data.recentOrders.map((order) => (
              <div key={order._id} className="flex items-center justify-between p-4 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition-colors">
                <div className="space-y-0.5">
                  <h4 className={`text-xs font-semibold ${theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'}`}>{order.productTitle}</h4>
                  <p className="text-[11px] text-zinc-500">Buyer: {order.buyerInfo?.name}</p>
                </div>
                <div className="flex items-center gap-6">
                  <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded border ${
                    order.orderStatus === 'delivered' 
                      ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/50'
                      : order.orderStatus === 'cancelled'
                      ? 'bg-red-950/40 text-red-400 border-red-900/50'
                      : 'bg-amber-950/40 text-amber-400 border-amber-900/50'
                  }`}>
                    {order.orderStatus}
                  </span>
                  <span className={`text-xs font-bold w-16 text-right ${theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'}`}>${order.amount}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Base Validation Section: Products Status Panels */}
      <div className="space-y-3">
        <h3 className={`text-sm font-semibold tracking-wide ${theme === 'dark' ? 'text-zinc-200' : 'text-zinc-700'}`}>Products Status</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className={`border rounded-xl p-4 text-center transition-colors ${cardBg}`}>
            <p className="text-xl font-bold text-emerald-500">{data.stats.approvedCount}</p>
            <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider mt-1">Approved</p>
          </div>
          <div className={`border rounded-xl p-4 text-center transition-colors ${cardBg}`}>
            <p className="text-xl font-bold text-amber-500">{data.stats.pendingApprovalCount}</p>
            <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider mt-1">Pending</p>
          </div>
          <div className={`border rounded-xl p-4 text-center transition-colors ${cardBg}`}>
            <p className="text-xl font-bold text-red-500">{data.stats.rejectedCount}</p>
            <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider mt-1">Rejected</p>
          </div>
        </div>
      </div>
    </div>
  );
}