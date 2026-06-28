// src/components/ui/animations.js
export const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] }
    }
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12
        }
    }
};

export const hoverScale = {
    whileHover: { y: -8, transition: { duration: 0.3, ease: "easeOut" } },
    tap: { scale: 0.98 }
};