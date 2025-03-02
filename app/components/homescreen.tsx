"use client";

interface App {
    id: string;
    name: string;
    icon: string;
    color: string;
}

interface HomescreenProps {
    onAppClick: (appId: string) => void;
}

export default function Homescreen({ onAppClick }: HomescreenProps) {
    const apps: App[] = [
        {
            id: 'banking',
            name: 'Banking',
            icon: '💳',
            color: 'bg-[#005B41]'
        },
        {
            id: 'email',
            name: 'Email',
            icon: '✉️',
            color: 'bg-blue-600'
        },
        {
            id: 'calendar',
            name: 'Calendar',
            icon: '📅',
            color: 'bg-red-500'
        },
        {
            id: 'photos',
            name: 'Photos',
            icon: '🖼️',
            color: 'bg-purple-500'
        },
        {
            id: 'messages',
            name: 'Messages',
            icon: '💬',
            color: 'bg-green-500'
        },
        {
            id: 'settings',
            name: 'Settings',
            icon: '⚙️',
            color: 'bg-gray-600'
        }
    ];

    return (
        <div className="h-full">
            {/* Wallpaper */}
            <div className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center" />

            {/* Apps Grid */}
            <div className="relative z-10 grid grid-cols-8 gap-6 p-6">
                {apps.map((app) => (
                    <button
                        key={app.id}
                        onClick={() => onAppClick(app.id)}
                        className="flex flex-col items-center gap-2 transition-transform hover:scale-105"
                    >
                        <div className={`w-16 h-16 ${app.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
                            {app.icon}
                        </div>
                        <span className="text-white text-sm font-medium">{app.name}</span>
                    </button>
                ))}
            </div>

            {/* Dock */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-[#2A2A2A]/50 backdrop-blur-lg rounded-2xl p-4">
                <div className="flex gap-6">
                    {apps.slice(0, 4).map((app) => (
                        <button
                            key={`dock-${app.id}`}
                            onClick={() => onAppClick(app.id)}
                            className="transition-transform hover:scale-105"
                        >
                            <div className={`w-12 h-12 ${app.color} rounded-xl flex items-center justify-center text-xl shadow-lg`}>
                                {app.icon}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
