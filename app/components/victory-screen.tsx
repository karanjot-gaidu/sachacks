"use client";

interface VictoryScreenProps {
    onNewGame: () => void;
    onHome: () => void;
}

export default function VictoryScreen({ onNewGame, onHome }: VictoryScreenProps) {
    return (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-30">
            <div className="bg-[#232D3F] p-8 rounded-2xl border border-[#008170] shadow-lg max-w-md w-full mx-4 text-center">
                <div className="text-6xl mb-4">🏆</div>
                <h2 className="text-3xl font-bold text-white mb-4">Congratulations!</h2>
                <p className="text-gray-300 mb-8">
                    You've successfully identified all fraudulent transactions!
                </p>
                <div className="space-y-4">
                    <button
                        onClick={onNewGame}
                        className="w-full bg-[#008170] hover:bg-[#005B41] text-white py-3 px-6 rounded-lg transition-colors duration-300"
                    >
                        Start New Game
                    </button>
                    <button
                        onClick={onHome}
                        className="w-full bg-transparent hover:bg-[#2A2A2A] text-white py-3 px-6 rounded-lg border border-[#008170] transition-colors duration-300"
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        </div>
    );
} 