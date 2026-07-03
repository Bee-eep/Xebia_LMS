import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Sidebar from './Sidebar.jsx';
import Navbar from './Navbar.jsx';

export default function DashboardLayout({ children, onSearchChange, searchValue }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="h-screen w-screen flex bg-blueish-grey dark:bg-bg-page overflow-hidden relative">
      {/* Desktop Sidebar (hidden on mobile/tablet) */}
      <div className="hidden lg:flex shrink-0">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* Mobile/Tablet Sidebar Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40"
            />

            {/* Drawer container (sliding in from left) */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative flex flex-col w-64 max-w-[80vw] h-full bg-white dark:bg-[#11050F] border-r border-medium-grey dark:border-white/5 shadow-2xl z-50 overflow-hidden"
            >
              {/* Close Button on Mobile Drawer */}
              <button
                onClick={() => setIsMobileOpen(false)}
                className="absolute right-4 top-4 p-2 rounded-xl bg-blueish-grey dark:bg-[#1E1F29] text-dark-grey hover:text-black dark:hover:text-white z-50 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Sidebar content */}
              <div className="flex-1 overflow-y-auto">
                <Sidebar 
                  isCollapsed={false} 
                  setIsCollapsed={() => {}} 
                  isMobile={true} 
                  onClose={() => setIsMobileOpen(false)} 
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Area Frame */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Navbar */}
        <Navbar 
          onSearchChange={onSearchChange} 
          searchValue={searchValue} 
          onToggleMobileSidebar={() => setIsMobileOpen(true)}
        />

        {/* Dynamic viewport scroll area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden sleek-scrollbar bg-blueish-grey dark:bg-bg-page p-4 sm:p-6 md:p-8 pb-16">
          {children}
        </main>
      </div>
    </div>
  );
}
