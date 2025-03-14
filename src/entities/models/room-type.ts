import { z } from 'zod';

export const selectRoomPriceTypeSchema = z.enum(['STANDARD', 'PROMOTION']);

export const selectRoomPriceSchema = z.object({
  id: z.string(),
  weekday: z.number().nonnegative(),
  weekend: z.number().nonnegative(),
  priceType: selectRoomPriceTypeSchema,
  promotionName: z.string().nullable(),
  effectiveFrom: z.date(),
  effectiveTo: z.date().nullable(),
});

export const selectRoomSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const selectRoomTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  description: z.string().nullable(),
  prices: z.array(selectRoomPriceSchema),
  rooms: z.array(selectRoomSchema),
});

export type SelectRoom = z.infer<typeof selectRoomSchema>;
export type SelectRoomPrice = z.infer<typeof selectRoomPriceSchema>;
export type SelectRoomPriceType = z.infer<typeof selectRoomPriceTypeSchema>;
export type SelectRoomType = z.infer<typeof selectRoomTypeSchema>;
