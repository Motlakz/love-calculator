import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Heart, Sparkles } from 'lucide-react';

const HeartConfetti = ({ isVisible }: { isVisible: boolean }) => {
    if (!isVisible) return null;
    
    return Array.from({ length: 50 }).map((_, index) => (
        <motion.div
            key={index}
            initial={{
                top: -20,
                left: `${Math.random() * 100}%`,
                scale: 0,
            }}
            animate={{
                top: '100vh',
                scale: 1,
                rotate: Math.random() * 360,
            }}
            exit={{
                opacity: 0,
                scale: 0,
            }}
            transition={{
                duration: Math.random() * 2 + 1,
                repeat: isVisible ? Infinity : 0,
                delay: Math.random() * 2,
            }}
            style={{
                position: 'fixed',
                width: '12px',
                height: '12px',
                pointerEvents: 'none',
                zIndex: 0,
            }}
            className="text-pink-500"
        >
            <Heart className="w-full h-full fill-current" />
        </motion.div>
    ));
};

const SupportPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const lastVisit = localStorage.getItem('lastVisit');
        const isReturnUser = !!lastVisit;
        
        localStorage.setItem('lastVisit', new Date().toISOString());
        
        const initialDelay = isReturnUser ? 60000 : 120000;
        
        const initialTimer = setTimeout(() => {
            setIsOpen(true);
            setIsVisible(true);
        }, initialDelay);

        const recurringTimer = setInterval(() => {
            setIsOpen(true);
            setIsVisible(true);
        }, 120000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(recurringTimer);
        };
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        // Wait for exit animation to complete before removing from DOM
        setTimeout(() => {
            setIsVisible(false);
        }, 300);
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 flex items-center justify-center z-50"
                >
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50"
                        onClick={handleClose}
                    />
                    <HeartConfetti isVisible={isOpen} />
                    
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-3xl p-8 max-w-md mx-4 relative z-10 shadow-2xl"
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                            className="absolute -top-8 left-[42%] transform -translate-x-1/2"
                        >
                            <Heart className="w-16 h-16 text-pink-500 fill-pink-500" />
                        </motion.div>

                        <div className="text-center mt-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                Found Your Perfect Match?
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Help us keep spreading love! Support our love-matching magic with a virtual coffee ☕
                            </p>

                            <motion.a
                                href="https://buymeacoffee.com/motlalepulasello"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="flex items-center gap-2">
                                    <Coffee className="w-5 h-5" />
                                    <span>Buy Me A Coffee</span>
                                    <Sparkles className="w-5 h-5" />
                                </div>
                            </motion.a>

                            <div className="mt-8">
                                <button
                                    onClick={handleClose}
                                    className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                                >
                                    Maybe Later
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SupportPopup;
