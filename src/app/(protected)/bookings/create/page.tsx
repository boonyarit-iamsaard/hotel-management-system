import { PageHeader } from '~/common/components/page-header';
import { api } from '~/core/trpc/server';
import { createBookingSchema } from '~/features/bookings/validators/bookings';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

type CreateBookingResult = Awaited<
  ReturnType<typeof api.bookings.createBooking>
>;

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const { id, 'check-in': checkIn, 'check-out': checkOut } = searchParams;
  const { success, data, error } = createBookingSchema.safeParse({
    roomTypeId: id,
    checkIn,
    checkOut,
  });
  let booking: CreateBookingResult | null = null;

  if (success) {
    booking = await api.bookings.createBooking(data);
  }

  return (
    <>
      <PageHeader
        title={booking ? 'Booking Details' : 'Invalid Booking Details'}
      />
      <div className="container py-12">
        <div className="rounded-lg border border-border bg-card p-6">
          {success ? (
            <pre>{JSON.stringify(booking, null, 2)}</pre>
          ) : (
            <pre>{JSON.stringify(error, null, 2)}</pre>
          )}
        </div>
      </div>
    </>
  );
}
