import React, { useState } from 'react';
import { useGamificationStore } from '../../store/GamificationStore';

const TimerDisplay = () => {
    const { timeLeft, status, startSession, startBreak } = useGamificationStore();
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

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

    const isActive = isHovered || isFocused;

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

            <button
                onClick={handleAction}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={{
                    background: isActive ? 'rgba(255,255,255,0.1)' : 'none',
                    border: isFocused ? '1px solid var(--color-focus)' : '1px solid var(--glass-border)',
                    color: 'var(--color-text)',
                    padding: '12px 32px',
                    borderRadius: '30px',
                    fontSize: '1rem',
                    letterSpacing: isActive ? '4px' : '2px',
                    cursor: 'pointer',
                    marginTop: '20px',
                    backdropFilter: 'blur(4px)',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: isFocused ? '0 0 20px rgba(47, 128, 237, 0.5)' : 'none'
                }}
            >
                {getButtonText()}
            </button>
        </div>
    );
};

export default TimerDisplay;
