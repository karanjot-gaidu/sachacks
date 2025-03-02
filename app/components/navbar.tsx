"use client";

import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignedIn, SignedOut, useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Navbar() {
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
        <nav className="bg-[#0F0F0F] shadow-lg fixed w-full z-10 top-0 left-0 right-0 h-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex justify-between items-center h-full">
                    <Link href="/" className="flex items-center h-full">
                        <Image src="/LogoTrans.png" alt="logo" width={85} height={85} />
                    </Link>
                    <div className="flex items-center h-full space-x-6">
                        <Link href="/" className="flex items-center h-full px-3 text-white hover:text-[#008170] transition-colors">Home</Link>
                        <button 
                            onClick={handleLearnSignIn} 
                            className="flex items-center h-full px-3 text-white hover:text-[#008170] transition-colors"
                        >
                            Learn
                        </button>
                        <button 
                            onClick={handlePlaySignIn} 
                            className="flex items-center h-full px-3 text-white hover:text-[#008170] transition-colors"
                        >
                            Play
                        </button>
                        <Link href="/about" className="flex items-center h-full px-3 text-white hover:text-[#008170] transition-colors">About</Link>
                        <Link href="/profile" className="flex items-center h-full px-3 text-white hover:text-[#008170] transition-colors">Profile</Link>
                        <div className="flex items-center">
                            {!isSignedIn && (
                                <button onClick={() => openSignIn()} className="px-4 py-2 rounded-lg bg-[#005B41] hover:bg-[#008170] text-white text-sm font-semibold transition-colors duration-300">
                                    Sign In
                                </button>
                            )}
                            {isSignedIn && (
                                <button 
                                    onClick={() => signOut()}
                                    className="px-4 py-2 rounded-lg bg-[#005B41] hover:bg-[#008170] text-white text-sm font-semibold transition-colors duration-300"
                                >
                                    Sign Out
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
