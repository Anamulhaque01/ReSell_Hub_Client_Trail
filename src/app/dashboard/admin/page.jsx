// src/app/dashboard/admin/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';

export default function AdminDashboardPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [serverData, setServerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Exact UI Colors based on theme context
  const pageBg = isDark ? 'bg-[#0B0C0E] text-[#E2E8F0]' : 'bg-[#F8FAFC] text-[#1E293B]';
  const cardBg = isDark ? 'bg-[#121316] border-[#1A1C1F]' : 'bg-white border-[#E2E8F0]';
  const textHeading = isDark ? 'text-white' : 'text-[#0F172A]';
  const textMuted = isDark ? 'text-[#6C727F]' : 'text-[#64748B]';

  useEffect(() => {
    async function fetchSummary() {
      try {
        setLoading(true);
        setError(null);
        
        // 1. Grab token from localStorage
        const token = localStorage.getItem('token');
        
        // 2. Fetch data from backend
        const response = await fetch('http://localhost:5000/api/admin/analytics', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}) // Sends token safely if it exists
          }
        });

        const result = await response.json();

        // 3. Unpack nested data structure (result.data.stats)
        if (result.success && result.data && result.data.stats) {
          setServerData(result.data.stats); 
        } else {
          throw new Error(result.message || "Failed to parse stats from server structure.");
        }

      } catch (err) {
        console.error("Fetch error details:", err);
        setError(err.message || "Network connection error connecting to server.");
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, []);

  // Safe fallback metrics so your dashboard blocks never look broken or empty
  const metrics = serverData || {
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  };

  return (
    <div className={`min-h-screen p-8 ${pageBg}`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block with Inline Error Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className={`text-2xl font-bold ${textHeading}`}>Overview</h1>
            <p className={`text-xs mt-1 ${textMuted}`}>Live real-time operational aggregates</p>
          </div>
          
          {/* Status Indicator Badges */}
          <div className="flex items-center gap-3 text-xs font-mono">
            {loading && (
              <span className="px-3 py-1 rounded bg-amber-500/10 text-amber-500 animate-pulse border border-amber-500/20">
                Fetching Live Records...
              </span>
            )}
            {error && (
              <span className="px-3 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20" title={error}>
                ⚠️ API Offline / Auth Required
              </span>
            )}
            {!loading && !error && (
              <span className="px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ● Synchronized
              </span>
            )}
          </div>
        </div>
        
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Total Users Card */}
          <div className={`p-6 rounded-xl border relative overflow-hidden ${cardBg}`}>
            <h3 className={`text-sm font-medium mb-2 ${textMuted}`}>Total Users</h3>
            <p className={`text-3xl font-bold ${textHeading}`}>
              {loading ? "..." : metrics.totalUsers}
            </p>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500/30" />
          </div>

          {/* Total Products Card */}
          <div className={`p-6 rounded-xl border relative overflow-hidden ${cardBg}`}>
            <h3 className={`text-sm font-medium mb-4 ${textMuted}`}>Total Products</h3>
            <div className="flex items-center gap-4">
               {/* Circle Graph Visualizer */}
               <div className="relative w-16 h-16 shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke={isDark ? "#1C1E22" : "#E2E8F0"} strokeWidth="4.2" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#8B5CF6" strokeWidth="4.2" strokeDasharray="30 70" strokeDashoffset="-20" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#EC4899" strokeWidth="4.2" strokeDasharray="20 80" strokeDashoffset="-50" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-base font-bold ${textHeading}`}>
                    {loading ? "..." : metrics.totalProducts}
                  </span>
                </div>
              </div>
              
              {/* Secondary Category Metrics */}
              <div className="flex flex-col gap-1 text-[11px] font-medium tracking-wide">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span> 
                  <span className={textMuted}>Phones</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]"></span> 
                  <span className={textMuted}>Electronics</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8B5CF6]"></span> 
                  <span className={textMuted}>Others</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-500/30" />
          </div>

          {/* Total Orders Card */}
          <div className={`p-6 rounded-xl border relative overflow-hidden ${cardBg}`}>
            <h3 className={`text-sm font-medium mb-2 ${textMuted}`}>Total Orders</h3>
            <p className={`text-3xl font-bold ${textHeading}`}>
              {loading ? "..." : metrics.totalOrders}
            </p>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-pink-500/30" />
          </div>

          {/* Total Revenue Card */}
          <div className={`p-6 rounded-xl border relative overflow-hidden ${cardBg}`}>
            <h3 className={`text-sm font-medium mb-2 ${textMuted}`}>Total Revenue</h3>
            <p className={`text-3xl font-bold ${textHeading}`}>
              ${loading ? "..." : metrics.totalRevenue}
            </p>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500/30" />
          </div>

        </div>

        {/* Detailed Debug/Error Message for testing parameters */}
        {error && (
          <div className="mt-8 p-4 rounded-lg bg-red-500/5 border border-red-500/10 text-xs font-mono text-red-400 max-w-xl">
            <p className="font-bold mb-1">🔧 Admin Pipeline Diagnostic:</p>
            <p>{error}</p>
            <p className="mt-2 text-[11px] text-zinc-500">Ensure your server is alive on port 5000 and DB seeding contains documents inside collections.</p>
          </div>
        )}

      </div>
    </div>
  );
}