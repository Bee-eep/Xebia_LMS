import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Award, 
  DollarSign, 
  ClipboardList, 
  Users, 
  Download, 
  Calendar, 
  Clock, 
  Plus, 
  Trash2, 
  Play, 
  Pause, 
  Mail, 
  CheckCircle, 
  AlertCircle,
  FileSpreadsheet,
  X,
  Sparkles
} from 'lucide-react';
import BorderGlow from '../../components/BorderGlow.jsx';
import CountUp from '../../components/CountUp.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

const reportTypes = [
  {
    id: 'enrollment',
    title: 'Enrollment & Signups',
    description: 'Analysis of user signups, course registration densities, and active cohort distributions.',
    icon: FileText,
    glowColor: '220 100 50', // Orange
    color: '#FF6200',
    filters: ['All Courses', 'Frontend Dev Masterclass', 'DevOps BootCamp', 'AWS Cloud Architect'],
    formats: ['CSV', 'PDF', 'XLSX'],
  },
  {
    id: 'completion',
    title: 'Completion & Certificates',
    description: 'Progress audits, completion certifications, graduation speed, and passing ratio distribution.',
    icon: Award,
    glowColor: '108 29 95', // Tranquil Velvet
    color: '#6C1D5F',
    filters: ['All Cohorts', 'Q1 2026 Batch', 'Q2 2026 Batch', 'Corporate Cohort'],
    formats: ['PDF', 'CSV'],
  },
  {
    id: 'revenue',
    title: 'Revenue & SaaS Metrics',
    description: 'Detailed MRR/ARR audits, course license purchases, refund ratios, and corporate billing statements.',
    icon: DollarSign,
    glowColor: '1 172 159', // Emerald
    color: '#01AC9F',
    filters: ['All Billing Plans', 'SaaS Annual Premium', 'Individual Course Sales', 'Refund Ledger'],
    formats: ['XLSX', 'CSV'],
  },
  {
    id: 'assessment',
    title: 'Assessments & Quizzes',
    description: 'Grading distributions, course quiz completion statistics, average scores, and student risk-levels.',
    icon: ClipboardList,
    glowColor: '132 17 124', // Bright Velvet
    color: '#84117C',
    filters: ['All Tests', 'Git Foundations Quiz', 'React Hooks Midterm', 'Final Capstone Project'],
    formats: ['CSV', 'PDF'],
  },
  {
    id: 'instructor',
    title: 'Instructor Metrics',
    description: 'Feedback evaluations, satisfaction indices, average responsiveness, and course load analysis.',
    icon: Users,
    glowColor: '59 130 246', // Blue
    color: '#3B82F6',
    filters: ['All Instructors', 'Prof. Sarah Miller', 'Apurv Jha', 'Developer Support Lead'],
    formats: ['PDF', 'CSV', 'XLSX'],
  }
];

export default function ReportsPage() {
  const { theme } = useTheme();
  
  // Local States
  const [selectedFilters, setSelectedFilters] = useState({
    enrollment: 'All Courses',
    completion: 'All Cohorts',
    revenue: 'All Billing Plans',
    assessment: 'All Tests',
    instructor: 'All Instructors'
  });
  
  const [selectedFormats, setSelectedFormats] = useState({
    enrollment: 'CSV',
    completion: 'PDF',
    revenue: 'XLSX',
    assessment: 'CSV',
    instructor: 'PDF'
  });

  const [generatingId, setGeneratingId] = useState(null);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [toasts, setToasts] = useState([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [activeScheduleReport, setActiveScheduleReport] = useState(null);

  // Scheduled Reports List
  const [schedules, setSchedules] = useState([
    { id: 'sch-1', reportName: 'Monthly Revenue Audit', filter: 'All Billing Plans', format: 'XLSX', frequency: 'Monthly', email: 'billing@xebia.com', active: true },
    { id: 'sch-2', reportName: 'Weekly Cohort Graduation Logs', filter: 'Q1 2026 Batch', format: 'PDF', frequency: 'Weekly', email: 'ops@xebia.com', active: true },
    { id: 'sch-3', reportName: 'Daily Registration Check', filter: 'All Courses', format: 'CSV', frequency: 'Daily', email: 'metrics@xebia.com', active: false }
  ]);

  // Schedule Modal form fields
  const [scheduleForm, setScheduleForm] = useState({
    frequency: 'Weekly',
    email: '',
    time: '08:00'
  });

  // Recent Download Logs
  const [recentDownloads, setRecentDownloads] = useState([
    { id: 'dl-1', name: 'enrollment_report_all_courses.csv', size: '245 KB', time: '10 mins ago', type: 'CSV' },
    { id: 'dl-2', name: 'mrr_arr_projection_q2.xlsx', size: '1.2 MB', time: '1 hour ago', type: 'XLSX' },
    { id: 'dl-3', name: 'instructor_feedback_ Sarah_Miller.pdf', size: '890 KB', time: 'Yesterday', type: 'PDF' }
  ]);

  // Helpers
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleFilterChange = (reportId, value) => {
    setSelectedFilters(prev => ({ ...prev, [reportId]: value }));
  };

  const handleFormatChange = (reportId, value) => {
    setSelectedFormats(prev => ({ ...prev, [reportId]: value }));
  };

  // Simulates report generation
  const handleGenerateReport = (report) => {
    if (generatingId) return; // Prevent double trigger
    
    setGeneratingId(report.id);
    setGenerationProgress(0);
    
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setGeneratingId(null);
            addToast(`Generated ${report.title} successfully!`, 'success');
            
            // Add to recent downloads
            const newDl = {
              id: `dl-${Date.now()}`,
              name: `${report.id}_report_${selectedFilters[report.id].toLowerCase().replace(/\s+/g, '_')}.${selectedFormats[report.id].toLowerCase()}`,
              size: `${(Math.random() * 500 + 100).toFixed(0)} KB`,
              time: 'Just now',
              type: selectedFormats[report.id]
            };
            setRecentDownloads(prevDls => [newDl, ...prevDls]);
          }, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  // Immediate file download mockup
  const handleExportReport = (report) => {
    addToast(`Preparing direct download for ${report.title}...`, 'info');
    setTimeout(() => {
      addToast(`Downloading: ${report.id}_report.${selectedFormats[report.id].toLowerCase()}`, 'success');
    }, 1000);
  };

  // Open Schedule Modal
  const openScheduleModal = (report) => {
    setActiveScheduleReport(report);
    setScheduleForm({
      frequency: 'Weekly',
      email: '',
      time: '09:00'
    });
    setShowScheduleModal(true);
  };

  // Save Schedule
  const saveSchedule = (e) => {
    e.preventDefault();
    if (!scheduleForm.email || !scheduleForm.email.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }

    const newSchedule = {
      id: `sch-${Date.now()}`,
      reportName: activeScheduleReport.title,
      filter: selectedFilters[activeScheduleReport.id],
      format: selectedFormats[activeScheduleReport.id],
      frequency: scheduleForm.frequency,
      email: scheduleForm.email,
      active: true
    };

    setSchedules(prev => [newSchedule, ...prev]);
    setShowScheduleModal(false);
    addToast(`Report scheduling established for ${scheduleForm.email}!`, 'success');
  };

  // Toggle Schedule active state
  const toggleSchedule = (id) => {
    setSchedules(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
    const sch = schedules.find(s => s.id === id);
    addToast(`Schedule for "${sch.reportName}" ${!sch.active ? 'activated' : 'paused'}`, 'info');
  };

  // Delete Schedule
  const deleteSchedule = (id) => {
    setSchedules(prev => prev.filter(s => s.id !== id));
    addToast('Scheduled report task removed.', 'info');
  };

  return (
    <div className="space-y-6">
      
      {/* Toast notifications portal */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm max-w-sm ${
                t.type === 'success' 
                  ? 'bg-emerald/10 border-emerald/30 text-emerald dark:text-[#5ce7d4]' 
                  : t.type === 'error'
                  ? 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400'
                  : 'bg-tranquil-velvet/10 border-tranquil-velvet/30 text-tranquil-velvet dark:text-[#d38bca]'
              }`}
            >
              {t.type === 'success' ? <CheckCircle className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
              <span>{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl p-6 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-black dark:text-white">Reports Library & Generator</h1>
            <span className="bg-cta-orange/10 text-cta-orange text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> System Audit v2
            </span>
          </div>
          <p className="text-xs text-dark-grey">Export raw CSV summaries, customize scheduled cron delivery, or compile high-fidelity PDF presentations.</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Reports Generated YTD', count: 1248, suffix: '', sub: 'Avg 22 / week' },
          { title: 'Active Schedules', count: schedules.filter(s => s.active).length, suffix: ' triggers', sub: 'Cron automation active' },
          { title: 'Database Export Vol.', count: 4.2, suffix: ' GB', sub: 'Indexed logs database' },
          { title: 'Avg. Render Speed', count: 1.8, suffix: 's', sub: 'Optimized Recharts engine' }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl p-5 shadow-sm">
            <span className="text-[10px] font-bold text-dark-grey uppercase tracking-wider block mb-1">{stat.title}</span>
            <p className="text-2xl font-extrabold text-black dark:text-white">
              <CountUp from={0} to={stat.count} duration={1.2} separator="," decimals={stat.count % 1 !== 0 ? 1 : 0} />{stat.suffix}
            </p>
            <span className="text-[10px] text-emerald font-semibold">{stat.sub}</span>
          </div>
        ))}
      </div>

      {/* Main Grid: Card Generators */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          const isGenerating = generatingId === report.id;
          
          return (
            <BorderGlow
              key={report.id}
              edgeSensitivity={25}
              glowColor={report.glowColor}
              backgroundColor={theme === 'dark' ? '#16171F' : '#FFFFFF'}
              borderRadius={16}
              glowRadius={40}
              glowIntensity={1.2}
            >
              <div className="p-6 bg-white dark:bg-[#16171F] rounded-2xl border border-transparent flex flex-col justify-between h-full min-h-[300px]">
                
                {/* Upper Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 bg-tranquil-velvet/5 dark:bg-tranquil-velvet-dark/20 border border-tranquil-velvet/15 dark:border-tranquil-velvet-dark/50 rounded-xl flex items-center justify-center text-tranquil-velvet dark:text-[#d38bca]">
                      <Icon className="h-5 w-5" style={{ color: report.color }} />
                    </div>
                    <span className="text-[10px] font-bold text-dark-grey tracking-wider uppercase bg-[#F7F8FC] dark:bg-[#262837] px-2.5 py-1 rounded-full border border-medium-grey dark:border-[#282A3A]">
                      {selectedFormats[report.id]} Default
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-extrabold text-black dark:text-white">{report.title}</h3>
                    <p className="text-[11px] text-dark-grey leading-relaxed">{report.description}</p>
                  </div>
                </div>

                {/* Dropdowns / Inputs */}
                <div className="my-5 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase text-dark-grey">Filter Context</label>
                      <select 
                        value={selectedFilters[report.id]}
                        onChange={(e) => handleFilterChange(report.id, e.target.value)}
                        className="w-full text-xs font-semibold bg-white dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] px-2.5 py-1.5 rounded-lg focus:outline-none"
                      >
                        {report.filters.map((f, idx) => (
                          <option key={idx} value={f}>{f}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase text-dark-grey">File Format</label>
                      <select 
                        value={selectedFormats[report.id]}
                        onChange={(e) => handleFormatChange(report.id, e.target.value)}
                        className="w-full text-xs font-semibold bg-white dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] px-2.5 py-1.5 rounded-lg focus:outline-none"
                      >
                        {report.formats.map((f, idx) => (
                          <option key={idx} value={f}>{f}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  {isGenerating && (
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-semibold text-emerald">
                        <span>Compiling Database...</span>
                        <span>{generationProgress}%</span>
                      </div>
                      <div className="h-1 bg-[#F7F8FC] dark:bg-[#262837] rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-emerald"
                          initial={{ width: 0 }}
                          animate={{ width: `${generationProgress}%` }}
                          transition={{ ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions Row */}
                <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-[#F7F8FC] dark:border-[#262837]">
                  <button 
                    disabled={isGenerating}
                    onClick={() => handleGenerateReport(report)}
                    className="flex items-center justify-center gap-1 py-2 px-1 text-[10px] font-bold rounded-lg border border-tranquil-velvet text-tranquil-velvet dark:text-[#d38bca] dark:border-[#84117c] hover:bg-tranquil-velvet hover:text-white dark:hover:bg-[#6c1d5f] transition-all disabled:opacity-50"
                  >
                    Generate
                  </button>
                  <button 
                    disabled={isGenerating}
                    onClick={() => openScheduleModal(report)}
                    className="flex items-center justify-center gap-1 py-2 px-1 text-[10px] font-bold rounded-lg border border-medium-grey text-dark-grey dark:border-[#282A3A] hover:bg-[#F7F8FC] dark:hover:bg-[#262837] hover:text-black dark:hover:text-white transition-all disabled:opacity-50"
                  >
                    <Calendar className="h-3 w-3 shrink-0" />
                    Schedule
                  </button>
                  <button 
                    disabled={isGenerating}
                    onClick={() => handleExportReport(report)}
                    className="flex items-center justify-center gap-1 py-2 px-1 text-[10px] font-bold rounded-lg bg-tranquil-velvet hover:bg-[#84117c] dark:bg-[#6c1d5f] dark:hover:bg-[#84117c] text-white transition-all disabled:opacity-50"
                  >
                    <Download className="h-3 w-3 shrink-0" />
                    Export
                  </button>
                </div>

              </div>
            </BorderGlow>
          );
        })}
      </div>

      {/* Dynamic Schedules & Download logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Scheduled Tasks List (Span 2) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-1 mb-4">
            <h3 className="text-sm font-extrabold text-black dark:text-white">Active Cron Deliveries & Schedules</h3>
            <p className="text-[10px] text-dark-grey">Configured report pipelines delivering automated database metrics straight to admin inboxes</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#F7F8FC] dark:border-[#262837] text-[10px] font-bold text-dark-grey uppercase">
                  <th className="py-2.5">Report Pipeline</th>
                  <th className="py-2.5">Frequency</th>
                  <th className="py-2.5">Recipient</th>
                  <th className="py-2.5">Format/Context</th>
                  <th className="py-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F7F8FC] dark:divide-[#262837] text-xs">
                {schedules.map((sch) => (
                  <tr key={sch.id} className="text-black dark:text-white">
                    <td className="py-3 font-semibold flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-dark-grey" />
                      {sch.reportName}
                    </td>
                    <td className="py-3 text-dark-grey font-medium">{sch.frequency}</td>
                    <td className="py-3 text-dark-grey font-medium flex items-center gap-1">
                      <Mail className="h-3 w-3 shrink-0" />
                      {sch.email}
                    </td>
                    <td className="py-3">
                      <span className="bg-[#F7F8FC] dark:bg-[#262837] px-2 py-0.5 border border-medium-grey dark:border-[#282A3A] rounded text-[9px] font-bold text-dark-grey uppercase">
                        {sch.format} ({sch.filter})
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => toggleSchedule(sch.id)}
                          className={`p-1 rounded hover:bg-medium-grey dark:hover:bg-[#262837] ${sch.active ? 'text-emerald' : 'text-dark-grey opacity-60'}`}
                          title={sch.active ? "Pause delivery" : "Resume delivery"}
                        >
                          {sch.active ? <Play className="h-3.5 w-3.5 shrink-0" /> : <Pause className="h-3.5 w-3.5 shrink-0" />}
                        </button>
                        <button 
                          onClick={() => deleteSchedule(sch.id)}
                          className="p-1 rounded text-red-500 hover:bg-red-500/10"
                          title="Remove cron task"
                        >
                          <Trash2 className="h-3.5 w-3.5 shrink-0" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Downloads Feed */}
        <div className="bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-1 mb-4">
            <h3 className="text-sm font-extrabold text-black dark:text-white">Recent Generated Logs</h3>
            <p className="text-[10px] text-dark-grey">History logs of system exports generated during this session</p>
          </div>

          <div className="flex-1 space-y-3.5">
            {recentDownloads.map((dl) => (
              <div key={dl.id} className="flex justify-between items-center bg-[#F7F8FC] dark:bg-[#0F1015] p-3 rounded-xl border border-medium-grey dark:border-[#282A3A] hover:border-tranquil-velvet dark:hover:border-tranquil-velvet transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-emerald/10 text-emerald dark:bg-[#01ac9f]/20 rounded-lg flex items-center justify-center font-bold text-[10px]">
                    {dl.type}
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-black dark:text-white line-clamp-1 max-w-[130px]">{dl.name}</p>
                    <p className="text-[9px] text-dark-grey">{dl.size} • {dl.time}</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => addToast(`Re-downloading ${dl.name}...`, 'info')}
                  className="h-7 w-7 rounded-lg hover:bg-medium-grey dark:hover:bg-[#262837] flex items-center justify-center text-dark-grey hover:text-black dark:hover:text-white transition-colors"
                >
                  <Download className="h-3.5 w-3.5 shrink-0" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Schedule Dialog Modal (AnimatePresence) */}
      <AnimatePresence>
        {showScheduleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowScheduleModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl max-w-md w-full shadow-2xl overflow-hidden relative z-10 p-6"
            >
              <div className="flex justify-between items-center pb-4 border-b border-[#F7F8FC] dark:border-[#262837] mb-4">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-extrabold text-black dark:text-white">Schedule Report Automation</h3>
                  <p className="text-[10px] text-dark-grey">Create an automatic delivery task for {activeScheduleReport?.title}</p>
                </div>
                <button 
                  onClick={() => setShowScheduleModal(false)}
                  className="h-8 w-8 rounded-full hover:bg-medium-grey dark:hover:bg-[#262837] flex items-center justify-center text-dark-grey"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={saveSchedule} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-dark-grey uppercase">Recipient Email</label>
                  <input 
                    type="email"
                    required
                    value={scheduleForm.email}
                    onChange={(e) => setScheduleForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="admin@xebia.com"
                    className="w-full text-xs font-semibold bg-white dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] px-3.5 py-2 rounded-xl focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-dark-grey uppercase">Frequency</label>
                    <select 
                      value={scheduleForm.frequency}
                      onChange={(e) => setScheduleForm(prev => ({ ...prev, frequency: e.target.value }))}
                      className="w-full text-xs font-semibold bg-white dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] px-3.5 py-2 rounded-xl focus:outline-none"
                    >
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-dark-grey uppercase">Scheduled Time (UTC)</label>
                    <input 
                      type="time"
                      value={scheduleForm.time}
                      onChange={(e) => setScheduleForm(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full text-xs font-semibold bg-white dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] px-3.5 py-2 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-3 bg-[#F7F8FC] dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] rounded-xl space-y-1 text-[10px] text-dark-grey">
                  <p className="font-semibold text-black dark:text-white">Active parameters summary:</p>
                  <p>• Filters applied: <strong className="text-emerald">{selectedFilters[activeScheduleReport?.id]}</strong></p>
                  <p>• Output format: <strong className="text-emerald">{selectedFormats[activeScheduleReport?.id]}</strong></p>
                  <p>• Delivery trigger: <strong className="text-emerald">Every {scheduleForm.frequency} at {scheduleForm.time}</strong></p>
                </div>

                <div className="flex gap-2 pt-2 justify-end">
                  <button 
                    type="button"
                    onClick={() => setShowScheduleModal(false)}
                    className="px-4 py-2 text-xs font-bold rounded-xl border border-medium-grey dark:border-[#282A3A] text-dark-grey hover:bg-[#F7F8FC] dark:hover:bg-[#262837] hover:text-black dark:hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 text-xs font-bold rounded-xl bg-tranquil-velvet hover:bg-[#84117c] dark:bg-[#6c1d5f] dark:hover:bg-[#84117c] text-white transition-colors"
                  >
                    Save & Schedule
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
