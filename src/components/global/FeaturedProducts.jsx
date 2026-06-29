// src/components/global/FeaturedProducts.jsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const getConditionStyles = (condition) => {
  switch (condition?.toLowerCase()) {
    case "new":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "like-new":
      return "bg-cyan-500/10 text-cyan-500 border-cyan-500/20";
    case "good":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "fair":
      return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    case "poor":
      return "bg-rose-500/10 text-rose-500 border-rose-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20";
  }
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        // Explicitly set limit to 8 matching the required layout count
        const response = await fetch(`${baseUrl}/products?limit=8`);
        const data = await response.json();

        // Robust adaptation layer matching the All Products page logic
        if (Array.isArray(data)) {
          setProducts(data.slice(0, 8));
        } else if (data && data.success) {
          setProducts((data.products || []).slice(0, 8));
        } else if (data && data.products) {
          setProducts((data.products).slice(0, 8));
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error loading featured products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-16 bg-[#FAF9F6] dark:bg-[#0B0B0F] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-8 w-48 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-md mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-50 dark:bg-[#121214] border border-gray-200 dark:border-zinc-800 rounded-xl p-3 h-[440px] flex flex-col justify-between" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="featured-products" className="w-full py-16 bg-[#FAF9F6] text-[#1A1A1A] dark:bg-[#0B0B0F] dark:text-[#F5F5F5] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block matching the exact screen alignment design */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/20 px-3 py-1 rounded-full uppercase">
              Featured
            </span>
            <h2 className="text-3xl font-bold tracking-tight mt-3">
              Hot Deals Right Now ...
            </h2>
          </div>
          <button 
            onClick={() => window.location.href = '/products'}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 transition-all"
          >
            View All <span>➔</span>
          </button>
        </div>

        {/* Catalog Grid Area - Formatted to look precisely like image_a2c371.png */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product, idx) => (
            <motion.div
              key={product._id || idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white dark:bg-[#121214] border border-gray-100 dark:border-[#1d1d22] rounded-xl p-3 flex flex-col justify-between h-[440px] shadow-sm relative group transition-all duration-200"
            >
              {/* Product Media Container Frame matching the clean contain frame style */}
              <div className="w-full h-48 rounded-lg overflow-hidden relative bg-white flex items-center justify-center border border-gray-100 dark:border-zinc-800">
                <img 
                  src={product.images?.[0] || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80"} 
                  alt={product.title} 
                  className="max-h-full max-w-full object-contain p-2 transition-transform duration-300 group-hover:scale-102"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80' }}
                />

                {/* Condition Badge Top Left */}
                <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getConditionStyles(product.condition)}`}>
                  {product.condition || "Used"}
                </span>

                {/* View Counter Badge Top Right */}
                <span className="absolute top-2 right-2 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-sm flex items-center gap-1 border border-white/10">
                  👁️ {product.views || Math.floor(Math.random() * 300) + 15}
                </span>
              </div>

              {/* Text & Specs Details Block */}
              <div className="mt-3 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-blue-500 transition-colors">
                    {product.title}
                  </h3>
                  
                  {/* Location Layout */}
                  <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 mt-1">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">{product.sellerInfo?.location || product.location || "Khulna, BD"}</span>
                  </div>

                  {/* Rating Layout Block */}
                  <div className="flex items-center text-xs text-amber-500 font-bold gap-1 mt-1.5">
                    <span>★</span>
                    <span>4.6</span>
                  </div>
                </div>

                {/* Price & Stock Container Area */}
                <div className="flex justify-between items-baseline mt-2">
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-500 font-mono">
                    ${Number(product.price).toLocaleString()}
                  </span>
                  <span className="text-[11px] text-gray-400 dark:text-gray-500">
                    Stock: {product.stock || 3}
                  </span>
                </div>
              </div>

              {/* Action Buttons Footer Area */}
              <div className="flex items-center gap-2 mt-3">
                <button 
                  onClick={() => window.location.href = `/products/${product._id}`}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold tracking-wide transition-colors text-center flex items-center justify-center gap-1.5 shadow-sm"
                >
                  🛒 View Deal
                </button>
                <button 
                  className="p-2 rounded-lg border border-gray-200 dark:border-zinc-800 hover:bg-black/5 dark:hover:bg-white/5 bg-red-500 text-white dark:bg-red-500/10 dark:text-red-500 transition-colors duration-150 flex items-center justify-center group/heart"
                  aria-label="Add to wishlist"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover/heart:scale-110" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}