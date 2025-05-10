import { 
  users, type User, type InsertUser,
  services, type Service, type InsertService,
  solutions, type Solution, type InsertSolution,
  resources, type Resource, type InsertResource,
  companyInfo, type CompanyInfo, type InsertCompanyInfo,
  messages, type Message, type InsertMessage,
  analytics, type Analytics, type InsertAnalytics
} from "@shared/schema";
import { db, pool } from "./db";
import { eq, and, desc, sql } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Service operations
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service>;
  deleteService(id: number): Promise<boolean>;
  
  // Solution operations
  getSolutions(): Promise<Solution[]>;
  getSolution(id: number): Promise<Solution | undefined>;
  createSolution(solution: InsertSolution): Promise<Solution>;
  updateSolution(id: number, solution: Partial<InsertSolution>): Promise<Solution>;
  deleteSolution(id: number): Promise<boolean>;
  
  // Resource operations
  getResources(type?: string): Promise<Resource[]>;
  getResource(id: number): Promise<Resource | undefined>;
  createResource(resource: InsertResource): Promise<Resource>;
  updateResource(id: number, resource: Partial<InsertResource>): Promise<Resource>;
  deleteResource(id: number): Promise<boolean>;
  getFeaturedResources(): Promise<Resource[]>;
  
  // Company info operations
  getCompanyInfo(type: string): Promise<CompanyInfo | undefined>;
  updateCompanyInfo(type: string, content: string): Promise<CompanyInfo>;
  
  // Message operations
  getMessages(): Promise<Message[]>;
  getMessage(id: number): Promise<Message | undefined>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: number): Promise<boolean>;
  deleteMessage(id: number): Promise<boolean>;
  
  // Analytics operations
  getDailyAnalytics(days: number): Promise<Analytics[]>;
  incrementPageViews(): Promise<void>;
  incrementVisitors(): Promise<void>;
  incrementServiceClicks(): Promise<void>;
  incrementInquiries(): Promise<void>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.SessionStore;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool,
      createTableIfMissing: true 
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Service operations
  async getServices(): Promise<Service[]> {
    return await db.select().from(services).orderBy(desc(services.createdAt));
  }

  async getService(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service || undefined;
  }

  async createService(service: InsertService): Promise<Service> {
    const [newService] = await db
      .insert(services)
      .values(service)
      .returning();
    return newService;
  }

  async updateService(id: number, service: Partial<InsertService>): Promise<Service> {
    const [updatedService] = await db
      .update(services)
      .set({ ...service, updatedAt: new Date() })
      .where(eq(services.id, id))
      .returning();
    return updatedService;
  }

  async deleteService(id: number): Promise<boolean> {
    const result = await db
      .delete(services)
      .where(eq(services.id, id));
    return true;
  }

  // Solution operations
  async getSolutions(): Promise<Solution[]> {
    return await db.select().from(solutions).orderBy(desc(solutions.createdAt));
  }

  async getSolution(id: number): Promise<Solution | undefined> {
    const [solution] = await db.select().from(solutions).where(eq(solutions.id, id));
    return solution || undefined;
  }

  async createSolution(solution: InsertSolution): Promise<Solution> {
    const [newSolution] = await db
      .insert(solutions)
      .values(solution)
      .returning();
    return newSolution;
  }

  async updateSolution(id: number, solution: Partial<InsertSolution>): Promise<Solution> {
    const [updatedSolution] = await db
      .update(solutions)
      .set({ ...solution, updatedAt: new Date() })
      .where(eq(solutions.id, id))
      .returning();
    return updatedSolution;
  }

  async deleteSolution(id: number): Promise<boolean> {
    const result = await db
      .delete(solutions)
      .where(eq(solutions.id, id));
    return true;
  }

  // Resource operations
  async getResources(type?: string): Promise<Resource[]> {
    if (type) {
      return await db.select().from(resources).where(eq(resources.type, type)).orderBy(desc(resources.createdAt));
    }
    return await db.select().from(resources).orderBy(desc(resources.createdAt));
  }

  async getResource(id: number): Promise<Resource | undefined> {
    const [resource] = await db.select().from(resources).where(eq(resources.id, id));
    return resource || undefined;
  }

  async createResource(resource: InsertResource): Promise<Resource> {
    const [newResource] = await db
      .insert(resources)
      .values(resource)
      .returning();
    return newResource;
  }

  async updateResource(id: number, resource: Partial<InsertResource>): Promise<Resource> {
    const [updatedResource] = await db
      .update(resources)
      .set({ ...resource, updatedAt: new Date() })
      .where(eq(resources.id, id))
      .returning();
    return updatedResource;
  }

  async deleteResource(id: number): Promise<boolean> {
    const result = await db
      .delete(resources)
      .where(eq(resources.id, id));
    return true;
  }

  async getFeaturedResources(): Promise<Resource[]> {
    return await db.select().from(resources).where(eq(resources.featured, true)).limit(4);
  }

  // Company info operations
  async getCompanyInfo(type: string): Promise<CompanyInfo | undefined> {
    const [info] = await db.select().from(companyInfo).where(eq(companyInfo.type, type));
    return info || undefined;
  }

  async updateCompanyInfo(type: string, content: string): Promise<CompanyInfo> {
    const existing = await this.getCompanyInfo(type);
    
    if (existing) {
      const [updated] = await db
        .update(companyInfo)
        .set({ content, updatedAt: new Date() })
        .where(eq(companyInfo.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(companyInfo)
        .values({ type, content })
        .returning();
      return created;
    }
  }

  // Message operations
  async getMessages(): Promise<Message[]> {
    return await db.select().from(messages).orderBy(desc(messages.createdAt));
  }

  async getMessage(id: number): Promise<Message | undefined> {
    const [message] = await db.select().from(messages).where(eq(messages.id, id));
    return message || undefined;
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db
      .insert(messages)
      .values(message)
      .returning();
    
    // Increment inquiries count
    await this.incrementInquiries();
    
    return newMessage;
  }

  async markMessageAsRead(id: number): Promise<boolean> {
    const [updated] = await db
      .update(messages)
      .set({ read: true })
      .where(eq(messages.id, id))
      .returning();
    return !!updated;
  }

  async deleteMessage(id: number): Promise<boolean> {
    const result = await db
      .delete(messages)
      .where(eq(messages.id, id));
    return true;
  }

  // Analytics operations
  async getDailyAnalytics(days: number): Promise<Analytics[]> {
    const results = await db
      .select()
      .from(analytics)
      .orderBy(desc(analytics.date))
      .limit(days);
    
    return results;
  }

  async incrementPageViews(): Promise<void> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const [todayAnalytics] = await db
      .select()
      .from(analytics)
      .where(
        sql`DATE(${analytics.date}) = DATE(${today.toISOString()})`
      );
    
    if (todayAnalytics) {
      await db
        .update(analytics)
        .set({ pageViews: todayAnalytics.pageViews + 1 })
        .where(eq(analytics.id, todayAnalytics.id));
    } else {
      await db
        .insert(analytics)
        .values({ pageViews: 1 });
    }
  }

  async incrementVisitors(): Promise<void> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const [todayAnalytics] = await db
      .select()
      .from(analytics)
      .where(
        sql`DATE(${analytics.date}) = DATE(${today.toISOString()})`
      );
    
    if (todayAnalytics) {
      await db
        .update(analytics)
        .set({ visitors: todayAnalytics.visitors + 1 })
        .where(eq(analytics.id, todayAnalytics.id));
    } else {
      await db
        .insert(analytics)
        .values({ visitors: 1 });
    }
  }

  async incrementServiceClicks(): Promise<void> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const [todayAnalytics] = await db
      .select()
      .from(analytics)
      .where(
        sql`DATE(${analytics.date}) = DATE(${today.toISOString()})`
      );
    
    if (todayAnalytics) {
      await db
        .update(analytics)
        .set({ serviceClicks: todayAnalytics.serviceClicks + 1 })
        .where(eq(analytics.id, todayAnalytics.id));
    } else {
      await db
        .insert(analytics)
        .values({ serviceClicks: 1 });
    }
  }

  async incrementInquiries(): Promise<void> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const [todayAnalytics] = await db
      .select()
      .from(analytics)
      .where(
        sql`DATE(${analytics.date}) = DATE(${today.toISOString()})`
      );
    
    if (todayAnalytics) {
      await db
        .update(analytics)
        .set({ inquiries: todayAnalytics.inquiries + 1 })
        .where(eq(analytics.id, todayAnalytics.id));
    } else {
      await db
        .insert(analytics)
        .values({ inquiries: 1 });
    }
  }
}

export const storage = new DatabaseStorage();
