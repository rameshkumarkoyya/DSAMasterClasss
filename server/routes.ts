import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupSimpleAuth, authenticateToken } from "./simpleAuth";
import { insertSubmissionSchema, insertUserProgressSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  setupSimpleAuth(app);

  // Public routes
  app.get('/api/topics', async (req, res) => {
    try {
      const topics = await storage.getTopics();
      res.json(topics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch topics" });
    }
  });

  app.get('/api/topics/:topicId/problems', async (req, res) => {
    try {
      const topicId = parseInt(req.params.topicId);
      const problems = await storage.getProblemsByTopicId(topicId);
      res.json(problems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch problems" });
    }
  });

  app.get('/api/problems/:problemId', async (req, res) => {
    try {
      const problemId = parseInt(req.params.problemId);
      const problem = await storage.getProblem(problemId);
      if (!problem) {
        return res.status(404).json({ message: "Problem not found" });
      }
      res.json(problem);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch problem" });
    }
  });

  app.get('/api/achievements', async (req, res) => {
    try {
      const achievements = await storage.getAchievements();
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch achievements" });
    }
  });

  // Protected routes
  app.post('/api/submissions', authenticateToken, async (req: any, res) => {
    try {
      const submission = insertSubmissionSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      const result = await storage.createSubmission(submission);
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid submission data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create submission" });
    }
  });

  app.get('/api/submissions', authenticateToken, async (req: any, res) => {
    try {
      const userId = req.user.id.toString();
      const submissions = await storage.getSubmissionsByUserId(userId);
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch submissions" });
    }
  });

  app.get('/api/problems/:problemId/submissions', authenticateToken, async (req: any, res) => {
    try {
      const problemId = parseInt(req.params.problemId);
      const userId = req.user.id.toString();
      const submissions = await storage.getSubmissionsByProblemId(problemId, userId);
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch problem submissions" });
    }
  });

  app.post('/api/user-progress', authenticateToken, async (req: any, res) => {
    try {
      const progress = insertUserProgressSchema.parse({
        ...req.body,
        userId: req.user.id.toString()
      });
      const result = await storage.upsertUserProgress(progress);
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid progress data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update progress" });
    }
  });

  app.get('/api/user-progress', authenticateToken, async (req: any, res) => {
    try {
      const userId = req.user.id.toString();
      const progress = await storage.getUserProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user progress" });
    }
  });

  app.get('/api/user-progress/topic/:topicId', authenticateToken, async (req: any, res) => {
    try {
      const topicId = parseInt(req.params.topicId);
      const userId = req.user.id.toString();
      const progress = await storage.getUserProgressByTopic(userId, topicId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch topic progress" });
    }
  });

  app.get('/api/user-achievements', authenticateToken, async (req: any, res) => {
    try {
      const userId = req.user.id.toString();
      const achievements = await storage.getUserAchievements(userId);
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user achievements" });
    }
  });

  app.get('/api/user-stats', authenticateToken, async (req: any, res) => {
    try {
      const userId = req.user.id.toString();
      const stats = await storage.getUserStats(userId);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}