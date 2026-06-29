'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

export default function MyProductsPage() {
  const { theme } = useTheme();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch listed products belonging to active seller account
  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem('resell_token');
      const response = await fetch('http://localhost:5000/api/seller/products', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (response.ok) {
        setProducts(data);
      } else {
        setError(data.message || 'Failed to sync inventory manifest.');
      }
    } catch (err) {
      setError('Network link interrupted while downloading product array.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // Handle active item deletion sequence
  const handleDelete = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const token = localStorage.getItem('resell_token');
      const response = await fetch(`http://localhost:5000/api/seller/products/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        // Optimistically remove or refresh states instantly
        setProducts(products.filter(p => p._id !== productId));
      } else {
        const data = await response.json();
        alert(data.message || 'Inbound request parsing error on database engine.');
      }
    } catch (err) {
      alert('Network transaction dropped before completing execution pipeline.');
    }
  };

  // Live structural filtering via Search input state
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isDark = theme === 'dark';
  
  // High-fidelity UI color profiles matching image_949915.png & image_949bd9.png perfectly
  const bgFrame = isDark ? 'bg-[#09090b] text-white' : 'bg-zinc-50 text-zinc-900';
  const containerBg = isDark ? 'bg-[#09090b] border-zinc-800' : 'bg-white border-zinc-200/80 shadow-sm';
  const itemRowBg = isDark ? 'bg-[#0e0e11]/40 border-zinc-900 hover:bg-[#0e0e11]' : 'bg-white border-zinc-100 hover:bg-zinc-50/50';
  const searchInputBg = isDark ? 'bg-[#0e0e11] border-zinc-800 text-white placeholder-zinc-600 focus:border-zinc-700' : 'bg-white border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-zinc-300';
  const subText = isDark ? 'text-zinc-500' : 'text-zinc-400';
  const badgeBlue = 'bg-blue-600/10 text-blue-500 dark:text-blue-400 border border-blue-500/10';
  const badgeGreen = 'bg-emerald-600/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/10';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-xs font-semibold tracking-widest text-zinc-500 animate-pulse">
        SYNCING REALTIME INVENTORY ALLOCATIONS...
      </div>
    );
  }

  return (
    <div className={`space-y-6 py-2 min-h-screen transition-colors duration-200 ${bgFrame}`}>
      
      {/* Header Segment Grid */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">
          My Products ({filteredProducts.length})
        </h1>
        <Link 
          href="/dashboard/seller/add-product"
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2 rounded transition-all shadow-sm"
        >
          + Add Product
        </Link>
      </div>

      {error && (
        <div className="p-3 text-xs font-semibold rounded border bg-red-950/40 text-red-400 border-red-900/50">
          {error}
        </div>
      )}

      {/* Dynamic Search Container */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full text-xs px-4 py-3 rounded-lg border outline-none transition-all font-medium ${searchInputBg}`}
        />
      </div>

      {/* Structured Outer Wrapper Shell Container */}
      <div className={`border rounded-xl p-2 space-y-2 overflow-hidden ${containerBg}`}>
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-xs text-zinc-500 font-medium">
            No matching inventory configuration records mapped.
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filteredProducts.map((product) => (
              <div 
                key={product._id} 
                className={`flex items-center justify-between p-3 border rounded-xl transition-all duration-200 ${itemRowBg}`}
              >
                
                {/* Left Block: Media Object and Text Details Matrix */}
                <div className="flex items-center gap-4">
                  <img 
                    src={product.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120'} 
                    alt={product.title}
                    className="w-14 h-14 object-cover rounded-lg bg-zinc-800 border border-zinc-700/30 shrink-0"
                  />
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold tracking-tight leading-none">{product.title}</h3>
                    
                    {/* Synchronized Badges Deck from image_949915.png */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wide ${badgeBlue}`}>
                        {product.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wide ${badgeGreen}`}>
                        {product.condition}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wide ${badgeGreen}`}>
                        Approved
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Block: Price Tags & Precise Interaction Icons */}
                <div className="flex items-center gap-6">
                  <div className="text-right shrink-0">
                    <p className="text-sm font-black text-emerald-500">${product.price}</p>
                    <p className={`text-[10px] font-medium mt-0.5 ${subText}`}>Stock: 3</p>
                  </div>

                  {/* Clean SVG Control Array */}
                  <div className="flex items-center gap-3 text-zinc-400">
                    {/* View Action */}
                    <button 
                      onClick={() => window.open(`/products/${product._id}`, '_blank')}
                      className="hover:text-blue-500 transition-colors p-1"
                      title="View Public Page"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>

                    {/* Edit Action */}
                    <Link 
                      href={`/dashboard/seller/edit-product/${product._id}`}
                      className="hover:text-amber-500 transition-colors p-1"
                      title="Edit Fields"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </Link>

                    {/* Delete Action */}
                    <button 
                      onClick={() => handleDelete(product._id)}
                      className="hover:text-red-500 transition-colors p-1"
                      title="Drop Entry"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}