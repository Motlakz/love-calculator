import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Github, Twitter } from "lucide-react";
import Logo from "./../assets/heartbeat.gif"
import LoveCalc from "./../assets/budget.png"
import Zodiac from "./../assets/astrology.png"
import Birthday from "./../assets/wedding-cost.png"
import Soulmate from "./../assets/understanding.png"
import Numerology from "./../assets/numerology.png"
import LoveQuiz from "./../assets/heart.png"

const calculators = [
    { name: 'Love Calculator', path: '/love/blog', imgUrl: LoveCalc },
    { name: 'Zodiac Love Calculator', path: '/zodiac/blog', imgUrl: Zodiac },
    { name: 'Birthdate Compatibility', path: '/birthdate/blog', imgUrl: Birthday },
    { name: 'Soulmate Calculator', path: '/soulmate/blog', imgUrl: Soulmate },
    { name: 'Love Quiz', path: '/quiz/blog', imgUrl: LoveQuiz },
    { name: 'Numerology Love Calculator', path: '/numerology/blog', imgUrl: Numerology },
];

const Footer: React.FC = () => {
    return (
        <footer className="bg-white/10 backdrop-filter backdrop-blur-lg border-t border-gray-200 border-opacity-25 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <Link to="/"><img className="h-8 w-8 mr-2" src={Logo} alt="Logo" /><h3 className="text-lg font-semibold text-pink-400">Love Test AI</h3></Link>
                        </div>
                        <p className="text-sm">
                            Discover your love compatibility with our suite of interactive calculators.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-pink-400">Our Calculators</h3>
                        <ul className="space-y-2">
                            {calculators.map((calc) => (
                                <li key={calc.path}>
                                    <Link to={calc.path} className="flex items-center hover:text-pink-400 transition-colors duration-200">
                                        <img src={calc.imgUrl} alt={calc.name} className="w-6 h-6 mr-2" />
                                        <span>{calc.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-pink-400">Connect With Us</h3>
                        <div className="flex space-x-4">
                            <Linkedin className="text-blue-400 hover:text-blue-300 cursor-pointer" />
                            <Github className="text-purple-400 hover:text-purple-300 cursor-pointer" />
                            <Twitter className="text-blue-400 hover:text-blue-300 cursor-pointer" />
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 border-opacity-50 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm">
                        © 2024 ★ Motlalepula Sello ★ All rights reserved.
                    </p>
                    <div className="mt-4 md:mt-0">
                        <Link to="/privacy-policy" className="text-sm hover:text-pink-400 transition-colors duration-200 mr-4">
                            Privacy Policy
                        </Link>
                        <Link to="/terms-of-service" className="text-sm hover:text-pink-400 transition-colors duration-200">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
