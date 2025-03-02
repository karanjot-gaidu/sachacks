"use client";

import Phone from '../components/phone';
import GameLayout from '../components/game-layout';
import Notepad from '../components/Notepad';
import FeedbackDisplay from '../components/feedback-display';

function PlayContent() {
    return (
        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
            <div className="space-y-4">
                <div className="hidden md:block mb-10 mt-5">
                    <Notepad />
                </div>
                <FeedbackDisplay />
            </div>
            <Phone />
        </div>
    );
}

export default function PlayPage() {
    return (
        <main className="min-h-screen bg-[#0F0F0F] pt-20 px-4">
            <div className="max-w-6xl mx-auto">
                <GameLayout>
                    <PlayContent />
                </GameLayout>
            </div>
        </main>
    );
}
