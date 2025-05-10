import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Services Table
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(), // Rich text
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertServiceSchema = createInsertSchema(services).pick({
  title: true,
  description: true,
  content: true,
  imageUrl: true,
});

// Solutions Table
export const solutions = pgTable("solutions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(), // Rich text
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertSolutionSchema = createInsertSchema(solutions).pick({
  title: true,
  description: true,
  content: true,
  imageUrl: true,
});

// Resources Table - Common fields for all resource types
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'blog', 'news', 'portfolio', 'case-study'
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(), // Rich text
  imageUrl: text("image_url"),
  tags: text("tags").array(),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertResourceSchema = createInsertSchema(resources).pick({
  type: true,
  title: true,
  description: true,
  content: true,
  imageUrl: true,
  tags: true,
  featured: true,
});

// Company Info Table
export const companyInfo = pgTable("company_info", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'about', 'contact'
  content: text("content").notNull(), // Rich text
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertCompanyInfoSchema = createInsertSchema(companyInfo).pick({
  type: true,
  content: true,
});

// Messages Table
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  phone: text("phone"),
  service: text("service"),
  message: text("message").notNull(),
  read: boolean("read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  name: true,
  email: true,
  company: true,
  phone: true,
  service: true,
  message: true,
});

// Analytics Table
export const analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  date: timestamp("date").defaultNow(),
  pageViews: integer("page_views").default(0),
  visitors: integer("visitors").default(0),
  serviceClicks: integer("service_clicks").default(0),
  inquiries: integer("inquiries").default(0),
});

export const insertAnalyticsSchema = createInsertSchema(analytics).pick({
  date: true,
  pageViews: true,
  visitors: true,
  serviceClicks: true,
  inquiries: true,
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;

export type Solution = typeof solutions.$inferSelect;
export type InsertSolution = z.infer<typeof insertSolutionSchema>;

export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;

export type CompanyInfo = typeof companyInfo.$inferSelect;
export type InsertCompanyInfo = z.infer<typeof insertCompanyInfoSchema>;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

export type Analytics = typeof analytics.$inferSelect;
export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
