    // src/components/global/HomeClientView.jsx
    "use client";

    import { motion } from "framer-motion";
import Hero from "../Hero";
import PopularCategories from "./PopularCategories";
import FeaturedProducts from "./FeaturedProducts";
import MarketplaceStats from "./MarketplaceStats";
import SuccessStories from "./SuccessStories";
import SustainabilityImpact from "./SustainabilityImpact";
import TrustedSellers from "./TrustedSellers";
import HomeCTA from "./HomeCTA";
    // Import your Theme Context hook if needed, but Tailwind's class strategy 
    // will automatically pick up changes if your ThemeContext toggles the 'dark' class on the document root.

    export default function HomeClientView() {
    return (
        <main className="w-full min-h-screen bg-[#FAF9F6] text-[#1A1A1A] dark:bg-[#121212] dark:text-[#F5F5F5] transition-colors duration-300 overflow-x-hidden">
            <Hero></Hero>
            <PopularCategories></PopularCategories>
            <FeaturedProducts></FeaturedProducts>
            <MarketplaceStats></MarketplaceStats>
            <SuccessStories></SuccessStories>
            <SustainabilityImpact></SustainabilityImpact>
            <TrustedSellers></TrustedSellers>
            <HomeCTA></HomeCTA>
        </main>
    );
    }