"use client";

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useGame } from './game-context';

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

    const { scenario, loading, userGuesses, markAsFraudulent, unmarkAsFraudulent, checkAnswer } = useGame();

    if (loading) {
        return <div className="text-white p-4">Loading banking data...</div>;
    }

    if (!scenario) {
        return <div className="text-white p-4">No banking data available</div>;
    }

    const handleTransactionClick = (transactionId: number) => {
        if (userGuesses.includes(transactionId)) {
            unmarkAsFraudulent(transactionId);
        } else {
            markAsFraudulent(transactionId);
        }
    };

    const { correct, message } = checkAnswer();

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
                <div className="grid grid-cols-1 gap-4">
                    {/* Account Balance Card */}
                    <div className="bg-[#1A1A1A] rounded-xl p-6 shadow-lg">
                        <h2 className="text-[#008170] text-lg font-semibold mb-2">Account Balance</h2>
                        <p className="text-white text-3xl font-bold">${scenario.initialBalance.toFixed(2)}</p>
                        <p className="text-gray-400 text-sm mt-2">Available Balance</p>
                    </div>

                    {/* Game Instructions */}
                    <div className="bg-[#1A1A1A] rounded-xl p-6 shadow-lg">
                        <h2 className="text-[#008170] text-lg font-semibold mb-2">Fraud Detection Exercise</h2>
                        <p className="text-white mb-2">
                            Review your transactions and emails to identify fraudulent transactions. 
                            Click on a transaction to mark/unmark it as suspicious.
                        </p>
                        {message && (
                            <div className={`mt-2 p-3 rounded-lg ${
                                correct ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                            }`}>
                                {message}
                            </div>
                        )}
                    </div>

                    {/* Recent Transactions */}
                    <div className="bg-[#1A1A1A] rounded-xl p-6 shadow-lg">
                        <h2 className="text-[#008170] text-lg font-semibold mb-4">Recent Transactions</h2>
                        <div className="space-y-4">
                            {scenario.transactions.map((transaction) => (
                                <button
                                    key={transaction.id}
                                    onClick={() => handleTransactionClick(transaction.id)}
                                    className={`w-full flex items-center justify-between bg-[#2A2A2A] p-4 rounded-lg transition-colors
                                        ${userGuesses.includes(transaction.id) 
                                            ? 'ring-2 ring-red-500 bg-red-500/10' 
                                            : 'hover:bg-[#3A3A3A]'}`}
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
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
