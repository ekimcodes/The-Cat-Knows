import { motion } from 'framer-motion';

export default function GameOverScreen({ score, time, onRestart }) {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-stone-900/90 text-white backdrop-blur-sm z-50 absolute inset-0">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center bg-stone-100 text-stone-900 p-12 rounded-3xl shadow-2xl max-w-lg w-full"
            >
                <h2 className="text-4xl font-bold mb-8">Session Ended</h2>

                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div className="flex flex-col">
                        <span className="text-stone-400 text-sm uppercase font-bold">Total Time</span>
                        <span className="text-3xl font-black">{Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-stone-400 text-sm uppercase font-bold">Times Caught</span>
                        <span className="text-3xl font-black text-red-500">{score}</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={onRestart}
                        className="w-full py-4 bg-orange-500 text-white rounded-xl text-xl font-bold hover:bg-orange-600 transition-colors shadow-lg cursor-pointer"
                    >
                        Play Again
                    </button>
                    <button
                        onClick={() => window.location.reload()} // Quick way to full reset
                        className="w-full py-2 text-stone-400 hover:text-stone-600 text-sm font-medium"
                    >
                        Return to Title
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
