import Link from 'next/link';

import { ImageIcon } from 'lucide-react';

import { PageHeader } from '~/common/components/page-header';
import { Button } from '~/common/components/ui/button';

type Room = {
  id: string;
  name: string;
  description: string;
  weekdayRate: number;
  weekendRate: number;
  imageUrl?: string;
};

const rooms: Room[] = Array.from({ length: 6 }, (_, index) => ({
  id: `room-${index + 1}`,
  name: `Room ${index + 1} Garden View`,
  description: `A ${index % 2 === 0 ? 'comfortable' : 'delightful'} room with charming garden views. This room combines modern amenities with a cozy atmosphere, making it perfect for a peaceful stay.`,
  weekdayRate: 1900 + index * 200,
  weekendRate: 2400 + index * 200,
}));

export default async function Page() {
  return (
    <div className="space-y-12">
      <PageHeader title="Our Rooms" />
      <div className="container space-y-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="grid grid-rows-[auto_1fr] overflow-hidden rounded-lg border border-border bg-card sm:grid-cols-[1fr_2fr]"
          >
            <div className="flex aspect-square items-center justify-center bg-muted sm:aspect-auto">
              <ImageIcon className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="flex flex-col justify-between space-y-4 p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-2xl font-bold text-foreground">
                    {room.name}
                  </h2>
                </div>
                <p className="text-muted-foreground">{room.description}</p>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">From</div>
                  <div className="text-2xl font-bold text-foreground">
                    {room.weekdayRate.toLocaleString()} THB
                  </div>
                  <div className="text-sm text-muted-foreground">per night</div>
                </div>
                <div className="space-y-1 text-right text-sm text-muted-foreground">
                  <p>
                    • Weekday rates from {room.weekdayRate.toLocaleString()} THB
                  </p>
                  <p>
                    • Weekend rates from {room.weekendRate.toLocaleString()} THB
                  </p>
                  <p>* Member discounts up to 30% available</p>
                </div>
              </div>
              <div className="flex justify-end">
                <Button asChild variant="outline" size="lg">
                  <Link href={`/rooms/${room.id}`}>Select dates</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
