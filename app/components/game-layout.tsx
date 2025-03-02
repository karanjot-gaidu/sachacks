"use client";

import { GameProvider } from './game-context';

export default function GameLayout({ children }: { children: React.ReactNode }) {
    return (
        <GameProvider>
            {children}
        </GameProvider>
    );
} 