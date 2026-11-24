import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Award, ArrowRight } from 'lucide-react';

export default function Navbar({ onRegisterClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Events', href: '#events' },
    { name: 'Process', href: '#process' },
    { name: 'Register', href: '#register', isSpecial: true },
  ];

  const handleNavClick = (e, href, isSpecial) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (isSpecial && onRegisterClick) {
      onRegisterClick();
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080c14]/90 backdrop-blur-xl border-b border-indigo-500/20 py-3 shadow-xl shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Fest Name */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-3 group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300">
              <div className="w-full h-full bg-[#080c14] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400 group-hover:text-purple-300 transition-colors" />
              </div>
            </div>
            <div>
              <span className="block text-lg sm:text-xl font-heading font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-200">
                INTER-COLLEGE FEST
              </span>
              <span className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase font-semibold text-indigo-400">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                2026 Edition • National Level
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.slice(0, 4).map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}

            <button
              type="button"
              onClick={(e) => handleNavClick(e, '#register', true)}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-xl group bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-200 bg-[#080c14]/80 rounded-[10px] group-hover:bg-transparent flex items-center gap-2 font-semibold text-white">
                Register Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-indigo-500/20 px-6 py-5 mt-3 space-y-3 animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href, link.isSpecial)}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                link.isSpecial
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-center mt-2 shadow-lg shadow-indigo-500/30'
                  : 'text-slate-200 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

