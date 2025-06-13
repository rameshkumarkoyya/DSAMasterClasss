import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupSimpleAuth, authenticateToken } from "./simpleAuth";
import { insertSubmissionSchema, insertUserProgressSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  setupSimpleAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Topics routes (public)
  app.get('/api/topics', async (req, res) => {
    try {
      const topics = await storage.getTopics();
      res.json(topics);
    } catch (error) {
      console.error("Error fetching topics:", error);
      res.status(500).json({ message: "Failed to fetch topics" });
    }
  });

  // Problems routes (public)
  app.get('/api/topics/:topicId/problems', async (req, res) => {
    try {
      const topicId = parseInt(req.params.topicId);
      const problems = await storage.getProblemsByTopicId(topicId);
      res.json(problems);
    } catch (error) {
      console.error("Error fetching problems:", error);
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
      console.error("Error fetching problem:", error);
      res.status(500).json({ message: "Failed to fetch problem" });
    }
  });

  // Submissions routes
  app.post('/api/submissions', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const submissionData = insertSubmissionSchema.parse({
        ...req.body,
        userId,
      });

      const submission = await storage.createSubmission(submissionData);

      // Update user progress if submission is accepted
      if (submission.status === 'Accepted') {
        const progressData = insertUserProgressSchema.parse({
          userId,
          topicId: req.body.topicId,
          problemId: submission.problemId,
          completed: true,
          attempts: 1,
          bestSubmissionId: submission.id,
          completedAt: new Date(),
        });

        await storage.upsertUserProgress(progressData);

        // Update user XP and level
        const user = await storage.getUser(userId);
        if (user) {
          const xpGain = req.body.difficulty === 'Easy' ? 10 : req.body.difficulty === 'Medium' ? 25 : 50;
          const newXP = (user.xp || 0) + xpGain;
          const newLevel = Math.floor(newXP / 100) + 1;

          await storage.upsertUser({
            ...user,
            xp: newXP,
            level: newLevel,
          });
        }
      }

      res.json(submission);
    } catch (error) {
      console.error("Error creating submission:", error);
      res.status(500).json({ message: "Failed to create submission" });
    }
  });

  app.get('/api/submissions/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const submissions = await storage.getSubmissionsByUserId(userId);
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching user submissions:", error);
      res.status(500).json({ message: "Failed to fetch submissions" });
    }
  });

  app.get('/api/problems/:problemId/submissions', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const problemId = parseInt(req.params.problemId);
      const submissions = await storage.getSubmissionsByProblemId(problemId, userId);
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching problem submissions:", error);
      res.status(500).json({ message: "Failed to fetch submissions" });
    }
  });

  // User progress routes
  app.get('/api/progress', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const progress = await storage.getUserProgress(userId);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching user progress:", error);
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  app.get('/api/topics/:topicId/progress', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const topicId = parseInt(req.params.topicId);
      const progress = await storage.getUserProgressByTopic(userId, topicId);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching topic progress:", error);
      res.status(500).json({ message: "Failed to fetch topic progress" });
    }
  });

  // User stats route
  app.get('/api/stats', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const stats = await storage.getUserStats(userId);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching user stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  // Code execution route (simplified - in production would use secure sandbox)
  app.post('/api/execute', isAuthenticated, async (req, res) => {
    try {
      const { code, testCases } = req.body;
      
      // This is a simplified simulation - in production you'd use a secure code execution environment
      // For now, we'll simulate test case results
      const results = testCases.map((testCase: any, index: number) => ({
        testCase: index + 1,
        passed: Math.random() > 0.3, // 70% pass rate simulation
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: testCase.expectedOutput, // Simulated
        executionTime: Math.floor(Math.random() * 100) + 10,
      }));

      const allPassed = results.every((result: any) => result.passed);
      
      res.json({
        status: allPassed ? 'Accepted' : 'Wrong Answer',
        results,
        runtime: Math.floor(Math.random() * 500) + 50,
        memory: Math.floor(Math.random() * 1000) + 100,
      });
    } catch (error) {
      console.error("Error executing code:", error);
      res.status(500).json({ message: "Failed to execute code" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
