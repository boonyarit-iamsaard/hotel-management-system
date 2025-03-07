import { headers } from 'next/headers';
import Link from 'next/link';

import { Button } from '~/common/components/ui/button';
import { auth } from '~/core/auth/auth.config';
import { env } from '~/core/configs/env.config';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <section className="grid h-[35vh] place-content-center bg-muted">
      <div className="flex w-full max-w-screen-sm flex-col items-center gap-4 p-4">
        <h1 className="font-bold sm:text-2xl">
          Welcome to {env.NEXT_PUBLIC_APP_NAME}
        </h1>
        {session ? (
          <form
            action={async () => {
              'use server';

              await auth.api.signOut({
                headers: await headers(),
              });
            }}
          >
            <Button type="submit">Sign Out</Button>
          </form>
        ) : (
          <Button asChild type="submit">
            <Link href="/login">Get Started</Link>
          </Button>
        )}
      </div>
    </section>
  );
}
