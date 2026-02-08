import type { Metadata } from 'next'
import './globals.css' // assuming you have global styles

export const metadata: Metadata = {
  title: 'Cheengu - SMS Accountability',
  description: 'Put money on your goals. Get daily SMS check-ins. A friend verifies. Succeed and get your money back. Fail and lose it.',
  openGraph: {
    title: 'Cheengu - SMS Accountability',
    description: 'Put money on your goals. Get daily SMS check-ins. A friend verifies. Succeed and get your money back. Fail and lose it.',
    url: 'https://cheengu.com',
    siteName: 'Cheengu',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cheengu - SMS Accountability',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cheengu - SMS Accountability',
    description: 'Put money on your goals. Get daily SMS check-ins. A friend verifies. Succeed and get your money back. Fail and lose it.',
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
      <body>{children}</body>
    </html>
  )
}