import type { Metadata } from 'next'
import './globals.css' // assuming you have global styles
import { BRAND, BRAND_TAGLINE } from './brand'

const title = `${BRAND} — Real-person commitment contracts`;
const description = `${BRAND} is a real-person commitment contract system. Make a promise you can't quietly abandon. Set a stake, name a real judge, and follow through — or lose the money.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://cheengu.com',
    siteName: BRAND,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${BRAND} — ${BRAND_TAGLINE}`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
            <head>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
              <link 
                href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap" 
                rel="stylesheet" 
              />
            </head>
      <body>{children}</body>
    </html>
  )
}