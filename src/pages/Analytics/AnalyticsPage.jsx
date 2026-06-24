import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Sparkles, ArrowRight } from 'lucide-react';
import BorderGlow from '../../components/BorderGlow.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

const trendsData = [
  { name: 'Jan', engagement: 65, completion: 40, retention: 85 },
  { name: 'Feb', engagement: 70, completion: 48, retention: 82 },
  { name: 'Mar', engagement: 78, completion: 55, retention: 88 },
  { name: 'Apr', engagement: 74, completion: 60, retention: 90 },
  { name: 'May', engagement: 85, completion: 72, retention: 92 },
  { name: 'Jun', engagement: 90, completion: 78, retention: 94 }
];

const cohortScoreData = [
  { name: 'React Architecture', average: 88, passing: 94 },
  { name: 'Cloud Native K8s', average: 76, passing: 80 },
  { name: 'Node.js Microservices', average: 82, passing: 89 },
  { name: 'Clean Code Patterns', average: 92, passing: 97 },
  { name: 'Tailwind Design Systems', average: 85, passing: 92 }
];

const skillMatrixData = [
  { subject: 'State Engine', A: 120, B: 110, fullMark: 150 },
  { subject: 'Deployments', A: 98, B: 130, fullMark: 150 },
  { subject: 'Architecture', A: 86, B: 130, fullMark: 150 },
  { subject: 'Databases', A: 99, B: 100, fullMark: 150 },
  { subject: 'CI/CD Ops', A: 85, B: 90, fullMark: 150 },
  { subject: 'Testing Suite', A: 65, B: 85, fullMark: 150 }
];

const aiRecommendations = [
  { id: 1, type: 'warning', title: 'High Drop-Off Detected', desc: 'Course "Cloud Native & Kubernetes" is showing a 22% drop-off at Module 4 (Ingress Controllers). We recommend adding a practical sandbox walkthrough.', target: 'Optimize K8s Module' },
  { id: 2, type: 'success', title: 'Top Performer Identified', desc: 'Course "Enterprise React with Tailwind CSS" performs best. Student retention is at 94% with an average grading score of 88%. Consider expanding this pathway.', target: 'Promote Pathway' },
  { id: 3, type: 'danger', title: '45 Students At Risk', desc: '45 students in the Noida cohort have not logged in for 10 consecutive days. Automate a reminder email containing sandbox refresh links.', target: 'Trigger Emails' }
];

export default function AnalyticsPage() {
  const { theme } = useTheme();

  return (
    <div className="space-y-6">
      
      {/* AI Insights - Recommendations */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-tranquil-velvet dark:text-amber-400">
          <Sparkles className="h-5 w-5 fill-current animate-pulse" />
          <h3 className="text-sm font-extrabold uppercase tracking-widest leading-none">AI Analytics & Co-Pilot Recommendations</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {aiRecommendations.map(rec => (
            <BorderGlow
              key={rec.id}
              edgeSensitivity={20}
              glowColor={rec.type === 'success' ? '176 99 34' : '304 76 30'}
              backgroundColor={theme === 'dark' ? '#16171F' : '#FFFFFF'}
              borderRadius={16}
              glowRadius={30}
              glowIntensity={1.2}
            >
              <div className="p-5 flex flex-col justify-between h-full bg-white dark:bg-[#16171F] rounded-2xl border border-medium-grey dark:border-[#282A3A]">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${rec.type === 'success' ? 'bg-emerald' : rec.type === 'warning' ? 'bg-amber-500' : 'bg-red-500'}`} />
                    <h4 className="text-xs font-bold text-black dark:text-white uppercase tracking-wider">{rec.title}</h4>
                  </div>
                  <p className="text-xs text-dark-grey leading-relaxed">{rec.desc}</p>
                </div>
                <button 
                  onClick={() => alert(`Triggering copilot sandbox action: "${rec.target}"`)}
                  className="mt-4 flex items-center gap-1 text-[10px] font-bold text-tranquil-velvet hover:text-bright-velvet dark:text-amber-400 dark:hover:text-amber-300 transition cursor-pointer self-start"
                >
                  <span>{rec.target}</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Learning Trends & Engagement Card (col-span-8) */}
        <div className="lg:col-span-8 bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[350px]">
          <div className="space-y-0.5 mb-4">
            <h3 className="text-sm font-extrabold text-black dark:text-white">Cohort Performance & Retention Trends</h3>
            <p className="text-[10px] text-dark-grey">Monthly tracking of syllabus engagement, graduation completion, and workspace retention</p>
          </div>

          <div className="flex-1 min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendsData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="engageGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6C1D5F" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6C1D5F" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="retGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#01AC9F" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#01AC9F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#282A3A' : '#E6E7EF'} />
                <XAxis dataKey="name" stroke={theme === 'dark' ? '#9CA3AF' : '#5A5A5A'} fontSize={9} tickLine={false} />
                <YAxis stroke={theme === 'dark' ? '#9CA3AF' : '#5A5A5A'} fontSize={9} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#16171F' : '#FFFFFF', borderColor: theme === 'dark' ? '#282A3A' : '#DADCEA' }} />
                <Area type="monotone" dataKey="engagement" stroke="#6C1D5F" strokeWidth={2} fillOpacity={1} fill="url(#engageGrad)" name="Engagement" />
                <Area type="monotone" dataKey="retention" stroke="#01AC9F" strokeWidth={2} fillOpacity={1} fill="url(#retGrad)" name="Retention" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Matrix Radar (col-span-4) */}
        <div className="lg:col-span-4 bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[350px]">
          <div className="space-y-0.5 mb-2">
            <h3 className="text-sm font-extrabold text-black dark:text-white">Workspace Skill Matrix</h3>
            <p className="text-[10px] text-dark-grey">Competency index by engineering role</p>
          </div>

          <div className="flex-1 min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillMatrixData}>
                <PolarGrid stroke={theme === 'dark' ? '#282A3A' : '#E6E7EF'} />
                <PolarAngleAxis dataKey="subject" stroke={theme === 'dark' ? '#9CA3AF' : '#5A5A5A'} fontSize={9} />
                <PolarRadiusAxis stroke={theme === 'dark' ? '#282A3A' : '#E6E7EF'} fontSize={8} />
                <Radar name="Frontend Devs" dataKey="A" stroke="#6C1D5F" fill="#6C1D5F" fillOpacity={0.3} />
                <Radar name="DevOps Engineers" dataKey="B" stroke="#01AC9F" fill="#01AC9F" fillOpacity={0.2} />
                <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#16171F' : '#FFFFFF', borderColor: theme === 'dark' ? '#282A3A' : '#DADCEA' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cohort Performance (col-span-12) */}
        <div className="lg:col-span-12 bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[300px]">
          <div className="space-y-0.5 mb-4">
            <h3 className="text-sm font-extrabold text-black dark:text-white">Average Exam Scores by Cohort</h3>
            <p className="text-[10px] text-dark-grey">Evaluation metrics comparison mapping passing metrics vs class averages</p>
          </div>

          <div className="flex-1 min-h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cohortScoreData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#282A3A' : '#E6E7EF'} />
                <XAxis dataKey="name" stroke={theme === 'dark' ? '#9CA3AF' : '#5A5A5A'} fontSize={9} tickLine={false} />
                <YAxis stroke={theme === 'dark' ? '#9CA3AF' : '#5A5A5A'} fontSize={9} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#16171F' : '#FFFFFF', borderColor: theme === 'dark' ? '#282A3A' : '#DADCEA' }} />
                <Bar dataKey="average" fill="#6C1D5F" radius={[4, 4, 0, 0]} name="Class Average" />
                <Bar dataKey="passing" fill="#FF6200" radius={[4, 4, 0, 0]} name="Passing Threshold" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
