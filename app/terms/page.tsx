import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navigation />

      <div className="max-w-[800px] mx-auto px-5 py-20">
        <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
        <p className="text-sm text-[#666] mb-12">Last Updated: January 30, 2025</p>

        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          These Terms of Service (&quot;Terms&quot;) govern your use of Cheengu&apos;s SMS-based accountability service (&quot;Service&quot;). By creating a commitment through Cheengu, you agree to these Terms.
        </p>

        <div className="bg-[#2a1a1a] border-l-4 border-[#ff4444] p-4 my-6 rounded">
          <p className="text-[#ffaaaa]">
            <strong>Important:</strong> Cheengu involves real financial stakes. You may lose money if you fail to complete your commitments. Please read these Terms carefully before using the Service.
          </p>
        </div>

        <h2 className="text-3xl mt-12 mb-4">1. Service Description</h2>

        <p className="text-base text-[#aaa] leading-relaxed mb-2">Cheengu is an accountability system that helps users follow through on commitments by:</p>
        <ul className="ml-6 mb-4 text-[#aaa] space-y-2">
          <li>Sending automated SMS check-ins at specified times</li>
          <li>Requesting verification from a designated &quot;judge&quot; (accountability partner)</li>
          <li>Holding financial stakes that are partially or fully forfeited upon failure</li>
          <li>Processing automatic penalties and refunds based on commitment performance</li>
        </ul>

        <h2 className="text-3xl mt-12 mb-4">2. Eligibility</h2>

        <p className="text-base text-[#aaa] leading-relaxed mb-2">To use Cheengu, you must:</p>
        <ul className="ml-6 mb-4 text-[#aaa] space-y-2">
          <li>Be at least 18 years of age</li>
          <li>Have a valid mobile phone number capable of receiving SMS messages</li>
          <li>Have a valid payment method (credit or debit card)</li>
          <li>Reside in the United States</li>
          <li>Agree to these Terms and our Privacy Policy</li>
        </ul>

        <h2 className="text-3xl mt-12 mb-4">3. How Commitments Work</h2>

        <h3 className="text-xl mt-8 mb-3">Creating a Commitment</h3>
        <p className="text-base text-[#aaa] leading-relaxed mb-2">When you create a commitment, you specify:</p>
        <ul className="ml-6 mb-4 text-[#aaa] space-y-2">
          <li>The specific goal or task you commit to completing</li>
          <li>The commitment type (DAILY habit or DEADLINE project)</li>
          <li>The duration or deadline</li>
          <li>Your designated judge (who will verify completion)</li>
          <li>The stake amount (money held during the commitment period)</li>
          <li>The penalty amount per failure</li>
        </ul>

        <h3 className="text-xl mt-8 mb-3">Check-In Process</h3>
        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          For DAILY commitments, you will receive SMS check-ins at your specified time each day. For DEADLINE commitments, you will receive a check-in on the deadline date. You must respond YES or NO to indicate whether you completed your commitment.
        </p>

        <h3 className="text-xl mt-8 mb-3">Judge Verification</h3>
        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          After you respond, your judge receives an SMS asking them to verify your claim. The judge must respond YES or NO based on their observation or evidence you provided.
        </p>

        <h3 className="text-xl mt-8 mb-3">Determination of Success or Failure</h3>
        <ul className="ml-6 mb-4 text-[#aaa] space-y-2">
          <li>If both you and your judge respond YES → Success (no penalty)</li>
          <li>If both you and your judge respond NO → Failure (penalty applied)</li>
          <li>If you respond YES but judge responds NO → Failure (penalty applied)</li>
          <li>If you respond NO but judge responds YES → You admitted failure (penalty applied)</li>
          <li>If either party does not respond by the deadline → Failure (penalty applied)</li>
        </ul>

        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          <strong>The judge&apos;s verification is final and binding.</strong> Disputes about whether a commitment was completed are resolved in favor of the judge&apos;s determination.
        </p>

        <h2 className="text-3xl mt-12 mb-4">4. Financial Terms</h2>

        <h3 className="text-xl mt-8 mb-3">Stake Payment</h3>
        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          When you create a commitment, you must pay a stake amount via credit or debit card. This payment is processed through Stripe, our payment processor. The stake is held for the duration of your commitment.
        </p>

        <h3 className="text-xl mt-8 mb-3">Penalties</h3>
        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          Each time you fail a check-in, a penalty amount (specified when you created the commitment) is deducted from your stake. Penalties are transferred to your judge at the end of the commitment period via Stripe.
        </p>

        <h3 className="text-xl mt-8 mb-3">Refunds</h3>
        <p className="text-base text-[#aaa] leading-relaxed mb-2">At the end of your commitment period:</p>
        <ul className="ml-6 mb-4 text-[#aaa] space-y-2">
          <li>Any remaining stake (after penalties) is automatically refunded to your original payment method</li>
          <li>Refunds are processed through Stripe and typically appear within 5-10 business days</li>
          <li>If you complete all check-ins successfully, you receive a full refund of your stake</li>
        </ul>

        <h3 className="text-xl mt-8 mb-3">Non-Refundable Circumstances</h3>
        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          Penalties applied due to failed check-ins are final and non-refundable. You cannot dispute penalties after the commitment period ends unless there was a technical error in our system.
        </p>

        <h3 className="text-xl mt-8 mb-3">Payment Processing Fees</h3>
        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          Stripe may charge standard payment processing fees. These fees are separate from Cheengu and are governed by Stripe&apos;s terms.
        </p>

        <h2 className="text-3xl mt-12 mb-4">5. Your Responsibilities</h2>

        <p className="text-base text-[#aaa] leading-relaxed mb-2">When using Cheengu, you agree to:</p>
        <ul className="ml-6 mb-4 text-[#aaa] space-y-2">
          <li>Provide accurate information about your commitments and judge</li>
          <li>Respond to check-ins honestly and in good faith</li>
          <li>Ensure your judge understands their role and has consented to receive SMS messages</li>
          <li>Provide your judge with evidence of completion when necessary</li>
          <li>Maintain a valid payment method with sufficient funds</li>
          <li>Not attempt to manipulate or circumvent the verification system</li>
          <li>Comply with all applicable laws and these Terms</li>
        </ul>

        <h2 className="text-3xl mt-12 mb-4">6. Judge Responsibilities</h2>

        <p className="text-base text-[#aaa] leading-relaxed mb-2">By designating someone as your judge, you confirm that:</p>
        <ul className="ml-6 mb-4 text-[#aaa] space-y-2">
          <li>They have agreed to serve as your accountability judge</li>
          <li>They have consented to receive SMS messages from Cheengu</li>
          <li>They understand they will receive penalty payments if you fail check-ins</li>
          <li>They are capable of honestly verifying whether you completed your commitments</li>
        </ul>

        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          Judges must verify commitments honestly based on their actual observation or evidence provided. Judges who consistently provide false verifications may be removed from the system.
        </p>

        <h2 className="text-3xl mt-12 mb-4">7. SMS Communication</h2>

        <p className="text-base text-[#aaa] leading-relaxed mb-2">By using Cheengu, you consent to receive SMS messages including:</p>
        <ul className="ml-6 mb-4 text-[#aaa] space-y-2">
          <li>Daily or deadline check-ins</li>
          <li>Verification requests (if you are serving as a judge)</li>
          <li>Payment confirmations and settlement summaries</li>
          <li>Service updates and notifications</li>
        </ul>

        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          Standard messaging rates from your mobile carrier apply. You can opt out by replying STOP to any message, but this will end your active commitments and you may forfeit your stake.
        </p>

        <h2 className="text-3xl mt-12 mb-4">8. Prohibited Uses</h2>

        <p className="text-base text-[#aaa] leading-relaxed mb-2">You may not:</p>
        <ul className="ml-6 mb-4 text-[#aaa] space-y-2">
          <li>Create commitments with the intent to defraud the system or your judge</li>
          <li>Collude with your judge to provide false verifications</li>
          <li>Use Cheengu for illegal purposes or gambling</li>
          <li>Attempt to reverse engineer, hack, or interfere with the Service</li>
          <li>Use automated systems or bots to interact with the Service</li>
          <li>Create multiple accounts to circumvent penalties or abuse the system</li>
          <li>Harass, threaten, or abuse other users or judges</li>
        </ul>

        <h2 className="text-3xl mt-12 mb-4">9. Account Termination</h2>

        <p className="text-base text-[#aaa] leading-relaxed mb-2">We reserve the right to suspend or terminate your access to Cheengu if you:</p>
        <ul className="ml-6 mb-4 text-[#aaa] space-y-2">
          <li>Violate these Terms</li>
          <li>Engage in fraudulent or abusive behavior</li>
          <li>Fail to maintain a valid payment method</li>
          <li>Attempt to manipulate the verification system</li>
        </ul>

        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          If your account is terminated for violations, you may forfeit any remaining stake and lose access to the Service.
        </p>

        <h2 className="text-3xl mt-12 mb-4">10. Disclaimers and Limitations</h2>

        <h3 className="text-xl mt-8 mb-3">No Guarantee of Success</h3>
        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          Cheengu is a tool to help with accountability, but we do not guarantee that you will achieve your goals or complete your commitments. Your success depends on your own effort and discipline.
        </p>

        <h3 className="text-xl mt-8 mb-3">Judge Availability</h3>
        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          We are not responsible for your judge&apos;s failure to respond to verification requests. If your judge does not respond, the check-in defaults to failure and the penalty applies.
        </p>

        <h3 className="text-xl mt-8 mb-3">Technical Issues</h3>
        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          While we strive for reliable service, SMS delivery, payment processing, and system availability may be affected by factors outside our control (carrier issues, Stripe downtime, etc.). We will make reasonable efforts to resolve technical issues, but are not liable for losses due to service interruptions.
        </p>

        <h3 className="text-xl mt-8 mb-3">Limitation of Liability</h3>
        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          To the maximum extent permitted by law, Cheengu&apos;s total liability to you for any damages shall not exceed the amount of your stake for the relevant commitment. We are not liable for indirect, incidental, or consequential damages.
        </p>

        <h2 className="text-3xl mt-12 mb-4">11. Dispute Resolution</h2>

        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          If you have a dispute about a penalty or commitment outcome, contact us at{' '}
          <a href="mailto:hello@cheengu.com" className="text-[#4CAF50] hover:underline">
            hello@cheengu.com
          </a>{' '}
          within 7 days of the commitment end date. We will review disputes on a case-by-case basis, but our decision is final.
        </p>

        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          Any legal disputes arising from these Terms shall be governed by the laws of the State of California and resolved in the courts of San Francisco County, California.
        </p>

        <h2 className="text-3xl mt-12 mb-4">12. Changes to Terms</h2>

        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          We may update these Terms from time to time. If we make material changes, we will notify you via SMS or email before the changes take effect. Continued use of the Service after changes constitutes acceptance of the new Terms.
        </p>

        <h2 className="text-3xl mt-12 mb-4">13. Intellectual Property</h2>

        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          Cheengu, our logo, and all related content are the property of Cheengu and protected by intellectual property laws. You may not use our branding or content without permission.
        </p>

        <h2 className="text-3xl mt-12 mb-4">14. Privacy</h2>

        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          Your use of Cheengu is also governed by our Privacy Policy, available at{' '}
          <Link href="/privacy" className="text-[#4CAF50] hover:underline">
            cheengu.com/privacy
          </Link>. By using the Service, you consent to our data practices as described in the Privacy Policy.
        </p>

        <h2 className="text-3xl mt-12 mb-4">15. Entire Agreement</h2>

        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          These Terms, together with our Privacy Policy, constitute the entire agreement between you and Cheengu regarding use of the Service.
        </p>

        <h2 className="text-3xl mt-12 mb-4">16. Contact</h2>

        <p className="text-base text-[#aaa] leading-relaxed mb-2">Questions about these Terms? Contact us at:</p>
        <p className="text-base text-[#aaa] leading-relaxed">
          <strong>Email:</strong>{' '}
          <a href="mailto:hello@cheengu.com" className="text-[#4CAF50] hover:underline">
            hello@cheengu.com
          </a>
          <br />
          <strong>Address:</strong> 100 34th Ave, San Francisco, CA 94121
        </p>

        <div className="bg-[#2a1a1a] border-l-4 border-[#ff4444] p-4 my-12 rounded">
          <p className="text-[#ffaaaa]">
            <strong>By creating a commitment through Cheengu, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</strong>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
