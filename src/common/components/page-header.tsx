type PageHeaderProps = {
  title?: string;
};

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <section className="grid h-[35vh] place-content-center bg-muted">
      <div className="flex w-full max-w-screen-sm flex-col items-center gap-4 p-4">
        {title ? <h1 className="font-bold sm:text-2xl">{title}</h1> : null}
      </div>
    </section>
  );
}
