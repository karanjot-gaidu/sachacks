"use client";

import { useState } from 'react';
import { useGame } from './game-context';
import { GeneratedEmail } from '../api/generate-scenario/route';

interface EmailProps {
    onBack: () => void;
}

interface EmailDetailProps {
    email: GeneratedEmail;
    onBack: () => void;
}

function EmailDetail({ email, onBack }: EmailDetailProps) {
    return (
        <div className="h-full bg-[#1A1A1A] overflow-y-auto scrollbar-hide">
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
            </div>
            <div className="p-4">
                <div className="mb-6">
                    <h2 className="text-white text-xl font-semibold mb-2">{email.subject}</h2>
                    <div className="text-gray-400 text-sm mb-2">From: {email.from}</div>
                    <div className="text-gray-400 text-sm">{email.date}</div>
                </div>
                <div className="text-white whitespace-pre-wrap">
                    {email.preview}
                </div>
            </div>
        </div>
    );
}

export default function Email({ onBack }: EmailProps) {
    const { scenario, loading } = useGame();
    const [selectedEmail, setSelectedEmail] = useState<GeneratedEmail | null>(null);

    if (loading) {
        return <div className="text-white p-4">Loading emails...</div>;
    }

    if (!scenario) {
        return <div className="text-white p-4">No emails available</div>;
    }

    if (selectedEmail) {
        return <EmailDetail email={selectedEmail} onBack={() => setSelectedEmail(null)} />;
    }

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
            </div>

            {/* Email List */}
            <div className="p-3 space-y-3">
                {scenario.emails.map((email) => (
                    <button 
                        key={email.id}
                        onClick={() => setSelectedEmail(email)}
                        className="w-full text-left bg-[#2A2A2A] rounded-lg p-4 cursor-pointer hover:bg-[#3A3A3A] transition-colors"
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
                        <p className="text-gray-400 text-sm line-clamp-2">{email.preview}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}
