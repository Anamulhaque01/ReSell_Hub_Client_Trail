// src/app/dashboard/admin/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';

export default function AdminDashboardPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [serverData, setServerData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Exact UI Colors based on image_44d1bc.png
  const pageBg = isDark ? 'bg-[#0B0C0E] text-[#E2E8F0]' : 'bg-[#F8FAFC] text-[#1E293B]';
  const cardBg = isDark ? 'bg-[#121316] border-[#1A1C1F]' : 'bg-white border-[#E2E8F0]';
  const textHeading = isDark ? 'text-white' : 'text-[#0F172A]';
  const textMuted = isDark ? 'text-[#6C727F]' : 'text-[#64748B]';

  useEffect(() => {
    async function fetchSummary() {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        
        const res = await fetch(`${baseUrl}/api/admin/analytics`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setServerData(data);
        }
      } catch (error) {
        console.error('Failed fetching analytics data', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSummary();
  }, []);

  const metrics = serverData?.stats || { totalUsers: 19, totalProducts: 20, totalOrders: 13 };
  const revenueTotal = "$21,255";

  return (
    <div className={`min-h-screen p-8 transition-colors duration-200 ${pageBg}`}>
      
      {/* Title */}
      <div className="mb-8">
        <h1 className={`text-2xl font-bold tracking-tight ${textHeading}`}>Admin Overview</h1>
      </div>

      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        
        {/* Total Users */}
        <div className={`border p-5 rounded-xl flex flex-col justify-between ${cardBg}`}>
          <div>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 text-sm mb-4">
              👥
            </div>
            <h2 className="text-3xl font-bold tracking-tight">{metrics.totalUsers}</h2>
            <p className={`text-xs font-medium mt-1 ${textHeading}`}>Total Users</p>
          </div>
          <p className={`text-[11px] mt-2 ${textMuted}`}>5 sellers, 14 buyers</p>
        </div>

        {/* Total Products */}
        <div className={`border p-5 rounded-xl flex flex-col justify-between ${cardBg}`}>
          <div>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 text-sm mb-4">
              📦
            </div>
            <h2 className="text-3xl font-bold tracking-tight">{metrics.totalProducts}</h2>
            <p className={`text-xs font-medium mt-1 ${textHeading}`}>Total Products</p>
          </div>
          <p className={`text-[11px] mt-2 ${textMuted}`}>1 pending review</p>
        </div>

        {/* Total Orders */}
        <div className={`border p-5 rounded-xl flex flex-col justify-between ${cardBg}`}>
          <div>
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 text-sm mb-4">
              💼
            </div>
            <h2 className="text-3xl font-bold tracking-tight">{metrics.totalOrders}</h2>
            <p className={`text-xs font-medium mt-1 ${textHeading}`}>Total Orders</p>
          </div>
          <p className={`text-[11px] mt-2 ${textMuted}`}>2 delivered</p>
        </div>

        {/* Total Revenue */}
        <div className={`border p-5 rounded-xl flex flex-col justify-between ${cardBg}`}>
          <div>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-sm mb-4">
              💲
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white">{revenueTotal}</h2>
            <p className={`text-xs font-medium mt-1 ${textHeading}`}>Total Revenue</p>
          </div>
          <p className={`text-[11px] mt-2 ${textMuted}`}>From paid orders</p>
        </div>

      </div>

      {/* Middle Block: Revenue Overview Bar Layout */}
      <div className={`border p-6 rounded-xl mb-6 ${cardBg}`}>
        <h3 className={`text-sm font-semibold mb-8 ${textHeading}`}>Revenue Overview (Last 6 Months)</h3>
        
        <div className="h-64 flex items-end justify-between gap-3 pt-6 border-b border-gray-800/40 px-2">
          {/* Feb */}
          <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
            <span className="text-[10px] text-gray-400">$20</span>
            <div className="w-full bg-[#3B82F6] rounded-t-sm opacity-80 h-[2%] transition-all duration-500"></div>
            <span className={`text-[11px] mt-1 ${textMuted}`}>Feb</span>
          </div>
          {/* Mar */}
          <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
            <span className="text-[10px] text-gray-400">$45</span>
            <div className="w-full bg-[#3B82F6] rounded-t-sm opacity-80 h-[4%] transition-all duration-500"></div>
            <span className={`text-[11px] mt-1 ${textMuted}`}>Mar</span>
          </div>
          {/* Apr */}
          <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
            <span className="text-[10px] text-gray-400">$750</span>
            <div className="w-full bg-[#3B82F6] rounded-t-sm h-[8%] transition-all duration-500"></div>
            <span className={`text-[11px] mt-1 ${textMuted}`}>Apr</span>
          </div>
          {/* May */}
          <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
            <span className="text-[10px] text-white font-medium">$19.7k</span>
            <div className="w-full bg-[#3B82F6] rounded-t-sm h-[75%] shadow-lg shadow-blue-500/10"></div>
            <span className={`text-[11px] mt-1 ${textMuted}`}>May</span>
          </div>
          {/* Jun */}
          <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
            <span className="text-[10px] text-gray-400">$810</span>
            <div className="w-full bg-[#3B82F6] rounded-t-sm h-[9%] transition-all duration-500"></div>
            <span className={`text-[11px] mt-1 ${textMuted}`}>Jun</span>
          </div>
          {/* Jul */}
          <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
            <span className="text-[10px] text-gray-400">$10</span>
            <div className="w-full bg-[#3B82F6] rounded-t-sm opacity-80 h-[1%] transition-all duration-500"></div>
            <span className={`text-[11px] mt-1 ${textMuted}`}>Jul</span>
          </div>
        </div>
      </div>

      {/* Bottom Row Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* User Growth Component Layout */}
        <div className={`border p-6 rounded-xl lg:col-span-2 flex flex-col justify-between ${cardBg}`}>
          <h3 className={`text-sm font-semibold mb-4 ${textHeading}`}>User Growth</h3>
          <div className="h-44 relative w-full mt-2 flex flex-col justify-between">
            {/* Background Grid Horizontal Lines lines */}
            <div className="w-full border-t border-gray-800/30 h-0"></div>
            <div className="w-full border-t border-gray-800/30 h-0"></div>
            <div className="w-full border-t border-gray-800/30 h-0"></div>
            
            {/* SVG Trendline vector display */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 140" preserveAspectRatio="none">
              <path
                d="M 10 110 Q 120 20 200 30 T 400 120 Q 480 80 590 130"
                fill="none"
                stroke="#10B981"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Dynamic point markers */}
              <circle cx="200" cy="30" r="5" fill="#10B981" />
              <circle cx="310" cy="30" r="5" fill="#10B981" />
            </svg>
            
            {/* Bottom Timestamps */}
            <div className="flex justify-between text-[11px] text-[#6C727F] pt-2 mt-auto">
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
            </div>
          </div>
        </div>

        {/* Category Performance Donut Section */}
        <div className={`border p-6 rounded-xl flex flex-col ${cardBg}`}>
          <h3 className={`text-sm font-semibold mb-6 ${textHeading}`}>Category Performance</h3>
          
          <div className="flex items-center justify-around flex-1 gap-4">
            {/* Custom SVG CSS Donut */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#2563EB" strokeWidth="4.2" strokeDasharray="35 65" />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10B981" strokeWidth="4.2" strokeDasharray="25 75" strokeDashoffset="-35" />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F59E0B" strokeWidth="4.2" strokeDasharray="20 80" strokeDashoffset="-60" />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#8B5CF6" strokeWidth="4.2" strokeDasharray="10 90" strokeDashoffset="-80" />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#EC4899" strokeWidth="4.2" strokeDasharray="10 90" strokeDashoffset="-90" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-white">16</span>
              </div>
            </div>

            {/* Labels Indicators Column */}
            <div className="flex flex-col gap-1.5 text-[11px]">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#2563EB]"></span> <span className="text-gray-400">Mobile Phones: 2</span></div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#10B981]"></span> <span className="text-gray-400">Electronics: 5</span></div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span> <span className="text-gray-400">Furniture: 3</span></div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#8B5CF6]"></span> <span className="text-gray-400">Vehicles: 1</span></div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#EC4899]"></span> <span className="text-gray-400">Fashion: 3</span></div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#06B6D4]"></span> <span className="text-gray-400">Sports: 2</span></div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}