import '~/common/styles/globals.css';

import type { Metadata } from 'next';

import { cn } from '~/common/helpers/cn';
import { fontSans } from '~/common/styles/fonts';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn('min-h-svh font-sans antialiased', fontSans.variable)}
      >
        <div className="relative flex min-h-svh flex-col">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
