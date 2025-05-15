import { db } from './db';
import { users, services, solutions, resources, companyInfo, messages } from '@shared/schema';
import fs from 'fs/promises';

async function exportData() {
  try {
    // Fetch all data from tables
    const usersData = await db.select().from(users);
    const servicesData = await db.select().from(services);
    const solutionsData = await db.select().from(solutions);
    const resourcesData = await db.select().from(resources);
    const companyInfoData = await db.select().from(companyInfo);
    const messagesData = await db.select().from(messages);

    // Create data object
    const data = {
      users: usersData,
      services: servicesData,
      solutions: solutionsData,
      resources: resourcesData,
      companyInfo: companyInfoData,
      messages: messagesData,
    };

    // Write to file
    await fs.writeFile(
      'database-export.json',
      JSON.stringify(data, null, 2)
    );

    console.log('Data exported successfully to database-export.json');
  } catch (error) {
    console.error('Error exporting data:', error);
    throw error;
  }
}

exportData(); 