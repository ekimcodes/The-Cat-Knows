import { useState, useEffect } from 'react';
import { useCursorTracker } from '../hooks/useCursorTracker';
import { useCatAI } from '../hooks/useCatAI';
import { Cat } from './Cat';
import HUD from './UI/HUD';
import { X, Rat } from 'lucide-react';

export default function GameCanvas({ onEndGame }) {
    const { mousePos, history } = useCursorTracker();
    const [score, setScore] = useState(0);
    // IsPlaying logic: true = game active. false = paused/caught. "Ended" is separate.
    const [isPaused, setIsPaused] = useState(false);

    // We start playing immediately
    const [playTime, setPlayTime] = useState(0); // seconds

    // Timer
    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setPlayTime(t => t + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [isPaused]);

    // Determine Phase
    // For manual testing, shortened times: P1:0-10s, P2:10-30s, P3:30-60s, P4:60s+
    // REAL PRD: P1:0-120s, P2:120-300s, P3:300-600s, P4:600s+
    let phase = 1;
    if (playTime > 60) phase = 4;
    else if (playTime > 30) phase = 3;
    else if (playTime > 10) phase = 2; // Accelerated for demo

    const handleCatch = () => {
        if (isPaused) return;

        setIsPaused(true); // Pause cat
        setScore(curr => curr + 1);

        // Brief pause then resume
        setTimeout(() => {
            setIsPaused(false);
        }, 1000);
    };

    const { catPos, catState } = useCatAI({
        targetPos: mousePos,
        history,
        phase,
        onCatch: handleCatch,
        isPlaying: !isPaused
    });

    const finishGame = () => {
        onEndGame({ score, time: playTime });
    };

    return (
        <div className="w-full h-full relative overflow-hidden bg-stone-100 cursor-none">
            <HUD score={score} time={playTime} phase={phase} />

            {/* End Game Button (Manual) */}
            <button
                onClick={finishGame}
                className="absolute top-6 right-6 p-2 bg-white/50 hover:bg-white rounded-full text-stone-400 hover:text-red-500 transition-colors z-[60] cursor-pointer"
            >
                <X size={24} />
            </button>

            {/* The Mouse "Toy" visual */}
            <div
                className="absolute pointer-events-none z-[100] text-stone-700"
                style={{
                    left: mousePos.x,
                    top: mousePos.y,
                    transform: 'translate(-50%, -50%)'
                }}
            >
                {/* Custom SVG Mouse */}
                <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Ears */}
                    <circle cx="30" cy="30" r="15" fill="#57534e" />
                    <circle cx="70" cy="30" r="15" fill="#57534e" />
                    <circle cx="30" cy="30" r="10" fill="#a8a29e" />
                    <circle cx="70" cy="30" r="10" fill="#a8a29e" />

                    {/* Body */}
                    <path d="M20 50 C 20 20, 80 20, 80 50 C 80 80, 50 95, 50 95 C 50 95, 20 80, 20 50" fill="#78716c" />

                    {/* Eyes */}
                    <circle cx="38" cy="45" r="4" fill="black" />
                    <circle cx="62" cy="45" r="4" fill="black" />
                    <circle cx="40" cy="44" r="1.5" fill="white" />
                    <circle cx="64" cy="44" r="1.5" fill="white" />

                    {/* Nose & Whiskers */}
                    <circle cx="50" cy="65" r="5" fill="#fca5a5" />
                    <path d="M30 65 L 10 60" stroke="#44403c" strokeWidth="2" strokeLinecap="round" />
                    <path d="M30 68 L 10 70" stroke="#44403c" strokeWidth="2" strokeLinecap="round" />
                    <path d="M70 65 L 90 60" stroke="#44403c" strokeWidth="2" strokeLinecap="round" />
                    <path d="M70 68 L 90 70" stroke="#44403c" strokeWidth="2" strokeLinecap="round" />

                    {/* Tail */}
                    <path d="M50 95 Q 60 110, 80 100" stroke="#78716c" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
            </div>

            <Cat x={catPos.x} y={catPos.y} state={catState} />

            {/* Catch Flash */}
            {isPaused && (
                <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center animate-pulse z-40 pointer-events-none">
                    <h1 className="text-6xl font-black text-red-600 uppercase tracking-widest">Caught!</h1>
                </div>
            )}
        </div>
    );
}
