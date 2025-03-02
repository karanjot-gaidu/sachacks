"use client";

interface Email {
    id: number;
    from: string;
    subject: string;
    preview: string;
    date: string;
    unread: boolean;
}

interface EmailProps {
    onBack: () => void;
}

export default function Email({ onBack }: EmailProps) {
    const emails: Email[] = [
        {
            id: 1,
            from: "Bank of Finance",
            subject: "Your Monthly Statement",
            preview: "Your account statement for March 2024 is now available...",
            date: "10:30 AM",
            unread: true
        },
        {
            id: 2,
            from: "Job Portal",
            subject: "New Job Matches",
            preview: "We found 5 new jobs matching your profile...",
            date: "9:15 AM",
            unread: false
        },
        {
            id: 3,
            from: "Newsletter",
            subject: "Tech Weekly Digest",
            preview: "Latest updates in AI and web development...",
            date: "Yesterday",
            unread: true
        },
        {
            id: 4,
            from: "Social Updates",
            subject: "New Connection Request",
            preview: "Sarah Johnson wants to connect with you...",
            date: "Yesterday",
            unread: false
        },
        {
            id: 5,
            from: "Social Updates",
            subject: "New Connection Request",
            preview: "Sarah Johnson wants to connect with you...",
            date: "Yesterday",
            unread: false
        }
    ];

    return (
        <div className="h-full bg-[#1A1A1A] overflow-y-auto scrollbar-hide">
            {/* Header */}
            <div className="bg-[#2A2A2A] p-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={onBack}
                        className="text-white hover:text-[#008170] transition-colors"
                    >
                        ← Back
                    </button>
                    <h1 className="text-white text-lg font-semibold">Email</h1>
                </div>
                <button className="text-[#008170] hover:text-[#005B41] transition-colors">
                    ✉️ New
                </button>
            </div>

            {/* Email List */}
            <div className="p-3 space-y-3">
                {emails.map((email) => (
                    <div 
                        key={email.id}
                        className="bg-[#2A2A2A] rounded-lg p-4 cursor-pointer hover:bg-[#3A3A3A] transition-colors"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className={`text-white ${email.unread ? 'font-semibold' : ''}`}>
                                {email.from}
                            </h3>
                            <span className="text-gray-400 text-sm">{email.date}</span>
                        </div>
                        <h4 className={`text-white ${email.unread ? 'font-semibold' : ''} mb-1`}>
                            {email.subject}
                        </h4>
                        <p className="text-gray-400 text-sm">{email.preview}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
