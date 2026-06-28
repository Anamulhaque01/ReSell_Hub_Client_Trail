    // src/components/global/FeaturedProducts.jsx
    "use client";

    import { useEffect, useState } from "react";
    import { motion } from "framer-motion";

    // Helper for condition badge styling matching your exact layout look
    const getConditionStyles = (condition) => {
    switch (condition?.toLowerCase()) {
        case "new":
        return "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400";
        case "like-new":
        return "bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400";
        case "good":
        return "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400";
        case "fair":
        return "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400";
        case "poor":
        return "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400";
        default:
        return "bg-gray-500/10 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400";
    }
    };

    export default function FeaturedProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Dynamic fetch from Express API server (adjust base path endpoint environment variable if needed)
        fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/products?limit=8`)
        .then((res) => res.json())
        .then((data) => {
            // Handle database array structure or fall back gracefully
            setProducts(Array.isArray(data) ? data : data.products || []);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching featured listings:", err);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
        <section className="w-full py-16 bg-[#FAF9F6] dark:bg-[#0B0B0F] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
            <div className="h-8 w-48 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-md mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-[3/4] w-full bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-2xl" />
                ))}
            </div>
            </div>
        </section>
        );
    }

    return (
        <section id="featured-products" className="w-full py-16 bg-[#FAF9F6] text-[#1A1A1A] dark:bg-[#0B0B0F] dark:text-[#F5F5F5] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
            
            {/* Header Block matching your exact screen alignment design */}
            <div className="flex justify-between items-end mb-8">
            <div>
                <span className="text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/20 px-3 py-1 rounded-full uppercase">
                Featured
                </span>
                <h2 className="text-3xl font-bold tracking-tight mt-3">
                Hot Deals Right Now ...
                </h2>
            </div>
            <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 transition-all">
                View All <span>➔</span>
            </button>
            </div>

            {/* Responsive Flex Grid Framework */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, idx) => (
                <motion.div
                key={product._id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group flex flex-col justify-between p-4 rounded-2xl bg-white dark:bg-[#121216] border border-black/[0.06] dark:border-white/[0.06] shadow-sm hover:shadow-md transition-all duration-200"
                >
                {/* Product Media Container Frame */}
                <div className="w-full aspect-square rounded-xl bg-gray-100 dark:bg-zinc-900 overflow-hidden relative mb-4">
                    <img 
                    src={product.images?.[0] || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80"} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />

                    {/* Condition Badge Top Left */}
                    <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm ${getConditionStyles(product.condition)}`}>
                    {product.condition || "Used"}
                    </span>

                    {/* Simulated View Counter Badge Top Right */}
                    <span className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-black/40 text-white backdrop-blur-sm flex items-center gap-1">
                    👁️ {product.views || Math.floor(Math.random() * 300) + 15}
                    </span>
                </div>

                {/* Text & Specs Details Block */}
                <div className="flex-1 space-y-1.5 mb-4 px-1">
                    <h3 className="font-bold text-base tracking-tight truncate">
                    {product.title}
                    </h3>
                    
                    {/* Location Layout */}
                    <div className="flex items-center text-xs text-gray-500 dark:text-zinc-400 gap-1">
                    <span>📍</span>
                    <span className="truncate">{product.sellerInfo?.location || "Khulna, Bangladesh"}</span>
                    </div>

                    {/* Rating layout block placeholders */}
                    <div className="flex items-center text-xs text-amber-500 font-bold gap-1">
                    <span>★</span>
                    <span>4.6</span>
                    </div>

                    {/* Price & Stock Container Area */}
                    <div className="flex justify-between items-center pt-1.5">
                    <span className="text-xl font-black text-blue-600 dark:text-blue-400">
                        ${product.price?.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-gray-400 dark:text-zinc-500">
                        Stock: {product.stock || 3}
                    </span>
                    </div>
                </div>

                {/* Action Buttons Footer Area */}
                <div className="flex gap-2 w-full pt-1">
                    <button className="flex-1 py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm">
                    🛒 View Deal
                    </button>
                    <button 
                    className="p-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-150 flex items-center justify-center group/heart text-red-500"
                    aria-label="Add to wishlist"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover/heart:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
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