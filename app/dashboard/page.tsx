'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

type Commitment = {
  id: string;
  commitment_text: string;
  commitment_type: string;
  status: string;
  original_stake: number;
  stake_remaining: number;
  penalty_per_failure: number;
  commitment_start_date: string;
  commitment_end_date: string;
  deadline_date: string | null;
  user_name: string | null;
  judge_name: string | null;
  refund_amount: number | null;
};

type DailyLog = {
  id: string;
  date: string;
  outcome: 'pass' | 'fail' | 'pending';
};

type DashboardData = {
  user: {
    phone: string;
    user_name: string | null;
  };
  activeCommitment: Commitment | null;
  dailyLogs: DailyLog[];
  pastCommitments: Commitment[];
};

export default function Dashboard() {
  const [step, setStep] = useState<'phone' | 'code' | 'dashboard'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dashboard/send-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep('code');
        setStatus('idle');
      } else {
        setError(data.error || 'Failed to send code');
        setStatus('error');
      }
    } catch (err) {
      setError('Failed to connect. Please try again.');
      setStatus('error');
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dashboard/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code }),
      });

      const data = await response.json();

      if (response.ok) {
        setDashboardData(data);
        setStep('dashboard');
        setStatus('idle');
      } else {
        setError(data.error || 'Invalid code');
        setStatus('error');
      }
    } catch (err) {
      setError('Failed to connect. Please try again.');
      setStatus('error');
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStakeBar = (remaining: number, original: number) => {
    const percent = Math.round((remaining / original) * 10);
    return '█'.repeat(percent) + '░'.repeat(10 - percent);
  };

  const getDaysInfo = (commitment: Commitment) => {
    const start = new Date(commitment.commitment_start_date);
    const end = new Date(commitment.commitment_end_date);
    const today = new Date();
    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const daysPassed = Math.ceil((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return { totalDays, daysPassed: Math.min(daysPassed, totalDays), daysLeft: Math.max(0, totalDays - daysPassed) };
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="px-6 md:px-10 py-5 flex justify-between items-center border-b border-zinc-800">
        <Link href="/" className="text-2xl font-bold text-emerald-500">
          Cheengu
        </Link>
        <Link href="/" className="text-zinc-400 hover:text-white text-sm transition-colors">
          ← Back to Home
        </Link>
      </nav>

      <div className="max-w-[600px] mx-auto px-6 py-16">
        {/* Phone Entry Step */}
        {step === 'phone' && (
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Your Dashboard</h1>
            <p className="text-zinc-400 mb-8">Enter your phone number to view your commitment progress.</p>

            <form onSubmit={handleSendCode} className="space-y-4">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your phone number"
                className="w-full bg-[#1a1a1a] border border-zinc-800 rounded-xl px-6 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 text-lg transition-colors"
                required
                disabled={status === 'loading'}
              />
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <p className="text-red-400">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-emerald-500 text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Sending...' : 'Send Verification Code'}
              </button>
            </form>

            <p className="text-sm text-zinc-600 mt-4">
              We'll text you a 4-digit code to verify it's you.
            </p>
          </div>
        )}

        {/* Code Entry Step */}
        {step === 'code' && (
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Enter Code</h1>
            <p className="text-zinc-400 mb-8">We sent a 4-digit code to {phone}</p>

            <form onSubmit={handleVerifyCode} className="space-y-4">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="0000"
                maxLength={4}
                className="w-full bg-[#1a1a1a] border border-zinc-800 rounded-xl px-6 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 text-3xl text-center tracking-[0.5em] transition-colors"
                required
                disabled={status === 'loading'}
              />
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <p className="text-red-400">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading' || code.length !== 4}
                className="w-full bg-emerald-500 text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Verifying...' : 'View Dashboard'}
              </button>
            </form>

            <button
              onClick={() => { setStep('phone'); setCode(''); setError(''); }}
              className="text-zinc-400 hover:text-white text-sm mt-4 transition-colors"
            >
              ← Use a different number
            </button>
          </div>
        )}

        {/* Dashboard View */}
        {step === 'dashboard' && dashboardData && (
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-2">
                {dashboardData.user.user_name ? `Hey ${dashboardData.user.user_name}!` : 'Your Dashboard'}
              </h1>
              <p className="text-zinc-400">Here's your commitment progress</p>
            </div>

            {/* Active Commitment */}
            {dashboardData.activeCommitment ? (
              <div className="bg-[#1a1a1a] border border-zinc-800 rounded-2xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Current Commitment</h2>
                  <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium">
                    Active
                  </span>
                </div>

                <div>
                  <p className="text-2xl font-medium mb-2">"{dashboardData.activeCommitment.commitment_text}"</p>
                  <p className="text-zinc-400">
                    {dashboardData.activeCommitment.commitment_type === 'daily' ? 'Daily commitment' : 'Deadline commitment'}
                    {dashboardData.activeCommitment.judge_name && ` • Judge: ${dashboardData.activeCommitment.judge_name}`}
                  </p>
                </div>

                {/* Stake Visual */}
                <div className="bg-[#0f0f0f] rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-zinc-400">Stake Remaining</span>
                    <span className="text-xl font-bold">
                      ${dashboardData.activeCommitment.stake_remaining} / ${dashboardData.activeCommitment.original_stake}
                    </span>
                  </div>
                  <div className="font-mono text-2xl text-emerald-400">
                    {getStakeBar(dashboardData.activeCommitment.stake_remaining, dashboardData.activeCommitment.original_stake)}
                  </div>
                </div>

                {/* Days Progress */}
                {dashboardData.activeCommitment.commitment_type === 'daily' && (
                  <div className="bg-[#0f0f0f] rounded-xl p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-zinc-400">Progress</span>
                      <span className="font-medium">
                        Day {getDaysInfo(dashboardData.activeCommitment).daysPassed} of {getDaysInfo(dashboardData.activeCommitment).totalDays}
                      </span>
                    </div>
                    
                    {/* Day-by-day grid */}
                    <div className="flex flex-wrap gap-2">
                      {dashboardData.dailyLogs.map((log, i) => (
                        <div
                          key={log.id}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium ${
                            log.outcome === 'pass' 
                              ? 'bg-emerald-500/20 text-emerald-400' 
                              : log.outcome === 'fail'
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-zinc-800 text-zinc-500'
                          }`}
                          title={`${formatDate(log.date)}: ${log.outcome}`}
                        >
                          {log.outcome === 'pass' ? '✓' : log.outcome === 'fail' ? '✗' : '?'}
                        </div>
                      ))}
                      {/* Empty slots for remaining days */}
                      {Array.from({ length: Math.max(0, getDaysInfo(dashboardData.activeCommitment).daysLeft) }).map((_, i) => (
                        <div
                          key={`future-${i}`}
                          className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Deadline info */}
                {dashboardData.activeCommitment.commitment_type === 'deadline' && dashboardData.activeCommitment.deadline_date && (
                  <div className="bg-[#0f0f0f] rounded-xl p-4 text-center">
                    <span className="text-zinc-400">Deadline: </span>
                    <span className="font-medium">{formatDate(dashboardData.activeCommitment.deadline_date)}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-[#1a1a1a] border border-zinc-800 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">🎯</div>
                <h2 className="text-xl font-semibold mb-2">No Active Commitment</h2>
                <p className="text-zinc-400 mb-4">Ready to set a new goal?</p>
                <p className="text-emerald-400">Text START to our number to begin!</p>
              </div>
            )}

            {/* Past Commitments */}
            {dashboardData.pastCommitments.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Past Commitments</h2>
                
                {dashboardData.pastCommitments.map((commitment) => {
                  const refunded = commitment.refund_amount || commitment.stake_remaining || 0;
                  const percentKept = Math.round((refunded / commitment.original_stake) * 100);
                  const isPerfect = refunded === commitment.original_stake;
                  
                  return (
                    <div 
                      key={commitment.id}
                      className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-4 flex justify-between items-center"
                    >
                      <div className="flex-1">
                        <p className="font-medium mb-1">"{commitment.commitment_text}"</p>
                        <p className="text-sm text-zinc-400">
                          {formatDate(commitment.commitment_start_date)} - {formatDate(commitment.commitment_end_date)}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${isPerfect ? 'text-emerald-400' : percentKept > 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                          {isPerfect ? '🎉 Perfect!' : `${percentKept}% kept`}
                        </div>
                        <div className="text-sm text-zinc-400">
                          ${refunded} / ${commitment.original_stake}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Sign Out */}
            <button
              onClick={() => { setStep('phone'); setPhone(''); setCode(''); setDashboardData(null); }}
              className="w-full text-zinc-400 hover:text-white text-sm py-4 transition-colors"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}