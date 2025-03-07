import { env } from '~/core/configs/env.config';

export default async function Page() {
  return (
    <section className="grid h-[35vh] place-content-center bg-muted">
      <div className="flex w-full max-w-screen-sm flex-col items-center gap-4 p-4">
        <h1 className="font-bold sm:text-2xl">
          Welcome to {env.NEXT_PUBLIC_APP_NAME}
        </h1>
      </div>
    </section>
  );
}
