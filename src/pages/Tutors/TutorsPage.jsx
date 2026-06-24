import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  GraduationCap, 
  MessageSquare, 
  Phone, 
  Plus, 
  Trash2, 
  X, 
  Star, 
  BookOpen, 
  Clock, 
  Sparkles, 
  CheckCircle,
  Search
} from 'lucide-react';
import BorderGlow from '../../components/BorderGlow.jsx';
import CountUp from '../../components/CountUp.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function TutorsPage({ tutors = [], setTutors }) {
  const { theme } = useTheme();

  // Local States
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [toasts, setToasts] = useState([]);
  const [showTutorModal, setShowTutorModal] = useState(false);

  const [newTutor, setNewTutor] = useState({
    name: '',
    dept: 'Frontend',
    title: '',
    courses: 1,
    hours: 10,
    rating: 5.0,
    status: 'Online',
    email: ''
  });

  // Toast Notifier
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  // Add Tutor
  const handleAddTutor = (e) => {
    e.preventDefault();
    if (!newTutor.name.trim() || !newTutor.email.trim()) {
      addToast('Please fill out all required fields.', 'error');
      return;
    }
    const added = {
      ...newTutor,
      id: `T-${Date.now().toString().slice(-3)}`
    };
    setTutors([added, ...tutors]);
    setShowTutorModal(false);
    setNewTutor({ name: '', dept: 'Frontend', title: '', courses: 1, hours: 10, rating: 5.0, status: 'Online', email: '' });
    addToast(`Added Tutor ${added.name} successfully!`);
  };

  // Delete Tutor
  const handleDeleteTutor = (id) => {
    setTutors(tutors.filter(t => t.id !== id));
    addToast('Tutor entry archived.', 'info');
  };

  // Filter tutors
  const filteredTutors = useMemo(() => {
    return tutors.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            t.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = deptFilter === 'All' || t.dept === deptFilter;
      return matchesSearch && matchesDept;
    });
  }, [tutors, searchTerm, deptFilter]);

  // Online count
  const onlineCount = tutors.filter(t => t.status === 'Online').length;

  return (
    <div className="space-y-6">
      
      {/* Toast notifications */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-xs font-bold max-w-sm ${
                t.type === 'success' 
                  ? 'bg-emerald/10 border-emerald/30 text-emerald dark:text-[#5ce7d4]' 
                  : 'bg-tranquil-velvet/10 border-tranquil-velvet/30 text-tranquil-velvet dark:text-[#d38bca]'
              }`}
            >
              <CheckCircle className="h-4 w-4 shrink-0" />
              <span>{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl p-6 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-xl font-extrabold text-black dark:text-white">Faculty Directory</h1>
          <p className="text-xs text-dark-grey">Manage Xebia academy instructors, track taught hours metrics, and review student feedback scores.</p>
        </div>
        <button 
          onClick={() => setShowTutorModal(true)}
          className="px-4 py-2.5 bg-cta-orange hover:bg-[#e05600] text-white text-xs font-bold rounded-xl shadow-md shadow-cta-orange/15 transition flex items-center gap-1.5 cursor-pointer border border-transparent whitespace-nowrap"
        >
          <Plus className="h-4 w-4" /> Add Tutor Profile
        </button>
      </div>

      {/* Stats Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Faculty Tutors', count: tutors.length, suffix: '', sub: 'Qualified instructors' },
          { title: 'Tutors Online Now', count: onlineCount, suffix: ' online', sub: 'Active classroom hours' },
          { title: 'Avg Faculty Rating', count: 4.85, suffix: ' / 5.0', sub: 'Student feedback index' },
          { title: 'Total Hours Instructed', count: tutors.reduce((acc, t) => acc + t.hours, 0), suffix: ' hrs', sub: 'Session logs audit' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl p-5 shadow-sm">
            <span className="text-[10px] font-bold text-dark-grey uppercase tracking-wider block mb-1">{stat.title}</span>
            <p className="text-2xl font-extrabold text-black dark:text-white">
              <CountUp from={0} to={stat.count} duration={1.2} separator="," decimals={stat.count % 1 !== 0 ? 2 : 0} />{stat.suffix}
            </p>
            <span className="text-[10px] text-emerald font-semibold">{stat.sub}</span>
          </div>
        ))}
      </div>

      {/* Actions and Filters Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white dark:bg-[#16171F] p-4 border border-medium-grey dark:border-[#282A3A] rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <select 
            value={deptFilter} 
            onChange={(e) => setDeptFilter(e.target.value)}
            className="text-xs font-bold bg-[#F7F8FC] dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] px-3.5 py-1.5 rounded-xl focus:outline-none cursor-pointer"
          >
            <option value="All">All Departments</option>
            <option value="Frontend">Frontend</option>
            <option value="DevOps">DevOps</option>
            <option value="Architecture">Architecture</option>
            <option value="Management">Management</option>
          </select>
          <span className="text-xs font-semibold text-dark-grey">Found {filteredTutors.length} tutors</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F7F8FC] dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] rounded-xl w-60">
          <Search className="h-4 w-4 text-dark-grey" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-xs text-black dark:text-white focus:outline-none w-full font-medium"
          />
        </div>
      </div>

      {/* Tutors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutors.map((tut) => (
          <BorderGlow
            key={tut.id}
            edgeSensitivity={20}
            glowColor={tut.status === 'Online' ? '1 172 159' : '304 76 30'}
            backgroundColor={theme === 'dark' ? '#16171F' : '#FFFFFF'}
            borderRadius={16}
            glowRadius={40}
            glowIntensity={1.2}
          >
            <div className="p-6 bg-white dark:bg-[#16171F] rounded-2xl border border-transparent flex flex-col justify-between h-full min-h-[220px] text-left">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-sm font-extrabold text-black dark:text-white">{tut.name}</h3>
                    <p className="text-[10px] text-dark-grey font-bold uppercase tracking-wider">{tut.title}</p>
                  </div>
                  <span className={`h-2.5 w-2.5 rounded-full ${tut.status === 'Online' ? 'bg-emerald animate-pulse' : 'bg-gray-300'}`} title={tut.status} />
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 text-center border-t border-[#F7F8FC] dark:border-[#262837]">
                  <div className="bg-[#F7F8FC] dark:bg-[#0F1015] p-2 rounded-xl border border-medium-grey/40 dark:border-transparent">
                    <p className="text-xs font-extrabold text-black dark:text-white">{tut.courses}</p>
                    <span className="text-[8px] text-dark-grey font-bold uppercase block">Courses</span>
                  </div>
                  <div className="bg-[#F7F8FC] dark:bg-[#0F1015] p-2 rounded-xl border border-medium-grey/40 dark:border-transparent">
                    <p className="text-xs font-extrabold text-black dark:text-white">{tut.hours}h</p>
                    <span className="text-[8px] text-dark-grey font-bold uppercase block">Hours</span>
                  </div>
                  <div className="bg-[#F7F8FC] dark:bg-[#0F1015] p-2 rounded-xl border border-medium-grey/40 dark:border-transparent">
                    <p className="text-xs font-extrabold text-emerald">★ {tut.rating}</p>
                    <span className="text-[8px] text-dark-grey font-bold uppercase block">Rating</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#F7F8FC] dark:border-[#262837] flex justify-between items-center text-xs">
                <span className="text-[9px] font-mono text-dark-grey bg-[#F7F8FC] dark:bg-[#0F1015] px-2 py-0.5 border border-medium-grey dark:border-[#282A3A] rounded">
                  {tut.id}
                </span>
                
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => addToast(`Contacting ${tut.name} via ${tut.email}`)}
                    className="p-1.5 hover:bg-tranquil-velvet/10 dark:hover:bg-tranquil-velvet-dark/45 text-tranquil-velvet dark:text-[#d38bca] rounded-xl transition cursor-pointer"
                    title="Send Message"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteTutor(tut.id)}
                    className="p-1.5 hover:bg-red-500/10 text-red-500 rounded-xl transition cursor-pointer"
                    title="Remove Instructor Profile"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </BorderGlow>
        ))}
      </div>

      {/* ADD TUTOR MODAL */}
      <AnimatePresence>
        {showTutorModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setShowTutorModal(false)} 
              className="fixed inset-0 bg-black/60 backdrop-blur-xs" 
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl max-w-md w-full shadow-2xl overflow-hidden relative z-10 p-6 text-left"
            >
              <div className="flex justify-between items-center pb-3 border-b border-[#F7F8FC] dark:border-[#262837] mb-4">
                <h3 className="text-sm font-extrabold text-black dark:text-white">Add Instructor Profile</h3>
                <button onClick={() => setShowTutorModal(false)} className="p-1 hover:bg-[#F7F8FC] dark:hover:bg-[#262837] text-dark-grey rounded-full">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleAddTutor} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-dark-grey uppercase">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    value={newTutor.name} 
                    onChange={(e) => setNewTutor({...newTutor, name: e.target.value})} 
                    placeholder="e.g. Sarah Connor" 
                    className="w-full text-xs font-semibold bg-white dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] px-3.5 py-2.5 rounded-xl focus:outline-none" 
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-dark-grey uppercase">Faculty Title</label>
                  <input 
                    type="text" 
                    required 
                    value={newTutor.title} 
                    onChange={(e) => setNewTutor({...newTutor, title: e.target.value})} 
                    placeholder="e.g. Lead DevOps Engineer" 
                    className="w-full text-xs font-semibold bg-white dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] px-3.5 py-2.5 rounded-xl focus:outline-none" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-dark-grey uppercase">Department</label>
                    <select 
                      value={newTutor.dept} 
                      onChange={(e) => setNewTutor({...newTutor, dept: e.target.value})} 
                      className="w-full text-xs font-semibold bg-white dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] px-3.5 py-2.5 rounded-xl focus:outline-none"
                    >
                      <option>Frontend</option>
                      <option>DevOps</option>
                      <option>Architecture</option>
                      <option>Management</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-dark-grey uppercase">Email</label>
                    <input 
                      type="email" 
                      required 
                      value={newTutor.email} 
                      onChange={(e) => setNewTutor({...newTutor, email: e.target.value})} 
                      placeholder="email@xebia.com" 
                      className="w-full text-xs font-semibold bg-white dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] px-3.5 py-2.5 rounded-xl focus:outline-none" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-dark-grey uppercase">Courses taught</label>
                    <input 
                      type="number" 
                      min="1" 
                      required 
                      value={newTutor.courses} 
                      onChange={(e) => setNewTutor({...newTutor, courses: parseInt(e.target.value)})} 
                      className="w-full text-xs font-semibold bg-white dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] px-3.5 py-2.5 rounded-xl focus:outline-none" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-dark-grey uppercase">Hours logged</label>
                    <input 
                      type="number" 
                      min="0" 
                      required 
                      value={newTutor.hours} 
                      onChange={(e) => setNewTutor({...newTutor, hours: parseInt(e.target.value)})} 
                      className="w-full text-xs font-semibold bg-white dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] px-3.5 py-2.5 rounded-xl focus:outline-none" 
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button type="button" onClick={() => setShowTutorModal(false)} className="px-4 py-2 text-xs font-bold border border-medium-grey dark:border-[#282A3A] text-dark-grey hover:bg-[#F7F8FC] dark:hover:bg-[#262837] rounded-xl transition">Cancel</button>
                  <button type="submit" className="px-4 py-2 text-xs font-bold bg-[#386B40] hover:bg-[#2D5A27] text-white rounded-xl transition">Add Tutor</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
