import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, ProductPrice } from '../types/Products';
import { FaRegWindowClose } from 'react-icons/fa';

interface FloatingAffiliateShowcaseProps {
    products: Product[];
    scrollThreshold?: number;
    rotationInterval?: number;
    onProductClick?: (product: Product) => void;
    className?: string;
}

const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 100 }
};

const productVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
};

export const FloatingAffiliateShowcase: React.FC<FloatingAffiliateShowcaseProps> = ({ 
    products, 
    scrollThreshold = 200,
    rotationInterval = 3000,
    onProductClick,
    className = ''
}) => {
    const [isClosed, setIsClosed] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [currentProductIndex, setCurrentProductIndex] = useState<number>(0);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [themeMode, setThemeMode] = useState<number>(0);

    // Theme transition effect
    useEffect(() => {
        const themeInterval = setInterval(() => {
            setThemeMode(prev => (prev + 1) % 100);
        }, 100);

        return () => clearInterval(themeInterval);
    }, []);

    // Calculate theme-based values
    const isDarkMode = themeMode > 50;
    const transitionProgress = isDarkMode ? (themeMode - 50) / 50 : themeMode / 50;
    
    // Dynamic style calculation
    const getInterpolatedColor = (lightColor: string, darkColor: string) => {
        return isDarkMode ? darkColor : lightColor;
    };

    useEffect(() => {
        const handleScroll = (): void => {
            if (!isClosed) {  // Only update visibility if not manually closed
                setIsVisible(window.scrollY > scrollThreshold);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollThreshold, isClosed]);

    useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            setCurrentProductIndex((prev) => 
                prev === products.length - 1 ? 0 : prev + 1
            );
        }, rotationInterval);

        return () => clearInterval(interval);
    }, [products.length, rotationInterval, isHovered]);

    const handleClick = (product: Product): void => {
        onProductClick?.(product);
        window.open(product.affiliateLink, '_blank');
    };

    const formatPrice = (price: ProductPrice): string => {
        return price.formatted;
    };

    const handleClose = (e: React.MouseEvent): void => {
        e.stopPropagation();
        setIsClosed(true);
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && !isClosed && (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={`fixed bottom-8 right-8 z-50 ${className}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        style={{
                            background: `linear-gradient(to right, 
                                rgba(${isDarkMode ? '23, 23, 23' : '255, 255, 255'}, ${0.85 - transitionProgress * 0.1}), 
                                rgba(${isDarkMode ? '23, 23, 23' : '255, 255, 255'}, ${0.85 - transitionProgress * 0.1})
                            )`,
                            boxShadow: `0 8px 32px 0 rgba(31, 38, 135, ${0.2 + transitionProgress * 0.1})`,
                            backdropFilter: 'blur(10px)',
                            border: `1px solid rgba(255, 255, 255, ${isDarkMode ? 0.1 : 0.2})`,
                            transition: 'all 0.5s ease'
                        }}
                        className="rounded-lg p-6 max-w-sm w-full"
                    >
                        <motion.button
                            className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center rounded-full"
                            onClick={handleClose}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                                background: getInterpolatedColor('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)'),
                                color: getInterpolatedColor('#4b5563', '#e5e7eb'),
                            }}
                        >
                            <FaRegWindowClose />
                        </motion.button>
                        <div className="relative overflow-hidden">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="z-10 absolute top-2 right-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                                style={{
                                    background: `linear-gradient(to right, 
                                        ${getInterpolatedColor('#fb923c', '#ea580c')}, 
                                        ${getInterpolatedColor('#f97316', '#c2410c')}
                                    )`
                                }}
                            >
                                {formatPrice(products[currentProductIndex].price)}
                            </motion.div>

                            <motion.div
                                key={products[currentProductIndex].id}
                                variants={productVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                transition={{ duration: 0.5 }}
                            >
                                <img 
                                    src={products[currentProductIndex].image.url} 
                                    alt={products[currentProductIndex].image.alt}
                                    className="w-full h-60 object-fill rounded-lg mb-4 hover:opacity-90 transition-opacity"
                                    style={{
                                        filter: `brightness(${isDarkMode ? 0.9 : 1})`
                                    }}
                                />

                                <div className="space-y-2">
                                    <h3 
                                        className="text-xl font-semibold line-clamp-1"
                                        style={{
                                            color: getInterpolatedColor('#9a3412', '#fed7aa'),
                                            transition: 'color 0.5s ease'
                                        }}
                                    >
                                        {products[currentProductIndex].name}
                                    </h3>
                                    <p 
                                        className="text-sm line-clamp-2"
                                        style={{
                                            color: getInterpolatedColor('#c2410c', '#ffedd5'),
                                            transition: 'color 0.5s ease'
                                        }}
                                    >
                                        {products[currentProductIndex].description}
                                    </p>

                                    <motion.button 
                                        whileHover={{ y: -4 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleClick(products[currentProductIndex])}
                                        className="w-full text-white font-medium py-2 px-4 rounded-lg"
                                        style={{
                                            background: `linear-gradient(to right, 
                                                ${getInterpolatedColor('#f97316', '#ea580c')}, 
                                                ${getInterpolatedColor('#ea580c', '#c2410c')}
                                            )`,
                                            transition: 'background 0.5s ease'
                                        }}
                                    >
                                        Shop Now
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>

                        <div className="flex justify-center mt-4 space-x-2">
                            {products.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    className="h-2 w-2 rounded-full"
                                    style={{
                                        background: currentProductIndex === index 
                                            ? `linear-gradient(to right, 
                                                ${getInterpolatedColor('#f97316', '#ea580c')}, 
                                                ${getInterpolatedColor('#ea580c', '#c2410c')}
                                              )`
                                            : getInterpolatedColor('#d1d5db', '#4b5563'),
                                        transition: 'background 0.5s ease'
                                    }}
                                    initial={false}
                                    animate={{
                                        scale: currentProductIndex === index ? 1.2 : 1
                                    }}
                                />
                            ))}
                        </div>

                        {/* Amazon Affiliate Tag */}
                        <div 
                            className="text-center mt-4 text-xs bg-orange-500/10 p-1 rounded-sm"
                            style={{
                                color: getInterpolatedColor('#c2410c', '#fed7aa'),
                                transition: 'color 0.5s ease'
                            }}
                        >
                            Amazon Affiliate
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};