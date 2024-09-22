import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { logEvent, analytics } from '../firebase';
import { openai } from '../api/openai';

const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const zodiacSymbols: { [key: string]: string } = {
    'Aries': '♈', 'Taurus': '♉', 'Gemini': '♊', 'Cancer': '♋',
    'Leo': '♌', 'Virgo': '♍', 'Libra': '♎', 'Scorpio': '♏',
    'Sagittarius': '♐', 'Capricorn': '♑', 'Aquarius': '♒', 'Pisces': '♓'
};

const ZodiacSelect: React.FC<{ value: string; onChange: (value: string) => void; placeholder: string }> = ({ value, onChange, placeholder }) => (
    <motion.select
        className="w-full p-3 mb-4 bg-indigo-900 bg-opacity-50 border-2 border-indigo-300 rounded-lg focus:outline-none focus:border-indigo-400 text-indigo-100 placeholder-indigo-300"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        whileFocus={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
    >
        <option value="">{placeholder}</option>
        {zodiacSigns.map(sign => (
            <option key={sign} value={sign}>{sign} {zodiacSymbols[sign]}</option>
        ))}
    </motion.select>
);

const Button: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
    <motion.button
        onClick={onClick}
        className="w-full flex items-center justify-center bg-indigo-500 text-white p-3 rounded-lg font-bold hover:bg-indigo-600 transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        <FaStar className="mr-2" /> {children}
    </motion.button>
);

const FloatingSymbol: React.FC<{ symbol: string; containerSize: { width: number; height: number } }> = ({ symbol, containerSize }) => (
    <motion.div
        className="absolute text-indigo-300 opacity-50 pointer-events-none"
        initial={{ 
            x: Math.random() * containerSize.width, 
            y: Math.random() * containerSize.height,
            fontSize: '30px'
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
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            fontSize: ['10px', '20px', '30px', '20px', '10px']
        }}
        transition={{ 
            duration: Math.random() * 20 + 10, 
            repeat: Infinity, 
            repeatType: "reverse" 
        }}
    >
        {symbol}
    </motion.div>
);

const FloatingSymbols: React.FC<{ containerRef: React.RefObject<HTMLDivElement> }> = ({ containerRef }) => {
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
            {Object.values(zodiacSymbols).map((symbol, index) => (
                <FloatingSymbol key={index} symbol={symbol} containerSize={containerSize} />
            ))}
        </div>
    );
};

const ZodiacLoveCalculator: React.FC = () => {
    const [sign1, setSign1] = useState('');
    const [sign2, setSign2] = useState('');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const calculateZodiacCompatibility = async () => {
        if (!sign1 || !sign2) {
            alert('Please select both zodiac signs');
            return;
        }
        setIsLoading(true);
        const score = Math.floor(Math.random() * 101);
        logEvent(analytics, 'calculate_zodiac_compatibility_click', { sign1, sign2 });

        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are an expert astrologer specializing in zodiac compatibility."
                    },
                    {
                        role: "user",
                        content: `Provide a brief, fun explanation of the love compatibility between ${sign1} and ${sign2}. Their compatibility score is ${score}%.`
                    }
                ],
            });

            const text = response.choices[0].message.content || '';
            setResult(`Compatibility: ${score}%\n\n${text}`);
            logEvent(analytics, 'zodiac_compatibility_result', { sign1, sign2, score, result: text });
        } catch (error) {
            console.error('Error:', error);
            setResult('An error occurred. Please try again.');
        }
        setIsLoading(false);
    };

    return (
        <div ref={containerRef} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 p-4 relative overflow-hidden">
            <FloatingSymbols containerRef={containerRef} />
            <motion.div 
                className="zodiac-cal max-w-md w-full overflow-y-auto max-h-[550px] bg-indigo-800 bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-indigo-300 border-opacity-30 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h1 
                    className="highlight text-3xl font-bold mb-6 flex items-center justify-center text-indigo-100"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
                >
                   <FaStar className="mr-2" /> Cosmic Love Oracle
                </motion.h1>
                <ZodiacSelect value={sign1} onChange={setSign1} placeholder="Choose your sign" />
                <ZodiacSelect value={sign2} onChange={setSign2} placeholder="Choose your partner's sign" />
                <Button onClick={calculateZodiacCompatibility}>
                    {isLoading ? (
                        <>
                            <p>Aligning the stars...</p>
                        </>
                    ) : (
                        <>Unveil Your Cosmic Connection</>
                    )}
                </Button>
                <AnimatePresence>
                    {result && (
                        <motion.div 
                            className="mt-6 p-4 bg-indigo-900 bg-opacity-50 rounded-lg border border-indigo-300 border-opacity-50"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-2xl font-bold text-indigo-300 mb-2">Celestial Verdict</h2>
                            <p className="text-indigo-100 whitespace-pre-wrap">{result}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default ZodiacLoveCalculator;
