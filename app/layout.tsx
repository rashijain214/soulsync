import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SoulSync - Connect with Your Future Self',
  description: 'AI-powered conversations with your wiser, future self. Get personalized guidance based on your experiences, goals, and aspirations.',
  keywords: 'AI, personal growth, future self, guidance, conversation, wisdom',
  authors: [{ name: 'SoulSync' }],
  openGraph: {
    title: 'SoulSync - Connect with Your Future Self',
    description: 'AI-powered conversations with your wiser, future self.',
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
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}