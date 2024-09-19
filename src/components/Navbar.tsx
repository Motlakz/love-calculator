import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from "./../assets/heartbeat.gif";
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const calculators = [
        { name: 'Love Calculator', id: 'love-calculator' },
        { name: 'Zodiac Love Calculator', id: 'zodiac-love-calculator' },
        { name: 'Birthdate Compatibility', id: 'birthdate-compatibility' },
        { name: 'Soulmate Calculator', id: 'soulmate-calculator' },
        { name: 'Love Quiz', id: 'love-quiz' },
        { name: 'Numerology Love Calculator', id: 'numerology-love-calculator' }
    ];

    const scrollToCalculator = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('navbar-scrolled');
                } else {
                    navbar.classList.remove('navbar-scrolled');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav 
            id="navbar" 
            className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-400/20 to-pink-400/20 rounded-b-3xl backdrop-filter backdrop-blur-lg border-b border-white/20 transition-all duration-300"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <motion.div 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Link to="/" className="flex items-center highlight"><img className="h-8 w-8 mr-2" src={Logo} alt="Logo" /><h3 className="text-lg font-semibold text-pink-400">Love Test AI</h3></Link>
                    </motion.div>

                    <div className="hidden md:flex space-x-4">
                        {calculators.map((calc) => (
                            <motion.button
                                key={calc.id}
                                onClick={() => scrollToCalculator(calc.id)}
                                className="text-white font-semibold hover:bg-purple-500/40 hover:text-pink-100 px-3 py-2 rounded-md text-sm transition duration-300"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {calc.name}
                            </motion.button>
                        ))}
                    </div>

                    <div className="flex items-center">
                        <motion.button
                            className="md:hidden text-white p-2 rounded-full hover:bg-white hover:text-pink-500 transition duration-300"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isMenuOpen ? <FaTimes /> : <FaBars />}
                        </motion.button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <div className="bg-indigo-500/10 p-4">
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden rounded-b-xl bg-gradient-to-r from-pink-400/90 to-indigo-400/90 backdrop-filter backdrop-blur-lg"
                        >
                            {calculators.map((calc) => (
                                <motion.button
                                    key={calc.id}
                                    onClick={() => scrollToCalculator(calc.id)}
                                    className="block w-full text-left text-white hover:bg-white/50 hover:text-pink-500 px-4 py-2 transition duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {calc.name}
                                </motion.button>
                            ))}
                        </motion.div>
                    </div> 
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

export default Navbar;
