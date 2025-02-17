import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Heart, 
    Cake,
    Brain,
    Search,
    ChevronRight,
    Star,
    LucideIcon
} from 'lucide-react';
import { IconType } from 'react-icons/lib';
import { FaSortNumericUp } from 'react-icons/fa';
import { Link as ScrollLink } from "react-scroll"

interface CardProps {
    title: string,
    color: string,
    borderColor: string,
    icon: IconType | LucideIcon,
    isActive: boolean
}

const FloatingHearts = ({ isVisible }: { isVisible: boolean }) => {
    if (!isVisible) return null;
    
    const elements = ['❤️', '✨', '💖', '💘', '💝'];
    
    return Array.from({ length: 20 }).map((_, index) => (
        <motion.div
            key={index}
            initial={{
                opacity: 0,
                scale: 0,
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
            }}
            animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.2, 0],
                y: [0, -150],
                rotate: [0, 360],
            }}
            transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: Math.random() * 2,
            }}
            className="absolute text-purple-400/40 text-lg"
        >
            {elements[Math.floor(Math.random() * elements.length)]}
        </motion.div>
    ));
};

const CalculatorCard = ({ title, color, borderColor, icon: IconType, isActive }: CardProps) => (
    <motion.div
        className={`p-4 rounded-xl backdrop-blur-sm shadow bg-white/10 border ${borderColor}
            ${color} ${isActive ? 'scale-110' : ''} transition-transform duration-300`}
        whileHover={{ scale: 1.15 }}
        animate={isActive ? { scale: 1.1 } : { scale: 1 }}
        transition={{ duration: 0.3 }}
    >
        <div className="flex flex-col items-center gap-2">
            <IconType className="w-5 h-5" />
            <span className="text-md font-medium">{title}</span>
        </div>
    </motion.div>
);

const NativeAdCard = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [matchPercent, setMatchPercent] = useState(0);

    const steps = [
        {
            id: "love-calculator",
            icon: Heart,
            title: "Classic Love Calculator",
            description: "Simple and classic way to test your love compatibility",
            gradient: "from-pink-50/30 to-pink-200/30",
            textColor: "text-pink-500",
            borderColor: "border-pink-200/50",
            cta: "Calculate Now"
        },
        {
            id: "zodiac-love-calculator",
            icon: Star,
            title: "Zodiac Love Compass",
            description: "Find love written in the stars",
            gradient: "from-purple-50/30 to-indigo-100/30",
            textColor: "text-indigo-600",
            borderColor: "border-indigo-200/50",
            cta: "Read Stars"
        },
        {
            id: "birthdate-compatibility",
            icon: Cake,
            title: "Birthday Love Match",
            description: "Find how your birth dates align in love",
            gradient: "from-green-50/30 to-emerald-100/30",
            textColor: "text-green-600",
            borderColor: "border-green-200/50",
            cta: "Match Dates"
        },
        {
            id: "soulmate-calculator",
            icon: Search,
            title: "Soulmate Finder",
            description: "Connect with your destined partner",
            gradient: "from-rose-50/30 to-red-100/30",
            textColor: "text-rose-600",
            borderColor: "border-rose-200/50",
            cta: "Find Love"
        },
        {
            id: "love-quiz",
            icon: Brain,
            title: "Quiz Compatibility",
            description: "Test your compatibility through fun questions",
            gradient: "from-purple-50/30 to-pink-100/30",
            textColor: "text-purple-600",
            borderColor: "border-purple-200/50",
            cta: "Start Quiz"
        },
        {
            id: "numerology-love-calculator",
            icon: FaSortNumericUp,
            title: "Numerology",
            description: "Discover your spiritual love connection through numbers",
            gradient: "from-blue-50/30 to-yellow-50/30",
            textColor: "text-blue-600",
            borderColor: "border-blue-200/50",
            cta: "Reveal Numbers"
        },
        
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [steps.length]);

    useEffect(() => {
        const timer = setInterval(() => {
            setMatchPercent(prev => (prev + 1) % 100);
        }, 50);
        return () => clearInterval(timer);
    }, []);

    const StepIcon = steps[activeStep].icon;

    return (
        <motion.div
            className="w-full py-8 px-4 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto relative overflow-hidden rounded-3xl backdrop-blur-lg bg-gradient-to-br from-purple-50/40 via-pink-50/40 to-rose-50/40 border border-white/30">
                <FloatingHearts isVisible={isHovered} />
                
                <div className="grid md:grid-cols-12 gap-8 p-8 items-center">
                    <div className="md:col-span-8 space-y-8">
                        <div className="grid grid-cols-3 gap-4 highlight-mini">
                            {steps.map((calc, index) => (
                                <CalculatorCard 
                                    key={index}
                                    title={calc.title.split(' ')[0]}
                                    color={`bg-gradient-to-br ${calc.gradient} ${calc.textColor}`}
                                    borderColor={calc.borderColor}
                                    icon={calc.icon}
                                    isActive={activeStep === index}
                                />
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-4 bg-white/50 rounded-lg p-4 shadow-lg"
                            >
                                <h2 className={`${steps[activeStep].textColor} text-3xl font-bold highlight`}>
                                    {steps[activeStep].title}
                                </h2>
                                <p className={`${steps[activeStep].textColor} highlight-mini text-xl`}>
                                    {steps[activeStep].description}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        <ScrollLink 
                            to={steps[activeStep].id}
                            smooth={true}
                            duration={500}
                            offset={-100}
                            className="inline-block cursor-pointer"
                        >
                            <motion.div
                                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <StepIcon className="w-6 h-6" />
                                <span>{steps[activeStep].cta}</span>
                                <ChevronRight className="w-6 h-6" />
                            </motion.div>
                        </ScrollLink>
                    </div>

                    <div className="md:col-span-4">
                        <motion.div 
                            className="relative rounded-2xl overflow-hidden bg-white/20 backdrop-blur-sm border border-white/30 p-6"
                            whileHover={{ scale: 1.02 }}
                            onHoverStart={() => setIsHovered(true)}
                            onHoverEnd={() => setIsHovered(false)}
                        >
                            <div className="text-center space-y-4">
                                <motion.div 
                                    className="text-6xl highlight font-bold text-pink-500"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    {matchPercent}%
                                </motion.div>
                                <div className="text-purple-800 font-medium">Love Match</div>
                                <motion.div
                                    className="flex justify-center text-rose-500"
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    <Heart className="w-12 h-12 fill-current" />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default NativeAdCard;
