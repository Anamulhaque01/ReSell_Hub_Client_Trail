'use client';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

// Import your custom hooks exactly as you defined them
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext'; 

export default function SellerLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Call your custom hooks directly
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  // Dynamically extract the logged-in seller's name or fallback
  const sellerName = user?.name || 'Active Seller';
  const initialLetters = sellerName
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const navigationOptions = [
    { name: 'Overview', path: '/dashboard/seller' },
    { name: 'Add Product', path: '/dashboard/seller/add-product' },
    { name: 'My Products', path: '/dashboard/seller/my-products' },
    { name: 'Orders', path: '/dashboard/seller/orders' },
    { name: 'Analytics', path: '/dashboard/seller/analytics' },
    { name: 'Profile', path: '/dashboard/seller/profile' },
  ];

  const handleSignOut = () => {
    logout(); // Uses your context's secure logout which handles localStorage cleanup and routing
  };

  return (
    <ProtectedRoute allowedRoles={['seller']}>
      <div className={`flex min-h-screen antialiased font-sans transition-colors duration-200 ${
        theme === 'dark' ? 'bg-[#09090b] text-white' : 'bg-[#fafafa] text-zinc-900'
      }`}>
        
        {/* Left Hand Navigation Sidebar Area */}
        <aside className={`w-64 border-r px-4 py-6 flex flex-col justify-between shrink-0 transition-colors duration-200 ${
          theme === 'dark' ? 'bg-[#09090b] border-zinc-800' : 'bg-white border-zinc-200'
        }`}>
          <div>
            {/* Dynamic Seller Profile Identity Block */}
            <div className="flex items-center gap-3 px-2 mb-8">
              <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white tracking-wider shrink-0">
                {initialLetters}
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-semibold tracking-wide truncate">{sellerName}</h4>
                <span className={`inline-block px-1.5 py-0.5 text-[10px] uppercase tracking-widest font-extrabold rounded-sm mt-0.5 ${
                  theme === 'dark' ? 'bg-emerald-950/60 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  Seller
                </span>
              </div>
            </div>

            {/* Sidebar Links Mapping exactly to your design layouts */}
            <nav className="space-y-1">
              {navigationOptions.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
                      isActive 
                        ? (theme === 'dark' 
                            ? 'bg-blue-950/40 text-blue-400 border-l-2 border-blue-500 font-semibold pl-4' 
                            : 'bg-blue-50 text-blue-600 border-l-2 border-blue-500 font-semibold pl-4')
                        : (theme === 'dark' 
                            ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40' 
                            : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100')
                    }`}
                  >
                    <span>{item.name}</span>
                    {item.name === 'Orders' && (
                      <span className={`h-4 w-4 text-[9px] rounded-full flex items-center justify-center font-bold border ${
                        theme === 'dark' 
                          ? 'bg-red-950 text-red-400 border-red-900' 
                          : 'bg-red-50 text-red-600 border-red-200'
                      }`}>
                        1
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Bottom Actions: Working Theme Toggle Mode & Sign Out */}
          <div className="space-y-2">
            <button
              onClick={toggleTheme}
              className={`flex items-center justify-between w-full px-3 py-2 border rounded-lg text-xs font-medium tracking-wide transition-all ${
                theme === 'dark'
                  ? 'border-zinc-800 text-zinc-400 hover:text-white bg-zinc-900/30'
                  : 'border-zinc-200 text-zinc-600 hover:text-zinc-900 bg-zinc-50'
              }`}
            >
              <span>Theme Mode</span>
              <span className="text-sm select-none">{theme === 'dark' ? '🌙' : '☀️'}</span>
            </button>

            <button 
              onClick={handleSignOut}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium tracking-wide text-zinc-500 hover:text-red-500 transition-colors w-full text-left font-semibold"
            >
              <span>← Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Core Subview Page Target Workspace */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}