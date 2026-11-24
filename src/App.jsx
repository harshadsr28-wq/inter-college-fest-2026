import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import RegistrationProcess from './components/RegistrationProcess';
import RegistrationForm from './components/RegistrationForm';
import SuccessScreen from './components/SuccessScreen';
import Footer from './components/Footer';

export default function App() {
  const [activeView, setActiveView] = useState('landing'); // 'landing' | 'success'
  const [registrationResult, setRegistrationResult] = useState(null);
  const [preSelectedEvent, setPreSelectedEvent] = useState(null);

  // Smooth scroll to the registration form
  const scrollToRegister = (eventName = null) => {
    if (activeView !== 'landing') {
      setActiveView('landing');
    }
    if (eventName) {
      setPreSelectedEvent(eventName);
    }
    setTimeout(() => {
      const regSection = document.getElementById('register');
      if (regSection) {
        regSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  // Called when n8n returns a successful registration response
  const handleRegistrationSuccess = (data) => {
    setRegistrationResult(data);
    setActiveView('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset and return to register another team
  const handleRegisterAnother = () => {
    setRegistrationResult(null);
    setPreSelectedEvent(null);
    setActiveView('landing');
    setTimeout(() => {
      const regSection = document.getElementById('register');
      if (regSection) {
        regSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  // Return to landing home
  const handleReturnHome = () => {
    setRegistrationResult(null);
    setPreSelectedEvent(null);
    setActiveView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Persistent Navigation */}
      <Navbar onRegisterClick={() => scrollToRegister()} />

      <main className="flex-1">
        {activeView === 'landing' ? (
          <>
            {/* Landing Hero Section */}
            <Hero onRegisterClick={() => scrollToRegister()} />

            {/* About The Fest Section */}
            <About />

            {/* Events Showcase Section */}
            <Events onSelectEvent={(event) => scrollToRegister(event)} />

            {/* Step-by-Step Registration Process */}
            <RegistrationProcess onRegisterClick={() => scrollToRegister()} />

            {/* Official Registration Form Section */}
            <RegistrationForm
              onRegistrationSuccess={handleRegistrationSuccess}
              preSelectedEvent={preSelectedEvent}
            />
          </>
        ) : (
          /* Success Screen with Registration ID returned by n8n */
          <SuccessScreen
            registrationData={registrationResult}
            onRegisterAnother={handleRegisterAnother}
            onReturnHome={handleReturnHome}
          />
        )}
      </main>

      {/* Official Footer with Fest Organizing Committee */}
      <Footer onRegisterClick={() => scrollToRegister()} />

    </div>
  );
}

