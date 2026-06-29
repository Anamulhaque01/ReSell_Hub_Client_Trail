    // src/components/global/SuccessStories.jsx
    "use client";

    import { motion } from "framer-motion";

    const testimonials = [
    {
        name: "Sarah Mitchell",
        initials: "SM",
        role: "Buyer",
        roleColor: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
        quote: "Found an amazing MacBook for half the price! The seller was incredibly responsive and shipping was super fast.",
        rating: 5,
    },
    {
        name: "James Chen",
        initials: "JC",
        role: "Seller",
        roleColor: "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400",
        quote: "Sold 15+ items in my first month. ReSellHub has the best interface and the buyers here are serious about purchasing.",
        rating: 5,
    },
    {
        name: "Priya Patel",
        initials: "PP",
        role: "Buyer",
        roleColor: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
        quote: "I furnished my entire apartment from ReSellHub. Saved over $2,000 compared to buying new. Highly recommend!",
        rating: 5,
    },
    {
        name: "Marcus Johnson",
        initials: "MJ",
        role: "Seller",
        roleColor: "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400",
        quote: "The analytics dashboard helped me price my items perfectly. Revenue tripled in 3 months!",
        rating: 5,
    },
    ];

    const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
    };

    const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    export default function SuccessStories() {
    return (
        <section id="success-stories" className="w-full py-16 bg-[#FAF9F6] text-[#1A1A1A] dark:bg-[#0B0B0F] dark:text-[#F5F5F5] transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6">
            
            {/* Top Header Labeling & Titles */}
            <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-wider text-green-600 dark:text-green-400 bg-green-500/10 dark:bg-green-500/20 px-3 py-1 rounded-full uppercase">
                Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 mb-2">
                Success Stories
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                What our community says
            </p>
            </div>

            {/* 2x2 Grid Layout */}
            <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
            {testimonials.map((t, idx) => (
                <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -3 }}
                className="p-6 md:p-8 rounded-2xl bg-white dark:bg-[#121216] border border-black/[0.06] dark:border-white/[0.06] shadow-sm flex flex-col justify-between space-y-6 transition-all duration-200"
                >
                <div className="space-y-4">
                    {/* Gold Stars Rating Block */}
                    <div className="flex gap-1 text-amber-500 text-sm">
                    {[...Array(t.rating)].map((_, i) => (
                        <span key={i}>★</span>
                    ))}
                    </div>

                    {/* Testimonial Review Body Content */}
                    <p className="text-sm md:text-base italic text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                    "{t.quote}"
                    </p>
                </div>

                {/* User Metadata Footer Box */}
                <div className="flex items-center gap-3 pt-2">
                    {/* Initials Placeholder Circle Avatar */}
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-zinc-800 border border-black/[0.05] dark:border-white/[0.05] flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-400">
                    {t.initials}
                    </div>

                    {/* Name and Categorized Custom Pill Tag Layout */}
                    <div className="flex flex-col items-start space-y-0.5">
                    <span className="text-sm font-bold tracking-tight">
                        {t.name}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide ${t.roleColor}`}>
                        {t.role}
                    </span>
                    </div>
                </div>
                </motion.div>
            ))}
            </motion.div>

        </div>
        </section>
    );
    }