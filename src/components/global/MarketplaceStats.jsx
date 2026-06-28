    // src/components/global/MarketplaceStats.jsx
    "use client";

    import { motion } from "framer-motion";

    const statsData = [
    {
        id: 1,
        value: "16K+",
        label: "Products Listed",
        subLabel: "Active listings",
        // Clean SVG matching the box/product icon from your design blueprint
        icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        ),
    },
    {
        id: 2,
        value: "5+",
        label: "Total Sellers",
        subLabel: "Verified sellers",
        // Clean SVG matching the user/group indicator icon from your blueprint
        icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        ),
    },
    {
        id: 3,
        value: "13+",
        label: "Happy Buyers",
        subLabel: "Satisfied buyers",
        // Clean SVG tracking standard user profile metrics from your design blueprint
        icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        ),
    },
    {
        id: 4,
        value: "2+",
        label: "Orders Completed",
        subLabel: "Successful deals",
        // Clean SVG matching the verified badge/checkmark container from your layout
        icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        ),
    },
    ];

    // Container cascade stagger speeds
    const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
    };

    // Item transition configurations matching professional Swiss minimalist movement
    const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { type: "spring", stiffness: 70, damping: 15 } 
    }
    };

    export default function MarketplaceStats() {
    return (
        <section id="marketplace-stats" className="w-full bg-[#3B82F6] text-white py-14 sm:py-16 overflow-hidden select-none">
        <div className="max-w-7xl mx-auto px-6">
            
            {/* Dynamic Animated Grid tracking layout rows */}
            <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4 text-center items-center justify-center"
            >
            {statsData.map((stat) => (
                <motion.div 
                key={stat.id}
                variants={itemVariants}
                className="flex flex-col items-center justify-center space-y-2.5 group"
                >
                {/* Semi-transparent Glass-effect Icon Wrapper Box */}
                <div className="w-11 h-11 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center text-white/90 group-hover:scale-105 transition-transform duration-200 shadow-sm">
                    {stat.icon}
                </div>

                {/* Counter Display Metric Header Text */}
                <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-none text-white drop-shadow-sm">
                    {stat.value}
                </h3>

                {/* Text Meta Descriptions Container Area */}
                <div className="space-y-0.5">
                    <p className="text-sm font-bold text-white/95 tracking-tight">
                    {stat.label}
                    </p>
                    <p className="text-[11px] font-medium text-white/75 tracking-normal">
                    {stat.subLabel}
                    </p>
                </div>
                </motion.div>
            ))}
            </motion.div>

        </div>
        </section>
    );
    }