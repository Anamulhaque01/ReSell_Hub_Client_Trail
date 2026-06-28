import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';

export const metadata = {
  title: 'ReSell Hub | Premier Second-Hand Marketplace Platform',
  description: 'Buy and sell pre-owned items reliably and cleanly within a high-performance framework ecosystem.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-white dark:bg-[#121212] transition-colors duration-200">
        <AuthProvider>
          <ThemeProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}