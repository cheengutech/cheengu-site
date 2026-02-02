'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Check your phone! We just sent you a text to get started.');
        setPhone('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to connect. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="bg-[#1a1a1a] border-b border-[#333] sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-5 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            Cheengu
          </Link>
          <ul className="flex gap-8">
            <li><Link href="/how-it-works" className="text-[#888] hover:text-white text-sm transition-colors">How It Works</Link></li>
            <li><Link href="/contact" className="text-[#888] hover:text-white text-sm transition-colors">Contact</Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section - Super Simple */}
      <div className="max-w-[700px] mx-auto px-5 py-24 text-center">
        <h1 className="text-[56px] font-bold mb-6 leading-tight">
          Put Money on Your Goals
        </h1>
        <p className="text-2xl text-[#aaa] mb-12 leading-relaxed">
          Want to actually follow through? Stake real money. 
          Get daily SMS check-ins. A friend verifies. 
          Succeed and get your money back. Fail and lose it.
        </p>

        {/* Signup Form */}
        <div className="max-w-[500px] mx-auto">
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-3">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your phone number"
                className="flex-1 bg-[#1a1a1a] border border-[#333] rounded-lg px-6 py-4 text-white placeholder-[#666] focus:outline-none focus:border-[#555] text-lg"
                required
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#f0f0f0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === 'loading' ? 'Sending...' : 'Get Started'}
              </button>
            </div>
          </form>

          {/* Status Messages */}
          {status === 'success' && (
            <div className="bg-[#1a3a1a] border border-[#44ff44] rounded-lg p-4 mb-6">
              <p className="text-[#44ff44] font-medium">{message}</p>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-[#3a1a1a] border border-[#ff4444] rounded-lg p-4 mb-6">
              <p className="text-[#ff4444]">{message}</p>
            </div>
          )}

          <p className="text-sm text-[#666]">
            We'll text you to set up your first commitment. Takes 2 minutes via SMS.
          </p>
        </div>
      </div>

      {/* Simple 3-Step Explanation */}
      <div className="max-w-[900px] mx-auto px-5 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
        
        <div className="space-y-12">
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl">
              1
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Choose Your Goal</h3>
              <p className="text-lg text-[#aaa]">
                Exercise daily? Launch a project? Break a bad habit? Pick your commitment and how much money you're staking ($5-$500).
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl">
              2
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Pick Your Judge</h3>
              <p className="text-lg text-[#aaa]">
                Choose a friend who'll verify you actually did it. They get a text every day asking "Did they do it?" They reply yes or no. That's it.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl">
              3
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Win or Lose Money</h3>
              <p className="text-lg text-[#aaa]">
                Every day you succeed, nothing happens. Every day you fail, you lose money to your judge. At the end, you get back whatever's left. Real stakes = real results.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof / Simple Stats */}
      <div className="max-w-[700px] mx-auto px-5 py-20 text-center">
        <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-12">
          <p className="text-xl text-[#aaa] mb-6 italic">
            "I've tried every productivity app. This is the only thing that actually worked. 
            Knowing my friend would see me fail AND I'd lose money? That got me off my ass."
          </p>
          <p className="text-[#666]">— Ross, workout commitment</p>
        </div>
      </div>
      
      <div className="max-w-[700px] mx-auto px-5 py-20 text-center">
        <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-12">
          <p className="text-xl text-[#aaa] mb-6 italic">
            "I've wanted to learn a new language before but never stuck with it when I was younger. Cheengu 
            made me actually stick with studying Korean for the first time."
          </p>
          <p className="text-[#666]">— Rachel, language learning commitment</p>
        </div>
      </div>

      {/* Final CTA */}
      <div className="max-w-[700px] mx-auto px-5 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Stop Lying to Yourself</h2>
        <p className="text-xl text-[#aaa] mb-8">
          You know what you need to do. You just need someone to hold you accountable. And real money on the line.
        </p>
        <form onSubmit={handleSubmit} className="max-w-[500px] mx-auto">
          <div className="flex gap-3">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your phone number"
              className="flex-1 bg-[#1a1a1a] border border-[#333] rounded-lg px-6 py-4 text-white placeholder-[#666] focus:outline-none focus:border-[#555] text-lg"
              required
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#f0f0f0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              Get Started
            </button>
          </div>
        </form>
      </div>

      <footer className="bg-[#1a1a1a] border-t border-[#333] py-12 text-center text-[#666] text-sm mt-20">
        <p>&copy; 2025 Cheengu. All rights reserved.</p>
        <p className="mt-2">
          <Link href="/privacy" className="text-[#888] hover:text-white">Privacy</Link>
          {' | '}
          <Link href="/terms" className="text-[#888] hover:text-white">Terms</Link>
          {' | '}
          <Link href="/contact" className="text-[#888] hover:text-white">Contact</Link>
        </p>
      </footer>
    </div>
  );
}
