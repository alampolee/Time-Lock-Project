import React from 'react';
import { useGamificationStore } from '../../store/GamificationStore';
import GlassCard from '../GlassCard';

export const StatsCard = () => {
    const { xp, streak, level } = useGamificationStore();

    return (
        <GlassCard style={{ minWidth: '200px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ color: 'var(--color-text-dim)', fontSize: '0.9rem' }}>Level {level}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--color-streak)' }}>
                    <span>🔥</span>
                    <span>{streak}</span>
                </div>
            </div>

            <div style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{xp} XP</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)' }}>Total Focus</div>
            </div>

            {/* Mini Progress Bar */}
            <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                <div style={{
                    width: `${(xp % 1000) / 10}%`,
                    height: '100%',
                    background: 'var(--color-focus)',
                    borderRadius: '2px',
                    boxShadow: '0 0 10px var(--color-focus)'
                }} />
            </div>
        </GlassCard>
    );
};
