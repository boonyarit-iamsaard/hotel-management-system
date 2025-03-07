import type { ReactNode } from 'react';

import { AppHeader } from '~/common/components/app-header';

type PublicLayoutProps = {
  children: ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <AppHeader />
      <main>{children}</main>
    </>
  );
}
