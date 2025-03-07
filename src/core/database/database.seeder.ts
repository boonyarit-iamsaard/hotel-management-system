import { db } from './database.client';
import { usersSeeder } from './seeders/users.seeder';

async function main() {
  console.info('[SEEDER] 🌱 Starting database seed');

  const seeders = [usersSeeder];

  for (const seeder of seeders) {
    await seeder(db);
  }
}

main()
  .then(async () => {
    console.info('[SEEDER] ✅ Database seed completed');

    await db.$disconnect();
  })
  .catch(async (error) => {
    console.error(
      '[SEEDER] ❌ Error during database seed:',
      error instanceof Error ? error.message : JSON.stringify(error),
    );

    process.exit(1);
  });
