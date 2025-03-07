import '~/common/styles/globals.css';

import type { Metadata } from 'next';

import { Toaster } from '~/common/components/ui/sonner';
import { cn } from '~/common/helpers/cn';
import { fontSans } from '~/common/styles/fonts';
import { env } from '~/core/configs/env.config';
import { TRPCReactProvider } from '~/core/trpc/react';

export const metadata: Metadata = {
  title: env.NEXT_PUBLIC_APP_NAME,
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
        <TRPCReactProvider>
          <div className="relative flex min-h-screen flex-col bg-background">
            {children}
          </div>
        </TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
