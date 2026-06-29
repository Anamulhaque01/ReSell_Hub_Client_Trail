// src/app/dashboard/admin/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';

export default function AdminOverviewPage() {
  const { theme } = useTheme();
  const [serverData, setServerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/analytics`);
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

  const metrics = serverData?.stats || { 
    totalUsers: 19, 
    totalProducts: 20, 
    totalOrders: 13, 
    totalRevenue: 21255 
  };

  const categories = serverData?.categoryPerformance || [
    { _id: 'Mobile Phones', count: 2, color: '#3B82F6' },
    { _id: 'Electronics', count: 5, color: '#10B981' },
    { _id: 'Furniture', count: 3, color: '#F59E0B' },
    { _id: 'Vehicles', count: 1, color: '#8B5CF6' },
    { _id: 'Fashion', count: 3, color: '#EC4899' },
    { _id: 'Sports', count: 2, color: '#06B6D4' }
  ];

  // Dynamic Theme Utilities
  const isDark = theme === 'dark';
  const cardBg = isDark ? 'bg-[#121315] border-[#1F2124]' : 'bg-white border-[#E5E5E5] shadow-sm';
  const textHeading = isDark ? 'text-white' : 'text-[#1A1A1A]';
  const textMuted = isDark ? 'text-[#64748B]' : 'text-[#71717A]';

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h1 className={`text-2xl font-bold tracking-tight transition-colors duration-200 ${textHeading}`}>
          Admin Overview
        </h1>
      </div>

      {/* High-Level Analytical Widget Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users Metric Card */}
        <div className={`border p-5 rounded-xl flex flex-col justify-between transition-colors duration-200 ${cardBg}`}>
          <div>
            <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6] mb-4">
              👥
            </div>
            <p className={`text-2xl font-bold tracking-tight ${textHeading}`}>{metrics.totalUsers}</p>
            <p className={`text-xs font-semibold mt-1 ${textHeading}`}>Total Users</p>
          </div>
          <span className={`text-[11px] mt-2 block ${textMuted}`}>5 sellers, 13 buyers</span>
        </div>

        {/* Total Products Metric Card */}
        <div className={`border p-5 rounded-xl flex flex-col justify-between transition-colors duration-200 ${cardBg}`}>
          <div>
            <div className="w-8 h-8 rounded-lg bg-[#A855F7]/10 flex items-center justify-center text-[#A855F7] mb-4">
              📦
            </div>
            <p className={`text-2xl font-bold tracking-tight ${textHeading}`}>{metrics.totalProducts}</p>
            <p className={`text-xs font-semibold mt-1 ${textHeading}`}>Total Products</p>
          </div>
          <span className={`text-[11px] mt-2 block ${textMuted}`}>1 pending review</span>
        </div>

        {/* Total Orders Metric Card */}
        <div className={`border p-5 rounded-xl flex flex-col justify-between transition-colors duration-200 ${cardBg}`}>
          <div>
            <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B] mb-4">
              💼
            </div>
            <p className={`text-2xl font-bold tracking-tight ${textHeading}`}>{metrics.totalOrders}</p>
            <p className={`text-xs font-semibold mt-1 ${textHeading}`}>Total Orders</p>
          </div>
          <span className={`text-[11px] mt-2 block ${textMuted}`}>2 delivered</span>
        </div>

        {/* Total Revenue Metric Card */}
        <div className={`border p-5 rounded-xl flex flex-col justify-between transition-colors duration-200 ${cardBg}`}>
          <div>
            <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 flex items-center justify-center text-[#10B981] mb-4">
              $
            </div>
            <p className={`text-2xl font-bold tracking-tight ${textHeading}`}>
              ${metrics.totalRevenue.toLocaleString()}
            </p>
            <p className={`text-xs font-semibold mt-1 ${textHeading}`}>Total Revenue</p>
          </div>
          <span className={`text-[11px] mt-2 block ${textMuted}`}>From paid orders</span>
        </div>
      </div>

      {/* Main Analytics Core Panels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Graph Container Box */}
        <div className={`border p-6 rounded-xl lg:col-span-2 transition-colors duration-200 ${cardBg}`}>
          <div className="mb-6">
            <h3 className={`text-sm font-bold ${textHeading}`}>Revenue Overview (Last 6 Months)</h3>
          </div>
          
          <div className={`h-64 flex items-end gap-3 pt-6 border-b relative ${isDark ? 'border-[#1F2124]' : 'border-[#E5E5E5]'}`}>
            {['Jan', 'Feb', 'Mar'].map((month) => (
              <div key={month} className="w-full flex flex-col justify-end items-center h-full group">
                <span className={`text-[10px] mb-1 opacity-0 group-hover:opacity-100 transition-opacity ${textMuted}`}>$0</span>
                <div className={`w-full h-[2px] rounded-t ${isDark ? 'bg-[#1F2124]' : 'bg-[#E5E5E5]'}`}></div>
                <span className={`text-[10px] mt-2 ${textMuted}`}>{month}</span>
              </div>
            ))}
            
            <div className="w-full flex flex-col justify-end items-center h-full group">
              <span className={`text-[11px] mb-1 ${isDark ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>$750</span>
              <div className="w-full bg-[#2563EB]/40 h-[10%] rounded-t border-t border-[#3B82F6]"></div>
              <span className={`text-[10px] mt-2 ${textMuted}`}>Apr</span>
            </div>

            <div className="w-full flex flex-col justify-end items-center h-full group">
              <span className={`text-[11px] font-semibold mb-1 ${textHeading}`}>$19.7k</span>
              <div className="w-full bg-[#3B82F6] h-[85%] rounded-t shadow-lg shadow-[#3B82F6]/10"></div>
              <span className={`text-[10px] mt-2 font-medium ${isDark ? 'text-[#94A3B8]' : 'text-[#1E293B]'}`}>May</span>
            </div>

            <div className="w-full flex flex-col justify-end items-center h-full group">
              <span className={`text-[11px] mb-1 ${isDark ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>$810</span>
              <div className="w-full bg-[#2563EB]/40 h-[12%] rounded-t border-t border-[#3B82F6]"></div>
              <span className={`text-[10px] mt-2 ${textMuted}`}>Jun</span>
            </div>
          </div>
        </div>

        {/* Category Performance Card */}
        <div className={`border p-6 rounded-xl flex flex-col justify-between transition-colors duration-200 ${cardBg}`}>
          <div>
            <div className="mb-4">
              <h3 className={`text-sm font-bold ${textHeading}`}>Category Performance</h3>
            </div>

            <div className="space-y-3.5 pt-2">
              {categories.map((cat) => (
                <div key={cat._id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }}></span>
                    <span className="text-xs font-medium text-[#94A3B8]">{cat._id}</span>
                  </div>
                  <span className={`text-xs font-bold ${textHeading}`}>{cat.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`border-t pt-4 mt-6 flex justify-between items-center text-xs ${isDark ? 'border-[#1F2124]' : 'border-[#E5E5E5]'} ${textMuted}`}>
            <span>Total Listings Indexed</span>
            <span className={`font-bold text-sm ${textHeading}`}>16</span>
          </div>
        </div>
      </div>
    </div>
  );
}