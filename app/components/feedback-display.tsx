"use client";

import { useGame } from './game-context';

export default function FeedbackDisplay() {
    const { checkAnswer } = useGame();
    const { correct, message } = checkAnswer();

    // Determine color scheme based on message type
    const getColorScheme = () => {
        if (correct) {
            return {
                bg: 'bg-[#008170]/20',
                border: 'border-[#008170]',
                text: 'text-[#008170]'
            };
        }
        if (message.includes("right track")) {
            return {
                bg: 'bg-yellow-900/20',
                border: 'border-yellow-600',
                text: 'text-yellow-500'
            };
        }
        return {
            bg: 'bg-red-900/20',
            border: 'border-red-800',
            text: 'text-red-400'
        };
    };

    const colors = getColorScheme();

    return (
        <div className="mt-8 w-full bg-[#232D3F] rounded-lg p-4 border border-[#008170] shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-2 text-center">Hint</h3>
            <div className={`p-4 rounded ${colors.bg} border ${colors.border}`}>
                <p className={`text-sm font-medium ${colors.text}`}>
                    {message}
                </p>
            </div>
        </div>
    );
} 