import { db } from './db';
import { users } from '@shared/schema';
import { hashPassword } from './auth';

async function seed() {
  try {
    // Create admin user
    const hashedPassword = await hashPassword('adminpass123');
    await db.insert(users).values({
      username: 'admin',
      email: 'pradipojha406@gmail.com',
      password: hashedPassword,
      isAdmin: true,
    });

    console.log('Admin user created successfully!');
    console.log('Username: admin');
    console.log('Password: adminpass123');
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
}

seed(); 