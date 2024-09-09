import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSortNumericUp, FaInfoCircle, FaSortNumericUpAlt } from 'react-icons/fa';
import { logEvent, analytics } from '../firebase';

const getNumerologyNumber = (name: string): number => {
    const numerologyMap: { [key: string]: number } = {
        'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
        'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
        's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
    };

    return name.toLowerCase().split('').reduce((sum, char) => {
        return sum + (numerologyMap[char] || 0);
    }, 0);
};

const getCompatibilityDescription = (score: number): string => {
    if (score >= 80) return "Perfect Harmony! Your energies intertwine like ocean currents.";
    if (score >= 60) return "Strong Connection! Your bond resonates with the rhythm of the tides.";
    if (score >= 40) return "Growing Potential! Like waves reaching for the shore, your connection can flourish.";
    if (score >= 20) return "Challenging Path! Your journey may be turbulent, but growth is possible.";
    return "Distant Energies! Like ships in different seas, your connection may need nurturing.";
};

interface InputProps {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

const NameInput: React.FC<InputProps> = ({ placeholder, value, onChange }) => (
    <motion.input
        whileFocus={{ scale: 1.05 }}
        type="text"
        placeholder={placeholder}
        className="w-full p-3 mb-4 bg-blue-900 bg-opacity-20 border border-blue-300 border-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 backdrop-blur-sm text-blue-100 placeholder-blue-300 placeholder-opacity-70"
        value={value}
        onChange={(e) => onChange(e.target.value)}
    />
);

const Button: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="w-full flex items-center justify-center bg-yellow-500 bg-opacity-80 text-blue-900 p-3 rounded-lg font-bold hover:bg-opacity-90 transition duration-300 backdrop-blur-sm"
    >
      <FaSortNumericUp className='mr-2' />  {children}
    </motion.button>
);

const Result: React.FC<{ score: number; description: string }> = ({ score, description }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6 p-4 bg-blue-900 bg-opacity-30 rounded-lg border border-blue-300 border-opacity-50 backdrop-blur-sm"
    >
        <motion.h3 
            className="text-2xl font-bold text-yellow-400 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
        >
            Mystical Harmony: {score}%
        </motion.h3>
        <motion.p 
            className="text-blue-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
        >
            {description}
        </motion.p>
    </motion.div>
);

const NumerologyLoveCalculator: React.FC = () => {
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [result, setResult] = useState<{ score: number; description: string } | null>(null);
    const [showInfo, setShowInfo] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const calculateNumerologyCompatibility = () => {
        const num1 = getNumerologyNumber(name1);
        const num2 = getNumerologyNumber(name2);
        
        const compatibility = Math.floor(100 - Math.abs(num1 - num2) * 3);
        const score = Math.max(0, Math.min(100, compatibility));
        
        const description = getCompatibilityDescription(score);
        setResult({ score, description });
        logEvent(analytics, 'calculate_numerology_compatibility', { name1, name2, score, description });
    };

    return (
        <div ref={containerRef} className="min-h-screen overflow-y-auto flex items-center justify-center bg-gradient-to-br from-blue-900 via-yellow-800 to-blue-700 p-4 relative overflow-hidden">
            <NumerologyParticles containerRef={containerRef} />
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="num-cal relative max-w-md w-full overflow-y-auto max-h-[550px] bg-blue-800 bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-blue-300 border-opacity-30 z-10"
            >
                <motion.h1 
                    className="highlight text-3xl font-bold mb-6 text-center text-yellow-400"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
                >
                   <FaSortNumericUpAlt className="inline-block mr-2" /> Mystical Numerology Harmony
                </motion.h1>
                <motion.p 
                    className="text-blue-600 bg-blue-100 rounded p-2 mb-4 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    Discover the cosmic connection between two souls
                </motion.p>
                <NameInput placeholder="Enter first name" value={name1} onChange={setName1} />
                <NameInput placeholder="Enter second name" value={name2} onChange={setName2} />
                <Button onClick={calculateNumerologyCompatibility}>
                    Reveal Your Cosmic Bond
                </Button>
                {result && <Result score={result.score} description={result.description} />}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-2 right-2 text-yellow-400"
                    onClick={() => setShowInfo(!showInfo)}
                >
                    <FaInfoCircle size={24} />
                </motion.button>
                {showInfo && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="mt-4 p-4 bg-blue-900 bg-opacity-50 rounded-lg text-blue-100"
                    >
                        <h3 className="text-xl font-bold mb-2">How it works:</h3>
                        <p>Numerology assigns numbers to letters in names. We calculate a number for each name, compare them, and determine compatibility based on their resonance.</p>
                    </motion.div>
                )}
        
            </motion.div>
        </div>
    );
};

const NumerologyParticles: React.FC<{ containerRef: React.RefObject<HTMLDivElement> }> = ({ containerRef }) => {
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                setContainerSize({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight
                });
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, [containerRef]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(9)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-yellow-400 text-opacity-30 text-4xl font-bold"
                    initial={{ 
                        x: Math.random() * containerSize.width,
                        y: Math.random() * containerSize.height
                    }}
                    animate={{ 
                        x: [
                            Math.random() * containerSize.width,
                            Math.random() * containerSize.width,
                            Math.random() * containerSize.width,
                            Math.random() * containerSize.width
                        ],
                        y: [
                            Math.random() * containerSize.height,
                            Math.random() * containerSize.height,
                            Math.random() * containerSize.height,
                            Math.random() * containerSize.height
                        ]
                    }}
                    transition={{ 
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "loop"
                    }}
                >
                    {i + 1}
                </motion.div>
            ))}
        </div>
    );
};

export default NumerologyLoveCalculator;
