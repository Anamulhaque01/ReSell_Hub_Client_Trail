// src/app/dashboard/admin/layout.jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../../../context/ThemeContext';

export default function AdminDashboardLayout({ children }) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path) => pathname === path;

  return (
    <div className={`flex min-h-screen font-sans antialiased transition-colors duration-200 ${
      theme === 'dark' ? 'bg-[#0C0D0E] text-[#F5F5F7]' : 'bg-[#F9F9F9] text-[#1A1A1A]'
    }`}>
      
      {/* Sidebar Panel */}
      <aside className={`w-64 border-r flex flex-col justify-between shrink-0 hidden md:flex transition-colors duration-200 ${
        theme === 'dark' ? 'bg-[#121315] border-[#1F2124]' : 'bg-white border-[#E5E5E5]'
      }`}>
        <div className="p-5">
          {/* User Profile Badge */}
          <div className="flex items-center gap-3 mb-8 p-1">
            <div className="w-10 h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-sm tracking-wide shadow-sm">
              AU
            </div>
            <div>
              <h4 className={`text-sm font-semibold tracking-wide transition-colors duration-200 ${
                theme === 'dark' ? 'text-white' : 'text-[#1A1A1A]'
              }`}>
                Admin User
              </h4>
              <span className="inline-block text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 bg-[#A855F7]/10 text-[#C084FC] rounded mt-0.5">
                Admin
              </span>
            </div>
          </div>

          {/* Navigation Menu Links */}
          <nav className="space-y-1.5">
            {[
              { name: 'Overview', path: '/dashboard/admin' },
              { name: 'Users', path: '/dashboard/admin/users' },
              { name: 'Products', path: '/dashboard/admin/products' },
              { name: 'Orders', path: '/dashboard/admin/orders' },
              { name: 'Analytics', path: '/dashboard/admin/analytics' },
            ].map((item) => (
              <Link 
                key={item.path}
                href={item.path} 
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                  isActive(item.path) 
                    ? 'bg-[#1E293B] text-[#3B82F6]' 
                    : theme === 'dark'
                      ? 'text-[#94A3B8] hover:bg-[#1A1C1E] hover:text-white'
                      : 'text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#1A1A1A]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Panel Actions */}
        <div className={`p-5 border-t transition-colors duration-200 ${theme === 'dark' ? 'border-[#1F2124]' : 'border-[#E5E5E5]'}`}>
          <button 
            type="button" 
            onClick={toggleTheme} 
            className={`text-xs font-medium w-full p-2.5 mb-3 rounded-md border transition-all ${
              theme === 'dark' 
                ? 'bg-[#1A1C1E] border-[#2D3139] text-[#94A3B8] hover:text-white' 
                : 'bg-white border-[#E5E5E5] text-[#64748B] hover:bg-[#F8FAFC]'
            }`}
          >
            Theme Mode: <span className="capitalize font-bold">{theme}</span>
          </button>
        </div>
      </aside>

      {/* Main Viewport */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}