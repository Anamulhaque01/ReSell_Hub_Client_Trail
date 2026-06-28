import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#1a1a1a] border-t border-slate-200 dark:border-zinc-900 text-slate-600 dark:text-zinc-400 text-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand & Social Grid Block Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white tracking-tight">
              <span className="bg-blue-600 text-white w-7 h-7 flex items-center justify-center rounded-md font-black text-sm">R</span>
              <span>ReSell<span className="text-blue-600">Hub</span></span>
            </div>
            <p className="max-w-xs leading-relaxed text-slate-500 dark:text-zinc-400">
              The premier marketplace for second-hand goods. Buy and sell sustainably, saving money while helping the environment.
            </p>
            
            {/* Social Anchor Handles - Verified Active View */}
            <div className="flex items-center space-x-4 pt-2 text-slate-400 dark:text-zinc-500">
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              {/* Twitter / X */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-slate-500 dark:text-zinc-400">
              <li><Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Products</Link></li>
              <li><Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white tracking-wide">Account</h4>
            <ul className="space-y-2 text-slate-500 dark:text-zinc-400">
              <li><Link href="/login" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sign In</Link></li>
              <li><Link href="/register" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Register</Link></li>
              <li><Link href="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Dashboard</Link></li>
              <li><Link href="/dashboard/orders" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">My Orders</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white tracking-wide">Categories</h4>
            <ul className="space-y-2 text-slate-500 dark:text-zinc-400">
              <li><Link href="/categories/electronics" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Electronics</Link></li>
              <li><Link href="/categories/furniture" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Furniture</Link></li>
              <li><Link href="/categories/vehicles" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Vehicles</Link></li>
              <li><Link href="/categories/fashion" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Fashion</Link></li>
              <li><Link href="/categories/mobiles" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Mobile Phones</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Panel */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-zinc-900 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 dark:text-zinc-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} ReSellHub. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}