// src/components/global/Hero.jsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";

// Clean, professional animation settings
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] } 
  }
};

const floatVariants = {
  animate: {
    y: [0, -6, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  }
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-20 lg:py-24 dark:bg-[#09090b] transition-colors duration-300">
      {/* Background soft ambient radial gradient to match screenshot edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.01),transparent_50%)]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-center"
        >
          {/* LEFT COLUMN: Text Content & Stats */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Tag Badge */}
            <motion.div variants={itemVariants} className="mb-5 flex">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 px-3 py-1 text-xs font-medium text-blue-600 border border-blue-100/50 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/30">
                ⏳ Sustainable Marketplace
              </span>
            </motion.div>

            {/* Main Heading Text */}
            <motion.h1 variants={itemVariants} className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl dark:text-white leading-[1.15]">
              Buy & Sell <span className="text-blue-600 dark:text-blue-500">Second-Hand</span> Goods Effortlessly
            </motion.h1>

            {/* Description Subtext */}
            <motion.p variants={itemVariants} className="mt-6 text-base text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed">
              Join thousands of buyers and sellers in the most trusted marketplace for pre-owned items. Save money, reduce waste, live better.
            </motion.p>

            {/* Call To Action Buttons */}
            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 dark:hover:bg-blue-500 transition-all duration-200 group gap-2"
              >
                Browse Products
                <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
              <Link 
                href="/dashboard/seller/add-product" 
                className="inline-flex items-center justify-center rounded-xl bg-zinc-50 border border-zinc-200 px-6 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 transition-all duration-200 dark:bg-transparent dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
              >
                Start Selling
              </Link>
            </motion.div>

            {/* Core Row Profile Counter Statistics Block */}
            <motion.div 
              variants={itemVariants} 
              className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-900 grid grid-cols-3 gap-4"
            >
              <div>
                <span className="block text-2xl font-bold font-mono text-zinc-900 dark:text-white">16+</span>
                <span className="block mt-0.5 text-xs text-zinc-400 dark:text-zinc-500 font-medium">Active Listings</span>
              </div>
              <div>
                <span className="block text-2xl font-bold font-mono text-zinc-900 dark:text-white">5+</span>
                <span className="block mt-0.5 text-xs text-zinc-400 dark:text-zinc-500 font-medium">Trusted Sellers</span>
              </div>
              <div>
                <span className="block text-2xl font-bold font-mono text-zinc-900 dark:text-white">2+</span>
                <span className="block mt-0.5 text-xs text-zinc-400 dark:text-zinc-500 font-medium">Deals Completed</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Grid Frame Layout Showcase */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
            
            {/* Primary Main Mockup Display Container */}
            <motion.div 
              variants={itemVariants}
              className="relative rounded-2xl bg-zinc-50 p-5 shadow-2xl shadow-zinc-200/50 dark:bg-zinc-900/40 dark:shadow-none border border-zinc-100/80 dark:border-zinc-800/60 max-w-[500px] w-full"
            >
              {/* Image Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                  <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300&auto=format&fit=crop" alt="Item" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                  <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=300&auto=format&fit=crop" alt="Item" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                  <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=300&auto=format&fit=crop" alt="Item" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                  <img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=300&auto=format&fit=crop" alt="Item" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Floating Element 1: Buyer Protection Badging Tag */}
              <motion.div 
                variants={floatVariants}
                animate="animate"
                className="absolute -bottom-5 -left-6 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-zinc-100 dark:bg-zinc-900/95 dark:border-zinc-800 flex items-center gap-2.5 max-w-[180px]"
              >
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg dark:bg-emerald-950/50 dark:text-emerald-400">
                  🛡️
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Buyer Protection</h4>
                  <p className="text-[10px] text-zinc-400 font-mono mt-0.5">100% Guaranteed</p>
                </div>
              </motion.div>

              {/* Floating Element 2: New Listings Counter Tag */}
              <motion.div 
                variants={floatVariants}
                animate="animate"
                className="absolute -top-5 -right-4 bg-blue-600 p-3.5 rounded-2xl shadow-xl text-white text-center min-w-[90px]"
              >
                <p className="text-[9px] uppercase font-mono tracking-wider opacity-80">New Listings</p>
                <h3 className="text-xl font-extrabold mt-0.5">+16</h3>
                <p className="text-[9px] font-mono opacity-70 mt-0.5">This month</p>
              </motion.div>

            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}