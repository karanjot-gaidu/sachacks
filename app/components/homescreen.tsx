"use client";

import Image from 'next/image';

interface App {
    id: string;
    name: string;
    icon: string;
    color: string;
}

interface HomescreenProps {
    onAppClick: (app: string) => void;
}

export default function Homescreen({ onAppClick }: HomescreenProps) {
    const apps = [
        { id: 'banking', name: 'Banking', icon: '🏦' },
        { id: 'email', name: 'Email', icon: '✉️' },
        { id: 'calendar', name: 'Calendar', icon: '📅' },
        { id: 'photos', name: 'Photos', icon: '📸' },
        { id: 'messages', name: 'Messages', icon: '💬' },
        { id: 'settings', name: 'Settings', icon: '⚙️' },
    ];

    return (
        <div 
            className="h-full relative overflow-hidden"
            style={{
                backgroundImage: "url('/background.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Dark overlay for better visibility */}
            <div className="absolute inset-0 bg-black/30">
            
            {/* Apps Grid */}
            <div className="relative z-[2] grid grid-cols-4 gap-8 p-8">
                {apps.map(app => (
                    <button
                        key={app.id}
                        onClick={() => onAppClick(app.id)}
                        className="flex flex-col items-center space-y-2 hover:scale-105 transition-transform"
                    >
                        <div className="w-16 h-16 bg-[#2A2A2A]/80 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                            {app.icon}
                        </div>
                        <span className="text-white text-sm font-medium drop-shadow-lg">
                            {app.name}
                        </span>
                    </button>
                ))}
            </div>

            {/* Dock */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-[#2A2A2A]/50 backdrop-blur-lg rounded-2xl p-4 z-[2]">
                <div className="flex gap-6">
                    {apps.slice(0, 4).map(app => (
                        <button
                            key={`dock-${app.id}`}
                            onClick={() => onAppClick(app.id)}
                            className="transition-transform hover:scale-105"
                        >
                            <div className="w-12 h-12 bg-[#2A2A2A]/80 backdrop-blur-sm rounded-xl flex items-center justify-center text-xl shadow-lg">
                                {app.icon}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            </div>
        </div>
    );
}
