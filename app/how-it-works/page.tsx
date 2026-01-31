import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navigation />

      <div className="max-w-[800px] mx-auto px-5 py-20">
        <h1 className="text-5xl font-bold mb-6">How Cheengu Works</h1>
        <p className="text-lg text-[#aaa] leading-relaxed mb-4">
          Cheengu is an SMS-based accountability system that helps you follow through on commitments using automated check-ins, human verification, and real financial stakes.
        </p>

        <h2 className="text-3xl mt-16 mb-4">The Complete Process</h2>

        <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-8 mb-6">
          <div className="inline-block bg-white text-black w-10 h-10 rounded-full text-center leading-10 font-bold mb-4">1</div>
          <h3 className="text-2xl mb-3">Create Your Commitment</h3>
          <p className="text-[#aaa] mb-4">Text Cheengu to start. You'll specify:</p>
          <ul className="ml-6 text-[#aaa] space-y-2">
            <li>• Your goal (e.g., "Exercise for 30 minutes")</li>
            <li>• Your judge (someone who can verify your work)</li>
            <li>• Commitment type (daily habit or project deadline)</li>
            <li>• Your stake amount (typically $20 for 7 days)</li>
            <li>• Penalty per failure (typically $5)</li>
          </ul>
        </div>

        <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-8 mb-6">
          <div className="inline-block bg-white text-black w-10 h-10 rounded-full text-center leading-10 font-bold mb-4">2</div>
          <h3 className="text-2xl mb-3">Stake Your Money</h3>
          <p className="text-[#aaa]">
            You'll receive a secure payment link via SMS. Pay your stake using a credit or debit card. This money is held by Stripe (our payment processor) and will either be refunded to you if you succeed, or transferred to your judge for each failure.
          </p>
        </div>

        <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-8 mb-6">
          <div className="inline-block bg-white text-black w-10 h-10 rounded-full text-center leading-10 font-bold mb-4">3</div>
          <h3 className="text-2xl mb-3">Daily Check-Ins</h3>
          <p className="text-[#aaa] mb-4">Every day at your chosen time, you receive an SMS:</p>
          
          <div className="bg-[#0f0f0f] border border-[#222] rounded-lg p-6 my-6 font-mono text-sm">
            <div className="text-[#666] text-xs mb-2 uppercase tracking-wider">SMS to You</div>
            <div className="bg-[#1a1a1a] border-l-4 border-[#4CAF50] p-3 rounded">
              Did you complete your commitment today: "Exercise for 30 minutes"?<br/>
              Reply YES or NO
            </div>
          </div>
          
          <p className="text-[#aaa]">You respond with YES or NO. That's it.</p>
        </div>

        <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-8 mb-6">
          <div className="inline-block bg-white text-black w-10 h-10 rounded-full text-center leading-10 font-bold mb-4">4</div>
          <h3 className="text-2xl mb-3">Judge Verification</h3>
          <p className="text-[#aaa] mb-4">After you respond, your judge immediately receives a verification request:</p>
          
          <div className="bg-[#0f0f0f] border border-[#222] rounded-lg p-6 my-6 font-mono text-sm">
            <div className="text-[#666] text-xs mb-2 uppercase tracking-wider">SMS to Judge</div>
            <div className="bg-[#1a1a1a] border-l-4 border-[#4CAF50] p-3 rounded">
              Brian claims they completed: "Exercise for 30 minutes"<br/>
              Did they actually do it?<br/>
              Reply YES or NO
            </div>
          </div>
          
          <p className="text-[#aaa]">Your judge responds YES or NO based on what they observed or what evidence you provided them.</p>
        </div>

        <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-8 mb-6">
          <div className="inline-block bg-white text-black w-10 h-10 rounded-full text-center leading-10 font-bold mb-4">5</div>
          <h3 className="text-2xl mb-3">Automatic Penalties</h3>
          <p className="text-[#aaa] mb-4">The system compares your response with your judge's:</p>
          <ul className="ml-6 text-[#aaa] space-y-2 my-4">
            <li>• <span className="bg-[#2a2a2a] px-2 py-1 rounded text-white">Both YES</span> → Success. No penalty.</li>
            <li>• <span className="bg-[#2a2a2a] px-2 py-1 rounded text-white">Both NO</span> → You admitted failure. Penalty applied.</li>
            <li>• <span className="bg-[#2a2a2a] px-2 py-1 rounded text-white">Disagreement</span> → Judge's answer wins. Penalty applied if judge says NO.</li>
            <li>• <span className="bg-[#2a2a2a] px-2 py-1 rounded text-white">No response</span> → Defaults to failure after deadline. Penalty applied.</li>
          </ul>
          
          <p className="text-[#aaa] mt-4">
            Each failure triggers a $5 penalty (or your custom amount) to be transferred from your stake to your judge.
          </p>
        </div>

        <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-8 mb-6">
          <div className="inline-block bg-white text-black w-10 h-10 rounded-full text-center leading-10 font-bold mb-4">6</div>
          <h3 className="text-2xl mb-3">Weekly Settlement</h3>
          <p className="text-[#aaa] mb-4">At the end of your commitment period (typically 7 days), the system:</p>
          <ul className="ml-6 text-[#aaa] space-y-2 my-4">
            <li>• Calculates total penalties</li>
            <li>• Transfers penalty money to your judge via Stripe</li>
            <li>• Refunds your remaining stake to you</li>
            <li>• Sends you a summary of your performance</li>
          </ul>
          
          <div className="bg-[#0f0f0f] border border-[#222] rounded-lg p-6 my-6 font-mono text-sm">
            <div className="text-[#666] text-xs mb-2 uppercase tracking-wider">Example Settlement</div>
            <div className="bg-[#1a1a1a] border-l-4 border-[#4CAF50] p-3 rounded">
              Week complete!<br/>
              Successes: 5/7 days<br/>
              Failures: 2 days<br/>
              Penalties: $10 sent to your judge<br/>
              Refund: $10 returned to you
            </div>
          </div>
        </div>

        <h2 className="text-3xl mt-16 mb-4">Commitment Types</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6">
            <h4 className="text-xl mb-3">DAILY Commitments</h4>
            <p className="text-[#aaa] mb-3">For building habits. You get checked in every day at a set time. Perfect for exercise, meditation, writing, or any daily practice.</p>
            <p className="text-[#666] text-sm">Example: "Exercise 30 min every day for 7 days"</p>
          </div>
          
          <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6">
            <h4 className="text-xl mb-3">DEADLINE Commitments</h4>
            <p className="text-[#aaa] mb-3">For completing projects. You set a deadline and get checked in only on that date. Perfect for deliverables, submissions, or one-time goals.</p>
            <p className="text-[#666] text-sm">Example: "Submit grant proposal by Friday"</p>
          </div>
        </div>

        <h2 className="text-3xl mt-16 mb-4">Why This Works</h2>

        <h3 className="text-xl mt-8 mb-3">Automation Prevents System Breakdown</h3>
        <p className="text-[#aaa] leading-relaxed">
          Manual accountability fails because people forget or feel awkward asking "did you do it?" Cheengu automates everything. No forgetting. No awkwardness. No negotiation.
        </p>

        <h3 className="text-xl mt-8 mb-3">Human Verification Prevents Cheating</h3>
        <p className="text-[#aaa] leading-relaxed">
          Unlike apps where you self-report, your judge actually verifies your work. You can't game the system by lying to yourself.
        </p>

        <h3 className="text-xl mt-8 mb-3">Real Money Creates Real Stakes</h3>
        <p className="text-[#aaa] leading-relaxed">
          This isn't points or badges. It's actual money leaving your bank account when you fail. Loss aversion is one of the most powerful psychological motivators.
        </p>

        <h3 className="text-xl mt-8 mb-3">SMS Keeps It Simple</h3>
        <p className="text-[#aaa] leading-relaxed">
          No app to open. No login to remember. Just text messages that work on any phone. The friction is removed completely.
        </p>

        <h2 className="text-3xl mt-16 mb-4">Privacy & Security</h2>
        <p className="text-[#aaa] leading-relaxed">
          Your payment information is handled by Stripe, a industry-leading payment processor. We never see or store your credit card details. Your phone number and commitment data are stored securely and never shared with third parties. See our <Link href="/privacy" className="text-[#4CAF50]">Privacy Policy</Link> for complete details.
        </p>

        <h2 className="text-3xl mt-16 mb-4">Getting Started</h2>
        <p className="text-[#aaa] leading-relaxed">
          Ready to actually follow through on your commitments? Contact us at <a href="mailto:hello@cheengu.com" className="text-[#4CAF50]">hello@cheengu.com</a> to get started with Cheengu.
        </p>
      </div>

      <Footer />
    </div>
  );
}
