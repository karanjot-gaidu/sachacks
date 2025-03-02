"use client";

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 bg-[#0F0F0F] flex items-center justify-center z-50">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-[#008170] border-r-4 border-r-transparent mb-4"></div>
                <h2 className="text-white text-2xl font-semibold mb-2">Generating Game</h2>
                <p className="text-gray-400">Creating a unique scenario for you...</p>
            </div>
        </div>
    );
} 