'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Heart, CreditCard, User, LogOut } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function BuyerLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [userName, setUserName] = useState('Buyer Account');
  const [initials, setInitials] = useState('B');

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Safe Client-Side parsing of JWT Payload configuration
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const user = JSON.parse(jsonPayload);
        
        if (user?.name) {
          setUserName(user.name);
          const nameParts = user.name.split(' ');
          const letters = nameParts.map(p => p[0]).join('').toUpperCase();
          setInitials(letters.slice(0, 2));
        }
      }
    } catch (err) {
      console.error('Error parsing user token:', err);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const isActive = (path) => pathname === path;

  return (
    <ProtectedRoute allowedRoles={['buyer', 'admin']}>
      <div className="min-h-screen flex bg-neutral-50 dark:bg-[#070708] text-neutral-900 dark:text-neutral-100 font-sans antialiased transition-colors duration-200">
        
        {/* Fixed Left Sidebar Container */}
        <aside className="w-64 border-r border-neutral-200/60 dark:border-zinc-800/80 bg-white dark:bg-[#0d0d0e] flex flex-col justify-between fixed h-screen z-20 transition-colors duration-200">
          
          <div className="p-5 space-y-7">
            {/* User Profile Emblem */}
            <div className="flex items-center gap-3 px-1">
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-sm uppercase">
                {initials}
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100 tracking-tight line-clamp-1">{userName}</h3>
                <span className="inline-block text-[10px] font-bold px-1.5 py-0.5 mt-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                  Buyer
                </span>
              </div>
            </div>

            {/* Navigation Tabs List */}
            <nav className="space-y-1">
              <Link 
                href="/dashboard/buyer" 
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  isActive('/dashboard/buyer') 
                    ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400' 
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-zinc-800/30'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard size={16} />
                  <span>Overview</span>
                </div>
                {isActive('/dashboard/buyer') && <div className="w-1 h-3 bg-blue-600 dark:bg-blue-400 rounded-full" />}
              </Link>

              <Link 
                href="/dashboard/buyer/orders" 
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  isActive('/dashboard/buyer/orders') 
                    ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400' 
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-zinc-800/30'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag size={16} />
                  <span>My Orders</span>
                </div>
              </Link>

              <Link 
                href="/dashboard/buyer/wishlist" 
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  isActive('/dashboard/buyer/wishlist') 
                    ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400' 
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-zinc-800/30'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Heart size={16} />
                  <span>Wishlist</span>
                </div>
              </Link>

              <Link 
                href="/dashboard/buyer/payments" 
                className="flex items-center px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-zinc-800/30 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <CreditCard size={16} />
                  <span>Payments</span>
                </div>
              </Link>

              <Link 
                href="/dashboard/buyer/profile" 
                className="flex items-center px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-zinc-800/30 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <User size={16} />
                  <span>Profile</span>
                </div>
              </Link>
            </nav>
          </div>

          <div className="p-4 border-t border-neutral-200/60 dark:border-zinc-800/80">
            <button 
              onClick={handleSignOut}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        <div className="flex-1 pl-64 min-h-screen">
          <main className="p-8 max-w-6xl mx-auto w-full">
            {children}
          </main>
        </div>

      </div>
    </ProtectedRoute>
  );
}