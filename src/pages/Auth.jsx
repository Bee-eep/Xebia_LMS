import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import HeaderNav from '../components/HeaderNav.jsx';
import Footer from '../components/Footer.jsx';
import BorderGlow from '../components/BorderGlow.jsx';
import Logo from '../components/Logo.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Auth() {
  const [activeTab, setActiveTab] = useState('signin'); // 'signin' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '', confirmPassword: '', agree: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);
  
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAuthForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      if (activeTab === 'signin') {
        setSubmitMessage({ type: 'success', text: 'Welcome back! Redirecting to dashboard...' });
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        if (authForm.password !== authForm.confirmPassword) {
          setSubmitMessage({ type: 'error', text: 'Passwords do not match!' });
          return;
        }
        setSubmitMessage({ type: 'success', text: 'Account registered successfully! Redirecting...' });
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    }, 1200);
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setSubmitMessage(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-blueish-grey dark:bg-[#0F1015] transition-colors duration-250">
      <HeaderNav />

      <main className="flex-1 flex items-center justify-center py-12 px-6 relative overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute right-[-10%] top-[-10%] w-96 h-96 rounded-full bg-bright-velvet/5 blur-3xl pointer-events-none z-0"></div>
        <div className="absolute left-[-10%] bottom-[-10%] w-96 h-96 rounded-full bg-tranquil-velvet/5 blur-3xl pointer-events-none z-0"></div>

        <div className="w-full max-w-md relative z-10">
          <BorderGlow
            edgeSensitivity={15}
            glowColor="304 76 30"
            backgroundColor={theme === 'dark' ? '#16171F' : '#FFFFFF'}
            borderRadius={24}
            glowRadius={60}
            glowIntensity={2.5}
            fillOpacity={0.85}
            coneSpread={28}
            animated={true}
            colors={['#6C1D5F', '#84117C', '#FF6200']}
            className="shadow-2xl"
          >
            <div className="p-8 space-y-6">
              {/* Logo & Header */}
              <div className="text-center space-y-2">
                <div className="flex justify-center mb-2">
                  <Logo className="h-8" />
                </div>
                <p className="text-xs text-dark-grey dark:text-white/60 font-medium">
                  {activeTab === 'signin' ? 'Welcome back! Access your enterprise courses.' : 'Create an account to start your learning path.'}
                </p>
              </div>

              {/* Tab Selector */}
              <div className="flex bg-[#F0F1F5] dark:bg-[#1C1D26] p-1 rounded-xl relative border border-medium-grey/40 dark:border-[#282A3A]/40">
                <button
                  onClick={() => switchTab('signin')}
                  className={`w-1/2 text-center py-2.5 text-xs font-bold transition duration-200 cursor-pointer relative focus:outline-none z-10 ${activeTab === 'signin' ? 'text-white' : 'text-dark-grey dark:text-white/60 hover:text-black dark:hover:text-white'}`}
                >
                  <span className="relative z-20">Sign In</span>
                  {activeTab === 'signin' && (
                    <motion.div
                      layoutId="activeAuthTab"
                      className="absolute inset-0 bg-tranquil-velvet rounded-lg shadow-sm"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                </button>
                <button
                  onClick={() => switchTab('signup')}
                  className={`w-1/2 text-center py-2.5 text-xs font-bold transition duration-200 cursor-pointer relative focus:outline-none z-10 ${activeTab === 'signup' ? 'text-white' : 'text-dark-grey dark:text-white/60 hover:text-black dark:hover:text-white'}`}
                >
                  <span className="relative z-20">Register</span>
                  {activeTab === 'signup' && (
                    <motion.div
                      layoutId="activeAuthTab"
                      className="absolute inset-0 bg-tranquil-velvet rounded-lg shadow-sm"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                </button>
              </div>

              {/* Auth Form */}
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-4"
                  >
                    {activeTab === 'signup' && (
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-dark-grey dark:text-white/60">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-dark-grey/50" />
                          <input
                            type="text"
                            name="name"
                            required
                            value={authForm.name}
                            onChange={handleInputChange}
                            placeholder="Jane Doe"
                            className="w-full pl-10 pr-4 py-2.5 text-xs text-black dark:text-white bg-blueish-grey dark:bg-[#1C1D26] border border-medium-grey dark:border-[#282A3A] rounded-lg focus:outline-none focus:border-tranquil-velvet transition font-medium"
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-dark-grey dark:text-white/60">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-dark-grey/50" />
                        <input
                          type="email"
                          name="email"
                          required
                          value={authForm.email}
                          onChange={handleInputChange}
                          placeholder="jane.doe@company.com"
                          className="w-full pl-10 pr-4 py-2.5 text-xs text-black dark:text-white bg-blueish-grey dark:bg-[#1C1D26] border border-medium-grey dark:border-[#282A3A] rounded-lg focus:outline-none focus:border-tranquil-velvet transition font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-dark-grey dark:text-white/60">Password</label>
                        {activeTab === 'signin' && (
                          <a href="#" className="text-[10px] font-bold text-tranquil-velvet dark:text-[#d38bca] hover:underline">Forgot password?</a>
                        )}
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-dark-grey/50" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          required
                          value={authForm.password}
                          onChange={handleInputChange}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-10 py-2.5 text-xs text-black dark:text-white bg-blueish-grey dark:bg-[#1C1D26] border border-medium-grey dark:border-[#282A3A] rounded-lg focus:outline-none focus:border-tranquil-velvet transition font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-dark-grey hover:text-black dark:hover:text-white cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {activeTab === 'signup' && (
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-dark-grey dark:text-white/60">Confirm Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-dark-grey/50" />
                          <input
                            type="password"
                            name="confirmPassword"
                            required
                            value={authForm.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="••••••••"
                            className="w-full pl-10 pr-4 py-2.5 text-xs text-black dark:text-white bg-blueish-grey dark:bg-[#1C1D26] border border-medium-grey dark:border-[#282A3A] rounded-lg focus:outline-none focus:border-tranquil-velvet transition font-medium"
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Feedback Messages */}
                {submitMessage && (
                  <div className={`p-3 rounded-lg text-xs font-bold border ${submitMessage.type === 'success' ? 'bg-emerald/10 border-emerald/20 text-emerald' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                    {submitMessage.text}
                  </div>
                )}

                {/* Extra Options Checkbox */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="agree"
                    name="agree"
                    checked={authForm.agree}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-tranquil-velvet bg-blueish-grey dark:bg-[#1C1D26] border-medium-grey dark:border-[#282A3A] rounded focus:ring-tranquil-velvet cursor-pointer"
                  />
                  <label htmlFor="agree" className="text-[10px] text-dark-grey dark:text-white/60 select-none cursor-pointer">
                    {activeTab === 'signin' ? 'Keep me signed in on this device' : 'I agree to the Terms of Service & Privacy Policy'}
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-cta-orange hover:bg-[#E05600] disabled:bg-cta-orange/50 text-white text-xs font-bold rounded-xl transition duration-150 flex items-center justify-center gap-2 shadow-md shadow-cta-orange/20 cursor-pointer border border-transparent"
                >
                  {isSubmitting ? (
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>{activeTab === 'signin' ? 'Sign In' : 'Create Account'}</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Social Login Separator */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-medium-grey/40 dark:border-[#282A3A]/40"></div>
                <span className="flex-shrink mx-4 text-[10px] text-dark-grey/65 dark:text-white/40 uppercase tracking-widest font-bold">Or continue with</span>
                <div className="flex-grow border-t border-medium-grey/40 dark:border-[#282A3A]/40"></div>
              </div>

              {/* Social Logins */}
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#F0F1F5] hover:bg-[#E2E4EB] dark:bg-[#1C1D26] dark:hover:bg-[#252733] border border-medium-grey/40 dark:border-[#282A3A]/40 rounded-xl text-xs font-bold text-black dark:text-white transition cursor-pointer">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.28 4.114-3.418 0-6.19-2.772-6.19-6.19s2.772-6.19 6.19-6.19c1.7 0 3.22.68 4.3 1.78l3.1-3.1C19.2 2.23 15.9 1 12.24 1 6.04 1 1 6.04 1 12.24s5.04 11.24 11.24 11.24c6.3 0 11.24-4.5 11.24-11.24 0-.78-.08-1.5-.24-2.18l-11 0z" />
                  </svg>
                  <span>Google</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#F0F1F5] hover:bg-[#E2E4EB] dark:bg-[#1C1D26] dark:hover:bg-[#252733] border border-medium-grey/40 dark:border-[#282A3A]/40 rounded-xl text-xs font-bold text-black dark:text-white transition cursor-pointer">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  <span>GitHub</span>
                </button>
              </div>
            </div>
          </BorderGlow>
        </div>
      </main>

      <Footer />
    </div>
  );
}
