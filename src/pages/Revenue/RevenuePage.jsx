import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from 'recharts';
import { DollarSign, Percent, Calendar } from 'lucide-react';
import BorderGlow from '../../components/BorderGlow.jsx';
import CountUp from '../../components/CountUp.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

const revenueTrendsData = [
  { name: 'Jan', revenue: 38000, subscriptions: 28000, sales: 10000, refunds: 500 },
  { name: 'Feb', revenue: 42000, subscriptions: 31000, sales: 11000, refunds: 400 },
  { name: 'Mar', revenue: 45200, subscriptions: 33000, sales: 12200, refunds: 600 },
  { name: 'Apr', revenue: 48000, subscriptions: 36000, sales: 12000, refunds: 300 },
  { name: 'May', revenue: 52000, subscriptions: 39000, sales: 13000, refunds: 800 },
  { name: 'Jun', revenue: 58500, subscriptions: 43000, sales: 15500, refunds: 200 }
];

export default function RevenuePage() {
  const { theme } = useTheme();

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Monthly Recurring (MRR)', count: 43000, change: '+12% vs last month', icon: DollarSign, color: '176 99 34', prefix: '$' },
          { title: 'Annual Run Rate (ARR)', count: 516000, change: 'Projection target $600k', icon: Calendar, color: '304 76 30', prefix: '$' },
          { title: 'Gross Revenue YTD', count: 283700, change: 'Year to date', icon: DollarSign, color: '176 99 34', prefix: '$' },
          { title: 'Growth Ratio', count: 18.4, change: '+2.5% this quarter', icon: Percent, color: '304 76 30', suffix: '%' }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <BorderGlow
              key={idx}
              edgeSensitivity={20}
              glowColor={stat.color}
              backgroundColor={theme === 'dark' ? '#16171F' : '#FFFFFF'}
              borderRadius={16}
              glowRadius={30}
              glowIntensity={1.2}
            >
              <div className="p-5 flex justify-between items-center bg-white dark:bg-[#16171F] rounded-2xl">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-dark-grey uppercase tracking-wider">{stat.title}</span>
                  <p className="text-2xl font-extrabold text-black dark:text-white">
                    {stat.prefix}<CountUp from={0} to={stat.count} duration={1.5} separator="," />{stat.suffix}
                  </p>
                  <p className="text-[10px] text-emerald font-semibold">{stat.change}</p>
                </div>
                <div className="h-10 w-10 bg-tranquil-velvet/10 dark:bg-tranquil-velvet-dark/30 rounded-xl flex items-center justify-center text-tranquil-velvet dark:text-amber-400">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </BorderGlow>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Monthly Revenue & Subscriptions (Area Chart) */}
        <div className="bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[350px]">
          <div className="space-y-0.5 mb-4">
            <h3 className="text-sm font-extrabold text-black dark:text-white">Recurring Subscriptions vs Course Sales</h3>
            <p className="text-[10px] text-dark-grey">Comparative monthly revenue metrics showing stable SaaS licenses vs discrete sales</p>
          </div>

          <div className="flex-1 min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrendsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="subGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6C1D5F" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#6C1D5F" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#01AC9F" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#01AC9F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#282A3A' : '#E6E7EF'} />
                <XAxis dataKey="name" stroke={theme === 'dark' ? '#9CA3AF' : '#5A5A5A'} fontSize={9} tickLine={false} />
                <YAxis stroke={theme === 'dark' ? '#9CA3AF' : '#5A5A5A'} fontSize={9} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#16171F' : '#FFFFFF', borderColor: theme === 'dark' ? '#282A3A' : '#DADCEA' }} />
                <Area type="monotone" dataKey="subscriptions" stroke="#6C1D5F" strokeWidth={2} fillOpacity={1} fill="url(#subGrad)" name="SaaS Subscriptions" />
                <Area type="monotone" dataKey="sales" stroke="#01AC9F" strokeWidth={2} fillOpacity={1} fill="url(#salesGrad)" name="Course Sales" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Total Monthly Revenue (Bar Chart) */}
        <div className="bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[350px]">
          <div className="space-y-0.5 mb-4">
            <h3 className="text-sm font-extrabold text-black dark:text-white">Gross Revenue Growth</h3>
            <p className="text-[10px] text-dark-grey">Syllabus licensing gross revenues</p>
          </div>

          <div className="flex-1 min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueTrendsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#282A3A' : '#E6E7EF'} />
                <XAxis dataKey="name" stroke={theme === 'dark' ? '#9CA3AF' : '#5A5A5A'} fontSize={9} tickLine={false} />
                <YAxis stroke={theme === 'dark' ? '#9CA3AF' : '#5A5A5A'} fontSize={9} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#16171F' : '#FFFFFF', borderColor: theme === 'dark' ? '#282A3A' : '#DADCEA' }} />
                <Bar dataKey="revenue" fill="#FF6200" radius={[4, 4, 0, 0]} name="Gross Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Refund Trends (Line Chart) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[300px]">
          <div className="space-y-0.5 mb-4">
            <h3 className="text-sm font-extrabold text-black dark:text-white">Refund Request & Chargeback Trends</h3>
            <p className="text-[10px] text-dark-grey">Monthly tracking of license cancellations and sandbox refund audits</p>
          </div>

          <div className="flex-1 min-h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueTrendsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#282A3A' : '#E6E7EF'} />
                <XAxis dataKey="name" stroke={theme === 'dark' ? '#9CA3AF' : '#5A5A5A'} fontSize={9} tickLine={false} />
                <YAxis stroke={theme === 'dark' ? '#9CA3AF' : '#5A5A5A'} fontSize={9} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#16171F' : '#FFFFFF', borderColor: theme === 'dark' ? '#282A3A' : '#DADCEA' }} />
                <Line type="monotone" dataKey="refunds" stroke="#EF4444" strokeWidth={3} activeDot={{ r: 8 }} name="Refunds Issued ($)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
