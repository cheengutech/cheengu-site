'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  
  // Honeypot fields - bots will fill these, humans won't see them
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/signup`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BACKEND_API_KEY}`
        },
        body: JSON.stringify({ phone, website, email }),
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

  // SMS conversation messages for animation
  const smsMessages = [
    { text: "I want to work out 4x this week", sent: true },
    { text: "Nice! How much do you want to stake? ($5-$500)", sent: false },
    { text: "$20", sent: true },
    { text: "$20 it is! 💪 Who's going to keep you honest?", sent: false },
    { text: "+1 555-123-4567", sent: true },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-50" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }} 
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 md:px-10 py-5 flex justify-between items-center bg-gradient-to-b from-[#0a0a0a] to-transparent backdrop-blur-sm">
        <Link href="/" className="text-2xl font-bold text-emerald-500">
          Cheengu
        </Link>
        <ul className="hidden md:flex gap-8">
          <li><a href="#how-it-works" className="text-zinc-400 hover:text-white text-sm font-medium transition-colors">How It Works</a></li>
          <li><a href="#demo" className="text-zinc-400 hover:text-white text-sm font-medium transition-colors">See Demo</a></li>
          <li><Link href="/contact" className="text-zinc-400 hover:text-white text-sm font-medium transition-colors">Contact</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-6 md:px-10 pt-24 pb-16 relative">
        {/* Green glow */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px] animate-pulse" />
        
        <div className="max-w-[1400px] mx-auto w-full grid md:grid-cols-2 gap-16 md:gap-20 items-center relative z-10">
          {/* Left: Text */}
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
              Put <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Real Money</span> on Your Goals
            </h1>
            <p className="text-xl text-zinc-400 mb-10 max-w-[500px] mx-auto md:mx-0">
              Stop lying to yourself. Stake actual cash, get verified by a friend via SMS, and finally follow through. Succeed and get your money back. Fail and lose it.
            </p>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="mb-4 max-w-[500px] mx-auto md:mx-0">
              {/* Honeypot fields - hidden from users, bots will fill them */}
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your phone number"
                  className="flex-1 bg-[#1a1a1a] border border-zinc-800 rounded-xl px-6 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 text-lg transition-colors"
                  required
                  disabled={status === 'loading'}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-emerald-500 text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.4)]"
                >
                  {status === 'loading' ? 'Sending...' : 'Get Started'}
                </button>
              </div>
            </form>

            {/* Status Messages */}
            {status === 'success' && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-4 max-w-[500px] mx-auto md:mx-0">
                <p className="text-emerald-400 font-medium">{message}</p>
              </div>
            )}

            {status === 'error' && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4 max-w-[500px] mx-auto md:mx-0">
                <p className="text-red-400">{message}</p>
              </div>
            )}

            <p className="text-sm text-zinc-600 max-w-[500px] mx-auto md:mx-0">
              We'll text you to set up your first commitment. Takes 2 minutes via SMS.
            </p>
          </div>

          {/* Right: Phone Mockup */}
          <div className="flex justify-center md:justify-end">
            <div 
              className="w-[280px] md:w-[300px] h-[580px] md:h-[620px] bg-[#1a1a1a] rounded-[44px] p-3 shadow-2xl border-2 border-zinc-800"
              style={{
                transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)',
                animation: 'float 6s ease-in-out infinite'
              }}
            >
              <style jsx>{`
                @keyframes float {
                  0%, 100% { transform: perspective(1000px) rotateY(-5deg) rotateX(2deg) translateY(0); }
                  50% { transform: perspective(1000px) rotateY(-5deg) rotateX(2deg) translateY(-10px); }
                }
                @keyframes fadeInUp {
                  from { opacity: 0; transform: translateY(10px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              `}</style>
              <div className="w-full h-full bg-[#0f0f0f] rounded-[36px] overflow-hidden flex flex-col">
                {/* Notch */}
                <div className="w-[100px] h-7 bg-[#1a1a1a] rounded-full mx-auto mt-2" />
                
                {/* SMS Header */}
                <div className="px-4 py-3 border-b border-zinc-800 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center font-bold text-lg">
                    C
                  </div>
                  <div>
                    <div className="font-semibold">Cheengu</div>
                    <div className="text-xs text-zinc-500">SMS</div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden">
                  {smsMessages.map((msg, i) => (
                    <div 
                      key={i}
                      className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed opacity-0 ${
                        msg.sent 
                          ? 'bg-emerald-500 text-black self-end rounded-br-sm' 
                          : 'bg-zinc-800 self-start rounded-bl-sm'
                      }`}
                      style={{
                        animation: `fadeInUp 0.5s forwards`,
                        animationDelay: `${0.5 + i * 1}s`
                      }}
                    >
                      {msg.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-6 md:px-10 py-24 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-zinc-400">Three steps to finally keeping your commitments</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: 1, icon: '🎯', title: 'Set Your Goal', desc: 'Text us your commitment and stake $5-$500. Daily habit or one-time deadline — you choose.' },
              { num: 2, icon: '👤', title: 'Pick Your Judge', desc: 'Choose a friend to verify you. They get a text asking "Did they do it?" and reply yes or no.' },
              { num: 3, icon: '💰', title: 'Succeed or Lose', desc: 'Complete your goal? Get your money back. Miss a day? Lose part of your stake. Real consequences.' },
            ].map((step) => (
              <div 
                key={step.num}
                className="bg-[#1a1a1a] border border-zinc-800 rounded-3xl p-10 text-center hover:border-emerald-500/50 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(16,185,129,0.1)]"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-black mx-auto mb-6">
                  {step.num}
                </div>
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                <p className="text-zinc-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section id="demo" className="px-6 md:px-10 py-24 bg-[#111]">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">See It In Action</h2>
            <p className="text-lg text-zinc-400">Watch how a commitment flows from start to finish</p>
          </div>

          <div className="bg-[#1a1a1a] border border-zinc-800 rounded-3xl p-6 shadow-2xl">
            <video 
              className="w-full aspect-video rounded-2xl bg-[#0f0f0f]"
              controls
              poster="/demo-poster.png"
              preload="metadata"
            >
              <source src="/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 md:px-10 py-24 bg-gradient-to-b from-[#111] to-[#0a0a0a]">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Real Results</h2>
            <p className="text-lg text-zinc-400">From people who finally followed through</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { 
                quote: "I've tried every productivity app. This is the only thing that actually worked. Knowing my friend would see me fail AND I'd lose money? That got me off my ass.",
                name: "Ross",
                detail: "Completed 30-day workout streak",
                color: "from-blue-500 to-violet-500"
              },
              {
                quote: "I've wanted to learn Korean for years but never stuck with it. Cheengu made me actually study every single day for the first time. The stakes made it real.",
                name: "Rachel", 
                detail: "21-day language learning streak",
                color: "from-pink-500 to-rose-500"
              }
            ].map((t, i) => (
              <div key={i} className="bg-[#1a1a1a] border border-zinc-800 rounded-3xl p-10 relative">
                <div className="absolute top-6 left-8 text-7xl text-emerald-500/20 font-serif">"</div>
                <p className="text-lg leading-relaxed mb-6 relative z-10">{t.quote}</p>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${t.color} rounded-full flex items-center justify-center font-bold text-lg`}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-zinc-500">{t.detail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 md:px-10 py-16 border-y border-zinc-800">
        <div className="max-w-[1000px] mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { stat: '87%', label: 'Completion rate with stakes' },
            { stat: '$5-500', label: 'Flexible stake amounts' },
            { stat: '2 min', label: 'Setup time via SMS' },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 mb-2">
                {s.stat}
              </div>
              <div className="text-zinc-400 text-sm md:text-base">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 md:px-10 py-24 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px]" />
        
        <div className="relative z-10 max-w-[600px] mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Stop Making Excuses?</h2>
          <p className="text-xl text-zinc-400 mb-10">
            You know what you need to do. You just need real consequences to actually do it.
          </p>

          <form onSubmit={handleSubmit} className="max-w-[500px] mx-auto mb-4">
            {/* Honeypot fields - hidden from users, bots will fill them */}
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your phone number"
                className="flex-1 bg-[#1a1a1a] border border-zinc-800 rounded-xl px-6 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 text-lg transition-colors"
                required
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-emerald-500 text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.4)]"
              >
                Get Started
              </button>
            </div>
          </form>
          <p className="text-sm text-zinc-600">No app. No account. Just enter your number to get going.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-10 py-10 border-t border-zinc-800">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6">
            <Link href="/privacy" className="text-zinc-500 hover:text-white text-sm transition-colors">Privacy</Link>
            <Link href="/terms" className="text-zinc-500 hover:text-white text-sm transition-colors">Terms</Link>
            <Link href="/contact" className="text-zinc-500 hover:text-white text-sm transition-colors">Contact</Link>
          </div>
          <div className="text-zinc-500 text-sm">© 2025 Cheengu. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}