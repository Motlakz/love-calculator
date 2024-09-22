import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInfinity } from 'react-icons/fa';
import { logEvent, analytics } from '../firebase';
import ReactMarkdown from 'react-markdown';
import { openai } from '../api/openai';

const InputField: React.FC<{ type: string; placeholder?: string; value: string; onChange: (value: string) => void }> = ({ type, placeholder, value, onChange }) => (
    <motion.input
        type={type}
        placeholder={placeholder}
        className="w-full p-3 mb-4 bg-black bg-opacity-10 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-300 text-pink-200 placeholder-pink-300 placeholder-opacity-70"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        whileFocus={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
    />
);

const Button: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
    <motion.button
        onClick={onClick}
        className="w-full bg-rose-400 flex items-center justify-center text-white p-3 rounded-lg font-bold hover:bg-rose-500 transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        <FaInfinity className='mr-2' /> {children}
    </motion.button>
);

const SoulmateCalculator = () => {
    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [zodiacSign, setZodiacSign] = useState('');
    const [interests, setInterests] = useState('');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const calculateSoulmate = async () => {
        setIsLoading(true);
        logEvent(analytics, 'calculate_soulmate_click', { name, birthdate, zodiacSign, interests });
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are a mystical soulmate predictor. Provide a comprehensive description of someone's soulmate based on their name, birthdate, zodiac sign, and interests."
                    },
                    {
                        role: "user",
                        content: `Describe the soulmate for a person named ${name}, born on ${birthdate}, with the zodiac sign ${zodiacSign} and interests in ${interests}.`
                    }
                ],
            });

            setResult(response.choices[0].message.content || '');
            logEvent(analytics, 'soulmate_result', { name, birthdate, zodiacSign, interests, result: response.choices[0].message.content });
        } catch (error) {
            console.error('Error:', error);
            setResult('An error occurred. Please try again.');
        }
        setIsLoading(false);
    };

    return (
        <div ref={containerRef} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-400 via-violet-400 to-red-400 p-4 relative overflow-hidden">
            <motion.div 
                className="soul-cal max-w-md w-full overflow-y-auto max-h-[550px] bg-pink-900 bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-rose-200 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h1 
                    className="highlight text-3xl font-bold mb-6 flex items-center justify-center text-rose-200"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
                >
                   <FaInfinity className="mr-2" /> Soulmate Finder
                </motion.h1>
                <InputField type="text" placeholder="Enter your name" value={name} onChange={setName} />
                <InputField type="date" placeholder={"YYYY/MM/DD"} value={birthdate} onChange={setBirthdate} />
                <InputField type="text" placeholder="Enter your zodiac sign" value={zodiacSign} onChange={setZodiacSign} />
                <InputField type="text" placeholder="Enter your interests (comma separated)" value={interests} onChange={setInterests} />
                <Button onClick={calculateSoulmate}>
                    {isLoading ? "Finding your soulmate..." : "Reveal My Soulmate"}
                </Button>
                <AnimatePresence>
                    {result && (
                        <motion.div 
                            className="mt-6 p-4 bg-white bg-opacity-50 rounded-lg border border-rose-200"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ReactMarkdown className="text-rose-800">{result}</ReactMarkdown>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
            <HeartParticles containerRef={containerRef} />
        </div>
    );
};

const HeartParticles: React.FC<{ containerRef: React.RefObject<HTMLDivElement> }> = ({ containerRef }) => {
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const size = Math.random() * 15 + 5;

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
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-rose-300 text-opacity-30 select-none"
                    style={{
                        fontSize: `${size}px`,
                    }}
                    initial={{ 
                        x: Math.random() * containerSize.width,
                        y: Math.random() * containerSize.height,
                        scale: 0
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
                        ],
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0]
                    }}
                    transition={{ 
                        duration: Math.random() * 20 + 10, 
                        repeat: Infinity, 
                        repeatType: "loop" 
                    }}
                >
                    <div className="icons relative">
                        <span className="icon icon-1 absolute right-4 text-4xl">∞</span>
                        <span className="icon icon-2 text-5xl">❤️</span>
                    </div> 
                </motion.div>
            ))}
        </div>
    );
};

export default SoulmateCalculator;
