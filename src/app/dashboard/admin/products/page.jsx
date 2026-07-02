'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '../../../../context/ThemeContext'; // Adjust path if needed

export default function AdminManageProductsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All'); // All, Pending, Approved, Rejected
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Themed Styles
  const pageBg = isDark ? 'bg-[#0B0C0E] text-[#E2E8F0]' : 'bg-[#F8FAFC] text-[#1E293B]';
  const containerBg = isDark ? 'bg-[#121316] border-[#1F2124]' : 'bg-white border-[#E2E8F0]';
  const textHeading = isDark ? 'text-white' : 'text-[#0F172A]';
  const textMuted = isDark ? 'text-[#6C727F]' : 'text-[#64748B]';
  const inputBg = isDark ? 'bg-[#1A1C20] border-[#25282C] text-white' : 'bg-white border-[#CBD5E1] text-[#1E293B]';
  const borderDivider = isDark ? 'border-[#1F2124]' : 'border-[#F1F5F9]';
  const rowHover = isDark ? 'hover:bg-[#18191D]' : 'hover:bg-[#F8FAFC]';

  const getCleanToken = () => {
    const rawToken = localStorage.getItem('resell_token') || localStorage.getItem('token');
    if (!rawToken) return '';
    if (rawToken.startsWith('{')) {
      try { return JSON.parse(rawToken).token || ''; } catch (e) { return ''; }
    }
    return rawToken;
  };

  const fetchProducts = async (searchQuery = '', statusFilter = 'All') => {
    try {
      setLoading(true);
      setError('');
      const token = getCleanToken();
      
      let url = `${process.env.NEXT_PUBLIC_API_URL}/admin/products?search=${searchQuery}`;
      if (statusFilter !== 'All') {
        url += `&status=${statusFilter.toLowerCase()}`;
      }

      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await res.json();

      if (res.ok) {
        setProducts(result.data || []);
      } else {
        setError(result.message || 'Failed to load products');
      }
    } catch (err) {
      setError('Database connection error.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProducts(search, filter);
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [search, filter]);

  const handleUpdateStatus = async (productId, newStatus) => {
  try {
    const token = getCleanToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products/${productId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status: newStatus })
    });
    
    const data = await res.json();
    if (res.ok && data.success) {
      // FIX: Update the local list
      // If the current filter is 'All', just update the status
      // If the current filter is specific (like 'Pending'), remove the item from the list
      if (filter === 'All') {
        setProducts(products.map(p => p._id === productId ? { ...p, status: newStatus } : p));
      } else {
        // This makes it disappear immediately from the current filtered view
        setProducts(products.filter(p => p._id !== productId));
      }
    } else {
      alert(data.message || 'Failed to update status');
    }
  } catch (err) {
    alert('Network error.');
  }
};

  const handleDelete = async (productId) => {
    if (!window.confirm('Delete this product permanently?')) return;
    try {
      const token = getCleanToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProducts(products.filter(p => p._id !== productId));
      }
    } catch (err) {
      alert('Network error while deleting product.');
    }
  };

  return (
    <div className={`min-h-screen p-8 transition-colors duration-200 ${pageBg}`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-2xl font-bold mb-6 tracking-tight ${textHeading}`}>Manage Products</h1>
        
        {/* Top Controls: Search and Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full sm:w-96 px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all ${inputBg}`}
          />
          
          <div className="flex space-x-1">
            {['All', 'Pending', 'Approved', 'Rejected'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  filter === tab 
                    ? 'bg-blue-600 text-white' 
                    : `${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {error && <div className="mb-4 p-4 rounded bg-red-500/10 text-red-400 text-sm border border-red-500/20">{error}</div>}

        {/* Product List */}
        <div className={`rounded-xl border shadow-sm overflow-hidden ${containerBg}`}>
          {loading ? (
             <div className="flex justify-center items-center h-56">
               <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-blue-500"></div>
             </div>
          ) : products.length === 0 ? (
            <div className={`p-10 text-center ${textMuted}`}>No products found.</div>
          ) : (
            <div className="flex flex-col divide-y divide-transparent">
              {products.map((product) => (
                <div key={product._id} className={`flex items-center justify-between p-4 border-b transition-colors ${borderDivider} ${rowHover}`}>
                  
                  {/* Image & Info */}
                  <div className="flex items-center space-x-4 flex-1">
                    <img 
                      src={product.images?.[0] || 'https://via.placeholder.com/150'} 
                      alt={product.title} 
                      className="w-12 h-12 rounded-md object-cover bg-gray-800"
                    />
                    <div>
                      <h3 className={`text-sm font-semibold ${textHeading}`}>{product.title}</h3>
                      <p className={`text-xs mt-0.5 ${textMuted}`}>
                        {product.category} • Seller: {product.sellerInfo?.name || 'Unknown'}
                      </p>
                    </div>
                  </div>

                  {/* Price & Status */}
                  <div className="flex items-center justify-end space-x-6 flex-1">
                    <span className="text-blue-500 font-bold text-sm">${product.price?.toLocaleString()}</span>
                    
                    <span className={`text-sm font-medium w-20 text-center ${
                      product.status === 'approved' ? 'text-emerald-500' : 
                      product.status === 'rejected' ? 'text-red-500' : 'text-amber-500'
                    }`}>
                      {product.status?.charAt(0).toUpperCase() + product.status?.slice(1)}
                    </span>
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-4 text-gray-400">
                      {/* View Icon (Optional Link to detail page) */}
                      <button className="hover:text-blue-400 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                      </button>
                      
                      {/* Dynamic Approve/Reject Text Button */}
                      {product.status === 'pending' || product.status === 'rejected' ? (
                        <button onClick={() => handleUpdateStatus(product._id, 'approved')} className="text-xs font-semibold hover:text-emerald-400 transition-colors flex items-center gap-1">
                          ✓ Approve
                        </button>
                      ) : (
                        <button onClick={() => handleUpdateStatus(product._id, 'rejected')} className="text-xs font-semibold hover:text-red-400 transition-colors flex items-center gap-1">
                          ✕ Reject
                        </button>
                      )}

                      {/* Delete Icon */}
                      <button onClick={() => handleDelete(product._id)} className="hover:text-red-500 transition-colors">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}