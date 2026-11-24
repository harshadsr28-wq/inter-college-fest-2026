import React from 'react';
import { School, UserCheck, CheckSquare, Zap, ArrowRight } from 'lucide-react';

export default function RegistrationProcess({ onRegisterClick }) {
  const steps = [
    {
      step: '01',
      title: 'College & Team Details',
      desc: 'Provide your institution name, recognized college code, and your official team identifier.',
      icon: School,
      badge: 'Institution Profile'
    },
    {
      step: '02',
      title: 'Captain & Participants',
      desc: 'Designate your team captain as primary contact, then dynamically add additional squad members.',
      icon: UserCheck,
      badge: 'Squad Roster'
    },
    {
      step: '03',
      title: 'Select Track Events',
      desc: 'Select Hackathon, Quiz, or both tracks. Ensure squad meets track size guidelines.',
      icon: CheckSquare,
      badge: 'Event Choice'
    },
    {
      step: '04',
      title: 'Instant n8n Pass',
      desc: 'Submit securely to our production n8n webhook and receive your verified Registration ID in seconds.',
      icon: Zap,
      badge: 'Instant Automated ID'
    }
  ];

  return (
    <section id="process" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            Seamless Registration Flow
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            How Registration Works
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Four simple steps to confirm your spot in Inter-College Fest 2026.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                      {item.step}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400">
                      {item.badge}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-heading font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to start form */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onRegisterClick}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-indigo-500/30 hover:border-indigo-500/60 text-white font-semibold text-sm hover:bg-indigo-950/40 transition-all duration-200"
          >
            <span>Proceed to Team Registration</span>
            <ArrowRight className="w-4 h-4 text-indigo-400" />
          </button>
        </div>

      </div>
    </section>
  );
}

