    // src/components/global/TrustedSellers.jsx
    "use client";

    import { motion } from "framer-motion";

    const sellers = [
    {
        name: "Alex Rivera",
        initials: "AR",
        location: "New York, NY",
        rating: 4,
        listings: 4,
        avatarBg: "bg-blue-500 text-white",
    },
    {
        name: "Jordan Lee",
        initials: "JL",
        location: "Los Angeles, CA",
        rating: 4,
        listings: 3,
        avatarBg: "bg-emerald-500 text-white",
    },
    {
        name: "Morgan Chen",
        initials: "MC",
        location: "Chicago, IL",
        rating: 4,
        listings: 3,
        avatarBg: "bg-purple-500 text-white",
    },
    {
        name: "Taylor Kim",
        initials: "TK",
        location: "Houston, TX",
        rating: 4,
        listings: 3,
        avatarBg: "bg-teal-500 text-white",
    },
    ];

    const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 }
    }
    };

    const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
    };

    export default function TrustedSellers() {
    return (
        <section id="trusted-sellers" className="w-full py-16 bg-[#FAF9F6] text-[#1A1A1A] dark:bg-[#0B0B0F] dark:text-[#F5F5F5] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
            
            {/* Section Headers */}
            <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-wider text-amber-700 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-500/20 px-3 py-1 rounded-full uppercase">
                Top Sellers
            </span>
            <h2 className="text-3xl font-bold tracking-tight mt-3">
                Trusted Sellers
            </h2>
            </div>

            {/* Responsive Row Grid Framework */}
            <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
            {sellers.map((seller, idx) => (
                <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -4, scale: 1.01 }}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-[#121216] border border-black/[0.06] dark:border-white/[0.06] shadow-sm hover:shadow-md transition-all duration-200"
                >
                {/* Vibrant Initial Avatar Circle */}
                <div className={`w-14 h-14 rounded-full ${seller.avatarBg} flex items-center justify-center text-base font-bold tracking-wider mb-4 shadow-sm animate-fade-in`}>
                    {seller.initials}
                </div>

                {/* Profile Details Block */}
                <div className="space-y-1 mb-4">
                    <h3 className="font-bold text-base tracking-tight text-gray-900 dark:text-white">
                    {seller.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                    {seller.location}
                    </p>
                </div>

                {/* Custom Star Rating Layout Block (4 Full Stars, 1 Empty Star) */}
                <div className="flex gap-0.5 text-amber-400 text-xs mb-5">
                    {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < seller.rating ? "★" : "☆"}</span>
                    ))}
                </div>

                {/* Volume Listing Pill Badge */}
                <span className="text-[11px] font-bold px-3 py-1 rounded-md bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 tracking-tight">
                    {seller.listings} listings
                </span>

                </motion.div>
            ))}
            </motion.div>

        </div>
        </section>
    );
    }