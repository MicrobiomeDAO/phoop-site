import type { Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
});

export const metadata: Metadata = {
  title: 'Phoop - Digestive Health Tracker with Poop Monsters NFTs',
  description: 'Phoop is a digestive health tracker that gamifies wellness. Track your health, collect Poop Monsters NFTs, and level up your journey. Join the waitlist for early access.',
  keywords: ['phoop', 'digestive health tracker', 'health tracking', 'poop monsters', 'NFT collection', 'gamification', 'wellness'],
  openGraph: {
    title: 'Phoop - Digestive Health Tracker with Poop Monsters NFTs',
    description: 'Phoop is a digestive health tracker that gamifies wellness. Track your health and collect Poop Monsters NFTs.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="font-body bg-background text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
