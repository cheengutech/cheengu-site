import Link from 'next/link';

export default function Footer() {
  return (
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
  );
}
