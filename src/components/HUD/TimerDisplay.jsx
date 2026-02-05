import React from 'react';
import { useGamificationStore } from '../../store/GamificationStore';
import { motion as Motion } from 'framer-motion';

const TimerDisplay = () => {
    const { timeLeft, status, startSession, startBreak } = useGamificationStore();

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleAction = () => {
        if (status === 'idle') {
            startSession({ category: 'Focus' }); // Default task for now
        } else if (status === 'work') {
            // Maybe pause? For now just let it run or complete early for debugging
            // completeSession();
        } else if (status === 'completed') {
            startBreak();
        } else if (status === 'break') {
            // End break
            startSession({ category: 'Focus' });
        }
    };

    const getButtonText = () => {
        switch (status) {
            case 'idle': return 'START FOCUS';
            case 'work': return 'FOCUSING...';
            case 'completed': return 'TAKE BREAK';
            case 'break': return 'BACK TO WORK';
            default: return 'START';
        }
    };

    return (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 10 }}>
            {/* Huge Timer */}
            <h1 style={{
                fontSize: 'clamp(3rem, 15vw, 6rem)',
                fontWeight: '300',
                margin: 0,
                color: status === 'break' ? 'var(--color-break)' : 'var(--color-focus)',
                textShadow: '0 0 40px rgba(47, 128, 237, 0.4)',
                width: '100vw' // Ensure it doesn't wrap weirdly
            }}>
                {formatTime(timeLeft)}
            </h1>

            <Motion.button
                onClick={handleAction}
                initial={{ letterSpacing: '2px', backgroundColor: 'rgba(255,255,255,0)' }}
                whileHover={{
                    scale: 1.05,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    letterSpacing: '4px'
                }}
                whileTap={{ scale: 0.95 }}
                whileFocus={{
                    scale: 1.05,
                    borderColor: 'var(--color-focus)',
                    boxShadow: '0 0 15px var(--color-focus)'
                }}
                style={{
                    background: 'none',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--color-text)',
                    padding: '12px 32px',
                    borderRadius: '30px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    marginTop: '20px',
                    backdropFilter: 'blur(4px)'
                }}
                aria-label={getButtonText()}
            >
                {getButtonText()}
            </Motion.button>
        </div>
    );
};

export default TimerDisplay;
