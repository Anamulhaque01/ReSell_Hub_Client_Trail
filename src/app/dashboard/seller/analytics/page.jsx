'use client';
import { useTheme } from '@/context/ThemeContext';

export default function SalesAnalyticsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // High-fidelity UI styling variables
  const bgFrame = isDark ? 'bg-[#09090b] text-white' : 'bg-zinc-50 text-zinc-900';
  const cardBg = isDark ? 'bg-[#0e0e11] border-zinc-800' : 'bg-white border-zinc-200/80 shadow-sm';
  const subText = isDark ? 'text-zinc-500' : 'text-zinc-400';
  const gridLine = isDark ? 'border-zinc-900' : 'border-zinc-100';

  // Standard static monthly trends mock array matching document suggestions[cite: 6]
  const mockMonthlySales = [
    { month: 'Jan', revenue: 1200 },
    { month: 'Feb', revenue: 2100 },
    { month: 'Mar', revenue: 1800 },
    { month: 'Apr', revenue: 3400 },
    { month: 'May', revenue: 2900 },
    { month: 'Jun', revenue: 4200 },
  ];

  const maxRevenue = 5000;

  return (
    <div className={`space-y-6 py-2 min-h-screen ${bgFrame}`}>
      <div>
        <h1 className="text-xl font-bold tracking-tight">Sales Analytics Performance</h1>
        <p className={`text-xs mt-0.5 ${subText}`}>Visual representation of business metrics, trends, and platform conversions[cite: 6].</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Monthly Trend Chart Column Container */}
        <div className={`lg:col-span-2 border rounded-xl p-5 ${cardBg}`}>
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-6">Monthly Sales Revenue Trend[cite: 6]</h3>
          
          {/* Custom Pure Tailwind Bar Graph Visual Matrix */}
          <div className="h-64 flex items-end justify-between gap-2 pt-4 relative">
            {/* Background horizontal threshold line marks */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[9px] text-zinc-600 font-mono">
              <div className={`w-full border-t border-dashed ${gridLine}`}>$5,000</div>
              <div className={`w-full border-t border-dashed ${gridLine}`}>$2,500</div>
              <div className={`w-full border-t ${gridLine}`}>$0</div>
            </div>

            {mockMonthlySales.map((data) => {
              const barHeightPercent = (data.revenue / maxRevenue) * 100;
              return (
                <div key={data.month} className="flex-1 flex flex-col items-center group relative z-10">
                  <div className="absolute -top-6 bg-zinc-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    ${data.revenue}
                  </div>
                  <div 
                    style={{ height: `${barHeightPercent}%` }}
                    className="w-full bg-blue-600 group-hover:bg-blue-500 rounded-t transition-all duration-500"
                  />
                  <span className="text-[10px] mt-2 font-bold text-zinc-500">{data.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Performing Categories Box */}
        <div className={`border rounded-xl p-5 flex flex-col justify-between ${cardBg}`}>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">Top Selling Product Categories[cite: 6]</h3>
            <div className="space-y-3 text-xs font-medium">
              <div>
                <div className="flex justify-between mb-1"><span>Electronics</span><span className="font-bold">65%</span></div>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full"><div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '65%' }} /></div>
              </div>
              <div>
                <div className="flex justify-between mb-1"><span>Mobile Phones</span><span className="font-bold">20%</span></div>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full"><div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '20%' }} /></div>
              </div>
              <div>
                <div className="flex justify-between mb-1"><span>Vehicles</span><span className="font-bold">15%</span></div>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full"><div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '15%' }} /></div>
              </div>
            </div>
          </div>

          <div className={`mt-4 pt-4 border-t border-zinc-800/60 text-[11px] font-medium ${subText}`}>
            Metrics aggregated dynamically across active historical listings.
          </div>
        </div>

      </div>
    </div>
  );
}