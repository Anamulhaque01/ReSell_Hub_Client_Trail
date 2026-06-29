// app/products/[productId]/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const response = await fetch(`${baseUrl}/products/${productId}`);
        const data = await response.json();

        // Handle both standard or success object wrappers smoothly
        if (data && data.success) {
          setProduct(data.product);
        } else if (data) {
          setProduct(data);
        }
      } catch (error) {
        console.error("Error fetching product details details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0b0b0c] flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-4xl p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="w-full h-96 bg-gray-100 dark:bg-zinc-900 rounded-xl" />
          <div className="space-y-4 py-4">
            <div className="h-8 bg-gray-100 dark:bg-zinc-900 rounded w-3/4" />
            <div className="h-4 bg-gray-100 dark:bg-zinc-900 rounded w-1/4" />
            <div className="h-20 bg-gray-100 dark:bg-zinc-900 rounded w-full" />
            <div className="h-12 bg-gray-100 dark:bg-zinc-900 rounded w-full mt-6" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0b0b0c] flex flex-col items-center justify-center p-4">
        <p className="text-gray-400 text-sm mb-4">Product not found or has been removed.</p>
        <button onClick={() => router.push('/products')} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium">
          Back to Browse
        </button>
      </div>
    );
  }

  // Fallback default placeholder image if array is empty
  const imagesList = product.images && product.images.length > 0 
    ? product.images 
    : ['https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80'];

  return (
    <main className="min-h-screen bg-white dark:bg-[#0b0b0c] text-gray-900 dark:text-gray-100 py-12 px-4 sm:px-8 lg:px-16 transition-colors duration-200">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Breadcrumb / Back Button */}
        <button 
          onClick={() => router.push('/products')}
          className="group flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 hover:text-blue-500 transition-colors mb-8"
        >
          <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Browse Catalog
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Image Stack / Gallery Layout */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-[450px] bg-white dark:bg-[#121214] border border-gray-100 dark:border-[#1d1d22] rounded-2xl overflow-hidden flex items-center justify-center relative p-6 shadow-sm"
            >
              <img 
                src={imagesList[activeImage]} 
                alt={product.title} 
                className="max-h-full max-w-full object-contain"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80'; }}
              />
              <span className={`absolute top-4 left-4 text-xs font-bold px-2.5 py-1 rounded-md border ${getConditionColor(product.condition)}`}>
                {product.condition}
              </span>
            </motion.div>

            {/* Thumbnail Navigation Row if multiple images exist */}
            {imagesList.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {imagesList.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-20 h-20 bg-white dark:bg-[#121214] border rounded-lg p-1 overflow-hidden flex items-center justify-center flex-shrink-0 transition-all ${
                      activeImage === index ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-200 dark:border-zinc-800'
                    }`}
                  >
                    <img src={img} alt="" className="max-h-full max-w-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Detailed Context and Order Ingestion Panel */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-500 font-mono">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mt-1">
                {product.title}
              </h1>
              
              {/* Geolocation Tag */}
              <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 mt-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Listed in {product.sellerInfo?.location || product.location || 'Khulna, Bangladesh'}</span>
              </div>
            </div>

            {/* Price Metric */}
            <div className="p-4 bg-gray-50 dark:bg-[#121214] border border-gray-100 dark:border-[#1d1d22] rounded-xl flex items-center justify-between">
              <div>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold">Asking Price</p>
                <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-500 font-mono mt-0.5">
                  ৳{Number(product.price).toLocaleString()}
                </p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
                product.status === 'sold' 
                  ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' 
                  : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
              }`}>
                {product.status || 'available'}
              </span>
            </div>

            {/* Product Description */}
            <div className="space-y-2">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Description</h2>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 bg-transparent">
                {product.description || 'No detailed description provided for this catalog listing item.'}
              </p>
            </div>

            <hr className="border-gray-100 dark:border-zinc-800" />

            {/* Seller Quick Info Block */}
            <div className="space-y-2">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Seller Information</h2>
              <div className="text-xs space-y-1.5 text-gray-500 dark:text-gray-400 font-mono bg-zinc-50 dark:bg-[#121214]/50 p-3 rounded-lg border border-gray-100 dark:border-zinc-900">
                <p><span className="text-gray-400">Name:</span> {product.sellerInfo?.name || 'Private Seller'}</p>
                <p><span className="text-gray-400">Contact:</span> {product.sellerInfo?.phone || product.sellerInfo?.email || 'Available upon purchase'}</p>
              </div>
            </div>

            {/* CTA Intent Purchase Button */}
            <div className="pt-4">
              <button
                onClick={() => router.push(`/dashboard/buyer/checkout/${product._id}`)}
                disabled={product.status === 'sold'}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-300 dark:disabled:bg-zinc-800 disabled:text-zinc-500 dark:disabled:text-zinc-600 text-white font-semibold rounded-xl text-sm tracking-wide shadow-md shadow-blue-600/10 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                {product.status === 'sold' ? (
                  'This Item is Sold Out'
                ) : (
                  <>
                    <span>Proceed to Purchase</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}