import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { analytics, logEvent } from './firebase';
import LoveCalculator from './components/LoveCalculator';
import BirthdateCompatibility from './components/BirthdateCompatibility';
import ZodiacLoveCalculator from './components/ZodiacLoveCalculator';
import SoulmateCalculator from './components/SoulmateCalculator';
import NumerologyLoveCalculator from './components/NumerologyLoveCalculator';
import LoveQuizGlassmorphism from './components/CompatibilityQuiz';
import StarryNightSky from './components/StarryNightSky';
import CookiesModal from './components/CookiesModal';

const App: React.FC = () => {
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted === 'true') {
      setIsTrackingEnabled(true);
      logEvent(analytics, 'page_view', { page_title: 'Love Test' });
    }
  }, []);

  const handleComponentClick = (componentName: string) => {
    if (isTrackingEnabled) {
      logEvent(analytics, 'component_click', { component: componentName });
    }
  };

  const handleAcceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsTrackingEnabled(true);
    logEvent(analytics, 'page_view', { page_title: 'Love Test' });
  };

  const handleDeclineCookies = () => {
    localStorage.setItem('cookiesAccepted', 'false');
    setIsTrackingEnabled(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-tr from-blue-950 via-purple-950 to-black">
      <StarryNightSky />
      <div className="container mx-auto relative z-10">
        <motion.h1 
          className="highlight text-4xl font-bold text-center mt-8 text-gray-200"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Love Test AI
        </motion.h1>
        <p className="text-semibold text-xl text-center highlight mb-6 py-8 text-gray-300">Welcome to Love Test AI. The best, most interactive, and intuitive assortment of love calculators for your enjoyment!</p>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div onClick={() => handleComponentClick('LoveCalculator')}>
            <LoveCalculator />
          </div>
          <div onClick={() => handleComponentClick('BirthdateCompatibility')}>
            <BirthdateCompatibility />
          </div>
          <div onClick={() => handleComponentClick('ZodiacLoveCalculator')}>
            <ZodiacLoveCalculator />
          </div>
          <div onClick={() => handleComponentClick('SoulmateCalculator')}>
            <SoulmateCalculator />
          </div>
          <div onClick={() => handleComponentClick('NumerologyLoveCalculator')}>
            <NumerologyLoveCalculator />
          </div>
          <div onClick={() => handleComponentClick('LoveQuizGlassmorphism')}>
            <LoveQuizGlassmorphism />
          </div>
        </div>
      </div>
      <CookiesModal onAccept={handleAcceptCookies} onDecline={handleDeclineCookies} />
    </div>
  );
};

export default App;
