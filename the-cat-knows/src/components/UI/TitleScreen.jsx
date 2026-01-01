import { motion } from 'framer-motion';
import { Cat, MousePointer2 } from 'lucide-react';

export default function TitleScreen({ onStart }) {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-stone-100 text-stone-800">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <div className="flex items-center justify-center gap-4 mb-6">
                    <Cat size={64} className="text-orange-500" />
                    <h1 className="text-7xl font-bold tracking-tight">The Cat Knows</h1>
                </div>

                <p className="text-xl text-stone-500 mb-12 max-w-md mx-auto">
                    You are the toy. It is the hunter.<br />
                    Can you outsmart an AI that learns?
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onStart}
                    className="group relative px-8 py-4 bg-orange-500 text-white rounded-full text-2xl font-bold shadow-lg overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Start Playing <MousePointer2 size={24} />
                    </span>
                    <div className="absolute inset-0 bg-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </motion.button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                delay={1}
                className="absolute bottom-8 text-sm text-stone-400"
            >
                Move your cursor to survive.
            </motion.div>
        </div>
    );
}
