import React from 'react';
import logoImg from '../assets/logo.png';

export default function Logo({ className = "h-8" }) {
  return (
    <div className="bg-[#FFFFFF] p-1 rounded-lg flex items-center justify-center">
      <img src={logoImg} className={`${className} w-auto object-contain`} alt="Xebia Logo" />
    </div>
  );
}
