import { motion } from 'framer-motion';
import { Cat as CatIcon } from 'lucide-react';

export function Cat({ x, y, state }) {
    return (
        <motion.div
            className="absolute text-orange-600 z-10 pointer-events-none"
            style={{
                left: 0,
                top: 0,
                x: x - 24, // Center offset (icon is ~48px?)
                y: y - 24,
            }}
            transition={{ type: "tween", duration: 0 }} // Direct control
        >
            <div className="relative">
                <CatIcon size={48} strokeWidth={2} />
                {state === 'idle' && (
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-1 rounded opacity-50">?</span>
                )}
            </div>
        </motion.div>
    );
}
