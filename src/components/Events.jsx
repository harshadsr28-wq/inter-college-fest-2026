import React from 'react';
import { Code, HelpCircle, CheckCircle2, Users, Clock, Award, ArrowRight, Sparkles } from 'lucide-react';

export default function Events({ onSelectEvent }) {
  const eventList = [
    {
      id: 'Hackathon',
      title: 'CodeQuest Hackathon 2026',
      badge: 'Flagship Coding Event',
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      description: 'An intensive endurance sprint where teams ideate, architect, and ship high-impact digital solutions to real-world industrial and civic problems.',
      teamSize: '2 to 5 Members',
      duration: '24-36 Hours',
      level: 'National Inter-College',
      highlights: [
        'Themes: AI/ML, Web3, FinTech, Green Tech & Open Track',
        'Direct mentoring from industry technical architects',
        'Prototype evaluation on code quality, innovation & impact',
        'Official certificates of achievement & finalist perks'
      ],
      icon: Code,
      accentGradient: 'from-indigo-600 via-purple-600 to-pink-600',
      cardBorder: 'hover:border-indigo-500/50',
      btnText: 'Register for Hackathon'
    },
    {
      id: 'Quiz',
      title: 'TechnoQ Tech & General Quiz',
      badge: 'Premier Intellectual Clash',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      description: 'The ultimate battle of wits and speed. Test your depth across contemporary science, computing history, technology frontiers, business, and pop trivia.',
      teamSize: '1 to 4 Members',
      duration: 'Prelims + Grand Finals',
      level: 'All College Streams',
      highlights: [
        'Written preliminary round with high-speed buzzer buzzer finals',
        'Questions curated by renowned collegiate quizmasters',
        'Rounds: Visual Connect, Rapid Fire, Audio-Visual & Tech Trivia',
        'Instant audience interaction & finalist honors'
      ],
      icon: HelpCircle,
      accentGradient: 'from-purple-600 via-pink-600 to-amber-500',
      cardBorder: 'hover:border-purple-500/50',
      btnText: 'Register for Quiz'
    }
  ];

  return (
    <section id="events" className="py-24 relative overflow-hidden bg-slate-950/40">
      {/* Background accents */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Competitive Tracks
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            Flagship Events 2026
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Select one or both competitive tracks. Teams may register for multiple events under a single unified registration pass.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {eventList.map((evt) => {
            const Icon = evt.icon;
            return (
              <div
                key={evt.id}
                className={`glass-panel rounded-3xl p-8 sm:p-10 border border-slate-800 transition-all duration-300 ${evt.cardBorder} flex flex-col justify-between group shadow-xl shadow-black/40 relative overflow-hidden`}
              >
                {/* Subtle top gradient bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${evt.accentGradient}`} />

                <div>
                  {/* Badge & Icon Header */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${evt.badgeColor}`}>
                      {evt.badge}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-indigo-400 group-hover:text-purple-300 transition-colors" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl sm:text-3xl font-heading font-black text-white mb-3">
                    {evt.title}
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                    {evt.description}
                  </p>

                  {/* Metadata Chips */}
                  <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                      <Users className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>Team: <strong className="text-white font-semibold">{evt.teamSize}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                      <Clock className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>Duration: <strong className="text-white font-semibold">{evt.duration}</strong></span>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="space-y-2.5 mb-8">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Track Highlights
                    </h4>
                    {evt.highlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Event Register Action */}
                <button
                  type="button"
                  onClick={() => onSelectEvent(evt.id)}
                  className={`w-full py-3.5 px-6 rounded-xl font-heading font-bold text-sm text-white bg-gradient-to-r ${evt.accentGradient} hover:opacity-95 shadow-lg shadow-indigo-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2`}
                >
                  <span>{evt.btnText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Both Events Prompt */}
        <div className="text-center p-6 rounded-2xl glass-panel border border-indigo-500/20 max-w-2xl mx-auto">
          <p className="text-sm text-slate-300">
            Want to compete in <strong className="text-white">both Hackathon and Quiz</strong>? 
            Select both in the registration form below with no duplicate paperwork!
          </p>
        </div>

      </div>
    </section>
  );
}

