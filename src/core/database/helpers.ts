import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { PrismaClient } from '@prisma/client';
import type { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export type SeederOptions = {
  count?: number;
} & Record<string, unknown>;

export type SeederFunction = (
  db: PrismaClient,
  options?: SeederOptions,
) => Promise<void>;

export function readSeedData(fileName: string): string | undefined {
  console.info(`[SEEDER] 📄 Reading file ${fileName}`);

  const path = join(__dirname, 'data', fileName);
  if (!existsSync(path)) {
    console.warn(`[SEEDER] 🚫 File not found: ${path}`);

    return;
  }

  return readFileSync(path, 'utf-8');
}

export function parseSeedData<T>(fileName: string, schema: z.ZodType<T>) {
  const rawData = readSeedData(fileName);
  if (!rawData) {
    return;
  }

  console.info(`[SEEDER] 🔍 Parsing file ${fileName}`);

  const jsonData: unknown = JSON.parse(rawData);
  if (Array.isArray(jsonData)) {
    const parsedArray = jsonData.map((item) => schema.safeParse(item));
    const errors = parsedArray.filter((result) => !result.success);
    if (errors.length > 0) {
      console.warn(
        `[SEEDER] 🚫 Invalid data in ${fileName}:`,
        JSON.stringify(errors.map((error) => error.error)),
      );

      return;
    }

    return parsedArray.map((result) => result.data);
  } else {
    const parsedData = schema.safeParse(jsonData);
    if (!parsedData.success) {
      console.warn(
        `[SEEDER] 🚫 Invalid data in ${fileName}:`,
        JSON.stringify(parsedData.error),
      );

      return;
    }

    return parsedData.data;
  }
}
