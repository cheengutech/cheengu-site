import Link from 'next/link';

export default function Home() {
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
            <li><Link href="/privacy" className="text-[#888] hover:text-white text-sm transition-colors">Privacy</Link></li>
            <li><Link href="/terms" className="text-[#888] hover:text-white text-sm transition-colors">Terms</Link></li>
          </ul>
        </div>
      </nav>

      <div className="max-w-[800px] mx-auto px-5 py-32 text-center">
        <h1 className="text-[56px] font-bold mb-6 leading-tight">
          Stop Breaking Promises to Yourself
        </h1>
        <p className="text-xl text-[#888] mb-12">
          Achieve your goals with real accountability through SMS check-ins, human verification, and financial stakes.
        </p>
        <Link 
          href="/how-it-works" 
          className="inline-block bg-white text-black px-8 py-4 rounded-lg font-semibold text-base hover:bg-[#f0f0f0] transition-colors"
        >
          See How It Works
        </Link>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 py-20">
        <h2 className="text-4xl mb-4">The Problem</h2>
        <div className="bg-[#1a1a1a] p-12 rounded-xl border border-[#333] mt-12">
          <h3 className="text-[28px] mb-4 text-[#ff4444]">Why Goal-Setting Fails</h3>
          <p className="text-lg text-[#aaa] leading-relaxed mb-8">
            You've tried before. You set a goal, maybe told a friend, started strong... then life got busy. Your friend forgot to check in. You forgot to update them. The social awkwardness of asking "did you actually do it?" made the whole system fall apart.
          </p>
          <p className="text-lg text-[#aaa] leading-relaxed mb-8">
            Manual accountability between friends fails because of three systematic problems: social awkwardness around verification, forgetfulness on both sides, and the constant negotiation required to keep the system running.
          </p>
          
          <h4 className="text-[28px] mb-4 text-[#44ff44]">How Cheengu Solves This</h4>
          <p className="text-lg text-[#aaa] leading-relaxed mb-8">
            Cheengu removes the friction. Every day (or at your deadline), you get an automated SMS asking if you completed your commitment. Your designated judge gets a direct verification request. No awkward conversations. No forgetting. No negotiation. Just simple yes/no accountability that actually works.
          </p>
          <p className="text-lg text-[#aaa] leading-relaxed">
            And because you've put real money on the line—money that goes to your judge if you fail—there's actual skin in the game. Not just empty promises.
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 py-20">
        <h2 className="text-4xl mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="bg-[#1a1a1a] p-8 rounded-xl border border-[#333]">
            <h3 className="text-2xl mb-3">1. Set Your Commitment</h3>
            <p className="text-[#888]">
              Choose a daily habit (like exercise) or a deadline goal (like finishing a project). Decide how much money you're staking—typically $20 for a week.
            </p>
          </div>
          
          <div className="bg-[#1a1a1a] p-8 rounded-xl border border-[#333]">
            <h3 className="text-2xl mb-3">2. Pick Your Judge</h3>
            <p className="text-[#888]">
              Choose someone who can verify your work. A friend, colleague, or accountability partner. They receive direct verification requests via SMS.
            </p>
          </div>
          
          <div className="bg-[#1a1a1a] p-8 rounded-xl border border-[#333]">
            <h3 className="text-2xl mb-3">3. Get Daily Check-Ins</h3>
            <p className="text-[#888]">
              Every day, Cheengu texts you asking if you completed your commitment. Your judge receives a verification request to confirm. Simple yes or no.
            </p>
          </div>
          
          <div className="bg-[#1a1a1a] p-8 rounded-xl border border-[#333]">
            <h3 className="text-2xl mb-3">4. Automatic Enforcement</h3>
            <p className="text-[#888]">
              If you fail a check-in, money from your stake is automatically transferred to your judge. If you succeed all week, you get your full stake back.
            </p>
          </div>
          
          <div className="bg-[#1a1a1a] p-8 rounded-xl border border-[#333]">
            <h3 className="text-2xl mb-3">5. Weekly Settlement</h3>
            <p className="text-[#888]">
              At the end of each week, the system calculates your penalties and processes refunds. Everything is automated—no manual tracking or awkward money conversations.
            </p>
          </div>
          
          <div className="bg-[#1a1a1a] p-8 rounded-xl border border-[#333]">
            <h3 className="text-2xl mb-3">6. Real Consequences</h3>
            <p className="text-[#888]">
              This isn't a points system or a streak counter. It's real money that leaves your account when you fail. That's what makes it work.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 py-20">
        <h2 className="text-4xl mb-4">Why Cheengu Works</h2>
        <p className="text-lg text-[#aaa] leading-relaxed">
          Most accountability apps fail because they rely on your motivation alone. Cheengu is different. It combines three proven psychological principles:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="bg-[#1a1a1a] p-8 rounded-xl border border-[#333]">
            <h3 className="text-2xl mb-3">Loss Aversion</h3>
            <p className="text-[#888]">
              People are more motivated to avoid losing money than to gain rewards. Your stake creates real pain if you fail.
            </p>
          </div>
          
          <div className="bg-[#1a1a1a] p-8 rounded-xl border border-[#333]">
            <h3 className="text-2xl mb-3">Social Accountability</h3>
            <p className="text-[#888]">
              Knowing another person will verify your work creates social pressure that self-reporting can't match.
            </p>
          </div>
          
          <div className="bg-[#1a1a1a] p-8 rounded-xl border border-[#333]">
            <h3 className="text-2xl mb-3">Automation</h3>
            <p className="text-[#888]">
              Removing manual tracking and negotiation means the system never breaks down from forgetfulness or social awkwardness.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 py-20 text-center">
        <h2 className="text-4xl mb-4">Ready to Actually Follow Through?</h2>
        <p className="text-[#aaa] mb-8">Stop making empty promises. Start using real accountability.</p>
        <Link 
          href="/how-it-works" 
          className="inline-block bg-white text-black px-8 py-4 rounded-lg font-semibold text-base hover:bg-[#f0f0f0] transition-colors"
        >
          Learn More
        </Link>
      </div>

      <footer className="bg-[#1a1a1a] border-t border-[#333] py-12 text-center text-[#666] text-sm mt-20">
        <p>&copy; 2025 Cheengu. All rights reserved.</p>
        <p className="mt-2">
          <Link href="/privacy" className="text-[#888] hover:text-white">Privacy Policy</Link>
          {' | '}
          <Link href="/terms" className="text-[#888] hover:text-white">Terms of Service</Link>
          {' | '}
          <Link href="/contact" className="text-[#888] hover:text-white">Contact</Link>
        </p>
      </footer>
    </div>
  );
}
