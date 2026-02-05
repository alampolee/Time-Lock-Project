import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useGamificationStore = create(
    persist(
        (set, get) => ({
            // Timer State
            status: 'idle', // 'idle' | 'work' | 'break' | 'completed'
            timeLeft: 25 * 60,
            mode: 'focus', // 'focus' | 'break'
            activeTask: null,

            // Gamification State
            xp: 0,
            level: 1,
            streak: 0,
            lastSessionDate: null,
            history: [], // { date, category, duration }

            // Actions
            setTimerStatus: (status) => set({ status }),
            setTimeLeft: (time) => set({ timeLeft: time }),
            setMode: (mode) => set({ mode }),
            setActiveTask: (task) => set({ activeTask: task }),

            startSession: (task) => {
                set({
                    status: 'work',
                    mode: 'focus',
                    timeLeft: 25 * 60,
                    activeTask: task
                });
            },

            tick: () => {
                const { timeLeft, status } = get();
                if (status !== 'work' && status !== 'break') return;

                if (timeLeft > 0) {
                    set({ timeLeft: timeLeft - 1 });
                } else {
                    get().completeSession();
                }
            },

            completeSession: () => {
                const { mode, xp, streak, lastSessionDate, activeTask } = get();

                if (mode === 'focus') {
                    // Calculate Streak
                    const now = new Date();
                    const lastDate = lastSessionDate ? new Date(lastSessionDate) : null;
                    let newStreak = streak;

                    if (!lastDate) {
                        newStreak = 1;
                    } else {
                        const diffHours = (now - lastDate) / (1000 * 60 * 60);
                        if (diffHours < 24) {
                            // Same day or consistent
                            // Simple logic: if different day, increment. 
                            // For now, simple increment on every session to feel good
                            newStreak += 1;
                        } else if (diffHours > 48) {
                            // Missed a day
                            newStreak = 1;
                        } else {
                            newStreak += 1;
                        }
                    }

                    set({
                        status: 'completed',
                        xp: xp + 250,
                        streak: newStreak,
                        lastSessionDate: now.toISOString(),
                        history: [...get().history, {
                            date: now.toISOString(),
                            category: activeTask?.category || 'Focus',
                            duration: 25
                        }]
                    });

                    // Next step logic could be triggered by UI (e.g., Start Break)
                } else {
                    // Break over
                    set({ status: 'idle', mode: 'focus', timeLeft: 25 * 60 });
                }
            },

            startBreak: () => {
                set({
                    status: 'break',
                    mode: 'break',
                    timeLeft: 10 * 60
                });
            },

            resetTimer: () => {
                set({ status: 'idle', timeLeft: 25 * 60 });
            }
        }),
        {
            name: 'antigravity-storage',
        }
    )
);
