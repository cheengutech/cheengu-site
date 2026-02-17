import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navigation />

      <div className="max-w-[600px] mx-auto px-5 py-20">
        <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg text-[#aaa] leading-relaxed mb-4">
          Have questions about Cheengu? Want to get started with accountability that actually works? We'd love to hear from you.
        </p>

        <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-8 mt-12">
          <div className="mb-8">
            <div className="text-sm text-[#666] uppercase tracking-wider mb-2">Email</div>
            <div className="text-lg text-white">
              <a href="mailto:hello@cheengu.com" className="text-[#4CAF50] hover:underline">
                hello@cheengu.com
              </a>
            </div>
          </div>

          <div>
            <div className="text-sm text-[#666] uppercase tracking-wider mb-2">Hours</div>
            <div className="text-lg text-white">
              Monday - Friday: 9am - 6pm PST<br />
              We typically respond within 24 hours
            </div>
          </div>
        </div>

        <p className="text-[#aaa] leading-relaxed mt-12">
          Whether you're interested in using Cheengu for personal accountability, have questions about how the system works, or want to provide feedback, we're here to help.
        </p>
      </div>

      <Footer />
    </div>
  );
}
