// src/components/global/HomeCTA.jsx
"use client";

import { motion } from "framer-motion";

export default function HomeCTA() {
  return (
    <section id="ready-cta" className="w-full py-16 bg-[#FAF9F6] dark:bg-[#0B0B0F] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Blue Banner Box with Corner Circular Overlays */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative w-full rounded-3xl bg-[#3B82F6] text-white px-8 py-16 md:py-20 text-center overflow-hidden shadow-lg flex flex-col items-center justify-center"
        >
          {/* Subtle Circular Design Accents in Corners */}
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 pointer-events-none" />
          
          {/* Main Title & Subtitle Stack */}
          <div className="relative z-10 max-w-2xl mx-auto space-y-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Ready to Start Buying or Selling?
            </h2>
            <p className="text-sm md:text-base text-blue-50/90 font-normal leading-relaxed max-w-xl mx-auto">
              Join over 18 users who trust ReSellHub for the best second-hand marketplace experience.
            </p>
          </div>

          {/* Action Button Row */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            {/* Primary Action Button */}
            <button className="w-full sm:w-auto px-6 py-3 bg-white text-[#3B82F6] font-bold text-sm md:text-base rounded-xl hover:bg-blue-50 active:scale-[0.98] transition-all shadow-sm">
              Create Free Account
            </button>
            
            {/* Secondary Action Button */}
            <button className="w-full sm:w-auto px-6 py-3 bg-transparent text-white border border-white/60 font-bold text-sm md:text-base rounded-xl hover:bg-white/10 active:scale-[0.98] transition-all">
              Browse Products
            </button>
          </div>

        </motion.div>

      </div>
    </section>
  );
}