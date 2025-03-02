"use client";

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
        <div className="h-full bg-[#1A1A1A] p-8">
            <div className="grid grid-cols-4 gap-8">
                {apps.map(app => (
                    <button
                        key={app.id}
                        onClick={() => onAppClick(app.id)}
                        className="flex flex-col items-center space-y-2 hover:scale-105 transition-transform"
                    >
                        <div className="w-16 h-16 bg-[#2A2A2A] rounded-2xl flex items-center justify-center text-3xl">
                            {app.icon}
                        </div>
                        <span className="text-white text-sm">{app.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
