import { db } from './client';
import { usersSeeder } from './seeders/users.seeder';

async function main() {
  console.info('[SEEDER] 🌱 Starting database seed');

  const seeders = [usersSeeder];

  try {
    for (const seeder of seeders) {
      await seeder(db);
    }

    console.info('[SEEDER] ✅ Database seed completed');
  } catch (error) {
    console.error(
      '[SEEDER] ❌ Error during database seed:',
      error instanceof Error ? error.message : JSON.stringify(error),
    );

    process.exit(1);
  } finally {
    try {
      await db.$client.end();
    } catch (err) {
      console.error(
        '[SEEDER] ❌ Error closing database connection:',
        err instanceof Error ? err.message : JSON.stringify(err),
      );
    }
  }
}

main().catch((error) => {
  console.error(
    '[SEEDER] ❌ Error during database seed:',
    error instanceof Error ? error.message : JSON.stringify(error),
  );

  process.exit(1);
});
