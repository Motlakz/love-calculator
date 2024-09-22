import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { FaBirthdayCake, FaStar, FaStarAndCrescent, FaMoon, FaInfoCircle } from 'react-icons/fa';
import { logEvent, analytics } from '../firebase';
import { openai } from '../api/openai';

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const DateInput: React.FC<InputProps> = ({ label, value, onChange }) => (
  <div className="mb-4">
    <label className="text-teal-100 font-semibold mb-2 flex items-center">
      <FaBirthdayCake className="mr-2" /> {label}
    </label>
    <motion.input
      whileFocus={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
      type="date"
      className="w-full p-3 bg-teal-900 bg-opacity-30 border border-teal-300 border-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 backdrop-blur-sm text-teal-100 placeholder-teal-200 placeholder-opacity-70"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="YYYY-MM-DD"
    />
  </div>
);

const Button: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="w-full bg-teal-600 bg-opacity-70 text-teal-100 p-3 rounded-lg font-bold hover:bg-opacity-80 transition duration-300 backdrop-blur-sm border border-teal-400 border-opacity-50 flex items-center justify-center"
  >
    <FaStarAndCrescent className="mr-2" /> {children}
  </motion.button>
);

const Result: React.FC<{ content: string }> = ({ content }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="mt-6 p-4 bg-teal-900 bg-opacity-30 rounded-lg border border-teal-300 border-opacity-50 backdrop-blur-sm"
  >
    <ReactMarkdown className="text-teal-100">{content}</ReactMarkdown>
  </motion.div>
);

const FloatingIcon: React.FC<{ index: number }> = ({ index }) => {
    const icons = [FaStar, FaMoon];
    const Icon = icons[Math.floor(Math.random() * icons.length)];
    const size = Math.random() * 20 + 10; // Random size between 10px and 30px
    
    return (
        <motion.div
            className="absolute text-teal-200 text-opacity-70 pointer-events-none"
            style={{
                fontSize: `${size}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
            }}
            animate={{ 
                top: [
                    `${Math.random() * 100}%`,
                    `${Math.random() * 100}%`,
                    `${Math.random() * 100}%`,
                    `${Math.random() * 100}%`,
                ],
                left: [
                    `${Math.random() * 100}%`,
                    `${Math.random() * 100}%`,
                    `${Math.random() * 100}%`,
                    `${Math.random() * 100}%`,
                ],
                scale: [0, 1, 1, 0],
                rotate: [0, 180, 360, 0],
            }}
            transition={{ 
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                delay: index * 0.2 // Stagger the animations
            }}
        >
            <Icon />
        </motion.div>
    );
};

const BirthdateCompatibility: React.FC = () => {
    const [date1, setDate1] = useState('');
    const [date2, setDate2] = useState('');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const calculateCompatibility = async () => {
        if (!date1 || !date2) {
            setError('Please select both birthdates');
            return;
        }
        setIsLoading(true);
        setError('');
        logEvent(analytics, 'calculate_compatibility_click', { date1, date2 });
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are a love compatibility expert. Provide a brief, fun compatibility analysis based on two birthdates. Include astrological signs and a compatibility percentage."
                    },
                    {
                        role: "user",
                        content: `Analyze the love compatibility for people born on ${date1} and ${date2}. Include their astrological signs and a compatibility percentage.`
                    }
                ],
            });

            setResult(response.choices[0].message.content || '');
            logEvent(analytics, 'compatibility_result', { date1, date2, result: response.choices[0].message.content });
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again.');
        }
        setIsLoading(false);
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-800 via-cyan-700 to-teal-900 p-4 relative overflow-hidden">
          <div className="absolute inset-0">
              {[...Array(30)].map((_, index) => (
                  <FloatingIcon key={index} index={index} />
              ))}
          </div>
          <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="birth-cal max-w-md w-full bg-teal-600 overflow-y-auto max-h-[550px] bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-teal-300 border-opacity-30 relative z-10"
          >
              <motion.h1 
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
                  className="highlight text-3xl font-bold mb-6 text-center text-teal-100"
              >
                  <FaStarAndCrescent className="mr-2 inline-block" /> Cosmic Love Compatibility
              </motion.h1>
              <p className="text-teal-600 bg-teal-100 p-2 rounded mb-4 text-center">
                <FaInfoCircle className="inline-block mr-2" />
                Enter birthdates to discover your cosmic connection!
              </p>
              <DateInput label="Your Birthdate" value={date1} onChange={setDate1} />
              <DateInput label="Their Birthdate" value={date2} onChange={setDate2} />
              <Button onClick={calculateCompatibility}>
                  {isLoading ? "Consulting the Stars..." : "Calculate Cosmic Compatibility"}
              </Button>
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-300 mt-4 text-center"
                >
                  {error}
                </motion.p>
              )}
              <AnimatePresence>
                  {result && <Result content={result} />}
              </AnimatePresence>
          </motion.div>
      </div>
  );
};

export default BirthdateCompatibility;
