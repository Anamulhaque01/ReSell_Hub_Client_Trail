'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const userFirstName = user?.name ? user.name.split(' ')[0] : 'Account';

  return (
    <nav className="bg-white dark:bg-[#0c0c0e] border-b border-zinc-200/80 dark:border-zinc-800/80 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-zinc-900 dark:text-white tracking-tight">
              <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
                <span className="text-white font-black text-sm">R</span>
              </div>
              <span>ReSell<span className="text-blue-600">Hub</span></span>
            </Link>
          </div>

          {/* Nav Links Row - Exactly matching image_24e439.png */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`text-sm font-medium px-4 py-2 rounded-md transition-all duration-150 ${
                    isActive 
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold' 
                      : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            {user && (
              <Link 
                href={
                  user.role === 'admin' ? '/dashboard/admin' :
                  user.role === 'seller' ? '/dashboard/seller' : '/dashboard/buyer'
                } 
                className={`text-sm font-medium px-4 py-2 rounded-md transition-all duration-150 ${
                  pathname.startsWith('/dashboard') 
                    ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold' 
                    : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right Utilities Panel */}
          <div className="hidden md:flex items-center space-x-6">
            
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme} 
              className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-zinc-600 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              )}
            </button>

            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 font-medium hover:text-zinc-950 dark:hover:text-white focus:outline-none cursor-pointer"
                >
                  <img 
                    src={user.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"} 
                    alt="User Profile Avatar" 
                    className="w-7 h-7 rounded-full border border-zinc-200 dark:border-zinc-800 object-cover"
                  />
                  <span>{userFirstName}</span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded border border-blue-200/20 dark:border-blue-500/10 tracking-wide">
                    {user.role}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#0e0e10] border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl py-1 text-zinc-700 dark:text-zinc-300 z-50">
                    {user.role === 'admin' && (
                      <>
                        <Link href="/dashboard/admin/users" className="flex items-center px-4 py-2.5 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900/60" onClick={() => setDropdownOpen(false)}>
                          <span className="mr-2">👥</span> Manage Users
                        </Link>
                        <Link href="/dashboard/admin/reports" className="flex items-center px-4 py-2.5 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900/60" onClick={() => setDropdownOpen(false)}>
                          <span className="mr-2">⚠️</span> Reported Items
                        </Link>
                      </>
                    )}

                    {user.role === 'seller' && (
                      <>
                        <Link href="/dashboard/seller/add-product" className="flex items-center px-4 py-2.5 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900/60" onClick={() => setDropdownOpen(false)}>
                          <span className="mr-2">➕</span> Add Product
                        </Link>
                        <Link href="/dashboard/seller/my-products" className="flex items-center px-4 py-2.5 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900/60" onClick={() => setDropdownOpen(false)}>
                          <span className="mr-2">📦</span> My Products
                        </Link>
                      </>
                    )}

                    {user.role === 'buyer' && (
                      <>
                        <Link href="/dashboard/buyer/orders" className="flex items-center px-4 py-2.5 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900/60" onClick={() => setDropdownOpen(false)}>
                          <span className="mr-2">🛍️</span> My Orders
                        </Link>
                        <Link href="/dashboard/buyer/wishlist" className="flex items-center px-4 py-2.5 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900/60" onClick={() => setDropdownOpen(false)}>
                          <span className="mr-2">❤️</span> Wishlist
                        </Link>
                      </>
                    )}

                    <hr className="border-zinc-100 dark:border-zinc-900 my-1" />
                    
                    <button 
                      onClick={() => { logout(); setDropdownOpen(false); }}
                      className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/10 font-medium text-left transition-colors cursor-pointer"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors shadow-sm">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggles */}
          <div className="md:hidden flex items-center space-x-1">
            <button onClick={toggleTheme} className="p-2 text-zinc-500 dark:text-zinc-400 rounded-xl">
              {theme === 'dark' ? (
                <svg className="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              ) : (
                <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              )}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-zinc-500 dark:text-zinc-400 rounded-xl">
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-[#0c0c0e] px-4 pt-2 pb-4 space-y-1 transition-all">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="block px-3 py-2 text-sm font-medium rounded-md text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                href={user.role === 'admin' ? '/dashboard/admin' : user.role === 'seller' ? '/dashboard/seller' : '/dashboard/buyer'}
                className="block px-3 py-2 text-sm font-semibold rounded-md text-blue-600 dark:text-blue-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="w-full text-left block px-3 py-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/10 rounded-md"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="pt-2 grid grid-cols-2 gap-2 border-t border-zinc-200/60 dark:border-zinc-800/60 mt-2">
              <Link href="/login" className="text-center text-sm font-medium text-zinc-600 dark:text-zinc-400 py-2 rounded-md border border-zinc-200 dark:border-zinc-800" onClick={() => setMobileMenuOpen(false)}>
                Sign In
              </Link>
              <Link href="/register" className="text-center text-sm font-semibold bg-blue-600 text-white py-2 rounded-md" onClick={() => setMobileMenuOpen(false)}>
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}