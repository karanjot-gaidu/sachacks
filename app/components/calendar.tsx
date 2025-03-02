import AppLayout from './app-layout';

export default function Calendar({ onBack }: { onBack: () => void }) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    
    return (
        <AppLayout title="Calendar" onBack={onBack}>
            <div className="p-6">
                <div className="text-2xl font-bold mb-6 text-[#008170]">
                    {currentMonth} {currentDate.getFullYear()}
                </div>
                
                <div className="grid grid-cols-7 gap-2 mb-4">
                    {days.map(day => (
                        <div key={day} className="text-center text-gray-400 font-medium">
                            {day}
                        </div>
                    ))}
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 35 }, (_, i) => (
                        <div 
                            key={i} 
                            className={`h-20 border border-gray-800 rounded-lg p-2 ${
                                i + 1 === currentDate.getDate() ? 'bg-[#008170] bg-opacity-20 border-[#008170]' : ''
                            }`}
                        >
                            <span className={`text-sm ${i + 1 === currentDate.getDate() ? 'text-[#008170] font-bold' : ''}`}>
                                {i + 1}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
} 