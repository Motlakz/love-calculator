import React from 'react';
import { motion } from 'framer-motion';
import LoveCalculator from './components/LoveCalculator';
import BirthdateCompatibility from './components/BirthdateCompatibility';
import ZodiacLoveCalculator from './components/ZodiacLoveCalculator';
import SoulmateCalculator from './components/SoulmateCalculator';
import NumerologyLoveCalculator from './components/NumerologyLoveCalculator';
import LoveQuizGlassmorphism from './components/CompatibilityQuiz';
import StarryNightSky from './components/StarryNightSky';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-tr from-blue-950 via-purple-950 to-black">
      <StarryNightSky />
      <div className="container mx-auto p-4 relative z-10">
        <motion.h1 
          className="highlight text-4xl font-bold text-center my-8 text-gray-200"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Love Test
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <LoveCalculator />
          <BirthdateCompatibility />
          <ZodiacLoveCalculator />
          <SoulmateCalculator />
          <NumerologyLoveCalculator />
          <LoveQuizGlassmorphism />
        </div>
      </div>
    </div>
  );
};

export default App;
