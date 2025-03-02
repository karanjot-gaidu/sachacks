import AppLayout from './app-layout';

export default function Messages({ onBack }: { onBack: () => void }) {
    const mockMessages = [
        { id: 1, name: 'John Doe', message: 'Hey, how are you?', time: '10:30 AM', unread: true },
        { id: 2, name: 'Jane Smith', message: 'Did you see the latest update?', time: '9:45 AM', unread: false },
        { id: 3, name: 'Mike Johnson', message: 'Meeting at 3 PM today', time: 'Yesterday', unread: false },
        { id: 4, name: 'Sarah Wilson', message: 'Thanks for your help!', time: 'Yesterday', unread: false },
        { id: 5, name: 'David Brown', message: 'Please check the documents', time: 'Mon', unread: false },
    ];

    return (
        <AppLayout title="Messages" onBack={onBack}>
            <div className="divide-y divide-gray-800">
                {mockMessages.map(message => (
                    <div 
                        key={message.id} 
                        className="flex items-center p-4 hover:bg-gray-900 cursor-pointer"
                    >
                        <div className="w-12 h-12 bg-[#008170] rounded-full flex items-center justify-center text-white font-semibold">
                            {message.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-4 flex-1">
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-semibold">{message.name}</h3>
                                <span className="text-sm text-gray-400">{message.time}</span>
                            </div>
                            <p className={`text-sm ${message.unread ? 'text-white font-semibold' : 'text-gray-400'}`}>
                                {message.message}
                            </p>
                        </div>
                        {message.unread && (
                            <div className="w-3 h-3 bg-[#008170] rounded-full ml-2"></div>
                        )}
                    </div>
                ))}
            </div>
        </AppLayout>
    );
} 