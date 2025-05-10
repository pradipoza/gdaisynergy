import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { ZodError } from "zod";
import {
  insertServiceSchema,
  insertSolutionSchema,
  insertResourceSchema,
  insertMessageSchema,
} from "@shared/schema";

function isAdmin(req: Request, res: Response, next: Function) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Forbidden - Admin access required" });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Track page views
  app.use(async (req, res, next) => {
    if (req.path.startsWith('/api')) {
      next();
      return;
    }
    
    try {
      await storage.incrementPageViews();
      // We would track unique visitors using cookies or IP in a real app
      // For simplicity, we'll just increment on each request
      await storage.incrementVisitors();
    } catch (error) {
      console.error('Error tracking analytics:', error);
    }
    next();
  });

  // Service Routes
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    try {
      const service = await storage.getService(parseInt(req.params.id));
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      await storage.incrementServiceClicks();
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  app.post("/api/services", isAdmin, async (req, res) => {
    try {
      const serviceData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(serviceData);
      res.status(201).json(service);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create service" });
    }
  });

  app.put("/api/services/:id", isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const service = await storage.getService(id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      
      const serviceData = insertServiceSchema.partial().parse(req.body);
      const updatedService = await storage.updateService(id, serviceData);
      res.json(updatedService);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update service" });
    }
  });

  app.delete("/api/services/:id", isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const service = await storage.getService(id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      
      await storage.deleteService(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete service" });
    }
  });

  // Solution Routes
  app.get("/api/solutions", async (req, res) => {
    try {
      const solutions = await storage.getSolutions();
      res.json(solutions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch solutions" });
    }
  });

  app.get("/api/solutions/:id", async (req, res) => {
    try {
      const solution = await storage.getSolution(parseInt(req.params.id));
      if (!solution) {
        return res.status(404).json({ message: "Solution not found" });
      }
      await storage.incrementServiceClicks();
      res.json(solution);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch solution" });
    }
  });

  app.post("/api/solutions", isAdmin, async (req, res) => {
    try {
      const solutionData = insertSolutionSchema.parse(req.body);
      const solution = await storage.createSolution(solutionData);
      res.status(201).json(solution);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create solution" });
    }
  });

  app.put("/api/solutions/:id", isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const solution = await storage.getSolution(id);
      if (!solution) {
        return res.status(404).json({ message: "Solution not found" });
      }
      
      const solutionData = insertSolutionSchema.partial().parse(req.body);
      const updatedSolution = await storage.updateSolution(id, solutionData);
      res.json(updatedSolution);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update solution" });
    }
  });

  app.delete("/api/solutions/:id", isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const solution = await storage.getSolution(id);
      if (!solution) {
        return res.status(404).json({ message: "Solution not found" });
      }
      
      await storage.deleteSolution(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete solution" });
    }
  });

  // Resource Routes
  app.get("/api/resources", async (req, res) => {
    try {
      const type = req.query.type as string | undefined;
      const resources = await storage.getResources(type);
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resources" });
    }
  });

  app.get("/api/resources/featured", async (req, res) => {
    try {
      const featuredResources = await storage.getFeaturedResources();
      res.json(featuredResources);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured resources" });
    }
  });

  app.get("/api/resources/:id", async (req, res) => {
    try {
      const resource = await storage.getResource(parseInt(req.params.id));
      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      res.json(resource);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resource" });
    }
  });

  app.post("/api/resources", isAdmin, async (req, res) => {
    try {
      const resourceData = insertResourceSchema.parse(req.body);
      const resource = await storage.createResource(resourceData);
      res.status(201).json(resource);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create resource" });
    }
  });

  app.put("/api/resources/:id", isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const resource = await storage.getResource(id);
      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      
      const resourceData = insertResourceSchema.partial().parse(req.body);
      const updatedResource = await storage.updateResource(id, resourceData);
      res.json(updatedResource);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update resource" });
    }
  });

  app.delete("/api/resources/:id", isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const resource = await storage.getResource(id);
      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      
      await storage.deleteResource(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete resource" });
    }
  });

  // Company Info Routes
  app.get("/api/company-info/:type", async (req, res) => {
    try {
      const type = req.params.type;
      if (type !== 'about' && type !== 'contact') {
        return res.status(400).json({ message: "Invalid company info type" });
      }
      
      const info = await storage.getCompanyInfo(type);
      res.json(info || { type, content: "" });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch company info" });
    }
  });

  app.put("/api/company-info/:type", isAdmin, async (req, res) => {
    try {
      const type = req.params.type;
      if (type !== 'about' && type !== 'contact') {
        return res.status(400).json({ message: "Invalid company info type" });
      }
      
      const { content } = req.body;
      if (typeof content !== 'string') {
        return res.status(400).json({ message: "Content must be a string" });
      }
      
      const updatedInfo = await storage.updateCompanyInfo(type, content);
      res.json(updatedInfo);
    } catch (error) {
      res.status(500).json({ message: "Failed to update company info" });
    }
  });

  // Message Routes
  app.get("/api/messages", isAdmin, async (req, res) => {
    try {
      const messages = await storage.getMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(messageData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  app.patch("/api/messages/:id/read", isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const message = await storage.getMessage(id);
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
      
      await storage.markMessageAsRead(id);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to mark message as read" });
    }
  });

  app.delete("/api/messages/:id", isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const message = await storage.getMessage(id);
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
      
      await storage.deleteMessage(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete message" });
    }
  });

  // Analytics Routes
  app.get("/api/analytics", isAdmin, async (req, res) => {
    try {
      const days = parseInt(req.query.days as string || "7");
      const analytics = await storage.getDailyAnalytics(days);
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
