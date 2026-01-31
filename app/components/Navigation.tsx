import Link from 'next/link';

export default function Navigation() {
  return (
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
  );
}
