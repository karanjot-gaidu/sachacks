"use client"
import React from 'react'
import { SignInButton, SignedIn, SignedOut, useClerk, useUser } from "@clerk/nextjs"
import NetworkBackground from './components/NetworkBackground'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { openSignIn, signOut } = useClerk();

  const handlePlaySignIn = () => {
    if (isSignedIn) {
      router.push("/play");
    } else {
      openSignIn({ redirectUrl: "/play" });
    }
  };

  const handleLearnSignIn = () => {
    if (isSignedIn) {
      router.push("/learn");
    } else {
      openSignIn({ redirectUrl: "/learn" });
    }
  };
  return (
    <main className="bg-[#0F0F0F] relative min-h-screen">
      <div className="absolute inset-0 z-0">
        <NetworkBackground />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-col items-center justify-center min-h-screen w-full">
          <h1 className="text-6xl font-bold text-[#008170] mb-4">Cheque A Fraud</h1>
          <p className="text-white text-lg mb-8">
            Learn how to spot a scam and protect yourself from fraud.
          </p>
          <div className="flex flex-row items-center justify-center space-x-4 mt-4">
            <button onClick={handlePlaySignIn} 
              className="px-6 py-3 rounded-lg bg-[#005B41] hover:bg-[#008170] text-white text-base font-semibold transition-colors duration-300"
            >
              Cheque In
            </button>
            <button onClick={handleLearnSignIn} 
              className="px-6 py-3 rounded-lg bg-[#232D3F] hover:bg-[#005B41] text-white text-base font-semibold transition-colors duration-300"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
