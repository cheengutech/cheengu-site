import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import { BRAND } from './brand';

const playfairDisplay = Playfair_Display({
  weight: ['700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const title = `${BRAND.name} — ${BRAND.tagline}`;
const description = `${BRAND.name} turns serious intentions into real commitments — with a judge, reminders, proof, and a final pass/fail report.`;

export const metadata: Metadata = {
  metadataBase: new URL(`https://${BRAND.domain}`),
  title,
  description,
  openGraph: {
    title,
    description,
    url: `https://${BRAND.domain}`,
    siteName: BRAND.name,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
