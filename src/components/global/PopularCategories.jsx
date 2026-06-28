    // src/components/global/PopularCategories.jsx
    "use client";

    import { motion } from "framer-motion";

    // Configuration matching assignment suggestions and design layout
    const categories = [
    { name: "Electronics", icon: "💻", color: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400" },
    { name: "Furniture", icon: "🛋️", color: "bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400" },
    { name: "Vehicles", icon: "🚗", color: "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400" },
    { name: "Fashion", icon: "👕", color: "bg-pink-500/10 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400" },
    { name: "Mobile Phones", icon: "📱", color: "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400" },
    { name: "Books", icon: "📚", color: "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400" },
    { name: "Sports", icon: "🏋️", color: "bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400" },
    { name: "Home & Garden", icon: "🏠", color: "bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400" },
    ];

    // Framer motion variants for smooth sequential grid entrance
    const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
    }
    };

    const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    export default function PopularCategories() {
    return (
        <section id="popular-categories" className="w-full py-16 bg-[#FAF9F6] text-[#1A1A1A] dark:bg-[#0B0B0F] dark:text-[#F5F5F5] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 text-center">
            
            {/* Label Tag */}
            <span className="text-xs font-semibold tracking-wider text-purple-600 dark:text-purple-400 bg-purple-500/10 dark:bg-purple-500/20 px-3 py-1 rounded-full uppercase">
            Categories
            </span>

            {/* Title & Subtitle */}
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 mb-2">
            Shop by Category
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-10">
            Find exactly what you're looking for
            </p>

            {/* Categories Grid - Responsive layout tracking screenshots */}
            <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 justify-center"
            >
            {categories.map((cat, index) => (
                <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.03, y: -2 }}
                className="flex flex-col items-center justify-center p-5 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-[#121216] shadow-sm hover:shadow-md cursor-pointer transition-all duration-200"
                >
                {/* Rounded Minimal Colored Icon Box */}
                <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center text-xl mb-3`}>
                    {cat.icon}
                </div>
                
                {/* Category Name Label */}
                <span className="text-xs font-bold tracking-tight whitespace-nowrap">
                    {cat.name}
                </span>
                </motion.div>
            ))}
            </motion.div>

        </div>
        </section>
    );
    }