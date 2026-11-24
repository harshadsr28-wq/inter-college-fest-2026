import React from 'react';
import { ArrowRight, Trophy, Users, Zap, ShieldCheck, Sparkles, Calendar, MapPin } from 'lucide-react';

export default function Hero({ onRegisterClick }) {
  const scrollToEvents = () => {
    const el = document.getElementById('events');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Background Lighting & Grid */}
      <div className="absolute inset-0 bg-fest-radial pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      
      {/* Floating Glowing Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-indigo-600/30 via-purple-600/25 to-pink-500/20 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-blue-500/15 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Fest Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium mb-8 animate-float shadow-lg shadow-indigo-950/50">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="font-semibold text-white">INTER-COLLEGE FEST 2026</span>
          <span className="text-slate-500">•</span>
          <span className="text-indigo-300">National Championship</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black tracking-tight leading-[1.08] text-white max-w-5xl mx-auto">
          Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">Innovation</span> Meets{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">Celebration</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
          Showcase your talent, compete with the best, and create unforgettable memories.
        </p>

        {/* Editable Placeholders for Event Timeline & Campus Venue */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <span>Dates: <strong className="text-slate-200">[TBA / Season 2026]</strong></span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <MapPin className="w-4 h-4 text-purple-400" />
            <span>Venue: <strong className="text-slate-200">[Campus Auditorium & Virtual Arena TBA]</strong></span>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={onRegisterClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-heading font-bold text-base text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <span>Register Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={scrollToEvents}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-heading font-semibold text-base text-slate-200 glass-card hover:bg-slate-800/80 hover:text-white border border-slate-700/60 hover:border-indigo-500/40 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>Explore Events</span>
            <Trophy className="w-4 h-4 text-amber-400" />
          </button>
        </div>

        {/* Key Feature Stats Bar */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-slate-800/80 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex flex-col items-center">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 mb-2 border border-indigo-500/20">
              <Trophy className="w-5 h-5" />
            </div>
            <span className="text-2xl sm:text-3xl font-heading font-black text-white">2 Flagships</span>
            <span className="text-xs text-slate-400 mt-0.5">Hackathon & Quiz</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 mb-2 border border-purple-500/20">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-2xl sm:text-3xl font-heading font-black text-white">Pan-India</span>
            <span className="text-xs text-slate-400 mt-0.5">Colleges & Universities</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 mb-2 border border-cyan-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-2xl sm:text-3xl font-heading font-black text-white">Instant ID</span>
            <span className="text-xs text-slate-400 mt-0.5">Automated n8n Engine</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-400 mb-2 border border-pink-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-2xl sm:text-3xl font-heading font-black text-white">Verified</span>
            <span className="text-xs text-slate-400 mt-0.5">Email Confirmation</span>
          </div>
        </div>

      </div>
    </section>
  );
}

