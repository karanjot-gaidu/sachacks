"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { GeneratedScenario, GeneratedTransaction, GeneratedEmail } from '../api/generate-scenario/route';

interface GameContextType {
    scenario: GeneratedScenario | null;
    loading: boolean;
    userGuesses: number[];
    markAsFraudulent: (transactionId: number) => void;
    unmarkAsFraudulent: (transactionId: number) => void;
    checkAnswer: () => { correct: boolean; message: string };
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
    const [scenario, setScenario] = useState<GeneratedScenario | null>(null);
    const [loading, setLoading] = useState(true);
    const [userGuesses, setUserGuesses] = useState<number[]>([]);

    useEffect(() => {
        fetchScenario();
    }, []);

    const fetchScenario = async () => {
        try {
            const response = await fetch('/api/generate-scenario');
            const data = await response.json();
            setScenario(data);
        } catch (error) {
            console.error('Error fetching scenario:', error);
        } finally {
            setLoading(false);
        }
    };

    const markAsFraudulent = (transactionId: number) => {
        setUserGuesses(prev => [...prev, transactionId]);
    };

    const unmarkAsFraudulent = (transactionId: number) => {
        setUserGuesses(prev => prev.filter(id => id !== transactionId));
    };

    const checkAnswer = () => {
        if (!scenario) return { correct: false, message: 'No scenario loaded' };

        const correctGuesses = userGuesses.every(guess => 
            scenario.fraudulentTransactionIds.includes(guess)
        );
        const allFound = scenario.fraudulentTransactionIds.every(id => 
            userGuesses.includes(id)
        );

        if (correctGuesses && allFound) {
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
            checkAnswer
        }}>
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