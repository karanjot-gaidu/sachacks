import AppLayout from './app-layout';

export default function Settings({ onBack }: { onBack: () => void }) {
    const settingsGroups = [
        {
            title: 'General',
            items: [
                { icon: '🌐', label: 'Network & Internet' },
                { icon: '🔔', label: 'Notifications' },
                { icon: '🔊', label: 'Sound' },
                { icon: '🔋', label: 'Battery' },
            ]
        },
        {
            title: 'Privacy & Security',
            items: [
                { icon: '🔒', label: 'Privacy' },
                { icon: '🔑', label: 'Security' },
                { icon: '📱', label: 'Screen Lock' },
                { icon: '📍', label: 'Location' },
            ]
        },
        {
            title: 'System',
            items: [
                { icon: '⚙️', label: 'System Update' },
                { icon: '💾', label: 'Storage' },
                { icon: 'ℹ️', label: 'About Device' },
            ]
        }
    ];

    return (
        <AppLayout title="Settings" onBack={onBack}>
            <div className="p-6">
                {settingsGroups.map((group, index) => (
                    <div key={index} className="mb-8">
                        <h2 className="text-[#008170] font-semibold mb-4">{group.title}</h2>
                        <div className="space-y-2">
                            {group.items.map((item, itemIndex) => (
                                <div 
                                    key={itemIndex}
                                    className="flex items-center p-3 bg-gray-900 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
                                >
                                    <span className="mr-3 text-xl">{item.icon}</span>
                                    <span>{item.label}</span>
                                    <svg className="w-5 h-5 ml-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
} 