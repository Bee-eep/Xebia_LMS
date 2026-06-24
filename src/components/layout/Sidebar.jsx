import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Layers, Users, BookOpen, BarChart2, DollarSign, 
  FileText, Settings, ChevronLeft, ChevronRight, Sun, Moon, LogOut, Sparkles, GraduationCap
} from 'lucide-react';
import Logo from '../Logo.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: Layers },
  { path: '/dashboard/users', label: 'Users', icon: Users },
  { path: '/dashboard/tutors', label: 'Tutors', icon: GraduationCap },
  { path: '/dashboard/courses', label: 'Courses', icon: BookOpen },
  { path: '/dashboard/analytics', label: 'Analytics', icon: BarChart2 },
  { path: '/dashboard/revenue', label: 'Revenue', icon: DollarSign },
  { path: '/dashboard/reports', label: 'Reports', icon: FileText },
  { path: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <aside className={`h-screen bg-white dark:bg-[#11050F] text-black dark:text-white flex flex-col justify-between transition-all duration-300 relative border-r border-medium-grey dark:border-white/5 shadow-lg dark:shadow-2xl ${isCollapsed ? 'w-20' : 'w-64'}`}>
      
      {/* Collapse Toggle */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 h-6 w-6 rounded-full bg-cta-orange text-white flex items-center justify-center shadow-lg border border-white/10 hover:scale-115 transition duration-150 cursor-pointer z-50"
      >
        {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
      </button>

      <div className="p-4 flex-1 flex flex-col overflow-y-auto sleek-scrollbar">
        {/* Logo and Org Name */}
        <div className={`flex items-center gap-3 mb-8 bg-[#FFFFFF] p-2.5 rounded-xl shadow-md border border-medium-grey/40 dark:border-transparent ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
          <Logo className={isCollapsed ? 'h-6' : 'h-8'} />
          {!isCollapsed && (
            <div className="text-black leading-tight select-none">
              <h3 className="text-xs font-extrabold tracking-wider text-tranquil-velvet">LMS ADMIN</h3>
              <p className="text-[10px] text-dark-grey font-medium">Xebia Academy</p>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/dashboard'}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer group relative ${
                    isActive 
                      ? 'bg-tranquil-velvet/10 text-tranquil-velvet border-l-4 border-cta-orange font-semibold shadow-xs dark:bg-white/10 dark:text-white dark:shadow-inner' 
                      : 'text-dark-grey hover:bg-[#F7F8FC] hover:text-black dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white'
                  }`
                }
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
                
                {/* Tooltip when collapsed */}
                {isCollapsed && (
                  <div className="absolute left-16 scale-0 group-hover:scale-100 transition duration-150 origin-left bg-black/90 text-white text-xs font-semibold px-2.5 py-1.5 rounded-md shadow-md z-50 whitespace-nowrap pointer-events-none">
                    {item.label}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-medium-grey dark:border-white/5 bg-[#F7F8FC]/50 dark:bg-black/10 flex flex-col gap-2 shrink-0">
        {/* Profile Card */}
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-tranquil-velvet to-bright-velvet border-2 border-cta-orange/40 flex items-center justify-center text-white font-extrabold shadow-md shrink-0">
            AJ
          </div>
          {!isCollapsed && (
            <div className="leading-tight">
              <h4 className="text-xs font-bold text-black dark:text-white">Apurv Jha</h4>
              <p className="text-[10px] text-dark-grey dark:text-white/55 font-medium">Platform Admin</p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className={`flex gap-1.5 mt-2 ${isCollapsed ? 'flex-col items-center' : 'flex-row'}`}>
          <button 
            onClick={toggleTheme}
            className={`p-2.5 bg-[#F7F8FC] dark:bg-white/5 hover:bg-medium-grey/40 dark:hover:bg-white/10 text-dark-grey dark:text-white/80 hover:text-black dark:hover:text-white rounded-xl border border-medium-grey/30 dark:border-white/5 transition flex items-center justify-center cursor-pointer ${isCollapsed ? 'w-10 h-10' : 'flex-1 gap-1.5 text-xs font-semibold'}`}
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
            {!isCollapsed && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>

          <button 
            onClick={() => navigate('/')}
            className={`p-2.5 bg-[#F7F8FC] dark:bg-white/5 hover:bg-medium-grey/40 dark:hover:bg-white/10 text-dark-grey dark:text-white/80 hover:text-red-500 dark:hover:text-red-400 rounded-xl border border-medium-grey/30 dark:border-white/5 transition flex items-center justify-center cursor-pointer ${isCollapsed ? 'w-10 h-10' : 'flex-1 gap-1.5 text-xs font-semibold'}`}
            title="Exit Portal"
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span>Exit</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
