// src/components/global/SustainabilityImpact.jsx
"use client";

import { motion } from "framer-motion";

const impactMetrics = [
  {
    id: 1,
    value: "2,450 kg",
    label: "CO2 Emissions Saved",
    description: "Equivalent to planting 120 trees or removing 5 cars from the road for a year.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 12.728A9 9 0 115.636 5.636a9 9 0 0112.728 12.728z" />
      </svg>
    ),
    accent: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/20",
  },
  {
    id: 2,
    value: "1,280 kg",
    label: "E-Waste Diverted",
    description: "Laptops, phones, and accessories kept out of landfills and repurposed safely.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    ),
    accent: "text-teal-600 dark:text-teal-400 bg-teal-500/10 dark:bg-teal-500/20",
  },
  {
    id: 3,
    value: "$45,200",
    label: "Community Savings",
    description: "Total money saved by buyers choosing high-quality pre-owned items over retail prices.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16V7" />
      </svg>
    ),
    accent: "text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 14 }
  }
};

export default function SustainabilityImpact() {
  return (
    <section id="sustainability-impact" className="w-full py-16 bg-[#FAF9F6] text-[#1A1A1A] dark:bg-[#0B0B0F] dark:text-[#F5F5F5] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/20 px-3 py-1 rounded-full uppercase">
            Our Environmental Impact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 mb-3">
            Making a Difference Together
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            By choosing pre-owned products, our platform users directly contribute to reducing electronic waste, conserving resources, and cutting carbon footprint emissions.
          </p>
        </div>

        {/* 3-Column Impact Cards Grid Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {impactMetrics.map((metric) => (
            <motion.div
              key={metric.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="p-6 lg:p-8 rounded-2xl bg-white dark:bg-[#121216] border border-black/[0.06] dark:border-white/[0.06] shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-start space-y-4"
            >
              {/* Dynamic Styled Icon Wrapper */}
              <div className={`p-3 rounded-xl ${metric.accent} flex items-center justify-center`}>
                {metric.icon}
              </div>

              {/* Big High-Contrast Stat Metric Text */}
              <h3 className="text-3xl lg:text-4xl font-black tracking-tight text-[#1A1A1A] dark:text-white">
                {metric.value}
              </h3>

              {/* Descriptions & Labels Stack */}
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold tracking-tight text-gray-800 dark:text-gray-200">
                  {metric.label}
                </h4>
                <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                  {metric.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}