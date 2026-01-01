import { motion, AnimatePresence } from 'framer-motion';

export default function HUD({ score, time, phase }) {
    // Format time mm:ss
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    const timeStr = `${mins}:${secs.toString().padStart(2, '0')}`;

    const phaseNames = ["Novice", "Learning", "Skilled", "Master"];

    return (
        <div className="absolute top-0 left-0 w-full p-8 pointer-events-none z-40 select-none flex justify-center">
            <div className="flex flex-col items-center bg-white/70 backdrop-blur-md px-12 py-6 rounded-3xl shadow-lg border border-white/60">
                <div className="flex items-center gap-16 mb-3">
                    {/* Time */}
                    <div className="flex flex-col items-center">
                        <span className="text-stone-500 text-xs uppercase tracking-widest font-black mb-1">Time</span>
                        <span className="text-4xl font-black text-stone-800 font-mono tracking-tight">{timeStr}</span>
                    </div>

                    {/* Divider */}
                    <div className="w-px h-12 bg-stone-300"></div>

                    {/* Score */}
                    <div className="flex flex-col items-center">
                        <span className="text-stone-500 text-xs uppercase tracking-widest font-black mb-1">Caught</span>
                        <motion.span
                            key={score}
                            initial={{ scale: 1.5, color: "#ef4444" }}
                            animate={{ scale: 1, color: "#292524" }}
                            className="text-5xl font-black text-stone-800 drop-shadow-sm"
                        >
                            {score}
                        </motion.span>
                    </div>
                </div>

                {/* Phase Badge */}
                <div className="flex items-center gap-2 bg-stone-900/5 px-4 py-1.5 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                        Phase {phase}: {phaseNames[phase - 1] || "God"}
                    </span>
                </div>
            </div>
        </div>
    );
}
