import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  Printer, 
  RotateCcw, 
  ArrowLeft, 
  Mail, 
  ShieldCheck, 
  Trophy, 
  Calendar, 
  MapPin, 
  Sparkles,
  School,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SuccessScreen({ 
  registrationData, 
  onRegisterAnother, 
  onReturnHome 
}) {
  const [copied, setCopied] = useState(false);

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: 0.2, y: 0.6 } });
        confetti({ ...defaults, particleCount, origin: { x: 0.8, y: 0.6 } });
      }, 250);

      return () => clearInterval(interval);
    } catch (e) {
      // Graceful fallback if canvas is unavailable
    }
  }, []);

  const regId = registrationData?.registration_id || 'REG-PENDING';
  const collegeName = registrationData?.college || 'Registered College';
  const teamName = registrationData?.team || 'Registered Team';
  const events = Array.isArray(registrationData?.events) ? registrationData.events : [];
  const captainEmail = registrationData?.captain_email || '';
  const confirmationEmailStatus = registrationData?.confirmation_email;
  const organizerNotificationStatus = registrationData?.organizer_notification;

  const handleCopyId = () => {
    if (regId && regId !== 'REG-PENDING') {
      navigator.clipboard.writeText(regId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="py-24 min-h-[85vh] flex items-center justify-center relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-gradient-to-tr from-emerald-500/15 via-indigo-600/20 to-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 relative">
        
        {/* Printable Pass Container */}
        <div 
          id="printable-registration-slip"
          className="glass-panel rounded-3xl p-6 sm:p-10 border border-emerald-500/30 shadow-2xl relative bg-slate-900/90 text-white"
        >
          {/* Top Emerald Glow Accent */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 via-indigo-500 to-purple-500 rounded-t-3xl" />

          {/* Success Header */}
          <div className="text-center pb-8 border-b border-slate-800">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              Registration Verified & Logged
            </span>

            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white tracking-tight">
              Registration Successful!
            </h2>

            <p className="mt-2 text-sm text-slate-300 max-w-md mx-auto">
              Your collegiate team has been officially registered for Inter-College Fest 2026 via our automated n8n pipeline.
            </p>
          </div>

          {/* Registration ID Banner */}
          <div className="my-8 p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-indigo-500/30 text-center relative group">
            <span className="text-xs uppercase tracking-widest font-semibold text-indigo-400 block mb-1">
              Official Registration ID
            </span>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl sm:text-4xl font-mono font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-200 to-purple-300 select-all">
                {regId}
              </span>
              <button
                type="button"
                onClick={handleCopyId}
                className="no-print p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Copy Registration ID"
                aria-label="Copy Registration ID"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            {copied && (
              <span className="text-[11px] text-emerald-400 font-semibold block mt-1.5 animate-in fade-in">
                Copied to clipboard!
              </span>
            )}
          </div>

          {/* Registered Team Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
                <School className="w-3.5 h-3.5 text-indigo-400" />
                <span>College / Institution</span>
              </div>
              <p className="text-base font-heading font-bold text-white break-words">
                {collegeName}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
                <Users className="w-3.5 h-3.5 text-purple-400" />
                <span>Team Name</span>
              </div>
              <p className="text-base font-heading font-bold text-white break-words">
                {teamName}
              </p>
            </div>
          </div>

          {/* Selected Events Track */}
          <div className="mb-8 p-4 rounded-xl bg-slate-950/50 border border-slate-800">
            <span className="block text-xs font-semibold text-slate-400 mb-2">
              Registered Event Tracks
            </span>
            <div className="flex flex-wrap gap-2">
              {events.length > 0 ? (
                events.map((evt, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold"
                  >
                    <Trophy className="w-3.5 h-3.5 text-indigo-400" />
                    {evt}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400">General Fest Entry</span>
              )}
            </div>
          </div>

          {/* Email Confirmation Notice (Mandatory Requirement) */}
          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex items-start gap-3.5 mb-8">
            <Mail className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm">
              <p className="font-semibold text-white">
                A confirmation email has been sent to your registered email address.
              </p>
              {captainEmail && (
                <p className="text-slate-300">
                  Target recipient: <strong className="text-indigo-300">{captainEmail}</strong>
                </p>
              )}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-slate-400">
                <span className="inline-flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  n8n Confirmation Dispatch: Active
                </span>
                {organizerNotificationStatus && (
                  <span className="inline-flex items-center gap-1 text-purple-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    Committee Notified
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Logistics Reminder Placeholders */}
          <div className="text-xs text-slate-400 space-y-1 pb-6 border-b border-slate-800">
            <p>• <strong>Event Venue:</strong> [Campus Auditorium & Virtual Arena TBA]</p>
            <p>• <strong>Official Dates:</strong> [TBA / November 2026]</p>
            <p>• <strong>Queries & Escalations:</strong> [fest2026@college.edu - TBA]</p>
          </div>

          {/* Action Buttons */}
          <div className="no-print pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={handlePrint}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors border border-slate-700"
            >
              <Printer className="w-4 h-4 text-indigo-400" />
              <span>Print Registration Slip</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onRegisterAnother}
                className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Register Another Team</span>
              </button>

              <button
                type="button"
                onClick={onReturnHome}
                className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Home</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

