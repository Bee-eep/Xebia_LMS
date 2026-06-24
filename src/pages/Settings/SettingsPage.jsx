import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  Palette, 
  ShieldAlert, 
  Bell, 
  Cpu, 
  Lock, 
  CreditCard, 
  Key, 
  Save, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  Upload, 
  Shield, 
  Info, 
  Globe, 
  Activity, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import BorderGlow from '../../components/BorderGlow.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function SettingsPage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('general');
  const [toast, setToast] = useState(null);

  // States for dynamic interactions
  const [copiedKeyId, setCopiedKeyId] = useState(null);
  const [apiKeys, setApiKeys] = useState([
    { id: 'key-1', name: 'Production LMS Webhook', prefix: 'xebia_live_...', created: 'June 10, 2026', scope: 'Read/Write' },
    { id: 'key-2', name: 'Sandbox Dev Analytics', prefix: 'xebia_test_...', created: 'June 22, 2026', scope: 'Read-Only' }
  ]);
  const [newKeyName, setNewKeyName] = useState('');

  const [integrations, setIntegrations] = useState([
    { id: 'slack', name: 'Slack Alerts', description: 'Post alerts and completion announcements to workspace channels.', active: true, connected: true },
    { id: 'stripe', name: 'Stripe Payments', description: 'Process individual course sales and coordinate SaaS subscriptions.', active: true, connected: true },
    { id: 'zoom', name: 'Zoom Integration', description: 'Schedule live lectures and office hours directly from LMS curriculum.', active: false, connected: false },
    { id: 'github', name: 'GitHub Classroom', description: 'Sync assignment grading repositories and developer sandbox push hooks.', active: true, connected: true }
  ]);

  const [billingHistory] = useState([
    { id: 'inv-101', date: 'Jun 01, 2026', amount: '$43,000.00', status: 'Paid', method: 'Visa ending 8411' },
    { id: 'inv-100', date: 'May 01, 2026', amount: '$43,000.00', status: 'Paid', method: 'Visa ending 8411' },
    { id: 'inv-099', date: 'Apr 01, 2026', amount: '$41,200.00', status: 'Paid', method: 'Visa ending 8411' }
  ]);

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'branding', label: 'Branding', icon: Palette },
    { id: 'roles', label: 'Roles & Permissions', icon: ShieldAlert },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations', icon: Cpu },
    { id: 'security', label: 'Security & Auth', icon: Lock },
    { id: 'billing', label: 'Billing & Invoices', icon: CreditCard },
    { id: 'api', label: 'API Keys', icon: Key }
  ];

  // Show Toast
  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Copy to Clipboard simulation
  const handleCopyKey = (id, str) => {
    navigator.clipboard.writeText(str);
    setCopiedKeyId(id);
    triggerToast('API Key copied to clipboard!');
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  // Save Settings general mock
  const handleSaveSettings = (e) => {
    e.preventDefault();
    triggerToast('System settings saved successfully!');
  };

  // Add API key
  const handleGenerateKey = (e) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    const newKey = {
      id: `key-${Date.now()}`,
      name: newKeyName,
      prefix: `xebia_${Math.random() > 0.5 ? 'live' : 'test'}_${Math.random().toString(36).substring(2, 8)}...`,
      created: 'Just now',
      scope: 'Read/Write'
    };
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    triggerToast('New API access token generated.');
  };

  // Revoke API key
  const handleRevokeKey = (id) => {
    setApiKeys(apiKeys.filter(k => k.id !== id));
    triggerToast('API Key revoked.');
  };

  // Toggle integrations
  const handleToggleIntegration = (id) => {
    setIntegrations(integrations.map(item => 
      item.id === id ? { ...item, active: !item.active } : item
    ));
    const target = integrations.find(item => item.id === id);
    triggerToast(`${target.name} integration ${!target.active ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Panel */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-5 right-5 z-50 bg-emerald/10 border border-emerald/30 text-emerald dark:text-[#5ce7d4] px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 text-xs font-semibold"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Panel */}
      <div className="bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-xl font-extrabold text-black dark:text-white">Admin Settings & Configuration</h1>
          <p className="text-xs text-dark-grey">Configure global organization metadata, brand styles, OAuth integrations, billing tiers, and API access keys.</p>
        </div>
      </div>

      {/* Outer Tab Frame (Flex Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Settings Sidebar Tabs */}
        <div className="bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] rounded-2xl p-3 shadow-sm space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold rounded-xl transition-all ${
                  isActive 
                    ? 'bg-tranquil-velvet dark:bg-[#6c1d5f] text-white shadow-sm' 
                    : 'text-dark-grey hover:bg-[#F7F8FC] dark:hover:bg-[#262837] hover:text-black dark:hover:text-white'
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-dark-grey'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Settings Content Pane (Span 3) */}
        <div className="lg:col-span-3">
          <BorderGlow
            edgeSensitivity={15}
            glowColor="108 29 95" // Purple glow accent
            backgroundColor={theme === 'dark' ? '#16171F' : '#FFFFFF'}
            borderRadius={16}
            glowRadius={30}
            glowIntensity={1.0}
          >
            <div className="bg-white dark:bg-[#16171F] rounded-2xl p-6 md:p-8 min-h-[480px] flex flex-col justify-between border border-transparent">
              
              <div>
                {/* General Tab */}
                {activeTab === 'general' && (
                  <form onSubmit={handleSaveSettings} className="space-y-6">
                    <div className="border-b border-[#F7F8FC] dark:border-[#262837] pb-4 mb-4">
                      <h3 className="text-sm font-extrabold text-black dark:text-white">Workspace Configuration</h3>
                      <p className="text-[10px] text-dark-grey">Establish core profile values for your organization directory.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-dark-grey uppercase">Organization Name</label>
                        <input 
                          type="text" 
                          required
                          defaultValue="Xebia Software Services" 
                          className="w-full text-xs font-semibold bg-white dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] px-3.5 py-2.5 rounded-xl focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-dark-grey uppercase">Workspace URL slug</label>
                        <div className="flex rounded-xl overflow-hidden border border-medium-grey dark:border-[#282A3A]">
                          <span className="bg-[#F7F8FC] dark:bg-[#0F1015] border-r border-medium-grey dark:border-[#282A3A] px-3 py-2 text-[10px] font-bold text-dark-grey flex items-center">
                            xebia-lms.com/
                          </span>
                          <input 
                            type="text" 
                            required
                            defaultValue="xebia-internal" 
                            className="w-full text-xs font-semibold bg-white dark:bg-[#0F1015] px-3.5 py-2.5 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-dark-grey uppercase">Primary Contact Email</label>
                        <input 
                          type="email" 
                          required
                          defaultValue="lms-admin@xebia.com" 
                          className="w-full text-xs font-semibold bg-white dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] px-3.5 py-2.5 rounded-xl focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-dark-grey uppercase">Timezone / Format</label>
                        <select className="w-full text-xs font-semibold bg-white dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] px-3.5 py-2.5 rounded-xl focus:outline-none">
                          <option>UTC +05:30 (New Delhi, India)</option>
                          <option>UTC +01:00 (Paris, France)</option>
                          <option>UTC -05:00 (New York, US)</option>
                        </select>
                      </div>
                    </div>

                    <div className="bg-[#F7F8FC] dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] p-4 rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-black dark:text-white">Workspace Session Autosaver</p>
                          <p className="text-[9px] text-dark-grey">Automatically save active admin drafts every 10 seconds.</p>
                        </div>
                        <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-emerald" />
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="flex items-center gap-2 bg-tranquil-velvet hover:bg-[#84117c] dark:bg-[#6c1d5f] dark:hover:bg-[#84117c] text-white px-4 py-2.5 text-xs font-bold rounded-xl shadow-sm transition-all"
                    >
                      <Save className="h-3.5 w-3.5" /> Save Workspace Configuration
                    </button>
                  </form>
                )}

                {/* Branding Tab */}
                {activeTab === 'branding' && (
                  <div className="space-y-6">
                    <div className="border-b border-[#F7F8FC] dark:border-[#262837] pb-4 mb-4">
                      <h3 className="text-sm font-extrabold text-black dark:text-white">Branding Design Customizer</h3>
                      <p className="text-[10px] text-dark-grey">Configure application identity parameters to overlay enterprise logos.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-dark-grey uppercase block">Organization Logo</label>
                          <div className="border-2 border-dashed border-medium-grey dark:border-[#282A3A] rounded-2xl p-5 flex flex-col items-center justify-center space-y-2.5">
                            <div className="bg-white px-4 py-2 border border-medium-grey rounded-xl shadow-xs">
                              <span className="font-extrabold text-tranquil-velvet tracking-wide text-xs">Xebia</span>
                            </div>
                            <span className="text-[9px] text-dark-grey text-center">Supports PNG, SVG under 2MB.</span>
                            <button 
                              onClick={() => triggerToast('Logo uploaded successfully (Simulation)')}
                              className="flex items-center gap-1.5 px-3 py-1.5 border border-medium-grey dark:border-[#282A3A] text-[10px] font-bold text-dark-grey rounded-lg hover:bg-[#F7F8FC] dark:hover:bg-[#262837] transition-all"
                            >
                              <Upload className="h-3 w-3" /> Select Logo File
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-[10px] font-bold text-dark-grey uppercase block">Brand Color Scheme</label>
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center justify-between p-2.5 bg-[#F7F8FC] dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] rounded-xl">
                            <div className="flex items-center gap-2">
                              <span className="h-4 w-4 rounded-full bg-tranquil-velvet inline-block" />
                              <span className="font-semibold text-black dark:text-white">Tranquil Velvet</span>
                            </div>
                            <span className="text-[10px] text-dark-grey">#6C1D5F</span>
                          </div>
                          
                          <div className="flex items-center justify-between p-2.5 bg-[#F7F8FC] dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] rounded-xl">
                            <div className="flex items-center gap-2">
                              <span className="h-4 w-4 rounded-full bg-emerald inline-block" />
                              <span className="font-semibold text-black dark:text-white">Xebia Emerald</span>
                            </div>
                            <span className="text-[10px] text-dark-grey">#01AC9F</span>
                          </div>

                          <div className="flex items-center justify-between p-2.5 bg-[#F7F8FC] dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] rounded-xl">
                            <div className="flex items-center gap-2">
                              <span className="h-4 w-4 rounded-full bg-[#FF6200] inline-block" />
                              <span className="font-semibold text-black dark:text-white">CTA Orange</span>
                            </div>
                            <span className="text-[10px] text-dark-grey">#FF6200</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Roles & Permissions Tab */}
                {activeTab === 'roles' && (
                  <div className="space-y-6">
                    <div className="border-b border-[#F7F8FC] dark:border-[#262837] pb-4 mb-4">
                      <h3 className="text-sm font-extrabold text-black dark:text-white">Access Roles Matrix</h3>
                      <p className="text-[10px] text-dark-grey">Define platform scopes, system permission values, and default credentials settings.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { title: 'Platform Admin', desc: 'Full core access, DB modification, server webhook settings.', count: '4 members', status: 'Full Scope' },
                        { title: 'Course Instructor', desc: 'Can publish lectures, review quizzes, evaluate enrollments.', count: '28 members', status: 'Write / Edit' },
                        { title: 'Corporate Manager', desc: 'Can audit employee progress reports, download invoices.', count: '12 members', status: 'Read Reports' },
                        { title: 'Enrolled Student', desc: 'Can access assigned modules, take tests, review certificates.', count: '1,420 members', status: 'Workspace Sandbox' }
                      ].map((role, idx) => (
                        <div key={idx} className="p-4 bg-[#F7F8FC] dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] rounded-xl flex justify-between items-start">
                          <div className="space-y-1.5">
                            <span className="bg-tranquil-velvet/10 text-tranquil-velvet dark:text-[#d38bca] text-[9px] font-bold px-2 py-0.5 rounded-full">
                              {role.status}
                            </span>
                            <h4 className="text-xs font-bold text-black dark:text-white pt-1">{role.title}</h4>
                            <p className="text-[10px] text-dark-grey leading-relaxed">{role.desc}</p>
                          </div>
                          <span className="text-[9px] font-semibold text-emerald shrink-0">{role.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <div className="border-b border-[#F7F8FC] dark:border-[#262837] pb-4 mb-4">
                      <h3 className="text-sm font-extrabold text-black dark:text-white">Alert Delivery Settings</h3>
                      <p className="text-[10px] text-dark-grey">Toggle message pipelines for student signups, billing events, and scheduled reports.</p>
                    </div>

                    <div className="space-y-4">
                      {[
                        { label: 'New Student Signup Notifications', desc: 'Send admin summary details when registrations occur.', email: true, slack: true },
                        { label: 'SaaS Renewal & Invoice Receipts', desc: 'Deliver financial billing receipts to billing@xebia.com.', email: true, slack: false },
                        { label: 'Course Completion Triggers', desc: 'Ping channels when students complete full graduation curricula.', email: false, slack: true },
                        { label: 'Daily Backup Health Status', desc: 'Deliver automated database snapshot status reports.', email: true, slack: true }
                      ].map((item, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-3 bg-[#F7F8FC] dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] rounded-xl">
                          <div className="space-y-0.5">
                            <p className="text-xs font-bold text-black dark:text-white">{item.label}</p>
                            <p className="text-[9px] text-dark-grey">{item.desc}</p>
                          </div>
                          <div className="flex gap-4 shrink-0 pt-1 sm:pt-0">
                            <label className="flex items-center gap-1.5 text-[10px] font-bold text-dark-grey">
                              <input type="checkbox" defaultChecked={item.email} className="rounded accent-emerald" /> Email
                            </label>
                            <label className="flex items-center gap-1.5 text-[10px] font-bold text-dark-grey">
                              <input type="checkbox" defaultChecked={item.slack} className="rounded accent-emerald" /> Slack
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Integrations Tab */}
                {activeTab === 'integrations' && (
                  <div className="space-y-6">
                    <div className="border-b border-[#F7F8FC] dark:border-[#262837] pb-4 mb-4">
                      <h3 className="text-sm font-extrabold text-black dark:text-white">API Connectors & Integrations</h3>
                      <p className="text-[10px] text-dark-grey">Manage webhook credentials and authorization scopes for third-party platforms.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {integrations.map((item) => (
                        <div key={item.id} className="p-4 bg-[#F7F8FC] dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] rounded-xl flex flex-col justify-between min-h-[140px]">
                          <div className="space-y-1">
                            <div className="flex justify-between items-start">
                              <h4 className="text-xs font-bold text-black dark:text-white">{item.name}</h4>
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${item.connected ? 'bg-emerald/10 text-emerald' : 'bg-red-500/10 text-red-500'}`}>
                                {item.connected ? 'Connected' : 'Disconnected'}
                              </span>
                            </div>
                            <p className="text-[10px] text-dark-grey leading-relaxed">{item.description}</p>
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t border-medium-grey dark:border-[#282A3A]/40 mt-3">
                            <button 
                              onClick={() => triggerToast(`Configuring ${item.name}`)}
                              className="text-[9px] font-bold text-tranquil-velvet dark:text-[#d38bca] flex items-center gap-1 hover:underline"
                            >
                              Configure Keys <ExternalLink className="h-2.5 w-2.5" />
                            </button>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={item.active} 
                                onChange={() => handleToggleIntegration(item.id)}
                                className="sr-only peer" 
                              />
                              <div className="w-7 h-4 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald"></div>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <div className="border-b border-[#F7F8FC] dark:border-[#262837] pb-4 mb-4">
                      <h3 className="text-sm font-extrabold text-black dark:text-white">Security & Multi-Factor Auth</h3>
                      <p className="text-[10px] text-dark-grey">Establish authentication guidelines, sandbox keys, and session timeouts.</p>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-[#F7F8FC] dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] rounded-xl flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-black dark:text-white flex items-center gap-1.5">
                            <Shield className="h-4 w-4 text-emerald" /> Require Multi-Factor Auth (MFA)
                          </p>
                          <p className="text-[10px] text-dark-grey">Forces all administrators and instructors to pass Authenticator OTP checks.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" onChange={() => triggerToast('MFA requirements updated.')} />
                          <div className="w-7 h-4 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald"></div>
                        </label>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-dark-grey uppercase">Session Autologout Threshold</label>
                          <select className="w-full text-xs font-semibold bg-white dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] px-3.5 py-2.5 rounded-xl focus:outline-none">
                            <option>1 Hour (Recommended)</option>
                            <option>15 Minutes</option>
                            <option>8 Hours</option>
                            <option>Never (Insecure)</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-dark-grey uppercase">Password Strength Requirement</label>
                          <select className="w-full text-xs font-semibold bg-white dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] px-3.5 py-2.5 rounded-xl focus:outline-none">
                            <option>Strong (Caps, Numbers, Symbols)</option>
                            <option>Medium (Minimum 8 chars)</option>
                          </select>
                        </div>
                      </div>

                      <div className="bg-[#FF6200]/10 border border-[#FF6200]/30 p-4 rounded-xl flex gap-3">
                        <Info className="h-4 w-4 text-cta-orange shrink-0 pt-0.5" />
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-black dark:text-white">Workspace Audit Logs Notice</p>
                          <p className="text-[10px] text-dark-grey leading-relaxed">
                            Security logs capture every login failure and courses publishing event. Log traces are persisted under compliance mandates.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Billing Tab */}
                {activeTab === 'billing' && (
                  <div className="space-y-6">
                    <div className="border-b border-[#F7F8FC] dark:border-[#262837] pb-4 mb-4">
                      <h3 className="text-sm font-extrabold text-black dark:text-white">Billing Information & Receipts</h3>
                      <p className="text-[10px] text-dark-grey">Manage subscription licenses volume, active card detail configurations, and download invoice records.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Subscription Status Card */}
                      <div className="p-4 bg-tranquil-velvet/5 border border-tranquil-velvet/20 rounded-xl space-y-3 md:col-span-1">
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-tranquil-velvet dark:text-[#d38bca] uppercase tracking-wider">Plan Tier</span>
                          <h4 className="text-sm font-extrabold text-black dark:text-white">Enterprise Pro</h4>
                          <p className="text-[9px] text-dark-grey">Licenses active for 1,500 students</p>
                        </div>
                        <p className="text-lg font-black text-black dark:text-white">$43,000/mo</p>
                        <span className="text-[9px] font-semibold text-emerald block">Renews July 1, 2026</span>
                      </div>

                      {/* Payment Card Graphic */}
                      <div className="bg-gradient-to-br from-[#6C1D5F] via-[#84117C] to-[#FF6200] p-4 rounded-xl text-white flex flex-col justify-between min-h-[120px] md:col-span-2 shadow-md relative overflow-hidden">
                        <div className="absolute top-0 right-0 h-24 w-24 bg-white/5 rounded-full -mr-8 -mt-8 pointer-events-none" />
                        <div className="flex justify-between items-start">
                          <div className="space-y-0.5">
                            <p className="text-[8px] uppercase tracking-widest opacity-80">Workspace Billing</p>
                            <p className="text-xs font-bold">Xebia Services Corp</p>
                          </div>
                          <span className="text-xs font-extrabold italic">Visa</span>
                        </div>
                        <div className="space-y-1 pt-3">
                          <p className="text-sm font-extrabold tracking-widest">•••• •••• •••• 8411</p>
                          <div className="flex justify-between items-center text-[8px] opacity-80 font-semibold">
                            <span>EXPIRES: 09/29</span>
                            <span>CVV: ***</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Invoice logs list */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-dark-grey uppercase">Billing Invoices History</p>
                      <div className="border border-medium-grey dark:border-[#282A3A] rounded-xl overflow-hidden divide-y divide-[#F7F8FC] dark:divide-[#262837] text-xs bg-white dark:bg-[#16171F]">
                        {billingHistory.map(inv => (
                          <div key={inv.id} className="flex justify-between items-center p-3 hover:bg-[#F7F8FC] dark:hover:bg-[#262837] transition-colors">
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] font-bold text-dark-grey bg-medium-grey/40 dark:bg-[#262837] px-2 py-0.5 rounded">
                                {inv.id}
                              </span>
                              <span className="font-semibold text-black dark:text-white">{inv.date}</span>
                            </div>
                            
                            <div className="flex items-center gap-6">
                              <span className="text-dark-grey">{inv.amount}</span>
                              <span className="text-emerald font-semibold">{inv.status}</span>
                              <button 
                                onClick={() => triggerToast(`Downloading Invoice ${inv.id}`)}
                                className="text-[10px] font-bold text-tranquil-velvet dark:text-[#d38bca] hover:underline"
                              >
                                PDF
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* API Keys Tab */}
                {activeTab === 'api' && (
                  <div className="space-y-6">
                    <div className="border-b border-[#F7F8FC] dark:border-[#262837] pb-4 mb-4">
                      <h3 className="text-sm font-extrabold text-black dark:text-white">API Access Tokens</h3>
                      <p className="text-[10px] text-dark-grey">Generate security keys to coordinate integrations and download program logs.</p>
                    </div>

                    {/* Token Generator Form */}
                    <form onSubmit={handleGenerateKey} className="flex gap-2">
                      <input 
                        type="text" 
                        required
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                        placeholder="e.g. Jenkins CI Deployment" 
                        className="w-full text-xs font-semibold bg-white dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] px-3.5 py-2.5 rounded-xl focus:outline-none"
                      />
                      <button 
                        type="submit" 
                        className="flex items-center gap-1 bg-tranquil-velvet hover:bg-[#84117c] dark:bg-[#6c1d5f] dark:hover:bg-[#84117c] text-white px-4 py-2.5 text-xs font-bold rounded-xl shadow-sm transition-all whitespace-nowrap"
                      >
                        <Plus className="h-4 w-4 shrink-0" /> Generate Token
                      </button>
                    </form>

                    {/* Keys list */}
                    <div className="space-y-2.5 pt-2">
                      {apiKeys.map((key) => (
                        <div key={key.id} className="p-4 bg-[#F7F8FC] dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] rounded-xl flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-black dark:text-white">{key.name}</p>
                            <div className="flex items-center gap-2">
                              <code className="text-[10px] text-dark-grey bg-medium-grey/30 dark:bg-[#262837] px-2 py-0.5 rounded font-mono">
                                {key.prefix}
                              </code>
                              <span className="text-[9px] text-emerald font-semibold bg-emerald/10 px-2 py-0.5 rounded-full">
                                {key.scope}
                              </span>
                            </div>
                            <p className="text-[9px] text-dark-grey">Created: {key.created}</p>
                          </div>

                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleCopyKey(key.id, `${key.prefix}ABCDEFGH123456`)}
                              className="h-8 w-8 rounded-lg hover:bg-medium-grey dark:hover:bg-[#262837] flex items-center justify-center text-dark-grey hover:text-black dark:hover:text-white transition-colors"
                              title="Copy Token to clipboard"
                            >
                              {copiedKeyId === key.id ? <Check className="h-4 w-4 text-emerald" /> : <Copy className="h-4 w-4" />}
                            </button>
                            <button 
                              onClick={() => handleRevokeKey(key.id)}
                              className="h-8 w-8 rounded-lg hover:bg-red-500/10 flex items-center justify-center text-red-500 transition-colors"
                              title="Revoke Token"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-[#F7F8FC] dark:bg-[#0F1015] border border-medium-grey dark:border-[#282A3A] p-4 rounded-xl space-y-1">
                      <p className="text-xs font-bold text-black dark:text-white flex items-center gap-1.5">
                        <Activity className="h-4 w-4 text-emerald" /> Webhooks Endpoint
                      </p>
                      <p className="text-[10px] text-dark-grey leading-relaxed">
                        Configure a webhook url target where Xebia LMS will post JSON body updates on students course completion events.
                      </p>
                      <div className="flex gap-2 pt-2">
                        <input 
                          type="url" 
                          placeholder="https://api.yourdomain.com/lms-webhook" 
                          defaultValue="https://api.xebia.com/integrations/lms-hook"
                          className="w-full text-xs bg-white dark:bg-[#16171F] border border-medium-grey dark:border-[#282A3A] px-3.5 py-1.5 rounded-xl focus:outline-none"
                        />
                        <button 
                          type="button" 
                          onClick={() => triggerToast('Webhook target saved.')}
                          className="border border-medium-grey dark:border-[#282A3A] px-3 py-1.5 text-xs font-bold rounded-xl hover:bg-[#F7F8FC] dark:hover:bg-[#262837] transition-all whitespace-nowrap"
                        >
                          Save Url
                        </button>
                      </div>
                    </div>

                  </div>
                )}
              </div>

              {/* Saved Indicator for all tabs */}
              <div className="mt-8 pt-4 border-t border-[#F7F8FC] dark:border-[#262837] flex justify-between items-center text-[10px] text-dark-grey">
                <p>Configuring: <strong>Xebia Services Enterprise Workspace</strong></p>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald animate-pulse inline-block" />
                  <span>All sub-systems synchronized</span>
                </div>
              </div>

            </div>
          </BorderGlow>
        </div>

      </div>

    </div>
  );
}
