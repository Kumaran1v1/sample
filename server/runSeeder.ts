import { seedTemplates } from './seedTemplates';

async function runSeeder() {
  try {
    console.log('Starting database seeding...');
    const result = await seedTemplates();
    console.log(`✅ Seeding completed successfully!`);
    console.log(`📁 Created ${result.categories} categories`);
    console.log(`📄 Created ${result.templates} templates`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

runSeeder();
