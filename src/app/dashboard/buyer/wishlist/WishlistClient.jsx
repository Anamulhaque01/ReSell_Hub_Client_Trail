'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ShoppingCart, Trash2, Loader2, HeartOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WishlistClient() {
  const { token } = useAuth();
  const router = useRouter();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchWishlist = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/buyer/wishlist', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setWishlist(data);
        }
      } catch (err) {
        console.error('Failed to pull wishlist assets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [token]);

  const handleRemove = async (productId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/buyer/wishlist/${productId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setWishlist((prev) => prev.filter((item) => item._id !== productId));
      }
    } catch (err) {
      console.error('Error removing product item:', err);
    }
  };

  const handleBuyNow = (productId) => {
    router.push(`/checkout/${productId}`);
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-neutral-400 dark:text-zinc-600" size={28} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Wishlist ({wishlist.length})
        </h1>
      </div>

      {wishlist.length === 0 ? (
        <div className="border border-dashed border-neutral-300 dark:border-zinc-800 rounded-xl p-12 text-center max-w-md mx-auto mt-12 flex flex-col items-center gap-3 bg-white dark:bg-[#0c0c0d]">
          <HeartOff className="text-neutral-400 dark:text-zinc-500" size={36} />
          <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">
            Your wishlist is empty. Explore items to save them here!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {wishlist.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border border-neutral-200/80 dark:border-zinc-800/90 bg-white dark:bg-[#0c0c0d] rounded-xl overflow-hidden flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="relative aspect-video w-full bg-neutral-100 dark:bg-zinc-900 overflow-hidden">
                  <img
                    src={product.images?.[0] || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80'}
                    alt={product.title}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => router.push(`/products/${product._id}`)}
                  />
                  {product.condition && (
                    <span className="absolute top-2.5 left-2.5 text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-blue-600 text-white shadow-sm">
                      {product.condition}
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-1.5">
                  <h3 
                    onClick={() => router.push(`/products/${product._id}`)}
                    className="text-xs font-bold text-neutral-800 dark:text-neutral-200 tracking-tight hover:underline cursor-pointer line-clamp-1"
                  >
                    {product.title}
                  </h3>
                  <p className="text-sm font-black text-blue-600 dark:text-blue-500">
                    ${product.price?.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center gap-2">
                <button
                  onClick={() => handleBuyNow(product._id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-[11px] font-bold tracking-wide transition-all"
                >
                  <ShoppingCart size={13} />
                  <span>Buy Now</span>
                </button>
                <button
                  onClick={() => handleRemove(product._id)}
                  title="Remove item"
                  className="p-2 rounded-lg border border-neutral-200 dark:border-zinc-800 text-neutral-400 dark:text-zinc-500 hover:text-red-500 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-950/50 transition-colors bg-transparent"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}