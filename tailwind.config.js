/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // Critical toggle for checking root element styling
    content: [
        "./src/pages/**/*.{js,ts,jsx, Cartwright,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    blue: '#1d4ed8',     // Exact vibrant blue button fill from your screenshots
                    bgLight: '#ffffff',  // Light mode canvas
                    bgDark: '#0f172a',   // Tailored deep dark mode slate tone
                }
            }
        },
    },
    plugins: [],
};