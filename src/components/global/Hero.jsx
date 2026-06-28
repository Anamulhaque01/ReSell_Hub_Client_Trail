// src/components/global/Hero.jsx
"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="hero" className="w-full relative py-12 md:py-20 bg-[#FAF9F6] text-[#1A1A1A] dark:bg-[#0B0B0F] dark:text-[#F5F5F5] transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Content Column */}
        <div className="lg:col-span-7 space-y-6 z-10">
          {/* Sustainable Tag [cite: 203] */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-[#3B82F6]/10 text-[#2563EB] dark:bg-[#3B82F6]/20 dark:text-[#60A5FA]"
          >
            <span>⚖️</span> Sustainable Marketplace
          </motion.div>

          {/* Main Heading [cite: 203] */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
          >
            Buy & Sell <span className="text-[#2563EB] dark:text-[#3B82F6]">Second-Hand</span> Goods Effortlessly
          </motion.h1>

          {/* Paragraph Text */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg max-w-xl text-[#4A4A4A] dark:text-[#A0A0AA] font-normal leading-relaxed"
          >
            Join thousands of buyers and sellers in the most trusted marketplace for pre-owned items. Save money, reduce waste, live better.
          </motion.p>

          {/* Action Buttons [cite: 184] */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <button className="px-6 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 shadow-sm shadow-[#2563EB]/10">
              Browse Products <span>→</span>
            </button>
            <button className="px-6 py-3 bg-transparent border border-[#1A1A1A]/20 dark:border-[#F5F5F5]/20 hover:bg-[#1A1A1A]/5 dark:hover:bg-[#F5F5F5]/5 rounded-lg font-medium transition-colors duration-200">
              Start Selling
            </button>
          </motion.div>

          {/* Statistics Section Row [cite: 185, 203] */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pt-8 border-t border-[#1A1A1A]/10 dark:border-[#F5F5F5]/10 flex gap-8 sm:gap-12"
          >
            <div>
              <h3 className="text-2xl font-bold">16k+</h3>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">Active Listings</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">5+</h3>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">Trusted Sellers</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">2+</h3>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">Deals Completed</p>
            </div>
          </motion.div>
        </div>

        {/* Right Interactive Presentation Mockup Grid */}
        <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full max-w-[440px] aspect-[4/3] rounded-2xl p-4 bg-white dark:bg-[#16161A] shadow-xl border border-black/[0.04] dark:border-white/[0.04] transition-colors duration-300 grid grid-cols-2 gap-3 relative"
          >
            {/* Mockup Items with standard Unsplash image grids */}
            <div className="bg-[#EDEDED] dark:bg-[#25252A] rounded-xl overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80" alt="Landscape Listing" className="w-full h-full object-cover opacity-90 mix-blend-normal dark:mix-blend-luminosity" />
            </div>
            <div className="bg-[#EDEDED] dark:bg-[#25252A] rounded-xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80" alt="Portrait Figure Listing" className="w-full h-full object-cover opacity-90 mix-blend-normal dark:mix-blend-luminosity" />
            </div>
            <div className="bg-[#EDEDED] dark:bg-[#25252A] rounded-xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=300&q=80" alt="Vehicle Listing" className="w-full h-full object-cover opacity-90 mix-blend-normal dark:mix-blend-luminosity" />
            </div>
            <div className="bg-[#EDEDED] dark:bg-[#25252A] rounded-xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=300&q=80" alt="Forest Nature Listing" className="w-full h-full object-cover opacity-90 mix-blend-normal dark:mix-blend-luminosity" />
            </div>

            {/* Floating Badge Top Right: New Listings */}
            <motion.div 
              initial={{ opacity: 0, x: 20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.6 }}
              className="absolute -top-5 -right-4 bg-[#3B82F6] text-white p-3.5 px-4 rounded-xl shadow-lg flex flex-col gap-0.5"
            >
              <span className="text-[10px] uppercase tracking-wider opacity-80 font-medium">New Listings</span>
              <span className="text-xl font-bold">+16</span>
              <span className="text-[9px] opacity-70">This month</span>
            </motion.div>

            {/* Floating Badge Bottom Left: Buyer Protection */}
            <motion.div 
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.7 }}
              className="absolute -bottom-5 -left-6 bg-white dark:bg-[#222227] text-[#1A1A1A] dark:text-white p-2.5 px-4 rounded-xl shadow-md border border-black/[0.05] dark:border-white/[0.05] flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center text-sm">
                🛡️
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold tracking-tight">Buyer Protection</span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400">100% Guaranteed</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}