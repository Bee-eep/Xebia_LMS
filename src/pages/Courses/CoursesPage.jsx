import React, { useState } from 'react';
import { BookOpen, CheckCircle, FileText, Archive, Plus, Trash2, Edit2, Star, Users } from 'lucide-react';
import CountUp from '../../components/CountUp.jsx';
import BorderGlow from '../../components/BorderGlow.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function CoursesPage({ courses, handleSimulateProgress, searchQuery }) {
  const { theme } = useTheme();
  const [localCourses, setLocalCourses] = useState(courses);

  const activeSearch = searchQuery || '';

  const filteredCourses = localCourses.filter(course => 
    course.title.toLowerCase().includes(activeSearch.toLowerCase()) ||
    course.instructor.toLowerCase().includes(activeSearch.toLowerCase()) ||
    course.category.toLowerCase().includes(activeSearch.toLowerCase())
  );

  const handleDeleteCourse = (id) => {
    setLocalCourses(prev => prev.filter(c => c.id !== id));
  };

  const handleSimulateClick = (id) => {
    handleSimulateProgress(id);
    setLocalCourses(prev => 
      prev.map(c => {
        if (c.id === id) {
          const nextCompleted = Math.min(c.lessons, c.completedLessons + 1);
          return {
            ...c,
            completedLessons: nextCompleted,
            progress: Math.round((nextCompleted / c.lessons) * 100)
          };
        }
        return c;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Courses', count: courses.length, icon: BookOpen, color: '304 76 30' },
          { title: 'Published', count: courses.length, icon: CheckCircle, color: '176 99 34' },
          { title: 'Drafts', count: 5, icon: FileText, color: '304 76 30' },
          { title: 'Archived', count: 0, icon: Archive, color: '176 99 34' }
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
                    <CountUp from={0} to={stat.count} duration={1.0} />
                  </p>
                </div>
                <div className="h-10 w-10 bg-tranquil-velvet/10 dark:bg-tranquil-velvet-dark/30 rounded-xl flex items-center justify-center text-tranquil-velvet dark:text-amber-400">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </BorderGlow>
          );
        })}
      </div>

      {/* Course Grid Controls */}
      <div className="flex justify-between items-center bg-white dark:bg-[#16171F] p-4 border border-medium-grey dark:border-[#282A3A] rounded-2xl shadow-sm">
        <span className="text-xs font-bold text-black dark:text-white uppercase tracking-wider">
          Enrolled Course Catalog ({filteredCourses.length})
        </span>
        <button 
          onClick={() => alert("Add Course panel under sandbox construction.")}
          className="px-4 py-2 bg-cta-orange hover:bg-[#E05600] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-cta-orange/15 border border-transparent"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Course</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <BorderGlow
            key={course.id}
            edgeSensitivity={15}
            glowColor="304 76 30"
            backgroundColor={theme === 'dark' ? '#16171F' : '#FFFFFF'}
            borderRadius={16}
            glowRadius={40}
            glowIntensity={1.8}
            className="h-full"
          >
            <div className="bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl overflow-hidden flex flex-col justify-between h-full hover:shadow-md transition">
              <div>
                <div className="h-44 relative overflow-hidden bg-white dark:bg-bg-page border-b border-medium-grey dark:border-border-card">
                  <img src={course.image} className="h-full w-full object-cover" alt="" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[9px] bg-white/90 dark:bg-bg-card/90 text-tranquil-velvet dark:text-amber-400 border border-tranquil-velvet/20 px-2 py-0.5 rounded font-bold uppercase shadow-sm">
                      {course.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-center text-xs text-amber-500 font-bold">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <span>{course.progress === 100 ? '5.0' : '4.8'}</span>
                    </span>
                    <span className="text-dark-grey font-semibold flex items-center gap-1 text-[10px]">
                      <Users className="h-3.5 w-3.5" />
                      <span>1,250 enrolled</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-black dark:text-white line-clamp-1 hover:text-tranquil-velvet transition">
                    {course.title}
                  </h3>
                  <p className="text-xs text-dark-grey font-medium leading-relaxed line-clamp-2">
                    Instructor: <span className="text-black dark:text-white font-bold">{course.instructor}</span>
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-[10px] font-bold text-black dark:text-white">
                      <span>Syllabus Completion</span>
                      <span className="text-bright-velvet dark:text-amber-400">{course.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-light-grey dark:bg-bg-page rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${course.progress === 100 ? 'bg-emerald' : 'bg-gradient-to-r from-tranquil-velvet to-bright-velvet'}`} style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-medium-grey/40 dark:border-[#282A3A]/40 flex justify-between items-center mt-3">
                <button 
                  onClick={() => handleSimulateClick(course.id)}
                  className="px-3 py-1.5 bg-blueish-grey hover:bg-medium-grey/30 dark:bg-bg-page dark:hover:bg-[#1E1F29] border border-medium-grey dark:border-border-card text-black dark:text-white text-[10px] font-bold rounded-lg transition cursor-pointer"
                >
                  Simulate Lesson
                </button>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => alert(`Editing course: ${course.title}`)}
                    className="p-2 hover:bg-tranquil-velvet/10 hover:text-tranquil-velvet rounded-xl transition text-dark-grey cursor-pointer"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteCourse(course.id)}
                    className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition text-dark-grey cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </BorderGlow>
        ))}
      </div>
    </div>
  );
}
