"use client";

import Phone from '../components/phone';
import GameLayout from '../components/game-layout';

export default function PlayPage() {
    return (
        <main className="min-h-screen bg-[#0F0F0F] pt-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-center items-center">
                    <GameLayout>
                        <Phone />
                    </GameLayout>
                </div>
            </div>
        </main>
    );
}
