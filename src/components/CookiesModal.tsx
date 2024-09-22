import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWindowClose } from 'react-icons/fa';

const CookiesModal: React.FC<{ onAccept: () => void; onDecline: () => void }> = ({ onAccept, onDecline }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');
        const reloadCount = parseInt(localStorage.getItem('reloadCount') || '0');

        if (cookiesAccepted === null || reloadCount % 3 === 0) {
            setIsVisible(true);
        }

        localStorage.setItem('reloadCount', (reloadCount + 1).toString());
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookiesAccepted', 'true');
        setIsVisible(false);
        onAccept();
    };

    const handleDecline = () => {
        localStorage.setItem('cookiesAccepted', 'false');
        setIsVisible(false);
        onDecline();
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    const AnimatedCookie = () => {
        return (
            <motion.div
                className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-4xl relative overflow-hidden"
                animate={{
                    rotate: [0, 10, -10, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                🍪
                <motion.div
                    className="absolute w-2 h-2 bg-brown-600 rounded-full"
                    animate={{
                        x: [0, 5, -5, 0],
                        y: [0, -5, 5, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute w-2 h-2 bg-brown-600 rounded-full"
                    animate={{
                        x: [0, -5, 5, 0],
                        y: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </motion.div>
        );
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-10 min-h-screen bg-gradient-to-br from-pink-300/70 via-rose-300/70 to-indigo-300/70 flex items-center justify-center"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="max-w-md relative text-center w-full p-8 rounded-3xl bg-gradient-to-br from-pink-100 to-indigo-100 shadow-[10px_10px_30px_#bebebe,-10px_-10px_30px_#ffffff]"
                    >
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleClose}
                            className="absolute right-4 top-4 text-2xl rounded-md text-gray-500 hover:text-pink-400"
                        >
                            <FaWindowClose />
                        </motion.button>

                        <div className="mb-6 flex justify-center">
                            <AnimatedCookie />
                        </div>
                        <motion.h2
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl font-bold mb-4 text-pink-600"
                        >
                            We use cookies!
                        </motion.h2>
                        <motion.p
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mb-6 text-gray-700"
                        >
                            We use cookies to improve your experience on our site. By accepting, you agree to our use of cookies.
                        </motion.p>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex justify-center space-x-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleAccept}
                                className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-semibold shadow-lg backdrop-blur-md bg-opacity-30 hover:bg-opacity-50 transition duration-300"
                            >
                                Accept
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleDecline}
                                className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 text-white font-semibold shadow-lg backdrop-blur-md bg-opacity-30 hover:bg-opacity-50 transition duration-300"
                            >
                                Decline
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default CookiesModal;
