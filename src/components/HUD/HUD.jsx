import React from 'react';
import TimerDisplay from './TimerDisplay';
import { StatsCard } from './StatsCard';

const HUD = () => {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none', // Allow clicking through to 3D scene if needed (though scene is background)
            zIndex: 10,
            padding: 'max(20px, 4vw)'
        }}>
            {/* Top Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', pointerEvents: 'auto' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '1px' }}>ANTIGRAVITY</div>
                <StatsCard />
            </div>

            {/* Center */}
            <div style={{ pointerEvents: 'auto' }}>
                <TimerDisplay />
            </div>

            {/* Decorative Connection Lines (SVG Overlay) */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.3 }}>
                {/* Simple line connecting center to top right stats */}
                <path d="M 50% 50% C 60% 50%, 80% 20%, 90% 10%" stroke="var(--color-focus)" fill="none" strokeWidth="1" />
            </svg>
        </div>
    );
};

export default HUD;
