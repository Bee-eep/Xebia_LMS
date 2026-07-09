/**
 * Author: Abhishek Dixit
 * Institution: Lovely Professional University
 * Develop the assessment management page for the platform, 
 * including overview cards, assessment tables, traffic charts, and activity feeds.
 */

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, Download, ArrowRight, Clock, ClipboardList, Activity, CheckCircle2, Flag, RefreshCcw, Trash2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import { useTheme } from '@/context/ThemeContext.jsx';
import { ProfileActionButton, ProfileActionModal } from '@/components/profile/ProfileUi.jsx';
import { AssessmentFormModal } from '@/components/forms/FormsUi.jsx';

const overviewCards = [
  {
    title: 'Total Assessments',
    value: '1,284',
    meta: '+12%',
    metaClass: 'text-emerald font-semibold',
    description: 'since last month',
    icon: ClipboardList,
    tone: 'bg-[#F4F5FF] text-tranquil-velvet',
  },
  {
    title: 'Active Sessions',
    value: '42',
    meta: 'Current',
    description: '',
    icon: Activity,
    tone: 'bg-[#E8F7EE] text-emerald',
  },
  {
    title: 'Avg. Score',
    value: '78.5%',
    meta: '+3.4%',
    metaClass: 'text-emerald font-semibold',
    description: '',
    icon: CheckCircle2,
    tone: 'bg-[#E6F7F0] text-emerald',
  },
  {
    title: 'Pending Reviews',
    value: '15',
    meta: 'Requires action',
    metaClass: 'text-cta-orange font-semibold',
    description: '',
    icon: Flag,
    tone: 'bg-[#FFF4E5] text-cta-orange',
  },
];

const allAssessments = [
  { name: 'Q3 Engineering Certification', type: 'Certification', target: 'Senior Developers', status: 'ACTIVE' },
  { name: 'Product Strategy Quiz v2', type: 'Internal Quiz', target: 'Product Team', status: 'DRAFT' },
  { name: 'Security Awareness 2023', type: 'Compliance', target: 'All Employees', status: 'COMPLETED' },
];

const traffic7Days = [
  { day: 'Mon', sessions: 32 },
  { day: 'Tue', sessions: 45 },
  { day: 'Wed', sessions: 28 },
  { day: 'Thu', sessions: 56 },
  { day: 'Fri', sessions: 64 },
  { day: 'Sat', sessions: 48 },
  { day: 'Sun', sessions: 52 },
];

const traffic30Days = [
  { day: 'W1', sessions: 220 },
  { day: 'W2', sessions: 280 },
  { day: 'W3', sessions: 255 },
  { day: 'W4', sessions: 310 },
];

const activityFeed = [
  { title: 'New submission received', subtitle: 'John Doe completed “Engineering Cert”', time: '2m ago' },
  { title: 'Assessment Published', subtitle: 'Security Awareness 2023 is now live', time: '45m ago' },
  { title: 'System Update', subtitle: 'Automated scoring engine updated', time: '3h ago' },
];

const statusStyles = {
  ACTIVE: 'bg-emerald/15 text-emerald',
  DRAFT: 'bg-[#FFF4E5] text-cta-orange',
  COMPLETED: 'bg-[#F6E5F5] text-[#84117C]',
};

export default function AssessmentPage() {
  const { theme } = useTheme();
  const [chartRange, setChartRange] = useState('Last 7 Days');
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [assessments, setAssessments] = useState(allAssessments);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newAssessmentName, setNewAssessmentName] = useState('');
  const [newAssessmentType, setNewAssessmentType] = useState('Quiz');
  const [newAssessmentTarget, setNewAssessmentTarget] = useState('All Employees');
  const [newAssessmentStatus, setNewAssessmentStatus] = useState('DRAFT');

  const trafficData = useMemo(
    () => (chartRange === 'Last 7 Days' ? traffic7Days : traffic30Days),
    [chartRange]
  );

  const filteredAssessments = useMemo(() => {
    if (statusFilter === 'All') return assessments;
    return assessments.filter((item) => item.status === statusFilter);
  }, [statusFilter, assessments]);

  const pageSize = 3;
  const pageCount = Math.max(1, Math.ceil(filteredAssessments.length / pageSize));
  const pageItems = filteredAssessments.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const highlightIndex = useMemo(
    () => trafficData.reduce((maxIndex, item, index) => (item.sessions > trafficData[maxIndex].sessions ? index : maxIndex), 0),
    [trafficData]
  );

  const handleCreateAssessment = () => {
    setCreateModalOpen(true);
  };
  const handleCreateModalSubmit = () => {
    if (!newAssessmentName.trim()) {
      window.alert('Please enter an assessment name.');
      return;
    }

    setAssessments((prev) => [
      {
        name: newAssessmentName.trim(),
        type: newAssessmentType,
        target: newAssessmentTarget,
        status: newAssessmentStatus,
      },
      ...prev,
    ]);

    handleCreateModalClose();
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
    setNewAssessmentName('');
    setNewAssessmentType('Quiz');
    setNewAssessmentTarget('All Employees');
    setNewAssessmentStatus('DRAFT');
  };

  const handleFilterToggle = () => {
    setFilterOpen((prev) => !prev);
  };

  const handleExport = () => {
    const headers = ['Assessment Name', 'Type', 'Target Group', 'Status'];
    const rows = filteredAssessments.map((item) => `${item.name},${item.type},${item.target},${item.status}`);
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'assessments_export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleToggleAssessmentStatus = (name) => {
    const nextStatus = {
      DRAFT: 'ACTIVE',
      ACTIVE: 'COMPLETED',
      COMPLETED: 'DRAFT',
    };
    setAssessments((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, status: nextStatus[item.status] || item.status } : item
      )
    );
  };

  const handleDeleteAssessment = (name) => {
    if (window.confirm('Delete this assessment? This cannot be undone.')) {
      setAssessments((prev) => prev.filter((item) => item.name !== name));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleChartRange = () => {
    setChartRange((current) => (current === 'Last 7 Days' ? 'Last 30 Days' : 'Last 7 Days'));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="space-y-6"
    >
      <div className="grid gap-6 xl:grid-cols-[1.7fr_0.95fr]">
        <div className="rounded-[32px] border border-medium-grey/30 bg-gradient-to-br from-[#F8F4FF] via-[#F6F2FF] to-[#FEFBFF] p-8 shadow-[0_30px_90px_rgba(99,102,241,0.12)]">
          <div className="flex flex-col gap-5 xl:items-start xl:justify-between xl:flex-row xl:items-center">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#F8EEFF] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7C3AED]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#7C3AED]" />
                Assessments Engine
              </div>
              <h1 className="text-4xl font-extrabold tracking-[-0.04em] text-black dark:text-white">Launch high-impact assessments in minutes</h1>
              <p className="max-w-2xl text-sm leading-7 text-dark-grey">Create comprehensive assessments with confident workflows, rich coverage, and quick status controls — all from one elegant dashboard.</p>
            </div>

            <div className="flex flex-wrap gap-3 xl:flex-col xl:items-end">
              <ProfileActionButton
                onClick={handleCreateAssessment}
                tone="warning"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(124,58,237,0.28)] transition hover:from-[#5B21B6] hover:to-[#7C3AED]"
              >
                <Plus className="h-4 w-4" />
                Create assessment
              </ProfileActionButton>
              <p className="max-w-sm text-xs uppercase tracking-[0.22em] text-dark-grey">Fast setup, clear status, and premium launch control.</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-white/80 bg-white/90 p-4 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-dark-grey">Launch speed</p>
              <p className="mt-3 text-3xl font-extrabold text-black">2 min</p>
            </div>
            <div className="rounded-3xl border border-white/80 bg-white/90 p-4 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-dark-grey">Interactive fields</p>
              <p className="mt-3 text-3xl font-extrabold text-black">4+</p>
            </div>
            <div className="rounded-3xl border border-white/80 bg-white/90 p-4 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-dark-grey">Auto draft</p>
              <p className="mt-3 text-3xl font-extrabold text-black">Enabled</p>
            </div>
            <div className="rounded-3xl border border-white/80 bg-white/90 p-4 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-dark-grey">Review-ready</p>
              <p className="mt-3 text-3xl font-extrabold text-black">Always</p>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-medium-grey/30 bg-white p-6 shadow-sm dark:bg-[#16171F]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dark-grey">Assessment snapshot</p>
          <h2 className="mt-3 text-2xl font-bold text-black dark:text-white">Ready to launch</h2>
          <p className="mt-3 text-sm text-dark-grey">Track your assessment lifecycle, manage drafts, and keep stakeholder review cycles short.</p>
          <div className="mt-6 grid gap-3">
            <div className="rounded-3xl bg-[#F8F4FF] p-4 text-sm font-semibold text-[#5B21B6]">Build high-quality quizzes, compliance checks, and certifications with a polished workflow.</div>
            <div className="rounded-3xl bg-[#EFF6FF] p-4 text-sm font-semibold text-[#1D4ED8]">Instant visibility for drafts, active sessions, and completion progress.</div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        {overviewCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 + index * 0.05 }}
              className="rounded-3xl border border-medium-grey/40 bg-white dark:bg-[#16171F] p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-dark-grey">{card.title}</p>
                  <p className="mt-3 text-3xl font-extrabold text-black dark:text-white">{card.value}</p>
                </div>
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${card.tone}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between gap-2 text-sm text-dark-grey">
                <span className={card.metaClass || 'text-dark-grey'}>{card.meta}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="rounded-2xl border border-medium-grey/30 dark:border-border-card/30 bg-[#FBFBFE] dark:bg-[#0F1015] p-4 md:p-6"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-bold text-black dark:text-white">Assessment pipeline</h2>
            <p className="text-sm text-dark-grey">Review current assessments, change status, or remove outdated items.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-2 rounded-2xl border border-medium-grey/40 bg-white px-4 py-2 text-sm font-semibold text-dark-grey transition hover:bg-medium-grey/10"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
            <button
              type="button"
              onClick={handleFilterToggle}
              className="inline-flex items-center gap-2 rounded-2xl border border-medium-grey/40 bg-white px-4 py-2 text-sm font-semibold text-dark-grey transition hover:bg-medium-grey/10"
            >
              <Filter className="h-4 w-4" />
              {filterOpen ? 'Hide Filters' : 'Filter Status'}
            </button>
          </div>
        </div>

        {filterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="mt-5 overflow-hidden rounded-3xl border border-medium-grey/30 bg-white p-5 shadow-sm"
          >
            <div className="grid gap-4 sm:grid-cols-3">
              {['All', 'ACTIVE', 'DRAFT', 'COMPLETED'].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${statusFilter === status ? 'border-tranquil-velvet bg-tranquil-velvet/10 text-tranquil-velvet' : 'border-medium-grey/30 bg-white text-dark-grey hover:bg-medium-grey/10'}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <div className="overflow-x-auto sleek-scrollbar">
          <table className="w-full min-w-[800px] text-left text-xs">
            <thead>
              <tr className="border-b border-medium-grey/50 dark:border-border-card bg-[#F7F8FC]/80 dark:bg-[#18181B] text-dark-grey uppercase tracking-[0.18em]">
                <th className="p-4 font-bold">Assessment</th>
                <th className="p-4 font-bold">Type</th>
                <th className="p-4 font-bold">Target</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((item, index) => (
                <motion.tr
                  key={item.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="border-b border-medium-grey/30 dark:border-border-card/30 hover:bg-tranquil-velvet/5 dark:hover:bg-white/5 transition-colors"
                >
                  <td className="p-4">
                    <p className="font-bold text-black dark:text-white">{item.name}</p>
                  </td>
                  <td className="p-4 text-dark-grey">{item.type}</td>
                  <td className="p-4 text-dark-grey">{item.target}</td>
                  <td className="p-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold ${statusStyles[item.status]}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggleAssessmentStatus(item.name)}
                        className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-medium-grey/40 bg-white text-dark-grey hover:text-tranquil-velvet hover:bg-tranquil-velvet/5 transition"
                        title="Change status"
                      >
                        <RefreshCcw className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteAssessment(item.name)}
                        className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-cta-orange/20 bg-white text-cta-orange hover:bg-cta-orange/10 transition"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-dark-grey">
          <span>
            Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredAssessments.length)} of 1,284 assessments
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-medium-grey/40 bg-white text-dark-grey transition hover:bg-medium-grey/10"
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {[...Array(pageCount)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`inline-flex h-9 min-w-[36px] items-center justify-center rounded-xl text-sm font-bold transition ${currentPage === index + 1 ? 'bg-tranquil-velvet text-white' : 'border border-medium-grey/40 bg-white text-dark-grey hover:bg-medium-grey/10'}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(Math.min(pageCount, currentPage + 1))}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-medium-grey/40 bg-white text-dark-grey transition hover:bg-medium-grey/10"
              disabled={currentPage === pageCount}
            >
              &gt;
            </button>
          </div>
        </div>
      </motion.div>

      <AssessmentFormModal
        open={createModalOpen}
        onClose={handleCreateModalClose}
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateModalSubmit();
        }}
        value={{ name: newAssessmentName, type: newAssessmentType, target: newAssessmentTarget, status: newAssessmentStatus }}
        onChange={(field, val) => {
          if (field === 'name') setNewAssessmentName(val);
          if (field === 'type') setNewAssessmentType(val);
          if (field === 'target') setNewAssessmentTarget(val);
          if (field === 'status') setNewAssessmentStatus(val);
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="grid gap-4 xl:grid-cols-[1.7fr_1fr]"
      >
        <div className="rounded-3xl border border-medium-grey/40 bg-white dark:bg-[#16171F] p-5 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-black dark:text-white">Session Traffic</h2>
              <p className="text-sm text-dark-grey">{chartRange}</p>
            </div>
            <button
              onClick={toggleChartRange}
              className="inline-flex items-center gap-2 rounded-2xl border border-medium-grey/40 bg-white px-4 py-2 text-xs font-bold text-dark-grey transition hover:bg-medium-grey/10"
            >
              <span>{chartRange}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="mt-5 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#282A3A' : '#E6E7EF'} vertical={false} />
                <XAxis dataKey="day" stroke={theme === 'dark' ? '#9CA3AF' : '#5A5A5A'} tickLine={false} axisLine={false} />
                <YAxis stroke={theme === 'dark' ? '#9CA3AF' : '#5A5A5A'} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#16171F' : '#FFFFFF', borderColor: theme === 'dark' ? '#282A3A' : '#DADCEA' }} cursor={{ fill: theme === 'dark' ? '#ffffff10' : '#00000008' }} />
                <Bar dataKey="sessions" radius={[14, 14, 0, 0]} barSize={30}>
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${entry.day}`} fill={index === highlightIndex ? '#6C1D5F' : '#A669C2'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-medium-grey/40 bg-white dark:bg-[#16171F] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-black dark:text-white">Recent Activity</h2>
              <p className="text-sm text-dark-grey">Live assessment updates and notifications.</p>
            </div>
          </div>
          <div className="mt-5 space-y-4">
            {activityFeed.map((item) => (
              <div key={item.title} className="flex gap-3 rounded-3xl border border-medium-grey/40 bg-[#F7F8FC] dark:bg-[#11131A] p-4">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-tranquil-velvet/10 text-tranquil-velvet">
                  <Clock className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-black dark:text-white">{item.title}</p>
                  <p className="text-sm text-dark-grey">{item.subtitle}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-dark-grey/70">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-right">
            <button className="text-sm font-bold text-tranquil-velvet hover:text-bright-velvet transition">View All Activity</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
