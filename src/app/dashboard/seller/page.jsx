'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

export default function SellerDashboard() {
  const { theme } = useTheme();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 0,
    activeListings: 0,
    approvedCount: 0,
    pendingApprovalCount: 0,
    rejectedCount: 0
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch Stats and Inventory data parallelly from backend endpoints
  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('resell_token');

      // 1. Fetch performance stats matrix
      const statsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seller/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const statsData = await statsRes.json();

      // 2. Fetch specific products listed by active seller
      const productsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seller/products`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const productsData = await productsRes.json();

      if (statsRes.ok && productsRes.ok) {
        setStats(statsData.stats);
        setProducts(productsData);
      } else {
        setError(statsData.message || productsData.message || 'Failed to gather dashboard context details.');
      }
    } catch (err) {
      setError('Network communication failure encountered.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Handle live database deletion operations
  const handleDeleteProduct = async (productId) => {
    if (!confirm('Are you absolutely sure you want to remove this product listing from the marketplace database?')) return;

    try {
      const token = localStorage.getItem('resell_token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seller/products/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        // Refresh values instantly across visual frames without deep full-page reloads
        fetchDashboardData();
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to complete deletion process pipeline.');
      }
    } catch (err) {
      alert('Network transmission barrier occurred during deletion.');
    }
  };

  // Dynamic Swiss Minimalist Color Profiles matching light/dark context screens perfectly
  const isDark = theme === 'dark';
  const bgFrame = isDark ? 'bg-[#09090b] text-white' : 'bg-zinc-50 text-zinc-900';
  const cardBg = isDark ? 'bg-[#0e0e11] border-zinc-800/80' : 'bg-white border-zinc-200/80 shadow-sm';
  const subText = isDark ? 'text-zinc-500' : 'text-zinc-400';
  const labelText = isDark ? 'text-zinc-400' : 'text-zinc-600';
  const tableBorder = isDark ? 'border-zinc-800/60' : 'border-zinc-100';
  const rowHover = isDark ? 'hover:bg-zinc-900/40' : 'hover:bg-zinc-50/80';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-xs font-semibold tracking-widest text-zinc-500 animate-pulse">
        SYNCING REALTIME DATABASE INDICES...
      </div>
    );
  }

  return (
    <div className={`space-y-8 py-2 min-h-screen transition-colors duration-200 ${bgFrame}`}>
      
      {/* Upper Dashboard Welcome Segment */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Seller Hub Overview</h1>
          <p className={`text-xs mt-1 ${subText}`}>Monitor active sales revenue parameters and catalog entries.</p>
        </div>
        <Link 
          href="/dashboard/seller/add-product"
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2.5 rounded transition-all shadow-sm"
        >
          + Add New Product
        </Link>
      </div>

      {error && (
        <div className="p-3 text-xs font-semibold rounded border bg-red-950/40 text-red-400 border-red-900/50">
          {error}
        </div>
      )}

      {/* 1. Real-Time Stats Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-medium">
        
        <div className={`border rounded-xl p-5 transition-colors ${cardBg}`}>
          <p className={`font-semibold tracking-wider uppercase text-[10px] ${subText}`}>Total Revenue</p>
          <p className="text-2xl font-bold tracking-tight mt-1.5 text-emerald-500">${stats.totalRevenue.toFixed(2)}</p>
        </div>

        <div className={`border rounded-xl p-5 transition-colors ${cardBg}`}>
          <p className={`font-semibold tracking-wider uppercase text-[10px] ${subText}`}>Products Listed</p>
          <p className="text-2xl font-bold tracking-tight mt-1.5">{stats.totalProducts}</p>
        </div>

        <div className={`border rounded-xl p-5 transition-colors ${cardBg}`}>
          <p className={`font-semibold tracking-wider uppercase text-[10px] ${subText}`}>Successful Sales</p>
          <p className="text-2xl font-bold tracking-tight mt-1.5 text-blue-500">{stats.totalSales}</p>
        </div>

        <div className={`border rounded-xl p-5 transition-colors ${cardBg}`}>
          <p className={`font-semibold tracking-wider uppercase text-[10px] ${subText}`}>Live Active Items</p>
          <p className="text-2xl font-bold tracking-tight mt-1.5 text-amber-500">{stats.activeListings}</p>
        </div>

      </div>

      {/* 2. Live Inventory Catalog Management Area */}
      <div className={`border rounded-xl overflow-hidden transition-colors ${cardBg}`}>
        <div className={`p-5 border-b ${tableBorder}`}>
          <h2 className="text-sm font-bold tracking-tight">Active Inventory Directory</h2>
          <p className={`text-[11px] mt-0.5 ${subText}`}>Direct transactional lifecycle control for your listed products.</p>
        </div>

        {products.length === 0 ? (
          <div className="p-10 text-center text-xs text-zinc-500 font-medium">
            No live marketplace configurations found. Click "+ Add New Product" to initialize your first item document entry.
          </div>
        ) : (
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`border-b font-bold ${tableBorder} ${isDark ? 'bg-zinc-900/30' : 'bg-zinc-50/50'} ${labelText}`}>
                  <th className="p-4">Item Details</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Condition</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/40 font-medium">
                {products.map((product) => (
                  <tr key={product._id} className={`transition-colors ${rowHover} ${tableBorder}`}>
                    {/* Visual Media Thumbnail Preview mapping */}
                    <td className="p-4 flex items-center gap-3">
                      <img 
                        src={product.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100'} 
                        alt={product.title}
                        className="w-10 h-10 object-cover rounded bg-zinc-800 border border-zinc-700/50"
                      />
                      <div>
                        <p className="font-bold tracking-tight">{product.title}</p>
                        <p className={`text-[10px] mt-0.5 font-mono ${subText}`}>{product._id}</p>
                      </div>
                    </td>
                    
                    <td className="p-4 text-zinc-400">{product.category}</td>
                    
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        product.condition === 'Excellent' || product.condition === 'Like New'
                          ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/30'
                          : 'bg-zinc-800 text-zinc-300'
                      }`}>
                        {product.condition}
                      </span>
                    </td>
                    
                    <td className="p-4 font-bold text-blue-500">${product.price}</td>
                    
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        product.status === 'available'
                          ? 'bg-amber-500/10 text-amber-500'
                          : 'bg-zinc-500/10 text-zinc-500'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${product.status === 'available' ? 'bg-amber-500' : 'bg-zinc-500'}`} />
                        {product.status}
                      </span>
                    </td>
                    
                    {/* Management Action Call Triggers */}
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="text-red-500 hover:text-red-400 font-bold transition-colors px-2 py-1 hover:bg-red-500/10 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}