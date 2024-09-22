import React from 'react';
import { motion } from 'framer-motion';
import NumerologyLoveCalculator from '../components/NumerologyLoveCalculator';
import LoveQuizGlassmorphism from '../components/CompatibilityQuiz';
import SoulmateCalculator from '../components/SoulmateCalculator';
import BirthdateCompatibility from '../components/BirthdateCompatibility';
import ZodiacLoveCalculator from '../components/ZodiacLoveCalculator';
import LoveCalculator from '../components/LoveCalculator';
interface HomeProps {
    handleComponentClick: (componentName: string) => void;
}

const Home: React.FC<HomeProps> = ({ handleComponentClick }) => {
    return (
        <>
            <motion.h1 
                className="highlight text-4xl font-bold text-center mt-24 text-gray-200"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Love Test AI
            </motion.h1>
            <p className="text-semibold text-xl text-center highlight mb-6 py-8 text-gray-300">
                Welcome to Love Test AI. The best, most interactive, and intuitive assortment of love calculators for your enjoyment!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div id="love-calculator" onClick={() => handleComponentClick('LoveCalculator')}>
                    <LoveCalculator />
                </div>
                <div id="zodiac-love-calculator" onClick={() => handleComponentClick('ZodiacLoveCalculator')}>
                    <ZodiacLoveCalculator />
                </div>
                <div id="birthdate-compatibility" onClick={() => handleComponentClick('BirthdateCompatibility')}>
                    <BirthdateCompatibility />
                </div>
                <div id="soulmate-calculator" onClick={() => handleComponentClick('SoulmateCalculator')}>
                    <SoulmateCalculator />
                </div>
                <div id="love-quiz" onClick={() => handleComponentClick('LoveQuizGlassmorphism')}>
                    <LoveQuizGlassmorphism />
                </div>
                <div id="numerology-love-calculator" onClick={() => handleComponentClick('NumerologyLoveCalculator')}>
                    <NumerologyLoveCalculator />
                </div>
            </div>
        </>
    );
};

export default Home;
