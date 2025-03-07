'use client';

import Link from 'next/link';

import { BedIcon } from 'lucide-react';

import { authClient } from '~/core/auth/auth.client';
import { env } from '~/core/configs/env.config';

import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { UserMenu } from './user-menu';

export function AppHeader() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="flex h-16 items-center">
      <div className="container flex items-center justify-between">
        <nav className="flex items-center gap-4">
          <Link href="/">
            <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <BedIcon className="size-4" />
              <span className="sr-only">{env.NEXT_PUBLIC_APP_NAME}</span>
            </div>
          </Link>
          <div className="flex items-center">
            <Button asChild variant="link">
              <Link href="/rooms">Our Rooms</Link>
            </Button>
          </div>
        </nav>
        <div className="flex items-center gap-2">
          {isPending ? (
            <Skeleton className="size-9 rounded-lg" />
          ) : !session ? (
            <Button asChild variant="ghost">
              <Link href="/login">Login</Link>
            </Button>
          ) : (
            <UserMenu session={session} />
          )}
        </div>
      </div>
    </header>
  );
}
