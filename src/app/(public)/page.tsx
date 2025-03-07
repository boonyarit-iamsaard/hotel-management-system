import { PageHeader } from '~/common/components/page-header';
import { env } from '~/core/configs/env.config';

export default async function Page() {
  return (
    <div className="space-y-12">
      <PageHeader title={`Welcome to ${env.NEXT_PUBLIC_APP_NAME}`} />
    </div>
  );
}
