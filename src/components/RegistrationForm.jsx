import React, { useState, useEffect, useRef } from 'react';
import { 
  School, 
  Users, 
  Crown, 
  CheckSquare, 
  Sparkles, 
  Send, 
  RotateCcw, 
  AlertCircle, 
  CheckCircle2, 
  Loader2,
  HelpCircle,
  Hash,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import ParticipantFields from './ParticipantFields';
import { submitRegistration, getWebhookUrl } from '../services/n8nService';

const AVAILABLE_EVENTS = [
  {
    id: 'Hackathon',
    name: 'CodeQuest Hackathon 2026',
    tag: 'Technical Track',
    desc: '24-36h Coding & Product Innovation Sprint',
    minMembers: 2
  },
  {
    id: 'Quiz',
    name: 'TechnoQ Tech & General Quiz',
    tag: 'Intellectual Track',
    desc: 'Science, Tech & Trivia Championship',
    minMembers: 1
  }
];

const INITIAL_FORM_STATE = {
  college_name: '',
  college_code: '',
  team_name: '',
  member_count: 2,
  captain_name: '',
  captain_email: '',
  captain_phone: '',
  participants: [
    { name: '', email: '', phone: '' },
    { name: '', email: '', phone: '' }
  ],
  events: ['Hackathon']
};

export default function RegistrationForm({ 
  onRegistrationSuccess, 
  preSelectedEvent = null 
}) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const formRef = useRef(null);

  // If parent passes a pre-selected event (from Hero or Events section click)
  useEffect(() => {
    if (preSelectedEvent) {
      setFormData(prev => ({
        ...prev,
        events: Array.from(new Set([...prev.events, preSelectedEvent]))
      }));
    }
  }, [preSelectedEvent]);

  // Handle member count change (between 1 and 5)
  const handleMemberCountChange = (count) => {
    const num = Math.max(1, Math.min(5, parseInt(count, 10) || 1));
    setFormData(prev => {
      let updatedParticipants = [...prev.participants];

      if (num > updatedParticipants.length) {
        // Add additional blank participants
        const toAdd = num - updatedParticipants.length;
        for (let i = 0; i < toAdd; i++) {
          updatedParticipants.push({ name: '', email: '', phone: '' });
        }
      } else if (num < updatedParticipants.length) {
        // Truncate participants array
        updatedParticipants = updatedParticipants.slice(0, num);
      }

      return {
        ...prev,
        member_count: num,
        participants: updatedParticipants
      };
    });

    // Clear count-related errors
    if (errors.member_count) {
      setErrors(prev => {
        const { member_count, ...rest } = prev;
        return rest;
      });
    }
  };

  // Synchronize captain details with participants[0]
  const handleCaptainChange = (field, value) => {
    setFormData(prev => {
      const updatedParticipants = [...prev.participants];
      if (updatedParticipants.length === 0) {
        updatedParticipants.push({ name: '', email: '', phone: '' });
      }

      // Sync participant 0 fields
      if (field === 'captain_name') {
        updatedParticipants[0] = { ...updatedParticipants[0], name: value };
      } else if (field === 'captain_email') {
        updatedParticipants[0] = { ...updatedParticipants[0], email: value };
      } else if (field === 'captain_phone') {
        updatedParticipants[0] = { ...updatedParticipants[0], phone: value };
      }

      return {
        ...prev,
        [field]: value,
        participants: updatedParticipants
      };
    });

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[field];
        if (field === 'captain_name') delete copy['participant_0_name'];
        if (field === 'captain_email') delete copy['participant_0_email'];
        if (field === 'captain_phone') delete copy['participant_0_phone'];
        return copy;
      });
    }
  };

  // Handle participant change from ParticipantFields component
  const handleParticipantChange = (index, field, value) => {
    setFormData(prev => {
      const updatedParticipants = [...prev.participants];
      updatedParticipants[index] = {
        ...updatedParticipants[index],
        [field]: value
      };

      // If updating participant 0, keep captain state aligned
      let updatedCaptain = {};
      if (index === 0) {
        if (field === 'name') updatedCaptain.captain_name = value;
        if (field === 'email') updatedCaptain.captain_email = value;
        if (field === 'phone') updatedCaptain.captain_phone = value;
      }

      return {
        ...prev,
        ...updatedCaptain,
        participants: updatedParticipants
      };
    });

    // Clear error for this participant field
    const errorKey = `participant_${index}_${field}`;
    if (errors[errorKey]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[errorKey];
        if (index === 0) {
          if (field === 'name') delete copy['captain_name'];
          if (field === 'email') delete copy['captain_email'];
          if (field === 'phone') delete copy['captain_phone'];
        }
        return copy;
      });
    }
  };

  // Handle Event checkbox toggle
  const handleEventToggle = (eventId) => {
    setFormData(prev => {
      const exists = prev.events.includes(eventId);
      const updatedEvents = exists
        ? prev.events.filter(e => e !== eventId)
        : [...prev.events, eventId];

      return {
        ...prev,
        events: updatedEvents
      };
    });

    if (errors.events) {
      setErrors(prev => {
        const { events, ...rest } = prev;
        return rest;
      });
    }
  };

  // Generic input change handler
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  // Frontend Validation according to strict rules
  const validateForm = () => {
    const errs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9]{10,15}$/;

    // 1. College Details
    if (!formData.college_name.trim()) {
      errs.college_name = 'College name is required.';
    }
    if (!formData.college_code.trim()) {
      errs.college_code = 'College code is required (e.g., COL01).';
    }

    // 2. Team Details
    if (!formData.team_name.trim()) {
      errs.team_name = 'Team name is required.';
    }
    if (!formData.member_count || formData.member_count < 1 || formData.member_count > 5) {
      errs.member_count = 'Member count must be between 1 and 5.';
    }

    // 3. Captain Details
    if (!formData.captain_name.trim()) {
      errs.captain_name = 'Captain name is required.';
      errs.participant_0_name = 'Captain name is required.';
    }
    if (!formData.captain_email.trim()) {
      errs.captain_email = 'Captain email is required.';
      errs.participant_0_email = 'Captain email is required.';
    } else if (!emailRegex.test(formData.captain_email.trim())) {
      errs.captain_email = 'Please enter a valid email address.';
      errs.participant_0_email = 'Please enter a valid email address.';
    }

    if (!formData.captain_phone.trim()) {
      errs.captain_phone = 'Captain phone number is required.';
      errs.participant_0_phone = 'Captain phone number is required.';
    } else if (!phoneRegex.test(formData.captain_phone.trim().replace(/[\s-]/g, ''))) {
      errs.captain_phone = 'Phone number must contain at least 10 valid digits.';
      errs.participant_0_phone = 'Phone number must contain at least 10 valid digits.';
    }

    // 4. Participant Details
    if (formData.participants.length !== formData.member_count) {
      errs.member_count = `Participant records (${formData.participants.length}) must match member count (${formData.member_count}).`;
    }

    formData.participants.forEach((p, idx) => {
      // For participant 0, errors are already handled by captain validation
      if (idx > 0) {
        if (!p.name.trim()) {
          errs[`participant_${idx}_name`] = `Participant ${idx + 1} name is required.`;
        }
        if (!p.email.trim()) {
          errs[`participant_${idx}_email`] = `Participant ${idx + 1} email is required.`;
        } else if (!emailRegex.test(p.email.trim())) {
          errs[`participant_${idx}_email`] = 'Please enter a valid email address.';
        }
        if (!p.phone.trim()) {
          errs[`participant_${idx}_phone`] = `Participant ${idx + 1} phone is required.`;
        } else if (!phoneRegex.test(p.phone.trim().replace(/[\s-]/g, ''))) {
          errs[`participant_${idx}_phone`] = 'Phone number must contain at least 10 valid digits.';
        }
      }
    });

    // 5. Events Selection
    if (!formData.events || formData.events.length === 0) {
      errs.events = 'Please select at least one event (Hackathon or Quiz).';
    }

    return errs;
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      // Smooth scroll to the first invalid field
      const firstErrorKey = Object.keys(validationErrors)[0];
      const targetElement = 
        document.querySelector(`[name="${firstErrorKey}"]`) || 
        document.getElementById(firstErrorKey);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetElement.focus();
      }
      return;
    }

    // Submit to production n8n webhook
    setIsSubmitting(true);
    try {
      const result = await submitRegistration(formData);

      if (result.success) {
        // Success callback: transition to SuccessScreen
        onRegistrationSuccess(result.data);
      } else {
        // Failed response from n8n or network
        setApiError({
          message: result.message || 'Registration request could not be processed.',
          isDuplicate: result.isDuplicate,
          raw: result.raw
        });

        // Scroll to the error alert
        const alertEl = document.getElementById('registration-error-alert');
        if (alertEl) {
          alertEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    } catch (err) {
      setApiError({
        message: 'An unexpected application error occurred. Please try again.',
        isDuplicate: false
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clear & Reset Form
  const handleResetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setApiError(null);
    setIsResetConfirmOpen(false);
  };

  // Calculate form completion percentage for visual progress indicator
  const calculateProgress = () => {
    let completedSteps = 0;
    const totalSteps = 5;

    if (formData.college_name.trim() && formData.college_code.trim()) completedSteps++;
    if (formData.team_name.trim() && formData.member_count >= 1) completedSteps++;
    if (formData.captain_name.trim() && formData.captain_email.trim() && formData.captain_phone.trim()) completedSteps++;
    
    // Participants check
    const participantsFilled = formData.participants.every(p => p.name.trim() && p.email.trim() && p.phone.trim());
    if (participantsFilled && formData.participants.length === formData.member_count) completedSteps++;

    if (formData.events.length > 0) completedSteps++;

    return Math.round((completedSteps / totalSteps) * 100);
  };

  const progressPercent = calculateProgress();

  return (
    <section id="register" className="py-20 relative overflow-hidden" ref={formRef}>
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Form Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Official Portal
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            Team Registration
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Fill in your college, team, and participant details. All registrations are verified in real time through our official n8n automation pipeline.
          </p>
        </div>

        {/* Form Card Container */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-indigo-500/20 shadow-2xl relative">
          
          {/* Progress Tracker Bar */}
          <div className="mb-8 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-slate-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Form Completion Progress
              </span>
              <span className="text-indigo-400 font-mono font-bold">
                {progressPercent}% Complete
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
                role="progressbar"
                aria-valuenow={progressPercent}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </div>

          {/* n8n Live Error Notification Banner */}
          {apiError && (
            <div 
              id="registration-error-alert"
              className={`mb-8 p-5 rounded-2xl border flex items-start gap-3.5 animate-in fade-in duration-300 ${
                apiError.isDuplicate
                  ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                  : 'bg-pink-950/40 border-pink-500/40 text-pink-200'
              }`}
              role="alert"
            >
              <div className="p-2 rounded-xl bg-slate-900/80 shrink-0 mt-0.5">
                {apiError.isDuplicate ? (
                  <ShieldAlert className="w-5 h-5 text-amber-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-pink-400" />
                )}
              </div>
              <div className="space-y-1 text-sm flex-1">
                <h4 className="font-heading font-bold text-white text-base">
                  {apiError.isDuplicate ? 'Duplicate Registration Detected' : 'Registration Error'}
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {apiError.message}
                </p>
                {apiError.isDuplicate && (
                  <p className="text-xs text-amber-300/90 pt-1">
                    Tip: If your team has already registered, check the captain's inbox for your registration confirmation. If you need to make changes, please contact the fest organizers.
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setApiError(null)}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-900/40 hover:bg-slate-800"
              >
                Dismiss
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-10">

            {/* ========================================================= */}
            {/* 1. COLLEGE DETAILS */}
            {/* ========================================================= */}
            <fieldset className="space-y-4">
              <legend className="text-base sm:text-lg font-heading font-bold text-white flex items-center gap-2.5 pb-2 border-b border-slate-800 w-full">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <School className="w-4 h-4" />
                </div>
                <span>1. College Details</span>
              </legend>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                
                {/* College Name */}
                <div className="md:col-span-2">
                  <label htmlFor="college_name" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    College / Institution Name <span className="text-pink-400" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="college_name"
                    name="college_name"
                    value={formData.college_name}
                    onChange={(e) => handleInputChange('college_name', e.target.value)}
                    disabled={isSubmitting}
                    placeholder="e.g., National Institute of Technology, Trichy"
                    autoComplete="organization"
                    aria-required="true"
                    aria-invalid={errors.college_name ? 'true' : 'false'}
                    aria-describedby={errors.college_name ? 'err-college-name' : undefined}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 text-sm text-white placeholder-slate-400 border transition-all duration-200 focus:outline-none focus:ring-2 ${
                      errors.college_name
                        ? 'border-pink-500/80 focus:ring-pink-500/40 bg-pink-950/10'
                        : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
                    }`}
                  />
                  {errors.college_name && (
                    <p id="err-college-name" className="mt-1.5 text-xs text-pink-400 flex items-center gap-1" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.college_name}</span>
                    </p>
                  )}
                </div>

                {/* College Code */}
                <div>
                  <label htmlFor="college_code" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    College Code <span className="text-pink-400" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Hash className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="college_code"
                      name="college_code"
                      value={formData.college_code}
                      onChange={(e) => handleInputChange('college_code', e.target.value.toUpperCase())}
                      disabled={isSubmitting}
                      placeholder="e.g., COL01"
                      autoCapitalize="characters"
                      autoCorrect="off"
                      spellCheck="false"
                      aria-required="true"
                      aria-invalid={errors.college_code ? 'true' : 'false'}
                      aria-describedby={errors.college_code ? 'err-college-code' : undefined}
                      className={`w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-950/80 text-sm font-mono text-white placeholder-slate-400 border transition-all duration-200 focus:outline-none focus:ring-2 ${
                        errors.college_code
                          ? 'border-pink-500/80 focus:ring-pink-500/40 bg-pink-950/10'
                          : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
                      }`}
                    />
                  </div>
                  {errors.college_code && (
                    <p id="err-college-code" className="mt-1.5 text-xs text-pink-400 flex items-center gap-1" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.college_code}</span>
                    </p>
                  )}
                </div>

              </div>
            </fieldset>

            {/* ========================================================= */}
            {/* 2. TEAM DETAILS */}
            {/* ========================================================= */}
            <fieldset className="space-y-4">
              <legend className="text-base sm:text-lg font-heading font-bold text-white flex items-center gap-2.5 pb-2 border-b border-slate-800 w-full">
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Users className="w-4 h-4" />
                </div>
                <span>2. Team Details</span>
              </legend>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                
                {/* Team Name */}
                <div className="md:col-span-2">
                  <label htmlFor="team_name" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Team Name <span className="text-pink-400" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="team_name"
                    name="team_name"
                    value={formData.team_name}
                    onChange={(e) => handleInputChange('team_name', e.target.value)}
                    disabled={isSubmitting}
                    placeholder="e.g., Binary Bandits"
                    aria-required="true"
                    aria-invalid={errors.team_name ? 'true' : 'false'}
                    aria-describedby={errors.team_name ? 'err-team-name' : undefined}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 text-sm text-white placeholder-slate-400 border transition-all duration-200 focus:outline-none focus:ring-2 ${
                      errors.team_name
                        ? 'border-pink-500/80 focus:ring-pink-500/40 bg-pink-950/10'
                        : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
                    }`}
                  />
                  {errors.team_name && (
                    <p id="err-team-name" className="mt-1.5 text-xs text-pink-400 flex items-center gap-1" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.team_name}</span>
                    </p>
                  )}
                </div>

                {/* Number of Members (Selector) */}
                <div>
                  <label htmlFor="member_count" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Squad Size (Members) <span className="text-pink-400" aria-hidden="true">*</span>
                  </label>
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950/80 border border-slate-800">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleMemberCountChange(num)}
                        disabled={isSubmitting}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-200 ${
                          formData.member_count === num
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <span className="block text-[11px] text-slate-400 mt-1.5">
                    Includes captain + squad members (1-5)
                  </span>
                  {errors.member_count && (
                    <p id="err-member-count" className="mt-1.5 text-xs text-pink-400 flex items-center gap-1" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.member_count}</span>
                    </p>
                  )}
                </div>

              </div>
            </fieldset>

            {/* ========================================================= */}
            {/* 3. CAPTAIN DETAILS */}
            {/* ========================================================= */}
            <fieldset className="space-y-4">
              <legend className="text-base sm:text-lg font-heading font-bold text-white flex items-center gap-2.5 pb-2 border-b border-slate-800 w-full">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Crown className="w-4 h-4" />
                </div>
                <span>3. Captain Details (Primary Contact)</span>
              </legend>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                
                {/* Captain Name */}
                <div>
                  <label htmlFor="captain_name" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Captain Name <span className="text-pink-400" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="captain_name"
                    name="captain_name"
                    value={formData.captain_name}
                    onChange={(e) => handleCaptainChange('captain_name', e.target.value)}
                    disabled={isSubmitting}
                    placeholder="e.g., Alex Johnson"
                    autoComplete="name"
                    aria-required="true"
                    aria-invalid={errors.captain_name ? 'true' : 'false'}
                    aria-describedby={errors.captain_name ? 'err-captain-name' : undefined}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 text-sm text-white placeholder-slate-400 border transition-all duration-200 focus:outline-none focus:ring-2 ${
                      errors.captain_name
                        ? 'border-pink-500/80 focus:ring-pink-500/40 bg-pink-950/10'
                        : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
                    }`}
                  />
                  {errors.captain_name && (
                    <p id="err-captain-name" className="mt-1.5 text-xs text-pink-400 flex items-center gap-1" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.captain_name}</span>
                    </p>
                  )}
                </div>

                {/* Captain Email */}
                <div>
                  <label htmlFor="captain_email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Captain Email <span className="text-pink-400" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="email"
                    id="captain_email"
                    name="captain_email"
                    value={formData.captain_email}
                    onChange={(e) => handleCaptainChange('captain_email', e.target.value)}
                    disabled={isSubmitting}
                    placeholder="captain@college.edu"
                    autoComplete="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    aria-required="true"
                    aria-invalid={errors.captain_email ? 'true' : 'false'}
                    aria-describedby={errors.captain_email ? 'err-captain-email' : undefined}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 text-sm text-white placeholder-slate-400 border transition-all duration-200 focus:outline-none focus:ring-2 ${
                      errors.captain_email
                        ? 'border-pink-500/80 focus:ring-pink-500/40 bg-pink-950/10'
                        : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
                    }`}
                  />
                  {errors.captain_email && (
                    <p id="err-captain-email" className="mt-1.5 text-xs text-pink-400 flex items-center gap-1" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.captain_email}</span>
                    </p>
                  )}
                </div>

                {/* Captain Phone */}
                <div>
                  <label htmlFor="captain_phone" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Captain Phone Number <span className="text-pink-400" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="tel"
                    id="captain_phone"
                    name="captain_phone"
                    value={formData.captain_phone}
                    onChange={(e) => handleCaptainChange('captain_phone', e.target.value)}
                    disabled={isSubmitting}
                    placeholder="e.g., 9876543210"
                    autoComplete="tel"
                    inputMode="numeric"
                    aria-required="true"
                    aria-invalid={errors.captain_phone ? 'true' : 'false'}
                    aria-describedby={errors.captain_phone ? 'err-captain-phone' : undefined}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 text-sm text-white placeholder-slate-400 border transition-all duration-200 focus:outline-none focus:ring-2 ${
                      errors.captain_phone
                        ? 'border-pink-500/80 focus:ring-pink-500/40 bg-pink-950/10'
                        : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
                    }`}
                  />
                  {errors.captain_phone && (
                    <p id="err-captain-phone" className="mt-1.5 text-xs text-pink-400 flex items-center gap-1" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.captain_phone}</span>
                    </p>
                  )}
                </div>

              </div>
            </fieldset>

            {/* ========================================================= */}
            {/* 4. DYNAMIC PARTICIPANT DETAILS */}
            {/* ========================================================= */}
            <fieldset className="space-y-4">
              <ParticipantFields
                participants={formData.participants}
                onParticipantChange={handleParticipantChange}
                errors={errors}
                disabled={isSubmitting}
              />
            </fieldset>

            {/* ========================================================= */}
            {/* 5. EVENT SELECTION */}
            {/* ========================================================= */}
            <fieldset className="space-y-4">
              <legend className="text-base sm:text-lg font-heading font-bold text-white flex items-center gap-2.5 pb-2 border-b border-slate-800 w-full">
                <div className="w-7 h-7 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                  <CheckSquare className="w-4 h-4" />
                </div>
                <span>5. Event Selection</span>
                <span className="text-xs font-normal text-slate-400 ml-auto">
                  (Choose at least one event)
                </span>
              </legend>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {AVAILABLE_EVENTS.map((evt) => {
                  const isChecked = formData.events.includes(evt.id);
                  return (
                    <label
                      key={evt.id}
                      htmlFor={`event-${evt.id}`}
                      className={`relative flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                        isChecked
                          ? 'bg-indigo-950/40 border-indigo-500/60 shadow-lg shadow-indigo-950/40'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        id={`event-${evt.id}`}
                        name="events"
                        value={evt.id}
                        checked={isChecked}
                        onChange={() => handleEventToggle(evt.id)}
                        disabled={isSubmitting}
                        className="mt-1 w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900 border-slate-700 bg-slate-900 cursor-pointer"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-heading font-bold text-white">
                            {evt.name}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          {evt.desc}
                        </p>
                        <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                          {evt.tag}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>

              {errors.events && (
                <p className="mt-2 text-xs text-pink-400 flex items-center gap-1" role="alert">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.events}</span>
                </p>
              )}
            </fieldset>

            {/* ========================================================= */}
            {/* ACTION BUTTONS & CONTROLS */}
            {/* ========================================================= */}
            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Reset Form Button */}
              <div>
                {!isResetConfirmOpen ? (
                  <button
                    type="button"
                    onClick={() => setIsResetConfirmOpen(true)}
                    disabled={isSubmitting}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 py-2 px-3 rounded-lg hover:bg-slate-800/60 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear and Reset Form</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-300">Reset all fields?</span>
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-2.5 py-1 rounded bg-pink-600 text-white font-semibold hover:bg-pink-500"
                    >
                      Yes, Clear
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsResetConfirmOpen(false)}
                      className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full sm:w-auto px-8 py-4 rounded-xl font-heading font-bold text-sm text-white shadow-xl transition-all duration-300 flex items-center justify-center gap-3 ${
                  isSubmitting
                    ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                    : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                    <span>Connecting to n8n Webhook...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Official Registration</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

            </div>

          </form>

        </div>

      </div>
    </section>
  );
}

