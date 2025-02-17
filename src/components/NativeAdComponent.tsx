import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Gift } from 'lucide-react';

interface NativeAdCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    cta: string;
    ctaLink: string;
    imageUrl: string;
}

const NativeAdCard = ({ 
    icon, 
    title, 
    description, 
    cta, 
    ctaLink, 
    imageUrl 
}: NativeAdCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div
                className="relative overflow-hidden backdrop-blur-lg bg-gradient-to-br from-purple-50/30 via-pink-50/30 to-indigo-50/30 border border-white/20 shadow-lg max-w-7xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div
                    className="absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"
                    animate={{
                        scale: isHovered ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                />
                
                <div className="relative p-4 sm:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        {/* Left Content Section */}
                        <div className="md:col-span-8 space-y-3">
                            <div className="flex items-center gap-2">
                                <motion.div
                                    animate={{ scale: isHovered ? 1.1 : 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {icon}
                                </motion.div>
                                <h3 className="text-lg sm:text-xl highlight font-semibold text-purple-200">
                                    {title}
                                </h3>
                            </div>

                            <p className="text-sm text-white max-w-xl">
                                {description}
                            </p>

                            <motion.a
                                href={ctaLink}
                                className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-sm hover:from-purple-600 hover:to-pink-600 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Gift className="w-4 h-4" />
                                <span>{cta}</span>
                                <ChevronRight className="w-4 h-4" />
                            </motion.a>

                            <div className="text-xs text-white">
                                Carefully selected products for love-minded individuals
                            </div>
                        </div>

                        {/* Right Image Section */}
                        <div className="md:col-span-4">
                            <motion.div 
                                className="relative aspect-square max-w-sm mx-auto rounded-lg overflow-hidden shadow-md"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img 
                                    src={imageUrl} 
                                    alt="Love products" 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default NativeAdCard;
