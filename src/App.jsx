import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import FAQ from './pages/FAQ.jsx';
import Contact from './pages/Contact.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Dashboard2 from './pages/Dashboard2/Dashboard2.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

const initialCourses = [
  {
    id: 1,
    title: "Enterprise React with Tailwind CSS",
    instructor: "Sarah Jenkins",
    category: "Frontend",
    progress: 75,
    duration: "12h 45m",
    lessons: 24,
    completedLessons: 18,
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    title: "Fullstack Architecture & Design Patterns",
    instructor: "Alex Rivera",
    category: "Architecture",
    progress: 40,
    duration: "18h 30m",
    lessons: 36,
    completedLessons: 14,
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    title: "Introduction to Cloud Native & Kubernetes",
    instructor: "Michael Chen",
    category: "DevOps",
    progress: 90,
    duration: "8h 15m",
    lessons: 15,
    completedLessons: 13,
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    title: "Mastering Node.js Microservices",
    instructor: "David Vance",
    category: "Backend",
    progress: 15,
    duration: "20h 10m",
    lessons: 40,
    completedLessons: 6,
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 5,
    title: "UI/UX Design Systems at Scale",
    instructor: "Elena Rostova",
    category: "Design",
    progress: 0,
    duration: "10h 20m",
    lessons: 20,
    completedLessons: 0,
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=400&q=80"
  }
];

function App() {
  const [courses, setCourses] = useState(initialCourses);

  const handleSimulateProgress = (courseId) => {
    setCourses(prevCourses => 
      prevCourses.map(course => {
        if (course.id === courseId) {
          const nextCompleted = Math.min(course.lessons, course.completedLessons + 1);
          const nextProgress = Math.round((nextCompleted / course.lessons) * 100);
          return {
            ...course,
            completedLessons: nextCompleted,
            progress: nextProgress
          };
        }
        return course;
      })
    );
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route 
            path="/dashboard/*" 
            element={
              <Dashboard 
                courses={courses} 
                handleSimulateProgress={handleSimulateProgress} 
              />
            } 
          />
          <Route path="/dashboard2" element={<Dashboard2 />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
