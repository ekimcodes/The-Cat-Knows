import { useState, useEffect } from 'react';

export function useCursorTracker() {
    const [mousePos, setMousePos] = useState({
        x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
        y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0
    });
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const newPos = { x: e.clientX, y: e.clientY };
            setMousePos(newPos);

            // Keep last 60 points for pattern recognition (future use)
            setHistory(prev => {
                const newHistory = [...prev, { ...newPos, t: Date.now() }];
                if (newHistory.length > 60) newHistory.shift();
                return newHistory;
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return { mousePos, history };
}
