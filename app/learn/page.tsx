"use client";
import React, { useState, useEffect } from "react";

// Define transaction interface
interface Transaction {
  id: string;
  amount: number;
  location: string;
  merchant: string;
  type: string;
  time: string;
  risk_score: number;
  is_fraud?: boolean;
  fraud_type?: string;
}

// Fraud type information for educational content
const fraudTypeInfo = {
  identity_theft: {
    title: "Identity Theft",
    description: "Criminals use stolen personal information to make unauthorized transactions.",
    indicators: ["Unusual transaction locations", "Multiple transactions in short periods", "Purchases inconsistent with history"],
    prevention: "Use strong passwords, monitor credit reports, enable 2FA on all accounts."
  },
  card_skimming: {
    title: "Card Skimming",
    description: "Thieves use devices attached to ATMs or payment terminals to steal card data.",
    indicators: ["Small test transactions before larger ones", "ATM withdrawals in unusual locations", "Multiple failed attempts"],
    prevention: "Inspect card readers, cover PIN entry, use contactless payments when possible."
  },
  money_laundering: {
    title: "Money Laundering",
    description: "Process of making illegally obtained money appear legitimate.",
    indicators: ["Complex transaction patterns", "Unusual international transfers", "Structuring (multiple small deposits)"],
    prevention: "Report suspicious activity, maintain thorough financial records."
  },
  phishing_scam: {
    title: "Phishing Scam",
    description: "Fraudsters impersonate legitimate entities to trick victims into revealing sensitive information.",
    indicators: ["Urgent payment requests", "Unfamiliar merchants", "Requests for additional verification"],
    prevention: "Verify emails before clicking links, never share PINs or passwords."
  },
  account_takeover: {
    title: "Account Takeover",
    description: "Hackers gain access to accounts and make unauthorized transactions.",
    indicators: ["Password reset attempts", "Login from unusual locations", "Changed contact information"],
    prevention: "Use unique passwords, enable login notifications, regularly review account activity."
  },
  fake_invoice: {
    title: "Fake Invoice",
    description: "Scammers send counterfeit bills or payment requests to trick victims.",
    indicators: ["Unusual billing recipient", "Slight variations in company names", "Pressure to pay quickly"],
    prevention: "Verify invoices through established channels, confirm changes in payment details by phone."
  }
};

// Example transactions
const exampleTransactions: Transaction[] = [
  {
    id: "1001",
    amount: 3299.99,
    location: "Miami, FL",
    merchant: "Electronics SuperStore",
    type: "In-store Purchase",
    time: "2:35 AM",
    risk_score: 0.85,
    is_fraud: true,
    fraud_type: "identity_theft"
  },
  {
    id: "1002",
    amount: 24.99,
    location: "ATM - Downtown",
    merchant: "QuickCash ATM",
    type: "ATM Withdrawal",
    time: "3:12 PM",
    risk_score: 0.72,
    is_fraud: true,
    fraud_type: "card_skimming"
  },
  {
    id: "1003",
    amount: 499.50,
    location: "Online",
    merchant: "Global Wire Services",
    type: "Wire Transfer",
    time: "11:45 AM",
    risk_score: 0.91,
    is_fraud: true,
    fraud_type: "money_laundering"
  },
  {
    id: "1004",
    amount: 159.99,
    location: "Online",
    merchant: "Security-Update-Required.com",
    type: "Online Payment",
    time: "7:23 PM",
    risk_score: 0.88,
    is_fraud: true,
    fraud_type: "phishing_scam"
  },
  {
    id: "1005",
    amount: 1299.00,
    location: "Moscow, Russia",
    merchant: "Premium Electronics",
    type: "International Purchase",
    time: "4:17 AM",
    risk_score: 0.94,
    is_fraud: true,
    fraud_type: "account_takeover"
  },
  {
    id: "1006",
    amount: 2450.75,
    location: "Online",
    merchant: "Global Shipping Co.",
    type: "Invoice Payment",
    time: "9:30 AM",
    risk_score: 0.79,
    is_fraud: true,
    fraud_type: "fake_invoice"
  },
  {
    id: "1007",
    amount: 85.20,
    location: "Local Coffee Shop",
    merchant: "Morning Brew Cafe",
    type: "In-store Purchase",
    time: "10:15 AM",
    risk_score: 0.05,
    is_fraud: false
  }
];

const Learn = () => {
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [selectedFraudType, setSelectedFraudType] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [revealAnswer, setRevealAnswer] = useState(false);
  const [transactionIndex, setTransactionIndex] = useState(0);
  const [showHints, setShowHints] = useState(false);

  useEffect(() => {
    // Load first transaction
    if (exampleTransactions.length > 0) {
      setCurrentTransaction(exampleTransactions[0]);
    }
  }, []);

  const handleNextTransaction = () => {
    // Reset state for next transaction
    setUserChoice(null);
    setSelectedFraudType("");
    setResult(null);
    setExplanation(null);
    setRevealAnswer(false);
    setShowHints(false);

    // Move to next transaction
    const nextIndex = (transactionIndex + 1) % exampleTransactions.length;
    setTransactionIndex(nextIndex);
    setCurrentTransaction(exampleTransactions[nextIndex]);
  };

  const handleSubmit = () => {
    if (!currentTransaction || !userChoice) return;

    const isCorrectChoice = 
      (userChoice === "fraud" && currentTransaction.is_fraud) || 
      (userChoice === "legitimate" && !currentTransaction.is_fraud);
    
    const isCorrectFraudType = 
      !currentTransaction.is_fraud || 
      (selectedFraudType === currentTransaction.fraud_type);

    // Update score
    if (isCorrectChoice) {
      if (isCorrectFraudType) {
        setScore(score + 10); // Both correct
      } else {
        setScore(score + 5); // Correct fraud detection but wrong type
      }
    }

    // Generate result and explanation
    if (isCorrectChoice && isCorrectFraudType) {
      setResult("✅ Correct! Great job detecting this transaction.");
      if (currentTransaction.is_fraud) {
        const fraudInfo = fraudTypeInfo[currentTransaction.fraud_type as keyof typeof fraudTypeInfo];
        setExplanation(
          `This was indeed a ${fraudInfo.title.toLowerCase()} case. ${fraudInfo.description} ` +
          `Key indicators included: ${currentTransaction.risk_score > 0.7 ? 'high risk score, ' : ''}` +
          `${currentTransaction.time.includes('AM') && parseInt(currentTransaction.time) < 6 ? 'unusual transaction time, ' : ''}` +
          `${currentTransaction.location.includes('Online') ? 'online transaction susceptibility, ' : ''}`
        );
      } else {
        setExplanation("This was a legitimate transaction with normal patterns and low risk score.");
      }
    } else if (isCorrectChoice) {
      setResult("✅ Partially correct! You identified the transaction status but selected the wrong fraud type.");
      setExplanation(`This was actually a case of ${fraudTypeInfo[currentTransaction.fraud_type as keyof typeof fraudTypeInfo].title.toLowerCase()}.`);
    } else {
      setResult("❌ Incorrect. Let's learn from this example.");
      setExplanation(
        currentTransaction.is_fraud
          ? `This was actually a fraudulent transaction (${fraudTypeInfo[currentTransaction.fraud_type as keyof typeof fraudTypeInfo].title}). ` +
            `Notice the ${currentTransaction.risk_score > 0.7 ? 'high risk score' : 'suspicious patterns'}.`
          : "This was actually a legitimate transaction. Not all unusual transactions are fraudulent."
      );
    }
    
    setRevealAnswer(true);
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      
      <div className="max-w-6xl mx-auto px-4 py-12 mt-14">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#008170] mb-2">Fraud Detection Training</h1>
          <p className="text-lg text-gray-300">Learn to identify suspicious transactions and protect against fraud</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Transaction Card */}
          <div className="w-full md:w-1/2 bg-[#232D3F] p-6 rounded-lg border border-[#008170] shadow-[0_0_15px_rgba(0,129,112,0.2)]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Transaction Details</h2>
              <div className="bg-[#005B41] px-3 py-1 rounded-full text-sm">
                Case #{currentTransaction?.id}
              </div>
            </div>
            
            {currentTransaction && (
              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Amount</span>
                  <span className="font-medium">${currentTransaction.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Location</span>
                  <span className="font-medium">{currentTransaction.location}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Merchant</span>
                  <span className="font-medium">{currentTransaction.merchant}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Transaction Type</span>
                  <span className="font-medium">{currentTransaction.type}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Time</span>
                  <span className="font-medium">{currentTransaction.time}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Risk Score</span>
                  <div className="flex items-center">
                    <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          currentTransaction.risk_score < 0.3 ? 'bg-green-500' : 
                          currentTransaction.risk_score < 0.7 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${currentTransaction.risk_score * 100}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 font-medium">{(currentTransaction.risk_score * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-6">
              <button 
                onClick={() => setShowHints(!showHints)}
                className="text-[#008170] hover:text-[#005B41] text-sm flex items-center"
              >
                {showHints ? 'Hide Hints' : 'Show Hints'} 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              
              {showHints && (
                <div className="mt-2 p-3 bg-[#1A2435] rounded text-sm">
                  <p className="font-medium text-[#008170] mb-1">Transaction Analysis Hints:</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>High risk scores (above 70%) often indicate potential fraud</li>
                    <li>Unusual transaction times (like middle of the night) can be suspicious</li>
                    <li>International or distant locations may indicate compromised accounts</li>
                    <li>Wire transfers and large purchases have higher fraud rates</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          {/* Analysis & Decision Section */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="bg-[#232D3F] p-6 rounded-lg border border-[#008170] shadow-[0_0_15px_rgba(0,129,112,0.2)]">
              <h2 className="text-xl font-semibold mb-4">Your Analysis</h2>
              
              <div className="mb-6">
                <p className="text-gray-300 mb-2">Is this transaction fraudulent?</p>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => setUserChoice("fraud")}
                    disabled={revealAnswer}
                    className={`px-4 py-2 rounded-md transition duration-200 ${
                      userChoice === "fraud" 
                        ? "bg-red-500 text-white" 
                        : "bg-[#1A2435] hover:bg-[#2A3445] text-white"
                    } ${revealAnswer ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    Fraud
                  </button>
                  <button 
                    onClick={() => setUserChoice("legitimate")}
                    disabled={revealAnswer}
                    className={`px-4 py-2 rounded-md transition duration-200 ${
                      userChoice === "legitimate" 
                        ? "bg-green-500 text-white" 
                        : "bg-[#1A2435] hover:bg-[#2A3445] text-white"
                    } ${revealAnswer ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    Legitimate
                  </button>
                </div>
              </div>
              
              {userChoice === "fraud" && (
                <div className="mb-6">
                  <p className="text-gray-300 mb-2">Select the type of fraud:</p>
                  <select
                    className="w-full p-2 bg-[#1A2435] border border-gray-700 rounded text-white"
                    value={selectedFraudType}
                    onChange={(e) => setSelectedFraudType(e.target.value)}
                    disabled={revealAnswer}
                  >
                    <option value="">-- Select Fraud Type --</option>
                    <option value="identity_theft">Identity Theft</option>
                    <option value="card_skimming">Card Skimming</option>
                    <option value="money_laundering">Money Laundering</option>
                    <option value="phishing_scam">Phishing Scam</option>
                    <option value="account_takeover">Account Takeover</option>
                    <option value="fake_invoice">Fake Invoice</option>
                  </select>
                </div>
              )}
              
              <button 
                onClick={handleSubmit}
                disabled={!userChoice || (userChoice === "fraud" && !selectedFraudType) || revealAnswer}
                className={`w-full py-2 rounded-md transition duration-300 ${
                  !userChoice || (userChoice === "fraud" && !selectedFraudType) || revealAnswer
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-[#005B41] hover:bg-[#008170]"
                } text-white`}
              >
                Submit Analysis
              </button>
            </div>
            
            {/* Score Display */}
            <div className="bg-[#232D3F] p-4 rounded-lg border border-[#008170] flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">Your Score</p>
                <p className="text-2xl font-bold text-[#008170]">{score}</p>
              </div>
              <button 
                onClick={handleNextTransaction}
                disabled={!revealAnswer && score > 0}
                className={`px-4 py-2 rounded bg-[#005B41] hover:bg-[#008170] text-white transition duration-300 ${!revealAnswer && score > 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Next Example →
              </button>
            </div>
            
            {/* Result & Explanation */}
            {revealAnswer && (
              <div className="bg-[#232D3F] p-6 rounded-lg border border-[#008170] animate-fadeIn">
                <h3 className="text-xl font-semibold mb-2">{result}</h3>
                <p className="text-gray-300 mb-4">{explanation}</p>
                
                {currentTransaction?.is_fraud && (
                  <div className="bg-[#1A2435] p-4 rounded">
                    <h4 className="font-semibold text-[#008170]">
                      {fraudTypeInfo[currentTransaction.fraud_type as keyof typeof fraudTypeInfo].title}
                    </h4>
                    <p className="text-sm text-gray-300 mb-2">
                      {fraudTypeInfo[currentTransaction.fraud_type as keyof typeof fraudTypeInfo].description}
                    </p>
                    <div className="mt-3">
                      <p className="text-xs font-medium text-[#008170] mb-1">Common Indicators:</p>
                      <ul className="list-disc list-inside text-xs text-gray-300">
                        {fraudTypeInfo[currentTransaction.fraud_type as keyof typeof fraudTypeInfo].indicators.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs font-medium text-[#008170] mb-1">Prevention Tips:</p>
                      <p className="text-xs text-gray-300">
                        {fraudTypeInfo[currentTransaction.fraud_type as keyof typeof fraudTypeInfo].prevention}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
