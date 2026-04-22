import './globals.css';
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Quiz Builder',
  description: 'Full-stack quiz builder app',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="main-container">{children}</main>
      </body>
    </html>
  );
}
