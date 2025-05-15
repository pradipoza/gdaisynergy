import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });
import pg from 'pg';
const { Pool } = pg;
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@shared/schema';

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Ensure the database is provisioned");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Remove SSL for local development
});

export const db = drizzle(pool, { schema });
