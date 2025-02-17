import React from 'react';
import { motion } from 'framer-motion';
import NumerologyLoveCalculator from '../components/NumerologyLoveCalculator';
import LoveQuizGlassmorphism from '../components/CompatibilityQuiz';
import SoulmateCalculator from '../components/SoulmateCalculator';
import BirthdateCompatibility from '../components/BirthdateCompatibility';
import ZodiacLoveCalculator from '../components/ZodiacLoveCalculator';
import LoveCalculator from '../components/LoveCalculator';
import GoogleAdComponent from '../components/GoogleAdComponent';
import GlassmorphicAd from '../components/AdComponent';
import NativeAdCard from '../components/NativeAdComponent';
import { anniversaryProducts, birthdayProducts, valentineProducts } from '../lib/ad';
import { Heart, Sparkles } from 'lucide-react';
import AnimatedNativeAdCard from '../components/AnimatedLoveTestAd';

interface HomeProps {
    handleComponentClick: (componentName: string) => void;
}

const Home: React.FC<HomeProps> = ({ handleComponentClick }) => {
    return (
        <>
            <motion.h1 
                className="highlight text-4xl font-bold text-center mt-24 text-gray-200"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Love Test AI
            </motion.h1>
            <p className="text-semibold text-xl text-center highlight mb-6 py-8 text-gray-300">
                Welcome to Love Test AI. The best, most interactive, and intuitive assortment of love calculators for your enjoyment!
            </p>
            <AnimatedNativeAdCard />
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                {/* Card 1: Romantic Gifts */}
                <NativeAdCard
                    icon={<Heart className="w-5 h-5 text-purple-500" fill="currentColor" />}
                    title="Write Your Love Story"
                    description="Discover amazing products that complement your love calculator experience. Perfect for couples and romance enthusiasts!"
                    cta="View Romantic Gifts"
                    ctaLink="https://amzn.to/4bbuqZl"
                    imageUrl="/butter_rose.jpg"
                />

                {/* Card 2: Self-Love and Personal Growth */}
                <NativeAdCard
                    icon={<Sparkles className="w-5 h-5 text-purple-500" fill="currentColor" />}
                    title="Celebrate Yourself"
                    description="Treat yourself to products that inspire self-love and personal growth. Because you deserve it!"
                    cta="Explore Self-love Gifts"
                    ctaLink="https://amzn.to/4b0AOTb"
                    imageUrl="/self_love.jpg"
                />
            </motion.div>
            <GoogleAdComponent />
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Calculator Left: Love Calculator */}
                <div id="love-calculator" onClick={() => handleComponentClick('LoveCalculator')}>
                    <LoveCalculator />
                </div>

                {/* Calculator Right: Zodiac Love Calculator */}
                <div id="zodiac-love-calculator" onClick={() => handleComponentClick('ZodiacLoveCalculator')}>
                    <ZodiacLoveCalculator />
                </div>
            </div>

            {/* Valentine’s Themed Ad */}
            <div className="col-span-2">
                <GlassmorphicAd
                    title="This Valentine’s, Let Love Do the Math!"
                    description="Surprise your special someone with a gift that speaks volumes. Check out these romantic picks to make this Valentine’s unforgettable."
                    cta="Find the Perfect Gift ❤️"
                    products={valentineProducts}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Calculator Left: Birthdate Compatibility */}
                <div id="birthdate-compatibility" onClick={() => handleComponentClick('BirthdateCompatibility')}>
                    <BirthdateCompatibility />
                </div>

                {/* Calculator Right: Soulmate Calculator */}
                <div id="soulmate-calculator" onClick={() => handleComponentClick('SoulmateCalculator')}>
                    <SoulmateCalculator />
                </div>
            </div>

            {/* Birthday Themed Ad */}
            <div className="col-span-2">
                <GlassmorphicAd
                    title="Celebrate Their Birthday with Love!"
                    description="Make their birthday extra special with gifts that show how much you care. Discover thoughtful presents for every zodiac sign."
                    cta="Shop Birthday Gifts 🎁"
                    products={birthdayProducts}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Calculator Left: Love Quiz */}
                <div id="love-quiz" onClick={() => handleComponentClick('LoveQuizGlassmorphism')}>
                    <LoveQuizGlassmorphism />
                </div>

                {/* Calculator Right: Numerology Love Calculator */}
                <div id="numerology-love-calculator" onClick={() => handleComponentClick('NumerologyLoveCalculator')}>
                    <NumerologyLoveCalculator />
                </div>
            </div>

            {/* Anniversary Themed Ad */}
            <div className="col-span-2">
                <GlassmorphicAd
                    title="Another Year of Love, Another Reason to Celebrate!"
                    description="Anniversaries are milestones of love. Find the perfect gift to celebrate your journey together."
                    cta="Explore Anniversary Gifts 💝"
                    products={anniversaryProducts}
                />
            </div>
        </>
    );
};

export default Home;
