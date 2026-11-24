import React from 'react';
import { User, Mail, Phone, Crown, AlertCircle } from 'lucide-react';

/**
 * ParticipantFields Component
 * Dynamically renders participant input fields based on the chosen member count.
 * First participant is designated as the Team Captain.
 */
export default function ParticipantFields({
  participants,
  onParticipantChange,
  errors = {},
  disabled = false
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
            <span>Participant Roster</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-semibold">
              {participants.length} {participants.length === 1 ? 'Member' : 'Members'}
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Participant #1 is the Team Captain. Enter details for each squad member.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {participants.map((participant, index) => {
          const isCaptain = index === 0;
          const memberLabel = isCaptain ? 'Participant 1 (Team Captain)' : `Participant ${index + 1}`;
          
          const nameError = errors[`participant_${index}_name`];
          const emailError = errors[`participant_${index}_email`];
          const phoneError = errors[`participant_${index}_phone`];

          return (
            <div
              key={index}
              className={`p-5 sm:p-6 rounded-2xl border transition-all duration-200 ${
                isCaptain
                  ? 'bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-900/40 border-indigo-500/30 shadow-lg shadow-indigo-950/30'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Member Card Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isCaptain
                        ? 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/30'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <h4 className="text-sm font-heading font-bold text-white flex items-center gap-2">
                    {memberLabel}
                    {isCaptain && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                        <Crown className="w-3 h-3 text-amber-400" />
                        Primary Contact
                      </span>
                    )}
                  </h4>
                </div>

                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
                  {isCaptain ? 'Lead Representative' : 'Squad Member'}
                </span>
              </div>

              {/* Input Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Participant Name */}
                <div>
                  <label
                    htmlFor={`participant-${index}-name`}
                    className="block text-xs font-semibold text-slate-300 mb-1.5"
                  >
                    Full Name <span className="text-pink-400" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id={`participant-${index}-name`}
                      name={`participant_${index}_name`}
                      value={participant.name}
                      onChange={(e) => onParticipantChange(index, 'name', e.target.value)}
                      disabled={disabled}
                      placeholder={isCaptain ? "e.g., Alex Johnson" : "e.g., Sam Patel"}
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={nameError ? 'true' : 'false'}
                      aria-describedby={nameError ? `err-part-${index}-name` : undefined}
                      className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950/80 text-sm text-white placeholder-slate-400 border transition-all duration-200 focus:outline-none focus:ring-2 ${
                        nameError
                          ? 'border-pink-500/80 focus:ring-pink-500/40 bg-pink-950/10'
                          : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
                      }`}
                    />
                  </div>
                  {nameError && (
                    <p id={`err-part-${index}-name`} className="mt-1.5 text-xs text-pink-400 flex items-center gap-1" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{nameError}</span>
                    </p>
                  )}
                </div>

                {/* Participant Email */}
                <div>
                  <label
                    htmlFor={`participant-${index}-email`}
                    className="block text-xs font-semibold text-slate-300 mb-1.5"
                  >
                    Email Address <span className="text-pink-400" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      id={`participant-${index}-email`}
                      name={`participant_${index}_email`}
                      value={participant.email}
                      onChange={(e) => onParticipantChange(index, 'email', e.target.value)}
                      disabled={disabled}
                      placeholder={isCaptain ? "captain@college.edu" : "member@college.edu"}
                      autoComplete="email"
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck="false"
                      aria-required="true"
                      aria-invalid={emailError ? 'true' : 'false'}
                      aria-describedby={emailError ? `err-part-${index}-email` : undefined}
                      className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950/80 text-sm text-white placeholder-slate-400 border transition-all duration-200 focus:outline-none focus:ring-2 ${
                        emailError
                          ? 'border-pink-500/80 focus:ring-pink-500/40 bg-pink-950/10'
                          : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
                      }`}
                    />
                  </div>
                  {emailError && (
                    <p id={`err-part-${index}-email`} className="mt-1.5 text-xs text-pink-400 flex items-center gap-1" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{emailError}</span>
                    </p>
                  )}
                </div>

                {/* Participant Phone */}
                <div>
                  <label
                    htmlFor={`participant-${index}-phone`}
                    className="block text-xs font-semibold text-slate-300 mb-1.5"
                  >
                    Phone Number <span className="text-pink-400" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      id={`participant-${index}-phone`}
                      name={`participant_${index}_phone`}
                      value={participant.phone}
                      onChange={(e) => onParticipantChange(index, 'phone', e.target.value)}
                      disabled={disabled}
                      placeholder="e.g., 9876543210"
                      autoComplete="tel"
                      inputMode="numeric"
                      aria-required="true"
                      aria-invalid={phoneError ? 'true' : 'false'}
                      aria-describedby={phoneError ? `err-part-${index}-phone` : undefined}
                      className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950/80 text-sm text-white placeholder-slate-400 border transition-all duration-200 focus:outline-none focus:ring-2 ${
                        phoneError
                          ? 'border-pink-500/80 focus:ring-pink-500/40 bg-pink-950/10'
                          : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
                      }`}
                    />
                  </div>
                  {phoneError && (
                    <p id={`err-part-${index}-phone`} className="mt-1.5 text-xs text-pink-400 flex items-center gap-1" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{phoneError}</span>
                    </p>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

