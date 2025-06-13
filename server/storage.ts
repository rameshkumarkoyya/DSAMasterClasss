import {
  users,
  topics,
  problems,
  submissions,
  userProgress,
  achievements,
  userAchievements,
  type User,
  type UpsertUser,
  type InsertUser,
  type Topic,
  type InsertTopic,
  type Problem,
  type InsertProblem,
  type Submission,
  type InsertSubmission,
  type UserProgress,
  type InsertUserProgress,
  type Achievement,
  type UserAchievement,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, sql, count } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Topic operations
  getTopics(): Promise<Topic[]>;
  createTopic(topic: InsertTopic): Promise<Topic>;
  
  // Problem operations
  getProblemsByTopicId(topicId: number): Promise<Problem[]>;
  getProblem(id: number): Promise<Problem | undefined>;
  createProblem(problem: InsertProblem): Promise<Problem>;
  
  // Submission operations
  createSubmission(submission: InsertSubmission): Promise<Submission>;
  getSubmissionsByUserId(userId: string): Promise<Submission[]>;
  getSubmissionsByProblemId(problemId: number, userId: string): Promise<Submission[]>;
  
  // User progress operations
  getUserProgress(userId: string): Promise<UserProgress[]>;
  getUserProgressByTopic(userId: string, topicId: number): Promise<UserProgress[]>;
  upsertUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  
  // Achievement operations
  getAchievements(): Promise<Achievement[]>;
  getUserAchievements(userId: string): Promise<UserAchievement[]>;
  
  // Statistics
  getUserStats(userId: string): Promise<{
    totalProblems: number;
    solvedProblems: number;
    completedTopics: number;
    totalXP: number;
    level: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .returning();
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Topic operations
  async getTopics(): Promise<Topic[]> {
    return await db.select().from(topics).orderBy(topics.orderIndex);
  }

  async createTopic(topic: InsertTopic): Promise<Topic> {
    const [newTopic] = await db.insert(topics).values(topic).returning();
    return newTopic;
  }

  // Problem operations
  async getProblemsByTopicId(topicId: number): Promise<Problem[]> {
    return await db
      .select()
      .from(problems)
      .where(eq(problems.topicId, topicId))
      .orderBy(problems.orderIndex);
  }

  async getProblem(id: number): Promise<Problem | undefined> {
    const [problem] = await db.select().from(problems).where(eq(problems.id, id));
    return problem;
  }

  async createProblem(problem: InsertProblem): Promise<Problem> {
    const [newProblem] = await db.insert(problems).values(problem).returning();
    return newProblem;
  }

  // Submission operations
  async createSubmission(submission: InsertSubmission): Promise<Submission> {
    const [newSubmission] = await db.insert(submissions).values(submission).returning();
    return newSubmission;
  }

  async getSubmissionsByUserId(userId: string): Promise<Submission[]> {
    return await db
      .select()
      .from(submissions)
      .where(eq(submissions.userId, userId))
      .orderBy(desc(submissions.createdAt));
  }

  async getSubmissionsByProblemId(problemId: number, userId: string): Promise<Submission[]> {
    return await db
      .select()
      .from(submissions)
      .where(and(eq(submissions.problemId, problemId), eq(submissions.userId, userId)))
      .orderBy(desc(submissions.createdAt));
  }

  // User progress operations
  async getUserProgress(userId: string): Promise<UserProgress[]> {
    return await db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, userId));
  }

  async getUserProgressByTopic(userId: string, topicId: number): Promise<UserProgress[]> {
    return await db
      .select()
      .from(userProgress)
      .where(and(eq(userProgress.userId, userId), eq(userProgress.topicId, topicId)));
  }

  async upsertUserProgress(progress: InsertUserProgress): Promise<UserProgress> {
    const [existingProgress] = await db
      .select()
      .from(userProgress)
      .where(
        and(
          eq(userProgress.userId, progress.userId),
          eq(userProgress.problemId, progress.problemId)
        )
      );

    if (existingProgress) {
      const [updatedProgress] = await db
        .update(userProgress)
        .set({
          ...progress,
          updatedAt: new Date(),
        })
        .where(eq(userProgress.id, existingProgress.id))
        .returning();
      return updatedProgress;
    } else {
      const [newProgress] = await db.insert(userProgress).values(progress).returning();
      return newProgress;
    }
  }

  // Achievement operations
  async getAchievements(): Promise<Achievement[]> {
    return await db.select().from(achievements);
  }

  async getUserAchievements(userId: string): Promise<UserAchievement[]> {
    return await db
      .select()
      .from(userAchievements)
      .where(eq(userAchievements.userId, userId));
  }

  // Statistics
  async getUserStats(userId: string): Promise<{
    totalProblems: number;
    solvedProblems: number;
    completedTopics: number;
    totalXP: number;
    level: number;
  }> {
    // Get user details
    const user = await this.getUser(userId);
    if (!user) {
      return {
        totalProblems: 0,
        solvedProblems: 0,
        completedTopics: 0,
        totalXP: 0,
        level: 1,
      };
    }

    // Get total problems count
    const [totalProblemsResult] = await db
      .select({ count: count() })
      .from(problems);

    // Get solved problems count
    const [solvedProblemsResult] = await db
      .select({ count: count() })
      .from(userProgress)
      .where(and(eq(userProgress.userId, userId), eq(userProgress.completed, true)));

    // Get completed topics count
    const completedTopicsResult = await db
      .select({
        topicId: userProgress.topicId,
        totalProblems: count(),
      })
      .from(userProgress)
      .innerJoin(problems, eq(problems.topicId, userProgress.topicId))
      .where(and(eq(userProgress.userId, userId), eq(userProgress.completed, true)))
      .groupBy(userProgress.topicId);

    return {
      totalProblems: totalProblemsResult.count,
      solvedProblems: solvedProblemsResult.count,
      completedTopics: completedTopicsResult.length,
      totalXP: user.xp || 0,
      level: user.level || 1,
    };
  }
}

export const storage = new DatabaseStorage();
