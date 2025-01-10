import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Menu, X, Calculator, Home, ChevronDown, Star, MoonStar, Infinity, Coffee } from 'lucide-react';
import Logo from "./../assets/heartbeat.gif";
import { FaRegGrinHearts } from 'react-icons/fa';
import { TbNumbers } from "react-icons/tb";
import { Button } from './ui/button';

const NavLink = motion(Link);
const NavButton = motion.button;

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCalculatorsOpen, setIsCalculatorsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const calculators = [
        { name: 'Love Calculator', id: 'love-calculator', icon: Heart },
        { name: 'Zodiac Love Calculator', id: 'zodiac-love-calculator', icon: Star },
        { name: 'Birthdate Compatibility', id: 'birthdate-compatibility', icon: MoonStar },
        { name: 'Soulmate Calculator', id: 'soulmate-calculator', icon: Infinity },
        { name: 'Love Quiz', id: 'love-quiz', icon: FaRegGrinHearts },
        { name: 'Numerology Love Calculator', id: 'numerology-love-calculator', icon: TbNumbers }
    ];

    const handleCalculatorClick = useCallback((id: string) => {
        setIsMenuOpen(false);
        setIsCalculatorsOpen(false);

        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: id } });
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [location.pathname, navigate]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                document.getElementById('navbar')?.classList.add('shadow-lg');
            } else {
                document.getElementById('navbar')?.classList.remove('shadow-lg');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            id="navbar"
            className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-400/20 to-pink-400/20 backdrop-blur-lg border-b border-white/20"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <NavLink
                        to="/"
                        className="flex items-center highlight"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <img className="h-8 w-8 mr-2" src={Logo} alt="Logo" /><h3 className="text-lg font-semibold text-pink-400">Love Test AI</h3>
                    </NavLink>

                    <div className="hidden md:flex items-center space-x-6">
                        <Button asChild className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <Link to="https://buymeacoffee.com/motlalepulasello" target="_blank" rel="noopener noreferrer">
                                <div className="flex items-center gap-2">
                                    <Coffee />
                                    <span>Buy Me A Coffee</span>
                                </div>
                            </Link>
                        </Button>
                        <NavLink
                            to="/"
                            className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg hover:bg-white/20 transition-colors duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Home className="w-4 h-4" />
                            <span>Home</span>
                        </NavLink>

                        <div className="relative">
                            <NavButton
                                className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg hover:bg-white/20 transition-colors duration-200"
                                onClick={() => setIsCalculatorsOpen(!isCalculatorsOpen)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Calculator className="w-4 h-4" />
                                <span>Love Testers</span>
                                <motion.div
                                    animate={{ rotate: isCalculatorsOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ChevronDown className="w-4 h-4" />
                                </motion.div>
                            </NavButton>

                            <AnimatePresence>
                                {isCalculatorsOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 mt-2 w-64 rounded-xl bg-gradient-to-r from-indigo-900/95 to-pink-900/95 backdrop-blur-lg shadow-xl border border-white/20"
                                    >
                                        {calculators.map((calc) => (
                                            <NavButton
                                                key={calc.id}
                                                onClick={() => handleCalculatorClick(calc.id)}
                                                className="flex items-center space-x-2 w-full px-4 py-3 text-left text-white hover:bg-white/20 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
                                                whileHover={{ x: 5 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <calc.icon className="w-4 h-4 text-pink-400" />
                                                <span>{calc.name}</span>
                                            </NavButton>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <NavButton
                        className="md:hidden p-2 text-white hover:bg-white/20 rounded-lg"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </NavButton>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden px-4 border-t border-white/10 bg-gradient-to-r from-indigo-900/95 to-pink-900/95 backdrop-blur-lg"
                    >
                        <motion.div
                            className="py-2 space-y-1"
                            variants={{
                                open: { transition: { staggerChildren: 0.07 } },
                                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                            }}
                        >
                            <NavLink
                                to="/"
                                className="flex items-center mb-6 space-x-2 w-full px-4 py-3 text-white hover:bg-white/20 transition-colors duration-200 rounded-lg"
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Home className="w-4 h-4" />
                                <span>Home</span>
                            </NavLink>
                            
                            {calculators.map((calc) => (
                                <NavButton
                                    key={calc.id}
                                    onClick={() => handleCalculatorClick(calc.id)}
                                    className="flex items-center space-x-2 w-full px-4 py-3 text-white hover:bg-white/20 transition-colors duration-200 rounded-lg"
                                    whileHover={{ x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <calc.icon className="w-4 h-4" />
                                    <span>{calc.name}</span>
                                </NavButton>
                            ))}
                        </motion.div>
                        <Button asChild className="my-8 w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <Link to="https://buymeacoffee.com/motlalepulasello" target="_blank" rel="noopener noreferrer">
                                <div className="flex items-center gap-2">
                                    <Coffee />
                                    <span>Buy Me A Coffee</span>
                                </div>
                            </Link>
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

export default Navbar;
