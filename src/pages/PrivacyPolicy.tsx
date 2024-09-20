import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.1 
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { 
                type: "spring", 
                stiffness: 100 
            }
        }
    };

    return (
        <motion.div 
            className="privacy-policy min-h-screen p-6 bg-white/20 shadow-lg rounded-lg sm:my-24 mx-2 my-20 sm:mx-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h1 variants={itemVariants} className="text-3xl font-bold mb-6 text-indigo-200">Privacy Policy</motion.h1>
            <motion.p variants={itemVariants} className="text-sm text-gray-200 mb-6">Last updated: {new Date().toISOString().split('T')[0]}</motion.p>

            <motion.section variants={itemVariants} className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-indigo-300">1. Introduction</h2>
                <p className="text-white leading-relaxed">Welcome to our calculator application. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains our practices concerning the collection and use of data when you use our calculator.</p>
            </motion.section>

            <motion.section variants={itemVariants} className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-indigo-300">2. Information We Collect</h2>
                <p className="text-white leading-relaxed mb-4">We want to be clear that we collect very limited information:</p>
                <ul className="list-disc list-inside text-white space-y-2">
                    <li>We only collect data associated with the components of the calculator that you interact with.</li>
                    <li>We do not store or save any of the actual values or information you enter into the calculator.</li>
                </ul>
            </motion.section>

            <motion.section variants={itemVariants} className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-indigo-300">3. How We Use Information</h2>
                <p className="text-white leading-relaxed mb-4">The limited data we collect is used solely for the purpose of improving our calculator's functionality and user experience. This includes:</p>
                <ul className="list-disc list-inside text-white space-y-2">
                    <li>Analyzing which features of the calculator are most frequently used.</li>
                    <li>Identifying any technical issues or areas for improvement in the calculator's interface.</li>
                </ul>
            </motion.section>

            <motion.section variants={itemVariants} className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-indigo-300">4. Data Security</h2>
                <p className="text-white leading-relaxed mb-4">We take the security of your information seriously:</p>
                <ul className="list-disc list-inside text-white space-y-2">
                    <li>All calculations are performed locally on your device.</li>
                    <li>No personal data or calculation inputs are transmitted to our servers or stored by us.</li>
                </ul>
            </motion.section>

            <motion.section variants={itemVariants} className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-indigo-300">5. Your Rights</h2>
                <p className="text-white leading-relaxed">As we do not collect or store any personal information you enter, there is no personal data for you to access, modify, or delete. The interaction data we collect is anonymized and cannot be linked back to individual users.</p>
            </motion.section>

            <motion.section variants={itemVariants} className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-indigo-300">6. Changes to This Policy</h2>
                <p className="text-white leading-relaxed">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this policy.</p>
            </motion.section>
        </motion.div>
    )
}

export default PrivacyPolicy;
