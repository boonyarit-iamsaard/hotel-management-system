import { Button } from '~/common/components/ui/button';
import { api } from '~/core/trpc/server';

export default async function Page() {
  const { status } = await api.healthcheck();

  console.info('status', status);

  return (
    <section className="grid h-[35vh] place-content-center bg-muted">
      <div className="flex w-full max-w-screen-sm flex-col items-center gap-4 p-4">
        <h1 className="font-bold sm:text-2xl">
          Welcome to Hotel Management System
        </h1>
        <Button type="button">Get Started</Button>
      </div>
    </section>
  );
}
