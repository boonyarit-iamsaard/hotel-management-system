import Link from 'next/link';

import { addDays, format, startOfDay } from 'date-fns';
import { ImageIcon } from 'lucide-react';

import { PageHeader } from '~/common/components/page-header';
import { Button } from '~/common/components/ui/button';
import { api } from '~/core/trpc/server';

import type { SelectRoomType } from '~/entities/models/room-type';

type ProcessedRoomType = {
  id: string;
  name: string;
  description: string | null;
  standardPrice: SelectRoomType['prices'][number];
  promotionalPrice: SelectRoomType['prices'][number] | null;
  weekdaySavings: number;
  weekendSavings: number;
  displayPrice: number;
  roomCount: number;
};

function formatPrice(subunits: number): string {
  return (subunits / 100).toLocaleString();
}

function calculateSavings(original: number, discounted: number): number {
  return Math.round(((original - discounted) / original) * 100);
}

function processRoomType(roomType: SelectRoomType): ProcessedRoomType | null {
  const standardPrice = roomType.prices.find(
    (price) => price.priceType === 'STANDARD',
  );
  const promotionalPrice =
    roomType.prices.find((price) => price.priceType === 'PROMOTION') ?? null;

  if (!standardPrice) {
    return null;
  }

  const weekdaySavings = promotionalPrice
    ? calculateSavings(standardPrice.weekday, promotionalPrice.weekday)
    : 0;
  const weekendSavings = promotionalPrice
    ? calculateSavings(standardPrice.weekend, promotionalPrice.weekend)
    : 0;

  return {
    id: roomType.id,
    name: roomType.name,
    description: roomType.description,
    standardPrice,
    promotionalPrice,
    weekdaySavings,
    weekendSavings,
    displayPrice: promotionalPrice?.weekday ?? standardPrice.weekday,
    roomCount: roomType.rooms.length,
  };
}

export default async function Page() {
  const roomTypes = await api.roomTypes.getRoomTypes();
  const processedRoomTypes = roomTypes
    .map(processRoomType)
    .filter((room): room is ProcessedRoomType => room !== null)
    .sort((a, b) => a.displayPrice - b.displayPrice);

  function getBookingUrl(roomTypeId: string) {
    const checkIn = format(startOfDay(new Date()), 'yyyy-MM-dd');
    const checkOut = format(addDays(checkIn, 1), 'yyyy-MM-dd');

    const query = new URLSearchParams();
    query.set('id', roomTypeId);
    query.set('check-in', checkIn);
    query.set('check-out', checkOut);

    return `/bookings/create?${query.toString()}`;
  }

  return (
    <>
      <PageHeader title="Our Rooms" />
      <div className="space-y-12 py-12">
        <div className="container space-y-6">
          {processedRoomTypes.map((roomType) => (
            <div
              key={roomType.id}
              className="grid grid-rows-[auto_1fr] overflow-hidden rounded-lg border border-border bg-card sm:grid-cols-[1fr_2fr]"
            >
              <div className="flex aspect-square items-center justify-center bg-muted sm:aspect-auto">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="flex flex-col justify-between space-y-4 p-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-foreground">
                      {roomType.name}
                    </h2>
                    <div className="text-sm text-muted-foreground">
                      {roomType.roomCount} rooms available
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    {roomType.description}
                  </p>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">From</div>
                    <div className="space-y-1">
                      {roomType.promotionalPrice ? (
                        <>
                          <div className="text-2xl font-bold text-foreground">
                            {formatPrice(roomType.promotionalPrice.weekday)} THB
                          </div>
                          <div className="text-sm text-muted-foreground line-through">
                            {formatPrice(roomType.standardPrice.weekday)} THB
                          </div>
                        </>
                      ) : (
                        <div className="text-2xl font-bold text-foreground">
                          {formatPrice(roomType.standardPrice.weekday)} THB
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      per night
                    </div>
                  </div>
                  <div className="space-y-1 text-right text-sm">
                    <p className="text-muted-foreground">
                      • Weekday rates from{' '}
                      {roomType.promotionalPrice ? (
                        <span>
                          <span className="font-medium text-foreground">
                            {formatPrice(roomType.promotionalPrice.weekday)} THB
                          </span>{' '}
                          <span className="line-through">
                            {formatPrice(roomType.standardPrice.weekday)} THB
                          </span>{' '}
                          <span className="text-green-600">
                            Save {roomType.weekdaySavings}%
                          </span>
                        </span>
                      ) : (
                        <span className="font-medium text-foreground">
                          {formatPrice(roomType.standardPrice.weekday)} THB
                        </span>
                      )}
                    </p>
                    <p className="text-muted-foreground">
                      • Weekend rates from{' '}
                      {roomType.promotionalPrice ? (
                        <span>
                          <span className="font-medium text-foreground">
                            {formatPrice(roomType.promotionalPrice.weekend)} THB
                          </span>{' '}
                          <span className="line-through">
                            {formatPrice(roomType.standardPrice.weekend)} THB
                          </span>{' '}
                          <span className="text-green-600">
                            Save {roomType.weekendSavings}%
                          </span>
                        </span>
                      ) : (
                        <span className="font-medium text-foreground">
                          {formatPrice(roomType.standardPrice.weekend)} THB
                        </span>
                      )}
                    </p>
                    {roomType.promotionalPrice?.promotionName && (
                      <p className="font-medium text-green-600">
                        {roomType.promotionalPrice.promotionName}
                      </p>
                    )}
                    <p className="text-muted-foreground">
                      * Member discounts up to 30% available
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    disabled={roomType.roomCount === 0}
                  >
                    <Link href={getBookingUrl(roomType.id)}>
                      {roomType.roomCount > 0 ? 'Book now' : 'Not available'}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
