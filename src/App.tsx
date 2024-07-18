import React from 'react';
import LoveCalculator from './components/LoveCalculator';
import BirthdateCompatibility from './components/BirthdateCompatibility';
import ZodiacLoveCalculator from './components/ZodiacLoveCalculator';
import SoulmateCalculator from './components/SoulmateCalculator';
import NumerologyLoveCalculator from './components/NumerologyLoveCalculator';
import LoveQuizGlassmorphism from './components/CompatibilityQuiz';

const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4 bg-gradient-to-tr from-blue-950 via-purple-950 to-black">
      <h1 className="highlight text-4xl font-bold text-center my-8 text-gray-200">Love Test</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <LoveCalculator />
        <BirthdateCompatibility />
        <ZodiacLoveCalculator />
        <SoulmateCalculator />
        <NumerologyLoveCalculator />
        <LoveQuizGlassmorphism />
      </div>
    </div>
  );
};

export default App;
