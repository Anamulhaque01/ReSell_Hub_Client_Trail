// src/components/global/FeaturedProducts.jsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

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
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]); // Tracks saved products
  const [loading, setLoading] = useState(true);

  // 1. Fetch featured products
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const res = await fetch(`${baseUrl}/products?limit=3&sort=newest`);
        const data = await res.json();
        if (res.ok) {
          setProducts(data.products || []);
        }
      } catch (err) {
        console.error("Error loading featured products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  // 2. Sync wishlist state for logged-in buyer
  useEffect(() => {
    if (!token) {
      setWishlistIds([]);
      return;
    }
    const fetchCurrentWishlist = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const response = await fetch(`${baseUrl}/buyer/wishlist`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setWishlistIds(data.map((item) => item._id));
        }
      } catch (err) {
        console.error("Error reading wishlist states inside features component:", err);
      }
    };
    fetchCurrentWishlist();
  }, [token]);

  // 3. Handle interactive toggle action
  const handleToggleWishlist = async (productId) => {
    if (!token) {
      alert("Please sign in to save items to your wishlist!");
      return;
    }

    const isSaved = wishlistIds.includes(productId);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

    try {
      if (isSaved) {
        // Remove item from wishlist array
        const res = await fetch(`${baseUrl}/buyer/wishlist/${productId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          setWishlistIds((prev) => prev.filter((id) => id !== productId));
        }
      } else {
        // Add item to wishlist array
        const res = await fetch(`${baseUrl}/buyer/wishlist`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ productId })
        });
        if (res.ok) {
          setWishlistIds((prev) => [...prev, productId]);
        }
      }
    } catch (err) {
      console.error("Failed to update wishlist item state:", err);
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-neutral-950 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-500 uppercase tracking-widest block mb-2">
              🔥 Hot Deals
            </span>
            <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight sm:text-4xl">
              Featured Products
            </h2>
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 max-w-xl">
              Explore the latest high-quality items listed by certified sellers. Secure transactions and premium grading verified.
            </p>
          </div>
          <button 
            onClick={() => window.location.href = "/products"}
            className="self-start md:self-end text-xs font-bold text-blue-600 dark:text-blue-500 hover:underline flex items-center gap-1 group whitespace-nowrap"
          >
            View All Marketplace Items 
            <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
          </button>
        </div>

        {/* Content Render Conditional Grid Block */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i} 
                className="animate-pulse bg-neutral-50 dark:bg-zinc-900/40 h-96 rounded-2xl border border-neutral-100 dark:border-zinc-900" 
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-neutral-50 dark:bg-zinc-900/20 rounded-2xl border border-dashed border-neutral-200 dark:border-zinc-800">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">No products are currently marked as featured listings.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4 }}
                key={product._id}
                className="bg-neutral-50 dark:bg-zinc-900/30 border border-neutral-200/60 dark:border-zinc-900 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group h-full"
              >
                {/* Product Image Wrapper */}
                <div className="relative aspect-[4/3] w-full bg-neutral-200 dark:bg-zinc-800 overflow-hidden">
                  <img
                    src={product.images?.[0] || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3"}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase border backdrop-blur-md shadow-sm ${getConditionStyles(product.condition)}`}>
                      {product.condition}
                    </span>
                  </div>
                </div>

                {/* Info Metadata Layout Wrapper */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-wider">
                        {product.category}
                      </span>
                      <span className="text-sm font-black text-neutral-900 dark:text-neutral-50 font-mono">
                        ${product.price?.toLocaleString()}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-neutral-800 dark:text-zinc-100 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors line-clamp-1">
                      {product.title}
                    </h3>

                    <p className="text-xs text-neutral-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-neutral-200/50 dark:border-zinc-800/60 text-[11px] text-neutral-400 dark:text-zinc-500">
                      <span className="flex items-center gap-1 font-medium">
                        📍 {product.location || "Bangladesh"}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons Footer Area */}
                  <div className="flex items-center gap-2 mt-4">
                    <button 
                      onClick={() => window.location.href = `/products/${product._id}`}
                      className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold tracking-wide transition-colors text-center flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.99]"
                    >
                      View Deal
                    </button>
                    
                    <button 
                      onClick={() => handleToggleWishlist(product._id)}
                      className={`p-2 rounded-lg border transition-all duration-150 flex items-center justify-center active:scale-95 ${
                        wishlistIds.includes(product._id)
                          ? "bg-rose-500/10 border-rose-500/30 text-rose-500"
                          : "border-gray-200 dark:border-zinc-800 text-gray-400 hover:text-rose-500 hover:bg-gray-100 dark:hover:bg-zinc-800"
                      }`}
                      aria-label={wishlistIds.includes(product._id) ? "Remove from wishlist" : "Add to wishlist"}
                      title={wishlistIds.includes(product._id) ? "Remove from Wishlist" : "Save to Wishlist"}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4" 
                        fill={wishlistIds.includes(product._id) ? "currentColor" : "none"} 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}