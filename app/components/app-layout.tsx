interface AppLayoutProps {
    title: string;
    onBack: () => void;
    children: React.ReactNode;
}

export default function AppLayout({ title, onBack, children }: AppLayoutProps) {
    return (
        <div className="h-full bg-[#1A1A1A] text-white">
            {/* Header */}
            <div className="h-12 flex items-center px-6 border-b border-gray-800">
                <button 
                    onClick={onBack}
                    className="flex items-center text-[#008170] hover:text-[#005B41] transition-colors"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>
                <h1 className="text-lg font-semibold ml-4">{title}</h1>
            </div>
            
            {/* Content */}
            <div className="h-[calc(100%-3rem)] overflow-y-auto">
                {children}
            </div>
        </div>
    );
} 