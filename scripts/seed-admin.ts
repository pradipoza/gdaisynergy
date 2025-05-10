import { pool, db } from "../server/db";
import { users } from "../shared/schema";
import { hashPassword } from "../server/auth";
import { eq } from "drizzle-orm";

// Admin user details
const ADMIN_USERNAME = "admin";
const ADMIN_EMAIL = "pradipojha406@gmail.com";
const ADMIN_PASSWORD = "adminpass123"; // This will be hashed before storage

async function seedAdmin() {
  console.log("Starting admin user seed...");
  
  try {
    // Check if the admin user already exists by email
    const [existingAdmin] = await db
      .select()
      .from(users)
      .where(eq(users.email, ADMIN_EMAIL));
    
    if (existingAdmin) {
      console.log(`Admin user with email ${ADMIN_EMAIL} already exists.`);
      
      // Ensure the user has admin privileges
      if (!existingAdmin.isAdmin) {
        console.log("Updating user to have admin privileges...");
        await db
          .update(users)
          .set({ isAdmin: true })
          .where(eq(users.id, existingAdmin.id));
        console.log("Admin privileges granted.");
      } else {
        console.log("User already has admin privileges.");
      }
    } else {
      // Create new admin user
      console.log("Creating new admin user...");
      
      const hashedPassword = await hashPassword(ADMIN_PASSWORD);
      
      const [newAdmin] = await db
        .insert(users)
        .values({
          username: ADMIN_USERNAME,
          email: ADMIN_EMAIL,
          password: hashedPassword,
          isAdmin: true,
        })
        .returning();
      
      console.log(`Admin user created with ID: ${newAdmin.id}`);
    }
    
    console.log("Admin user seed completed successfully!");
  } catch (error) {
    console.error("Error seeding admin user:", error);
  } finally {
    // Close the database connection
    await pool.end();
  }
}

// Run the seed function
seedAdmin();