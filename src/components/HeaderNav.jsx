import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Sun, Moon } from 'lucide-react';
import Logo from './Logo.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

export default function HeaderNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (currentPath !== '/') return;

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // trigger highlight when section enters upper-middle viewport
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      const intersectingEntry = entries.find(entry => entry.isIntersecting);
      if (intersectingEntry) {
        setActiveSection(intersectingEntry.target.id);
      }
    }, observerOptions);

    const faqElement = document.getElementById('faq');
    const contactElement = document.getElementById('contact');
    const heroElement = document.getElementById('hero');

    if (faqElement) observer.observe(faqElement);
    if (contactElement) observer.observe(contactElement);
    if (heroElement) observer.observe(heroElement);

    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPath]);

  const handleScroll = (id) => {
    if (currentPath === '/') {
      if (id === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('home');
      } else {
        const event = new CustomEvent('app-scroll-to', { detail: id });
        window.dispatchEvent(event);
        setActiveSection(id);
      }
    }
  };

  return (
    <header className="h-20 bg-white/95 border-b border-medium-grey backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-8 md:px-16 shadow-sm">
      <Link to="/" onClick={() => handleScroll('top')} className="flex items-center gap-3 cursor-pointer select-none">
        <Logo className="h-8" />
      </Link>

      <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-dark-grey">
        <Link 
          to="/" 
          onClick={() => handleScroll('top')}
          className={`transition cursor-pointer ${currentPath === '/' && activeSection === 'home' ? 'text-tranquil-velvet font-bold border-b-2 border-tranquil-velvet py-1' : 'hover:text-tranquil-velvet'}`}
        >
          Home
        </Link>
        <Link 
          to="/#faq" 
          onClick={() => handleScroll('faq')}
          className={`transition cursor-pointer ${currentPath === '/' && activeSection === 'faq' ? 'text-tranquil-velvet font-bold border-b-2 border-tranquil-velvet py-1' : 'hover:text-tranquil-velvet'}`}
        >
          FAQ
        </Link>
        <Link 
          to="/#contact" 
          onClick={() => handleScroll('contact')}
          className={`transition cursor-pointer ${currentPath === '/' && activeSection === 'contact' ? 'text-tranquil-velvet font-bold border-b-2 border-tranquil-velvet py-1' : 'hover:text-tranquil-velvet'}`}
        >
          Contact Us
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl border border-medium-grey hover:bg-light-grey/25 dark:hover:bg-bg-light-grey transition text-dark-grey hover:text-black dark:hover:text-white cursor-pointer flex items-center justify-center"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400 fill-amber-400" /> : <Moon className="h-4 w-4" />}
        </button>

        <Link 
          to="/#hero-auth-form"
          onClick={() => handleScroll('hero-auth-form')}
          className="px-4 py-2.5 text-xs font-bold text-dark-grey hover:text-black dark:text-white/80 dark:hover:text-white transition duration-200 cursor-pointer"
        >
          Login
        </Link>

        <Link 
          to="/dashboard"
          className="px-5 py-2.5 bg-cta-orange hover:bg-[#E05600] text-white text-xs font-bold rounded-xl transition duration-200 shadow-md shadow-cta-orange/20 flex items-center gap-1.5 cursor-pointer text-center"
        >
          <span>Enter LMS</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </header>
  );
}
