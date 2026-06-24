import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout.jsx';
import DashboardHome from './Dashboard/DashboardHome.jsx';
import UsersPage from './Users/UsersPage.jsx';
import CoursesPage from './Courses/CoursesPage.jsx';
import AnalyticsPage from './Analytics/AnalyticsPage.jsx';
import RevenuePage from './Revenue/RevenuePage.jsx';
import ReportsPage from './Reports/ReportsPage.jsx';
import SettingsPage from './Settings/SettingsPage.jsx';
import TutorsPage from './Tutors/TutorsPage.jsx';

const initialTutors = [
  { id: 'T-201', name: 'Sarah Jenkins', dept: 'Frontend', title: 'Principal Frontend Architect', courses: 4, hours: 284, rating: 4.9, status: 'Online', email: 's.jenkins@xebia.com' },
  { id: 'T-202', name: 'Alex Rivera', dept: 'Architecture', title: 'Systems Design Lead', courses: 5, hours: 320, rating: 4.8, status: 'Online', email: 'a.rivera@xebia.com' },
  { id: 'T-203', name: 'Michael Chen', dept: 'DevOps', title: 'DevOps & Infrastructure Specialist', courses: 3, hours: 195, rating: 4.7, status: 'Offline', email: 'm.chen@xebia.com' },
  { id: 'T-204', name: 'Dr. Sarah Miller', dept: 'Management', title: 'Academic Course Director', courses: 2, hours: 148, rating: 4.95, status: 'Online', email: 's.miller@xebia.com' },
  { id: 'T-205', name: 'Apurv Jha', dept: 'Architecture', title: 'Senior Software Authority & Architect', courses: 6, hours: 412, rating: 4.92, status: 'Online', email: 'a.jha@xebia.com' },
  { id: 'T-206', name: 'Marcus MesCaline', dept: 'DevOps', title: 'Cloud Security Lead Instructor', courses: 2, hours: 90, rating: 4.6, status: 'Offline', email: 'm.mescaline@xebia.com' }
];

export default function Dashboard({ courses, handleSimulateProgress }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [tutors, setTutors] = useState(initialTutors);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <DashboardLayout onSearchChange={handleSearchChange} searchValue={searchQuery}>
      <Routes>
        <Route path="/" element={<DashboardHome searchQuery={searchQuery} tutors={tutors} />} />
        <Route path="/users" element={<UsersPage searchQuery={searchQuery} />} />
        <Route 
          path="/courses" 
          element={
            <CoursesPage 
              courses={courses} 
              handleSimulateProgress={handleSimulateProgress} 
              searchQuery={searchQuery}
            />
          } 
        />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/revenue" element={<RevenuePage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/tutors" element={<TutorsPage tutors={tutors} setTutors={setTutors} />} />
      </Routes>
    </DashboardLayout>
  );
}
