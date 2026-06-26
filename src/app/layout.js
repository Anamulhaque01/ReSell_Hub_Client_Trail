import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'ReSell Hub | Sustainable Second-Hand Marketplace',
  description: 'Buy and sell pre-owned items smoothly and securely.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased">
        <AuthProvider>
          <main className="flex-grow">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}