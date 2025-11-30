import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { createAndPushRepository } from "./github";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  app.post("/api/push-to-github", async (req, res) => {
    try {
      const { repoName, description } = req.body;

      if (!repoName) {
        return res.status(400).json({ error: "Repository name is required" });
      }

      const result = await createAndPushRepository(
        repoName || "personality-blender",
        description || "Interactive personality drink blender application"
      );

      res.json(result);
    } catch (error: any) {
      console.error("GitHub push error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  return httpServer;
}
