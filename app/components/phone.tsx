"use client";

import { useState } from 'react';
import Banking from './banking';
import Email from './email';
import Homescreen from './homescreen';

export default function Phone() {
    const [currentApp, setCurrentApp] = useState<string | null>(null);

    const handleBack = () => {
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
        </div>
    );
}
