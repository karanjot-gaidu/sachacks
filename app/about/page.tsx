"use client";

import React from "react";
import { motion } from "framer-motion";
import NavBar from "../components/navbar";
import NetworkBackground from "../components/NetworkBackground";

const StatCard = ({ number, label }: { number: string; label: string }) => (
    <motion.div
        className="bg-[#1A1A1A] p-6 rounded-xl text-center"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        <h3 className="text-3xl font-bold text-[#008170] mb-2">{number}</h3>
        <p className="text-gray-300 text-sm">{label}</p>
    </motion.div>
);

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-[#0F0F0F] overflow-x-hidden">
            <NetworkBackground />
            <NavBar />
            <div className="max-w-4xl mx-auto p-6 space-y-12 pt-20 pb-16">
                <motion.h1
                    className="text-5xl font-extrabold text-center text-[#008170]"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    About Us
                </motion.h1>

                {/* Statistics Section */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <StatCard number="$10.3B" label="Lost to Online Scams in 2022" />
                    <StatCard number="40%" label="of College Students Targeted by Scams" />
                    <StatCard number="2.8M" label="Fraud Reports in 2021" />
                </motion.div>

                <div className="space-y-8">
                    <motion.p
                        className="text-lg text-gray-300 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        In the heart of California, where the vibrant communities of Davis and Sacramento thrive, the digital landscape offers
                        both opportunity and peril. As college students, we are uniquely susceptible to cybersecurity threats that can
                        jeopardize our financial well-being and personal security.
                    </motion.p>

                    <motion.div 
                        className="bg-[#232D3F] p-6 rounded-xl shadow-lg transform-gpu" 
                        initial={{ opacity: 0, x: -50 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ duration: 0.8 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <h2 className="text-2xl font-semibold text-[#008170] mb-3">The Growing Threat</h2>
                        <p className="text-gray-300">
                            Universities have become prime targets for cybercriminals. In 2021, the University of California system suffered a major
                            data breach exposing Social Security numbers and financial details. Similarly, students at Lansing Community College
                            faced potential identity theft due to leaked sensitive data.
                        </p>
                        <div className="mt-4 p-4 bg-[#1A1A1A] rounded-lg">
                            <p className="text-red-400 text-sm">⚠️ Alert: Over 80% of universities reported a significant cyber incident in the past year</p>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="bg-[#232D3F] p-6 rounded-xl shadow-lg transform-gpu" 
                        initial={{ opacity: 0, x: 50 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ duration: 0.8, delay: 0.2 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <h2 className="text-2xl font-semibold text-[#008170] mb-3">Why Awareness Matters</h2>
                        <p className="text-gray-300 mb-4">
                            Scammers exploit social media to steal information, create fake profiles, and distribute malware. Phishing scams and
                            account takeovers have become increasingly sophisticated, making it crucial to stay vigilant and informed.
                        </p>
                        <ul className="space-y-2 text-gray-300">
                            <li className="flex items-center gap-2">
                                <span className="text-[#008170]">✓</span> Learn to identify suspicious activities
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-[#008170]">✓</span> Protect your financial information
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-[#008170]">✓</span> Stay updated on latest scam techniques
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div 
                        className="bg-[#232D3F] p-6 rounded-xl shadow-lg" 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h2 className="text-2xl font-semibold text-[#008170] mb-3">Recent Trends</h2>
                        <div className="space-y-4">
                            <p className="text-gray-300">
                                In 2024, financial fraud has evolved dramatically:
                            </p>
                            <ul className="space-y-2 text-gray-300">
                                <li className="flex items-center gap-2">
                                    <span className="text-red-400">↗</span> 37% increase in AI-powered scams
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-red-400">↗</span> 52% rise in mobile payment fraud
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-red-400">↗</span> 89% of students encountered at least one scam attempt
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <div className="p-6 shadow-lg rounded-2xl bg-[#232D3F] hover:shadow-[#008170]/20 hover:shadow-lg transition-all duration-300 transform-gpu hover:-translate-y-1">
                        <h2 className="text-2xl font-semibold text-[#008170] mb-2">Our Mission</h2>
                        <p className="text-gray-300">
                            We aim to gamify learning, making cybersecurity education engaging, accessible, and fun for students.
                            Through interactive scenarios and real-world examples, we help build the skills needed to stay safe in the digital age.
                        </p>
                    </div>

                    <div className="p-6 shadow-lg rounded-2xl bg-[#232D3F] hover:shadow-[#008170]/20 hover:shadow-lg transition-all duration-300 transform-gpu hover:-translate-y-1">
                        <h2 className="text-2xl font-semibold text-[#008170] mb-2">Our Team</h2>
                        <p className="text-gray-300">
                            We are a passionate team of students with interest in finance, technology, and education, dedicated to
                            empowering students with essential cybersecurity skills. Our diverse backgrounds allow us to approach security from multiple angles.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Footer */}
            <footer className="bg-[#1A1A1A] border-t border-[#232D3F] py-4">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="text-gray-400 text-sm">
                        © 2025 Cheque-A-Fraud. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                        Protecting people through interactive learning
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default AboutPage;
