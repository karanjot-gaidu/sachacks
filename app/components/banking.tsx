"use client";

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';

interface Transaction {
    id: number;
    type: 'deposit' | 'withdrawal' | 'transfer';
    amount: number;
    description: string;
    date: string;
    status: 'completed' | 'pending' | 'failed';
}

interface BankingProps {
    onBack: () => void;
}

export default function Banking({ onBack }: BankingProps) {
    const { user } = useUser();
    const [balance, setBalance] = useState(5000.00);
    const [transactions, setTransactions] = useState<Transaction[]>([
        {
            id: 1,
            type: 'deposit',
            amount: 1000,
            description: 'Salary Deposit',
            date: '2024-03-15',
            status: 'completed'
        },
        {
            id: 2,
            type: 'withdrawal',
            amount: 50,
            description: 'ATM Withdrawal',
            date: '2024-03-14',
            status: 'completed'
        },
        {
            id: 3,
            type: 'transfer',
            amount: 200,
            description: 'Transfer to Sarah',
            date: '2024-03-13',
            status: 'completed'
        }
    ]);

    const [transferAmount, setTransferAmount] = useState('');
    const [transferDescription, setTransferDescription] = useState('');

    const handleTransfer = (e: React.FormEvent) => {
        e.preventDefault();
        if (!transferAmount || !transferDescription) return;

        const amount = parseFloat(transferAmount);
        if (amount <= 0 || amount > balance) return;

        const newTransaction: Transaction = {
            id: transactions.length + 1,
            type: 'transfer',
            amount: amount,
            description: transferDescription,
            date: new Date().toISOString().split('T')[0],
            status: 'completed'
        };

        setTransactions([newTransaction, ...transactions]);
        setBalance(prev => prev - amount);
        setTransferAmount('');
        setTransferDescription('');
    };

    return (
        <div className="h-full bg-[#1A1A1A] overflow-y-auto scrollbar-hide">
            {/* Header */}
            <div className="bg-[#2A2A2A] p-3 flex items-center gap-4 sticky top-0 z-20">
                <button 
                    onClick={onBack}
                    className="text-white hover:text-[#008170] transition-colors"
                >
                    ← Back
                </button>
                <h1 className="text-white text-lg font-semibold">Banking</h1>
            </div>

            {/* Content */}
            <div className="p-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Account Balance Card */}
                    <div className="col-span-1 bg-[#1A1A1A] rounded-xl p-6 shadow-lg">
                        <h2 className="text-[#008170] text-lg font-semibold mb-2">Account Balance</h2>
                        <p className="text-white text-3xl font-bold">${balance.toFixed(2)}</p>
                        <p className="text-gray-400 text-sm mt-2">Available Balance</p>
                    </div>

                    {/* Quick Transfer Card */}
                    <div className="col-span-2 bg-[#1A1A1A] rounded-xl p-6 shadow-lg">
                        <h2 className="text-[#008170] text-lg font-semibold mb-4">Quick Transfer</h2>
                        <form onSubmit={handleTransfer} className="space-y-4">
                            <div className="flex gap-4">
                                <input
                                    type="number"
                                    value={transferAmount}
                                    onChange={(e) => setTransferAmount(e.target.value)}
                                    placeholder="Amount"
                                    className="flex-1 bg-[#2A2A2A] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#008170]"
                                />
                                <input
                                    type="text"
                                    value={transferDescription}
                                    onChange={(e) => setTransferDescription(e.target.value)}
                                    placeholder="Description"
                                    className="flex-1 bg-[#2A2A2A] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#008170]"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#005B41] hover:bg-[#008170] text-white rounded-lg px-4 py-2 transition-colors duration-300"
                            >
                                Send Transfer
                            </button>
                        </form>
                    </div>

                    {/* Recent Transactions */}
                    <div className="col-span-1 md:col-span-3 bg-[#1A1A1A] rounded-xl p-6 shadow-lg">
                        <h2 className="text-[#008170] text-lg font-semibold mb-4">Recent Transactions</h2>
                        <div className="space-y-4">
                            {transactions.map((transaction) => (
                                <div
                                    key={transaction.id}
                                    className="flex items-center justify-between bg-[#2A2A2A] p-4 rounded-lg"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center
                                            ${transaction.type === 'deposit' ? 'bg-green-500/20 text-green-500' :
                                            transaction.type === 'withdrawal' ? 'bg-red-500/20 text-red-500' :
                                            'bg-blue-500/20 text-blue-500'}`}
                                        >
                                            {transaction.type === 'deposit' ? '↓' :
                                             transaction.type === 'withdrawal' ? '↑' : '→'}
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">{transaction.description}</p>
                                            <p className="text-gray-400 text-sm">{transaction.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-medium ${
                                            transaction.type === 'deposit' ? 'text-green-500' :
                                            'text-red-500'}`}
                                        >
                                            {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount}
                                        </p>
                                        <p className="text-gray-400 text-sm">{transaction.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
