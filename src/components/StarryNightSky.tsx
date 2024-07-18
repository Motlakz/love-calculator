import React from 'react';
import { motion } from 'framer-motion';

const StarryNightSky: React.FC = () => {
    const stars = Array.from({ length: 100 }).map((_, index) => ({
        id: index,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden">
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        width: star.size,
                        height: star.size,
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                    }}
                />
            ))}
        </div>
    );
};

export default StarryNightSky;
