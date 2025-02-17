import { motion } from "framer-motion";

interface Product {
    imageUrl: string;
    title: string;
    affiliateLink: string;
}

interface AdProps {
    title: string;
    description: string;
    cta: string;
    products: Product[];
}

const GlassmorphicAd = ({ title, description, cta, products }: AdProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-white/10 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
            <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
                <p className="text-indigo-100 mb-4">{description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {products.map((product, index) => (
                        <a
                            key={index}
                            href={product.affiliateLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-white/10 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
                        >
                            <img
                                src={product.imageUrl}
                                alt={product.title}
                                className="max-w-lg w-full max-h-80 h-full object-fill"
                            />
                            <p className="text-center text-white p-2">{product.title}</p>
                        </a>
                    ))}
                </div>
                <a
                    href={products[0].affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-6 py-2 rounded-lg hover:from-indigo-600 hover:to-violet-600 transition-all duration-300"
                >
                    {cta}
                </a>
            </div>
        </motion.div>
    );
};

export default GlassmorphicAd;
