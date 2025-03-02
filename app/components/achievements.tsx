"use client";

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    dateEarned: string;
    rarity: 'common' | 'rare' | 'legendary';
}

export const ACHIEVEMENTS = {
    FIRST_GAME: {
        id: 'first_game',
        name: 'First Case Solved',
        description: 'Successfully completed your first fraud detection case',
        icon: '🏆',
        rarity: 'common'
    },
    PERFECT_SCORE: {
        id: 'perfect_score',
        name: 'Perfect Detective',
        description: 'Identified all fraudulent transactions without any mistakes',
        icon: '🔍',
        rarity: 'rare'
    },
    SPEED_SOLVER: {
        id: 'speed_solver',
        name: 'Quick Thinker',
        description: 'Solved a case in under 2 minutes',
        icon: '⚡',
        rarity: 'legendary'
    },
    // Add more achievements as needed
} as const;

export function AchievementPopup({ achievement }: { achievement: Achievement }) {
    return (
        <div className="fixed top-4 right-4 bg-[#232D3F] p-4 rounded-lg shadow-lg border border-[#008170] animate-slideIn z-50">
            <div className="flex items-center gap-3">
                <div className="text-4xl">{achievement.icon}</div>
                <div>
                    <h3 className="text-white font-semibold">{achievement.name}</h3>
                    <p className="text-gray-400 text-sm">{achievement.description}</p>
                </div>
            </div>
        </div>
    );
}

export function AchievementsList({ achievements }: { achievements: Achievement[] }) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Achievements</h2>
            <div className="grid grid-cols-1 gap-4">
                {achievements.map((achievement) => (
                    <div 
                        key={achievement.id}
                        className="bg-[#1A1A1A] p-4 rounded-lg border border-[#008170]/30"
                    >
                        <div className="flex items-center gap-3">
                            <div className="text-3xl">{achievement.icon}</div>
                            <div>
                                <h3 className="text-white font-semibold">{achievement.name}</h3>
                                <p className="text-gray-400 text-sm">{achievement.description}</p>
                                <p className="text-[#008170] text-xs mt-1">
                                    Earned on {new Date(achievement.dateEarned).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 