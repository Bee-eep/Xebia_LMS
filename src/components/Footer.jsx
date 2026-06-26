import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-medium-grey py-12 px-8 md:px-16 text-dark-grey text-xs mt-auto w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Logo className="h-6" />
          <p className="leading-relaxed text-dark-grey/80">
            Global authorities in software design, cloud native architectures, Agile, and product innovation.
          </p>
        </div>
        <div className="space-y-3">
          <h4 className="font-bold text-black font-semibold">General Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-tranquil-velvet cursor-pointer text-left block">Home Page</Link></li>
            <li><Link to="/#faq" className="hover:text-tranquil-velvet cursor-pointer text-left block">FAQ Help</Link></li>
            <li><Link to="/#contact" className="hover:text-tranquil-velvet cursor-pointer text-left block">Contact Information</Link></li>
          </ul>
        </div>
        <div className="space-y-3">
          <h4 className="font-bold text-black font-semibold">Company</h4>
          <ul className="space-y-2">
            <li><a href="https://xebia.com" target="_blank" rel="noopener noreferrer" className="hover:text-tranquil-velvet">About Xebia</a></li>
            <li><a href="#" className="hover:text-tranquil-velvet">Client Cases</a></li>
            <li><a href="#" className="hover:text-tranquil-velvet">Contact Support</a></li>
          </ul>
        </div>
        <div className="space-y-3">
          <h4 className="font-bold text-black font-semibold">Stay Updated</h4>
          <p className="leading-relaxed text-dark-grey/90">Subscribe to receive curriculum releases and event dates.</p>
          <form className="flex gap-2 animate-none" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter email"
              className="px-3 py-2 bg-blueish-grey border border-medium-grey text-xs text-black rounded-lg focus:outline-none w-full"
            />
            <button className="px-3 py-2 bg-tranquil-velvet hover:bg-bright-velvet text-white font-bold rounded-lg transition cursor-pointer shrink-0">
              OK
            </button>
          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-medium-grey/40 mt-8 pt-6 text-center text-dark-grey/60">
        <p>© {new Date().getFullYear()} Xebia Academy. All rights reserved. Powered by Vite + React + Tailwind CSS.</p>
      </div>
    </footer>
  );
}
