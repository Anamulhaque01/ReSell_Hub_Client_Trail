/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: '#0f172a',    // Deep slate for premium aesthetic
                    secondary: '#2563eb',  // Clean link and button blue
                    accent: '#10b981',     // Success/Available badge emerald
                }
            },
        },
    },
    plugins: [],
};