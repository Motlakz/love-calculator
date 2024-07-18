import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaInfoCircle, FaQuoteLeft, FaQuoteRight, FaChevronDown } from 'react-icons/fa';
import axios from 'axios';
import { VITE_APP_OPENAI_API_KEY } from '../api/openai';

interface InputProps {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    icon: React.ReactNode;
}

const NameInput: React.FC<InputProps> = ({ placeholder, value, onChange, icon }) => (
    <motion.div className="relative mb-4">
        <motion.span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-opacity-70">
            {icon}
        </motion.span>
        <motion.input
            type="text"
            placeholder={placeholder}
            className="w-full p-3 pl-10 bg-pink-900/20 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 backdrop-blur-sm text-white placeholder-white placeholder-opacity-70"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            whileFocus={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
        />
    </motion.div>
);

const Button: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
    <motion.button
        onClick={onClick}
        className="w-full bg-red-500 bg-opacity-70 text-white p-3 rounded-lg font-bold hover:bg-opacity-80 transition duration-300 backdrop-blur-sm flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        <FaHeart className="mr-2" />
        {children}
    </motion.button>
);

const Result: React.FC<{ percentage: number; advice: string; quote: string }> = ({ percentage, advice, quote }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="mt-6 p-4 bg-white bg-opacity-20 rounded-lg border border-white border-opacity-30 backdrop-blur-sm"
    >
        <p className="text-2xl font-bold text-white text-center mb-2">
            Love Percentage: {percentage}%
        </p>
        <div className="w-full bg-white bg-opacity-30 rounded-full h-4 mb-4">
            <motion.div 
                className="bg-red-500 h-4 rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            ></motion.div>
        </div>
        <p className="text-white text-center mb-4">
            <FaInfoCircle className="inline mr-2" />
            {advice}
        </p>
        <div className="text-white text-center italic">
            <FaQuoteLeft className="inline mr-2" />
            {quote}
            <FaQuoteRight className="inline ml-2" />
        </div>
    </motion.div>
);

const StarryHeart: React.FC<{ index: number }> = ({ index }) => {
    const size = Math.random() * 20 + 10;
    return (
        <motion.div
            className="absolute text-pink-300 text-opacity-70 pointer-events-none"
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
                delay: index * 0.2
            }}
        >
            <FaHeart />
        </motion.div>
    );
};

const CustomSelect: React.FC<{
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}> = ({ value, onChange, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={selectRef} className="relative mb-4">
            <motion.div
                className="w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 backdrop-blur-sm text-white flex justify-between items-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <span>{value ? options.find(opt => opt.value === value)?.label : "Select relationship status"}</span>
                <FaChevronDown className={`transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
            </motion.div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="absolute z-20 w-full mt-1 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {options.map((option) => (
                            <motion.div
                                key={option.value}
                                className="p-3 cursor-pointer text-gray-800 hover:bg-red-100 transition duration-150"
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                whileHover={{ backgroundColor: "rgba(254, 202, 202, 0.5)" }}
                            >
                                {option.label}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const LoveCalculator: React.FC = () => {
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [result, setResult] = useState(0);
    const [advice, setAdvice] = useState('');
    const [quote, setQuote] = useState('');
    const [relationshipStatus, setRelationshipStatus] = useState('');

    const relationshipOptions = [
        { value: "crushing", label: "Crushing" },
        { value: "dating", label: "Dating" },
        { value: "committed", label: "Committed Relationship" },
        { value: "married", label: "Married" },
    ];

    const calculateLove = async () => {
        if (name1.trim() === '' || name2.trim() === '') {
            alert('Please enter both names');
            return;
        }
        
        const set1 = new Set(name1.toLowerCase());
        const set2 = new Set(name2.toLowerCase());
        const commonLetters = [...set1].filter(letter => set2.has(letter)).length;
        const lengthFactor = Math.abs(name1.length - name2.length);
        const baseScore = (commonLetters * 10) - lengthFactor + Math.floor(Math.random() * 20);
        const finalScore = Math.max(0, Math.min(100, baseScore));
        
        setResult(finalScore);

        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "system",
                    content: "You are a relationship advisor. Provide advice and a love quote based on the given love percentage and relationship status."
                }, {
                    role: "user",
                    content: `Love percentage: ${finalScore}%. Relationship status: ${relationshipStatus}. Provide brief advice and a short love quote.`
                }],
                max_tokens: 150
            }, {
                headers: {
                    'Authorization': `Bearer ${VITE_APP_OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });

            const content = response.data.choices[0].message.content;
            const [adviceResponse, quoteResponse] = content.split('\n\n');
            setAdvice(adviceResponse.replace('Advice: ', ''));
            setQuote(quoteResponse.replace('Quote: ', ''));
        } catch (error) {
            console.error('Error fetching advice:', error);
            setAdvice('Love is a journey. Enjoy every step!');
            setQuote('Where there is love, there is life. - Mahatma Gandhi');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-400 to-pink-500 p-4 relative overflow-hidden">
            <div className="absolute inset-0">
                {[...Array(30)].map((_, index) => (
                    <StarryHeart key={index} index={index} />
                ))}
            </div>
            <motion.div 
                className="max-w-md w-full bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-white border-opacity-30 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h1 
                    className="highlight text-3xl font-bold mb-6 text-center text-white"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
                >
                    <FaHeart className="mr-2" /> Love Calculator
                </motion.h1>
                <NameInput placeholder="Enter your name" value={name1} onChange={setName1} icon={<FaHeart className='text-white' />} />
                <NameInput placeholder="Enter love interest's name" value={name2} onChange={setName2} icon={<FaHeart className='text-white' />} />
                <CustomSelect
                    value={relationshipStatus}
                    onChange={setRelationshipStatus}
                    options={relationshipOptions}
                />
                <Button onClick={calculateLove}>Calculate Love</Button>
                <AnimatePresence>
                    {result > 0 && <Result percentage={result} advice={advice} quote={quote} />}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default LoveCalculator;
