
// Helper to get vector magnitude
const mag = (v) => Math.sqrt(v.x * v.x + v.y * v.y);

// Helper to normalize
const norm = (v) => {
    const m = mag(v);
    return m === 0 ? { x: 0, y: 0 } : { x: v.x / m, y: v.y / m };
};

// Predict where the cursor will be in `frames` time
const predictPosition = (cursorPos, cursorHistory, frames = 30) => {
    if (cursorHistory.length < 5) return cursorPos;

    // Average velocity over last few points
    const p1 = cursorHistory[cursorHistory.length - 1];
    const p2 = cursorHistory[cursorHistory.length - 5];
    const dt = (p1.t - p2.t) / 1000; // seconds
    if (dt === 0) return cursorPos;

    const vx = (p1.x - p2.x) / dt;
    const vy = (p1.y - p2.y) / dt;

    // Look ahead 0.5 seconds (approx 30 frames)
    const timeAhead = frames / 60;

    return {
        x: cursorPos.x + vx * timeAhead,
        y: cursorPos.y + vy * timeAhead
    };
};

export const Strategies = {
    // Phase 1: Novice - Direct Chase
    directChase: (catPos, cursorPos) => {
        return { target: cursorPos, speedMultiplier: 1.0, state: 'chasing' };
    },

    // Phase 2: Learning - Predictive Chase
    predictiveChase: (catPos, cursorPos, history) => {
        const target = predictPosition(cursorPos, history, 25); // Look ahead more frames
        return { target, speedMultiplier: 1.1, state: 'chasing' }; // Faster than base
    },

    // Phase 3: Stalking - Stop if cursor looking, move slow
    stalking: (catPos, cursorPos, history) => {
        const dist = mag({ x: cursorPos.x - catPos.x, y: cursorPos.y - catPos.y });

        // If really close, pounce!
        if (dist < 200) { // Increased pounce range
            return { target: cursorPos, speedMultiplier: 3.0, state: 'pounce' }; // Explodes speed
        }

        // If cursor gets far, standard chase
        if (dist > 500) {
            return Strategies.predictiveChase(catPos, cursorPos, history);
        }

        // Stalk behavior: Move slowly towards target
        return { target: cursorPos, speedMultiplier: 0.6, state: 'stalking' }; // Faster stalk
    },

    // Phase 4: Intercept - Try to cut off
    intercept: (catPos, cursorPos, history) => {
        // Predict further ahead
        const target = predictPosition(cursorPos, history, 80);
        return { target, speedMultiplier: 1.4, state: 'chasing' }; // Very fast
    }
};

export const selectStrategy = (phase, history) => {
    // Simple logic for now
    if (phase === 1) return 'directChase';
    if (phase === 2) return 'predictiveChase';
    if (phase === 3) {
        // Mix stalking and prediction
        return Math.random() > 0.5 ? 'stalking' : 'predictiveChase';
    }
    if (phase === 4) return 'intercept';

    return 'directChase';
};
