import { Button } from '~/common/components/ui/button';
import { auth, signIn, signOut } from '~/core/auth/auth';
import { env } from '~/core/configs/env.config';

export default async function Page() {
  const session = await auth();

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

              await signOut();
            }}
          >
            <Button type="submit">Sign Out</Button>
          </form>
        ) : (
          <form
            action={async () => {
              'use server';

              await signIn();
            }}
          >
            <Button type="submit">Get Started</Button>
          </form>
        )}
      </div>
    </section>
  );
}
