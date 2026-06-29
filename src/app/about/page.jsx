// src/app/about/page.jsx
"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  const pillarCards = [
    {
      icon: "🌱",
      title: "Sustainability",
      desc: "Every purchase on ReSellHub keeps items out of landfills and reduces manufacturing demand.",
    },
    {
      icon: "💰",
      title: "Affordability",
      desc: "Get quality items at a fraction of the original price. Smart shopping for everyone.",
    },
    {
      icon: "🤝",
      title: "Community",
      desc: "Connect with trusted buyers and sellers in your area and across the country.",
    },
  ];

  const valueBlocks = [
    {
      title: "Trust & Safety",
      desc: "Every seller is verified and every transaction is protected by our buyer guarantee program.",
    },
    {
      title: "Transparency",
      desc: "Clear pricing, honest product descriptions, and straightforward fees. No hidden surprises.",
    },
    {
      title: "Accessibility",
      desc: "Available on any device, anywhere. Our platform is designed for everyone.",
    },
    {
      title: "Environmental Impact",
      desc: "We track and publish our collective environmental impact every quarter.",
    },
  ];

  const stats = [
    { value: "50K+", label: "Happy Users" },
    { value: "$2M+", label: "Saved by Buyers" },
    { value: "100K+", label: "Items Sold" },
    { value: "4.9★", label: "Average Rating" },
  ];

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] dark:bg-[#0b0b0c] dark:text-gray-100 flex flex-col font-sans transition-colors duration-300 selection:bg-blue-500/30">
      
      {/* 1. Hero Blue Banner Header */}
      <section className="w-full bg-[#2563EB] text-white py-16 px-6 text-center shadow-lg">
        <div className="max-w-4xl mx-auto space-y-3">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            About ReSellHub
          </h1>
          <p className="text-base md:text-lg text-blue-100 font-medium max-w-2xl mx-auto leading-relaxed">
            We're on a mission to make second-hand shopping the new normal — saving money, reducing waste, and building community.
          </p>
        </div>
      </section>

      {/* 2. Three Pillars Core Grid Area */}
      <section className="w-full max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillarCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-[#1d1d22] p-8 rounded-2xl shadow-sm hover:shadow-md flex flex-col items-center text-center transition-all duration-200"
            >
              <span className="text-4xl mb-4 filter drop-shadow-sm select-none">
                {card.icon}
              </span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                {card.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-3 leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Analytics Stats Row Bar */}
      <section className="w-full max-w-4xl mx-auto px-6 py-8 border-b border-gray-200/60 dark:border-zinc-800/60">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-3xl font-black text-blue-600 dark:text-blue-500 tracking-tight font-mono">
                {stat.value}
              </div>
              <div className="text-xs font-bold tracking-wide text-gray-400 dark:text-gray-500 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Secondary Features Layout View: Our Values */}
      <section className="w-full max-w-5xl mx-auto px-6 py-16 space-y-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center tracking-tight text-gray-900 dark:text-white">
          Our Values
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {valueBlocks.map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -15 : 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-[#1d1d22] p-6 rounded-xl shadow-sm hover:border-gray-200 dark:hover:border-zinc-800 transition-all"
            >
              <h3 className="text-base font-bold text-gray-900 dark:text-white tracking-tight">
                {value.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium leading-relaxed">
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

    </main>
  );
}