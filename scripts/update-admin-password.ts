import { hashPassword } from "../server/auth.js";
import { db } from "../server/db.js";
import { users } from "../shared/schema.js";
import { eq } from "drizzle-orm";

async function updateAdminPassword() {
  console.log("Updating admin password...");
  
  const password = "adminpass123";
  const hashedPassword = await hashPassword(password);
  
  const result = await db.update(users)
    .set({ password: hashedPassword })
    .where(eq(users.username, "admin"))
    .returning();
  
  if (result.length > 0) {
    console.log("Admin password updated successfully!");
    console.log("Username: admin");
    console.log("Password: adminpass123");
  } else {
    console.log("Failed to update admin password. Admin user not found.");
  }
}

updateAdminPassword().catch(console.error);