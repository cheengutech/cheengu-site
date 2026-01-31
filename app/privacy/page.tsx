import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navigation />

      <div className="max-w-[800px] mx-auto px-5 py-20">
        <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-sm text-[#666] mb-12">Last Updated: January 30, 2025</p>

        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          Cheengu ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our SMS-based accountability service.
        </p>

        <h2 className="text-3xl mt-12 mb-4">1. Information We Collect</h2>

        <h3 className="text-xl mt-8 mb-3">Information You Provide</h3>
        <ul className="ml-6 mb-4 text-[#aaa] space-y-2">
          <li><strong>Phone Number:</strong> Required to send and receive SMS messages for check-ins and notifications</li>
          <li><strong>Commitment Details:</strong> Your goals, deadlines, and accountability preferences</li>
          <li><strong>Judge Information:</strong> Phone number and name of your designated accountability judge</li>
          <li><strong>Payment Information:</strong> Credit card and billing details processed through Stripe (see Payment Data section below)</li>
          <li><strong>SMS Messages:</strong> Your responses to check-ins and any communications with our service</li>
        </ul>

        <h3 className="text-xl mt-8 mb-3">Information Automatically Collected</h3>
        <ul className="ml-6 mb-4 text-[#aaa] space-y-2">
          <li><strong>Usage Data:</strong> Check-in responses, completion rates, and commitment performance</li>
          <li><strong>Technical Data:</strong> IP address, browser type, and device information when accessing our payment pages</li>
          <li><strong>SMS Metadata:</strong> Delivery status, timestamps, and message routing information</li>
        </ul>

        <h2 className="text-3xl mt-12 mb-4">2. How We Use Your Information</h2>

        <p className="text-base text-[#aaa] leading-relaxed mb-2">We use your information to:</p>
        <ul className="ml-6 mb-4 text-[#aaa] space-y-2">
          <li>Provide our accountability service and send automated check-ins via SMS</li>
          <li>Verify commitment completion through your designated judge</li>
          <li>Process payments, penalties, and refunds through Stripe</li>
          <li>Send notifications about your commitment status and settlements</li>
          <li>Improve our service and develop new features</li>
          <li>Comply with legal obligations and prevent fraud</li>
          <li>Communicate with you about your account and service updates</li>
        </ul>

        <h2 className="text-3xl mt-12 mb-4">3. Payment Data and Stripe</h2>

        <p className="text-base text-[#aaa] leading-relaxed mb-2">
          All payment processing is handled by Stripe, a PCI-DSS compliant payment processor. We never see, store, or have access to your complete credit card information. Stripe receives:
        </p>
        <ul className="ml-6 mb-4 text-[#aaa] space-y-2">
          <li>Your credit card number, expiration date, and CVV</li>
          <li>Your billing name and address</li>
          <li>Payment amount and transaction details</li>
        </ul>

        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          We only receive limited payment information from Stripe such as the last 4 digits of your card and transaction status. For more information, see Stripe&apos;s Privacy Policy at{' '}
          <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#4CAF50] hover:underline">
            stripe.com/privacy
          </a>.
        </p>

        <h2 className="text-3xl mt-12 mb-4">4. SMS Communication and Twilio</h2>

        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          We use Twilio to send and receive SMS messages. Your phone number and message content are transmitted through Twilio&apos;s infrastructure. Twilio&apos;s data processing practices are governed by their Privacy Policy at{' '}
          <a href="https://www.twilio.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-[#4CAF50] hover:underline">
            twilio.com/legal/privacy
          </a>.
        </p>

        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          Standard messaging rates from your mobile carrier may apply. You can opt out of SMS messages at any time by replying STOP, though this will end your active commitments.
        </p>

        <h2 className="text-3xl mt-12 mb-4">5. How We Share Your Information</h2>

        <p className="text-base text-[#aaa] leading-relaxed mb-2">We share your information only in the following circumstances:</p>

        <h3 className="text-xl mt-8 mb-3">With Your Judge</h3>
        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          Your judge receives SMS messages containing your commitment description and your claim about whether you completed it. They do not receive your payment information or other personal details.
        </p>

        <h3 className="text-xl mt-8 mb-3">With Service Providers</h3>
        <ul className="ml-6 mb-4 text-[#aaa] space-y-2">
          <li><strong>Stripe:</strong> For payment processing and financial transactions</li>
          <li><strong>Twilio:</strong> For SMS message delivery and reception</li>
          <li><strong>Supabase:</strong> For secure data storage and database services</li>
          <li><strong>Render:</strong> For application hosting and infrastructure</li>
        </ul>

        <h3 className="text-xl mt-8 mb-3">For Legal Compliance</h3>
        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          We may disclose information if required by law, court order, or governmental request, or to protect our rights and prevent fraud.
        </p>

        <h3 className="text-xl mt-8 mb-3">We Do Not Sell Your Data</h3>
        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          We never sell, rent, or trade your personal information to third parties for marketing purposes.
        </p>

        <h2 className="text-3xl mt-12 mb-4">6. Data Retention</h2>

        <p className="text-base text-[#aaa] leading-relaxed mb-2">
          We retain your information for as long as you have an active commitment or account with us, and for a reasonable period afterward to:
        </p>
        <ul className="ml-6 mb-4 text-[#aaa] space-y-2">
          <li>Comply with legal obligations (financial records, tax requirements)</li>
          <li>Resolve disputes and enforce our agreements</li>
          <li>Provide historical records of your commitment performance</li>
        </ul>

        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          You may request deletion of your data by contacting us at{' '}
          <a href="mailto:hello@cheengu.com" className="text-[#4CAF50] hover:underline">
            hello@cheengu.com
          </a>. Note that some data may be retained as required by law or legitimate business interests.
        </p>

        <h2 className="text-3xl mt-12 mb-4">7. Data Security</h2>

        <p className="text-base text-[#aaa] leading-relaxed mb-2">
          We implement appropriate technical and organizational measures to protect your information, including:
        </p>
        <ul className="ml-6 mb-4 text-[#aaa] space-y-2">
          <li>Encryption of data in transit using HTTPS/TLS</li>
          <li>Secure database storage with access controls</li>
          <li>Use of industry-standard payment and SMS providers</li>
          <li>Regular security assessments and updates</li>
        </ul>

        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
        </p>

        <h2 className="text-3xl mt-12 mb-4">8. Your Rights and Choices</h2>

        <p className="text-base text-[#aaa] leading-relaxed mb-2">You have the right to:</p>
        <ul className="ml-6 mb-4 text-[#aaa] space-y-2">
          <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
          <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
          <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
          <li><strong>Opt-Out:</strong> Stop receiving SMS messages by replying STOP (ends active commitments)</li>
          <li><strong>Data Portability:</strong> Request your data in a machine-readable format</li>
        </ul>

        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          To exercise these rights, contact us at{' '}
          <a href="mailto:hello@cheengu.com" className="text-[#4CAF50] hover:underline">
            hello@cheengu.com
          </a>.
        </p>

        <h2 className="text-3xl mt-12 mb-4">9. Children&apos;s Privacy</h2>

        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          Cheengu is not intended for users under 18 years of age. We do not knowingly collect information from children. If you believe we have collected information from a child, please contact us immediately.
        </p>

        <h2 className="text-3xl mt-12 mb-4">10. California Privacy Rights</h2>

        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected, sold, or disclosed, and the right to opt-out of sales (though we do not sell personal information).
        </p>

        <h2 className="text-3xl mt-12 mb-4">11. Changes to This Policy</h2>

        <p className="text-base text-[#aaa] leading-relaxed mb-4">
          We may update this Privacy Policy from time to time. We will notify you of significant changes by SMS or email. The &quot;Last Updated&quot; date at the top indicates when this policy was last revised.
        </p>

        <h2 className="text-3xl mt-12 mb-4">12. Contact Us</h2>

        <p className="text-base text-[#aaa] leading-relaxed mb-2">
          If you have questions about this Privacy Policy or our privacy practices, contact us at:
        </p>
        <p className="text-base text-[#aaa] leading-relaxed">
          <strong>Email:</strong>{' '}
          <a href="mailto:hello@cheengu.com" className="text-[#4CAF50] hover:underline">
            hello@cheengu.com
          </a>
          <br />
          <strong>Address:</strong> 100 34th Ave, San Francisco, CA 94121
        </p>
      </div>

      <Footer />
    </div>
  );
}
