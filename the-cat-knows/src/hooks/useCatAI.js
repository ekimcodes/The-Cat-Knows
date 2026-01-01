import { useState, useEffect, useRef } from 'react';
import { Strategies, selectStrategy } from '../ai/strategies';

const BASE_SPEED = 5.0;
const CATCH_RADIUS = 30;

export function useCatAI({ targetPos, history, phase, onCatch, isPlaying }) {
    const [catPos, setCatPos] = useState({ x: 100, y: 100 });
    const [catState, setCatState] = useState('idle');

    const catPosRef = useRef({ x: 100, y: 100 });
    const requestRef = useRef();

    // Refs for current inputs to avoid re-binding effect
    const inputsRef = useRef({ targetPos, history, phase });
    useEffect(() => {
        inputsRef.current = { targetPos, history, phase };
    }, [targetPos, history, phase]);

    useEffect(() => {
        const loop = () => {
            if (!isPlaying) return;

            const { targetPos: currTarget, history: currHistory, phase: currPhase } = inputsRef.current;
            const currentCat = catPosRef.current;

            // 1. Select Strategy
            const strategyName = selectStrategy(currPhase, currHistory);
            const strategyFn = Strategies[strategyName];

            // 2. Get Intended Target & Parameters
            const { target, speedMultiplier, state } = strategyFn(currentCat, currTarget, currHistory);

            // 3. Move towards target
            const dx = target.x - currentCat.x;
            const dy = target.y - currentCat.y;
            const distToTarget = Math.sqrt(dx * dx + dy * dy);

            // Check actual distance to MOUSE (not target) for catching
            const distToMouse = Math.sqrt(
                Math.pow(currTarget.x - currentCat.x, 2) +
                Math.pow(currTarget.y - currentCat.y, 2)
            );

            if (distToMouse < CATCH_RADIUS) {
                onCatch();
            } else if (distToTarget > 5) {
                const angle = Math.atan2(dy, dx);
                const speed = BASE_SPEED * speedMultiplier;

                currentCat.x += Math.cos(angle) * speed;
                currentCat.y += Math.sin(angle) * speed;

                setCatPos({ ...currentCat });
                setCatState(state);
            } else {
                // Reached target (e.g. stalking spot or just close enough)
                setCatState('idle');
            }

            requestRef.current = requestAnimationFrame(loop);
        };

        if (isPlaying) {
            requestRef.current = requestAnimationFrame(loop);
        }
        return () => cancelAnimationFrame(requestRef.current);
    }, [isPlaying]);

    return { catPos, catState };
}

