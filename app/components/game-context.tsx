"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { GeneratedScenario } from '../api/generate-scenario/route';
import LoadingScreen from './loading-screen';
import { Achievement, ACHIEVEMENTS, AchievementPopup } from './achievements';
import confetti from 'canvas-confetti';

interface GameContextType {
    scenario: GeneratedScenario | null;
    loading: boolean;
    userGuesses: number[];
    markAsFraudulent: (transactionId: number) => void;
    unmarkAsFraudulent: (transactionId: number) => void;
    checkAnswer: () => { correct: boolean; message: string };
    generateNewGame: () => Promise<void>;
    isGenerating: boolean;
    achievements: Achievement[];
    showAchievement: Achievement | null;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
    const [scenario, setScenario] = useState<GeneratedScenario | null>(null);
    const [loading, setLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const [userGuesses, setUserGuesses] = useState<number[]>([]);
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);

    useEffect(() => {
        // Check if we have a saved scenario in localStorage
        const savedScenario = localStorage.getItem('bankingScenario');
        if (savedScenario) {
            setScenario(JSON.parse(savedScenario));
            setLoading(false);
        } else {
            generateNewGame();
        }
    }, []);

    useEffect(() => {
        // Load achievements from localStorage
        const savedAchievements = localStorage.getItem('achievements');
        if (savedAchievements) {
            setAchievements(JSON.parse(savedAchievements));
        }
    }, []);

    const generateNewGame = async () => {
        setIsGenerating(true);
        try {
            const response = await fetch('/api/generate-scenario');
            const data = await response.json();
            setScenario(data);
            // Save to localStorage
            localStorage.setItem('bankingScenario', JSON.stringify(data));
            // Reset user guesses
            setUserGuesses([]);
        } catch (error) {
            console.error('Error generating new game:', error);
        } finally {
            setIsGenerating(false);
            setLoading(false);
        }
    };

    const markAsFraudulent = (transactionId: number) => {
        setUserGuesses(prev => [...prev, transactionId]);
    };

    const unmarkAsFraudulent = (transactionId: number) => {
        setUserGuesses(prev => prev.filter(id => id !== transactionId));
    };

    const awardAchievement = (achievementType: keyof typeof ACHIEVEMENTS) => {
        const achievement = {
            ...ACHIEVEMENTS[achievementType],
            dateEarned: new Date().toISOString()
        };

        setAchievements(prev => {
            if (prev.some(a => a.id === achievement.id)) return prev;
            const newAchievements = [...prev, achievement];
            localStorage.setItem('achievements', JSON.stringify(newAchievements));
            return newAchievements;
        });

        setShowAchievement(achievement);
        setTimeout(() => setShowAchievement(null), 3000);
    };

    const checkAnswer = () => {
        if (!scenario) return { correct: false, message: 'No scenario loaded' };

        const correctGuesses = userGuesses.every(guess => 
            scenario.fraudulentTransactionIds.includes(guess)
        );
        const allFound = scenario.fraudulentTransactionIds.every(id => 
            userGuesses.includes(id)
        );

        // Add a check to prevent multiple awards for the same completion
        const isGameComplete = correctGuesses && allFound;
        const isFirstCompletion = !achievements.some(a => 
            a.id === ACHIEVEMENTS.FIRST_GAME.id || 
            a.id === ACHIEVEMENTS.PERFECT_SCORE.id
        );

        if (isGameComplete && isFirstCompletion) {
            // Only award achievements on first completion
            if (!achievements.some(a => a.id === ACHIEVEMENTS.FIRST_GAME.id)) {
                awardAchievement('FIRST_GAME');
            }
            if (userGuesses.length === scenario.fraudulentTransactionIds.length &&
                !achievements.some(a => a.id === ACHIEVEMENTS.PERFECT_SCORE.id)) {
                awardAchievement('PERFECT_SCORE');
            }
        }

        if (isGameComplete) {
            return { 
                correct: true, 
                message: "Congratulations! You've identified all fraudulent transactions!" 
            };
        } else if (correctGuesses) {
            return { 
                correct: false, 
                message: "You're on the right track, but there are more fraudulent transactions to find." 
            };
        } else {
            return { 
                correct: false, 
                message: 'Some of your selections are incorrect. Review the emails carefully.' 
            };
        }
    };

    return (
        <GameContext.Provider value={{
            scenario,
            loading,
            userGuesses,
            markAsFraudulent,
            unmarkAsFraudulent,
            checkAnswer,
            generateNewGame,
            isGenerating,
            achievements,
            showAchievement
        }}>
            {isGenerating && <LoadingScreen />}
            {showAchievement && <AchievementPopup achievement={showAchievement} />}
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
} 