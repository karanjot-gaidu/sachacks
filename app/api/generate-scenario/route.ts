import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  });

export interface GeneratedTransaction {
    id: number;
    type: 'deposit' | 'withdrawal' | 'transfer';
    amount: number;
    description: string;
    date: string;
    status: 'completed' | 'pending' | 'failed';
    isFraudulent: boolean;
}

export interface GeneratedEmail {
    id: number;
    from: string;
    subject: string;
    preview: string;
    date: string;
    unread: boolean;
    relatedTransactionId?: number;
}

export interface GeneratedScenario {
    transactions: GeneratedTransaction[];
    emails: GeneratedEmail[];
    initialBalance: number;
    fraudulentTransactionIds: number[];
}

const PROMPT = `Generate a realistic banking scenario where a person has some legitimate transactions and 1-2 fraudulent transactions. Include related emails that provide clues about the fraud. The scenario should include:

1. 5-8 banking transactions (mix of deposits, withdrawals, and transfers)
2. 4-6 emails (some related to transactions, some are regular emails)
3. Clear but subtle hints in the emails about which transactions might be fraudulent
4. An initial account balance

For emails, include detailed content that tells a story. Some emails should be:
- Security alerts from the bank
- Confirmation emails for legitimate transactions
- Marketing emails (as distractions)
- Suspicious activity notifications
- Personal emails that might reference financial activities

Each email should have a complete message body with proper formatting, greetings, and signatures.

Format the response as a JSON object matching this TypeScript interface:

interface GeneratedScenario {
    transactions: Array<{
        id: number;
        type: 'deposit' | 'withdrawal' | 'transfer';
        amount: number;
        description: string;
        date: string;
        status: 'completed';
        isFraudulent: boolean;
    }>;
    emails: Array<{
        id: number;
        from: string;
        subject: string;
        preview: string;
        fullContent: string;
        date: string;
        unread: boolean;
        relatedTransactionId?: number;
    }>;
    initialBalance: number;
    fraudulentTransactionIds: number[];
}

Make the scenario realistic and ensure the fraud requires careful attention to detail to identify.`;

export async function GET() {
    try {
          
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: PROMPT }],
            model: "gemini-2.0-flash",
            response_format: { type: "json_object" },
        });
        const generatedScenario = completion.choices[0].message.content;
        if (generatedScenario === null) {
            throw new Error('No content returned from OpenAI');
        }
        return NextResponse.json(JSON.parse(generatedScenario));
    } catch (error) {
        console.error('Error generating scenario:', error);
        return NextResponse.json(
            { error: 'Failed to generate scenario' },
            { status: 500 }
        );
    }
} 