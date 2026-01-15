import type { Metadata } from 'next';
import './globals.css';
import { Analytics } from "@vercel/analytics/next";
import { ClientLayout } from '@/components/ClientLayout';

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
    <html lang="en">
      <body className="font-body bg-background dark:bg-black text-white antialiased overflow-x-hidden transition-colors duration-300">
        <ClientLayout>
          {children}
        </ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}
