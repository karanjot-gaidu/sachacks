"use client";

import { useState, useEffect } from 'react';
import Banking from './banking';
import Email from './email';
import Homescreen from './homescreen';
import { useGame } from './game-context';
import VictoryScreen from './victory-screen';
import confetti from 'canvas-confetti';

export default function Phone() {
    const [currentApp, setCurrentApp] = useState<string | null>(null);
    const { generateNewGame, scenario, userGuesses } = useGame();
    const [showVictory, setShowVictory] = useState(false);

    // Check for victory condition
    useEffect(() => {
        if (scenario && userGuesses.length > 0) {
            const correctGuesses = userGuesses.every(guess => 
                scenario.fraudulentTransactionIds.includes(guess)
            );
            const allFound = scenario.fraudulentTransactionIds.every(id => 
                userGuesses.includes(id)
            );

            if (correctGuesses && allFound) {
                // Trigger victory celebration
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
                setShowVictory(true);
            }
        }
    }, [userGuesses, scenario]);

    const handleBack = () => {
        setCurrentApp(null);
    };

    const handleNewGame = () => {
        setShowVictory(false);
        generateNewGame();
        setCurrentApp(null);
    };

    const handleHome = () => {
        setShowVictory(false);
        setCurrentApp(null);
    };

    const renderApp = () => {
        switch (currentApp) {
            case 'banking':
                return <Banking onBack={handleBack} />;
            case 'email':
                return <Email onBack={handleBack} />;
            default:
                return <Homescreen onAppClick={setCurrentApp} />;
        }
    };

    return (
        <div className="relative">
            <div className="relative w-[950px] h-[630px] bg-[#1A1A1A] rounded-[50px] shadow-2xl overflow-hidden border-[14px] border-[#2A2A2A]">
                {/* Notch */}
                <div className="absolute top-1/2 right-0 transform translate-y-[-50%] w-[30px] h-[160px] bg-[#2A2A2A] rounded-l-[20px] flex items-center justify-center z-20">
                    <div className="w-[12px] h-[12px] bg-[#1A1A1A] rounded-full" />
                </div>

                {/* Status Bar */}
                <div className="relative h-8 flex items-center justify-between px-6 z-10 bg-[#1A1A1A]">
                    <span className="text-white text-sm">{new Date().toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                    })}</span>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-white">WiFi 📶</span>
                        <span className="text-white">100% 🔋</span>
                    </div>
                </div>

                {/* App Content */}
                <div className="relative h-[calc(100%-2rem)] bg-[#1A1A1A]">
                    {renderApp()}
                </div>

                {showVictory && (
                    <VictoryScreen 
                        onNewGame={handleNewGame}
                        onHome={handleHome}
                    />
                )}
            </div>
            
            {/* New Game Button */}
            <button
                onClick={generateNewGame}
                className="absolute bottom-4 right-4 bg-[#005B41] hover:bg-[#008170] text-white rounded-full p-4 shadow-lg transition-colors duration-300 flex items-center gap-2"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                New Game
            </button>
        </div>
    );
}
