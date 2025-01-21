import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';

import '@/styles/globals.scss';

import { cn } from '@/utils/functions';
import { Providers } from '@/components/provider/store-providers';
import AuthProvider from '@/components/provider/auth-provider';
import { ThemeProvider } from '@/components/provider/theme-provider';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { LayoutProps } from '@/types';

const inter = Inter({ subsets: ['latin'] });

const GA4_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID;

export const metadata = {
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  title: {
    default: 'Brainz: AI Mind Support',
    template: `NextJs 14.0 framework`,
  },
  description: 'Guiding through trauma with health care and empathetic',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default async function RootLayout(props: LayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider>
            <AuthProvider session={session}>
              <main className={cn('brainz-chat')}>{props.children}</main>
            </AuthProvider>
          </ThemeProvider>
        </Providers>
        <GoogleAnalytics gaId={GA4_ID ?? ''} />
      </body>
    </html>
  );
}
