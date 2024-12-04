import { Sidebar } from '@/components/Sidebar';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Provider } from './Provider';
import { AppProvider } from '@/contexts/AppContext';

const dinRoundSans = localFont({
  src: [
    { path: './fonts/dinroundpro.otf', weight: '400', style: 'normal' },
    {
      path: './fonts/dinroundpro_black.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: './fonts/dinroundpro_bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/dinroundpro_light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/dinroundpro_medi.otf',
      weight: '500',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'Enouvo Healthcare Hub',
  description: 'Enouvo Healthcare Hub',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dinRoundSans.className} antialiased`}>
        <AppProvider>
          <Provider>{children}</Provider>
        </AppProvider>
      </body>
    </html>
  );
}
