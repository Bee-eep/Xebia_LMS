import React, { useState } from 'react';
import Sidebar from './Sidebar.jsx';
import Navbar from './Navbar.jsx';

export default function DashboardLayout({ children, onSearchChange, searchValue }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="h-screen w-screen flex bg-blueish-grey dark:bg-bg-page overflow-hidden">
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content Area Frame */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Navbar */}
        <Navbar onSearchChange={onSearchChange} searchValue={searchValue} />

        {/* Dynamic viewport scroll area */}
        <main className="flex-1 overflow-y-auto sleek-scrollbar bg-blueish-grey dark:bg-bg-page p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
