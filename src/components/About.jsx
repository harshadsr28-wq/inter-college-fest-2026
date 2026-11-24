import React from 'react';
import { Target, Lightbulb, Award, Network, Rocket, Users, Calendar, MapPin, Mail, Phone } from 'lucide-react';

export default function About() {
  const pillars = [
    {
      icon: Lightbulb,
      title: 'Technological Innovation',
      desc: 'Tackle cutting-edge challenges in artificial intelligence, cloud architecture, and real-world system design.',
      color: 'from-cyan-500/20 to-blue-500/10',
      border: 'border-cyan-500/30',
      text: 'text-cyan-400'
    },
    {
      icon: Target,
      title: 'Competitive Spirit',
      desc: 'Benchmark your intellect and speed against the brightest student minds across premier colleges and universities.',
      color: 'from-purple-500/20 to-indigo-500/10',
      border: 'border-purple-500/30',
      text: 'text-purple-400'
    },
    {
      icon: Network,
      title: 'Cross-College Networking',
      desc: 'Forge lasting connections with peer developers, creators, tech enthusiasts, and academic leaders nationwide.',
      color: 'from-pink-500/20 to-rose-500/10',
      border: 'border-pink-500/30',
      text: 'text-pink-400'
    },
    {
      icon: Award,
      title: 'Accreditation & Honors',
      desc: 'Earn prestigious accolades, national recognition, and verified participation certificates for all registered teams.',
      color: 'from-amber-500/20 to-orange-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-400'
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Rocket className="w-3.5 h-3.5" />
            About The Fest
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            A Stage Built for Tomorrow's Leaders
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Inter-College Fest 2026 brings together the most ambitious students, coders, thinkers, and problem solvers 
            for an exhilarating multi-day showcase of academic rigor, technical creativity, and collegiate pride.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 relative group overflow-hidden flex flex-col justify-between"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} ${item.border} border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${item.text}`} />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Placeholders Card for Official Logistics */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-indigo-500/20 bg-slate-900/40">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-indigo-400 block mb-1">
                Official Logistics & Notice Board
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                Fest Schedule & Campus Information
              </h3>
              <p className="text-sm text-slate-400 mt-1 max-w-2xl">
                Official schedules, rulebooks, and venue coordinates are finalized and communicated by the fest committee.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full md:w-auto text-xs sm:text-sm">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
                <div>
                  <span className="block text-slate-400 text-[11px]">Fest Schedule</span>
                  <span className="font-semibold text-slate-200">[Dates: TBA / November 2026]</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                <div>
                  <span className="block text-slate-400 text-[11px]">Primary Venue</span>
                  <span className="font-semibold text-slate-200">[Campus Auditorium & Virtual Portal]</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <span className="block text-slate-400 text-[11px]">Official Helpdesk</span>
                  <span className="font-semibold text-slate-200">[fest2026@college.edu - TBA]</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <Phone className="w-4 h-4 text-pink-400 shrink-0" />
                <div>
                  <span className="block text-slate-400 text-[11px]">Secretariat Contact</span>
                  <span className="font-semibold text-slate-200">[+91-XXXXXXXXXX - TBA]</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

