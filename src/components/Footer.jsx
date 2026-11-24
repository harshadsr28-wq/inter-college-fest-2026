import React from 'react';
import { Sparkles, Mail, MapPin, Phone, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ onRegisterClick }) {
  const currentYear = 2026;

  return (
    <footer className="relative bg-[#05070c] border-t border-indigo-500/20 pt-16 pb-12 overflow-hidden text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Fest Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5">
                <div className="w-full h-full bg-[#080c14] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
              <span className="text-xl font-heading font-black tracking-wider text-white">
                INTER-COLLEGE FEST 2026
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              The premier national collegiate festival celebrating student innovation, intellectual curiosity, 
              and technical excellence. Hosted in collaboration with student tech communities and academic chapters.
            </p>

            <div className="inline-flex items-center gap-2 text-xs text-indigo-300 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Official Automated n8n Registration Pipeline</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About Fest</a>
              </li>
              <li>
                <a href="#events" className="hover:text-white transition-colors">Flagship Events</a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">Registration Process</a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onRegisterClick}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
                >
                  Register Team →
                </button>
              </li>
            </ul>
          </div>

          {/* Fest Organizing Committee & Secretariat Placeholders */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Fest Organizing Committee
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>[Campus Secretariat & Arena - Venue TBA]</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>[fest2026@college.edu - Contact TBA]</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>[Student Convener Helpline - TBA]</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500">
            © {currentYear} Inter-College Fest Organizing Committee. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Production n8n Webhook Enabled</span>
            <span>•</span>
            <span className="text-indigo-400">National Collegiate League</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

