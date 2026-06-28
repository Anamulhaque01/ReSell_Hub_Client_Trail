    // src/components/global/HomeClientView.jsx
    "use client";

    import { motion } from "framer-motion";
import Hero from "../Hero";
import PopularCategories from "./PopularCategories";
import FeaturedProducts from "./FeaturedProducts";
    // Import your Theme Context hook if needed, but Tailwind's class strategy 
    // will automatically pick up changes if your ThemeContext toggles the 'dark' class on the document root.

    export default function HomeClientView() {
    return (
        <main className="w-full min-h-screen bg-[#FAF9F6] text-[#1A1A1A] dark:bg-[#121212] dark:text-[#F5F5F5] transition-colors duration-300 overflow-x-hidden">

        <Hero></Hero>
        <PopularCategories></PopularCategories>
        <FeaturedProducts></FeaturedProducts>

        {/* Section 4: Success Stories */}
        <section id="success-stories" className="w-full py-16">
            {/* Placeholder for layout */}
        </section>

        {/* Section 5: Marketplace Statistics */}
        <section id="marketplace-stats" className="w-full py-16">
            {/* Placeholder for layout */}
        </section>

        {/* Extra Section 1: Sustainability Impact */}
        <section id="sustainability-impact" className="w-full py-16">
            {/* Placeholder for layout */}
        </section>

        {/* Extra Section 2: Trusted Sellers Showcase */}
        <section id="trusted-sellers" className="w-full py-16">
            {/* Placeholder for layout */}
        </section>
        
        </main>
    );
    }