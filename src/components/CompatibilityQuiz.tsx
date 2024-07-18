import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OpenAI from 'openai';
import { VITE_APP_OPENAI_API_KEY } from '../api/openai';
import { FaFacebook, FaTwitter, FaEnvelope, FaChevronDown } from 'react-icons/fa';

const openai = new OpenAI({ apiKey: VITE_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

const loveLanguages = [
    'Words of Affirmation',
    'Acts of Service',
    'Receiving Gifts',
    'Quality Time',
    'Physical Touch'
] as const;

type LoveLanguage = typeof loveLanguages[number];

interface InputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

interface SelectProps extends InputProps {
    options: readonly string[];
}

const GlassInput: React.FC<InputProps> = ({ value, onChange, placeholder }) => (
    <motion.input
        className="w-full p-3 mb-4 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg focus:outline-none focus:border-pink-400 text-white placeholder-white placeholder-opacity-70"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        whileFocus={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
    />
);

const CustomSelect: React.FC<SelectProps> = ({ value, onChange, options, placeholder }) => {
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
        <div ref={selectRef} className="relative w-full mb-4">
            <motion.div
                className="w-full p-3 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg focus:outline-none focus:border-pink-400 text-white cursor-pointer flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <span className={value ? 'text-white' : 'text-white text-opacity-70'}>
                    {value || placeholder}
                </span>
                <FaChevronDown className={`transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
            </motion.div>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        className="custom-select-open absolute z-10 w-full mt-1 bg-purple-500 backdrop-blur-lg border border-white border-opacity-30 rounded-lg overflow-hidden max-h-[190px] overflow-y-auto"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {options.map(option => (
                            <motion.li
                                key={option}
                                className="p-3 cursor-pointer text-white hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
                                onClick={() => {
                                    onChange(option);
                                    setIsOpen(false);
                                }}
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                {option}
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}

const GlassButton: React.FC<ButtonProps> = ({ onClick, children }) => (
    <motion.button
        onClick={onClick}
        className="w-full bg-gradient-to-r from-pink-700 to-purple-700 text-white p-3 rounded-lg font-bold hover:from-pink-900 hover:to-purple-900 transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        {children}
    </motion.button>
);

const LoveQuizGlassmorphism: React.FC = () => {
    const [step, setStep] = useState(0);
    const [person1, setPerson1] = useState('');
    const [person2, setPerson2] = useState('');
    const [loveLanguage1, setLoveLanguage1] = useState<LoveLanguage | ''>('');
    const [loveLanguage2, setLoveLanguage2] = useState<LoveLanguage | ''>('');
    const [answers, setAnswers] = useState<number[]>([]);
    const [result, setResult] = useState('');
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const questions = [
        "How often do you and your partner express appreciation for each other?",
        "How frequently do you surprise your partner with thoughtful gifts?",
        "How important is physical affection in your relationship?",
        "How often do you prioritize spending quality time together without distractions?",
        "How frequently do you perform acts of service for your partner?"
    ];

    const handleAnswer = (answer: number) => {
        const newAnswers = [...answers, answer];
        setAnswers(newAnswers);
        if (newAnswers.length < questions.length) {
            setStep(step + 1);
        } else {
            const totalScore = newAnswers.reduce((sum, curr) => sum + curr, 0);
            const percentageScore = (totalScore / (questions.length * 5)) * 100;
            setScore(Math.round(percentageScore));
            setIsLoading(true);
            analyzeLoveCompatibility(percentageScore);
        }
    };
    
    const analyzeLoveCompatibility = async (percentageScore: number) => {
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a relationship expert specializing in love compatibility analysis."
                    },
                    {
                        role: "user",
                        content: `Analyze the love compatibility between ${person1} (love language: ${loveLanguage1}) and ${person2} (love language: ${loveLanguage2}). Their quiz score is ${percentageScore.toFixed(2)}%. Provide insights on their compatibility, how their love languages interact, and tips for strengthening their relationship. Keep the response concise, engaging, and positive.`
                    }
                ],
            });
    
            const text = response.choices[0].message.content || '';
            setResult(text);
            setIsLoading(false);
            setTimeout(() => {
                setShowResult(true);
                setStep(step + 1);
            }, 500);
        } catch (error) {
            console.error('Error:', error);
            setResult('An error occurred. Please try again.');
            setIsLoading(false);
            setTimeout(() => {
                setShowResult(true);
            }, 500);
        }
    };

    const shareResult = (platform: 'facebook' | 'twitter' | 'email') => {
        const message = `I just took the Love Compatibility Quiz with ${person2}! Our score: ${score}%. Find out your love compatibility too!`;
        const url = window.location.href;

        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(message)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${url}`, '_blank');
                break;
            case 'email':
                window.location.href = `mailto:?subject=Love Compatibility Quiz&body=${encodeURIComponent(message + ' ' + url)}`;
                break;
        }
    };

    const restartQuiz = () => {
        setPerson1('');
        setPerson2('');
        setLoveLanguage1('');
        setLoveLanguage2('');
        setAnswers([]);
        setResult('');
        setScore(0);
        setIsLoading(false);
        setShowResult(false);
        setStep(0);
    };

    return (
        <div ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 p-4 overflow-hidden">
            <motion.div 
                className="max-w-md w-full z-10 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-white border-opacity-20"
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
                    Love Compatibility Quiz
                </motion.h1>
                <AnimatePresence mode="wait">
                    {step === 0 && (
                        <motion.div
                            key="step0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <GlassInput value={person1} onChange={setPerson1} placeholder="Enter your name" />
                            <GlassInput value={person2} onChange={setPerson2} placeholder="Enter your partner's name" />
                            <CustomSelect 
                                value={loveLanguage1} 
                                onChange={(value) => setLoveLanguage1(value as LoveLanguage)} 
                                options={loveLanguages} 
                                placeholder="Select your love language" 
                            />
                            <CustomSelect 
                                value={loveLanguage2} 
                                onChange={(value) => setLoveLanguage2(value as LoveLanguage)} 
                                options={loveLanguages} 
                                placeholder="Select your partner's love language" 
                            />
                            <GlassButton onClick={() => setStep(1)}>Start Quiz</GlassButton>
                        </motion.div>
                    )}
                    {step > 0 && step <= questions.length && (
                        <motion.div
                            key={`step${step}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <h3 className="text-xl font-semibold mb-4 text-white">{questions[step - 1]}</h3>
                            <div className="flex flex-col space-y-2">
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <GlassButton key={value} onClick={() => handleAnswer(value)}>
                                        {value === 1 ? 'Never' : value === 2 ? 'Rarely' : value === 3 ? 'Sometimes' : value === 4 ? 'Often' : 'Always'}
                                    </GlassButton>
                                ))}
                            </div>
                        </motion.div>
                    )}
                    {step > questions.length && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <h3 className="text-2xl font-semibold mb-4 text-white text-center">Your Love Compatibility Score: {score}%</h3>
                            {isLoading ? (
                                <div className="flex justify-center items-center">
                                    <motion.div
                                        className="w-16 h-16 border-4 border-t-pink-500 border-r-purple-400 border-b-rose-500 border-l-indigo-500 border-solid rounded-full"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    />
                                </div>
                            ) : showResult && (
                                <>
                                    <p className="text-white mb-4 whitespace-pre-wrap">{result}</p>
                                    <div className="flex justify-center space-x-4 mt-6">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => shareResult('facebook')}
                                            className="text-white text-2xl"
                                        >
                                            <FaFacebook />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => shareResult('twitter')}
                                            className="text-white text-2xl"
                                        >
                                            <FaTwitter />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => shareResult('email')}
                                            className="text-white text-2xl"
                                        >
                                            <FaEnvelope />
                                        </motion.button>
                                    </div>
                                    <div className="mt-6">
                                        <GlassButton onClick={restartQuiz}>Restart Quiz</GlassButton>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
            <HeartParticles containerRef={containerRef} />
        </div>
    );
};

interface HeartParticlesProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const HeartParticles: React.FC<HeartParticlesProps> = ({ containerRef }) => {
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
          {[...Array(20)].map((_, i) => (
              <motion.div
                  key={i}
                  className="absolute text-pink-300 text-opacity-50"
                  style={{
                      fontSize: `${Math.random() * 20 + 10}px`,
                  }}
                  initial={{ 
                      x: Math.random() * containerSize.width,
                      y: Math.random() * containerSize.height,
                      opacity: 0
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
                      opacity: [0, 1, 1, 0],
                  }}
                  transition={{ 
                      duration: Math.random() * 20 + 10,
                      repeat: Infinity,
                      repeatType: "loop"
                  }}
              >
                  ❤
              </motion.div>
          ))}
      </div>
  );
};

export default LoveQuizGlassmorphism;
