import { db } from "./db";
import { problems, topics } from "@shared/schema";

async function restoreAllProblems() {
  console.log("Restoring complete problem set...");

  // Arrays problems
  const arraysProblems = [
    {
      title: "Two Sum",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      difficulty: "Easy" as const,
      pattern: "Hash Map",
      starterCode: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[0];
    }
}`,
      hints: ["Use a hash map to store numbers and their indices", "Look for the complement of each number"]
    },
    {
      title: "3Sum",
      description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
      difficulty: "Medium" as const,
      pattern: "Two Pointers",
      starterCode: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        // Write your solution here
        return new ArrayList<>();
    }
}`,
      hints: ["Sort the array first", "Use two pointers technique", "Skip duplicates"]
    },
    {
      title: "Maximum Subarray",
      description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
      difficulty: "Medium" as const,
      pattern: "Dynamic Programming",
      starterCode: `class Solution {
    public int maxSubArray(int[] nums) {
        // Write your solution here
        return 0;
    }
}`,
      hints: ["Use Kadane's algorithm", "Track maximum sum ending at current position"]
    }
  ];

  // Linked Lists problems
  const linkedListProblems = [
    {
      title: "Reverse Linked List",
      description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
      difficulty: "Easy" as const,
      pattern: "Iterative",
      starterCode: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
}

class Solution {
    public ListNode reverseList(ListNode head) {
        // Write your solution here
        return null;
    }
}`,
      hints: ["Use three pointers: prev, current, next", "Iteratively reverse the links"]
    },
    {
      title: "Merge Two Sorted Lists",
      description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a sorted manner.",
      difficulty: "Easy" as const,
      pattern: "Two Pointers",
      starterCode: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Write your solution here
        return null;
    }
}`,
      hints: ["Use a dummy node to simplify the logic", "Compare values and advance pointers"]
    },
    {
      title: "Linked List Cycle",
      description: "Given head, the head of a linked list, determine if the linked list has a cycle in it.",
      difficulty: "Easy" as const,
      pattern: "Floyd's Cycle Detection",
      starterCode: `class Solution {
    public boolean hasCycle(ListNode head) {
        // Write your solution here
        return false;
    }
}`,
      hints: ["Use Floyd's cycle detection algorithm", "Two pointers: slow and fast"]
    }
  ];

  // Stacks & Queues problems
  const stackQueueProblems = [
    {
      title: "Valid Parentheses",
      description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      difficulty: "Easy" as const,
      pattern: "Stack",
      starterCode: `class Solution {
    public boolean isValid(String s) {
        // Write your solution here
        return false;
    }
}`,
      hints: ["Use a stack to keep track of opening brackets", "Match closing brackets with most recent opening"]
    },
    {
      title: "Implement Queue using Stacks",
      description: "Implement a first in first out (FIFO) queue using only two stacks.",
      difficulty: "Easy" as const,
      pattern: "Design",
      starterCode: `class MyQueue {
    public MyQueue() {
        
    }
    
    public void push(int x) {
        
    }
    
    public int pop() {
        return 0;
    }
    
    public int peek() {
        return 0;
    }
    
    public boolean empty() {
        return false;
    }
}`,
      hints: ["Use two stacks: input and output", "Transfer elements when output stack is empty"]
    },
    {
      title: "Daily Temperatures",
      description: "Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.",
      difficulty: "Medium" as const,
      pattern: "Monotonic Stack",
      starterCode: `class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        // Write your solution here
        return new int[0];
    }
}`,
      hints: ["Use a stack to keep track of indices", "Process temperatures from right to left or use monotonic stack"]
    }
  ];

  // Trees & Graphs problems
  const treeGraphProblems = [
    {
      title: "Binary Tree Inorder Traversal",
      description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
      difficulty: "Easy" as const,
      pattern: "Tree Traversal",
      starterCode: `class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
}

class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        // Write your solution here
        return new ArrayList<>();
    }
}`,
      hints: ["Recursive approach: left, root, right", "Or use iterative approach with stack"]
    },
    {
      title: "Maximum Depth of Binary Tree",
      description: "Given the root of a binary tree, return its maximum depth.",
      difficulty: "Easy" as const,
      pattern: "DFS",
      starterCode: `class Solution {
    public int maxDepth(TreeNode root) {
        // Write your solution here
        return 0;
    }
}`,
      hints: ["Use recursive DFS", "Maximum depth = 1 + max(left depth, right depth)"]
    },
    {
      title: "Number of Islands",
      description: "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
      difficulty: "Medium" as const,
      pattern: "DFS/BFS",
      starterCode: `class Solution {
    public int numIslands(char[][] grid) {
        // Write your solution here
        return 0;
    }
}`,
      hints: ["Use DFS or BFS to explore connected components", "Mark visited cells"]
    }
  ];

  // Dynamic Programming problems
  const dpProblems = [
    {
      title: "Climbing Stairs",
      description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
      difficulty: "Easy" as const,
      pattern: "Dynamic Programming",
      starterCode: `class Solution {
    public int climbStairs(int n) {
        // Write your solution here
        return 0;
    }
}`,
      hints: ["This is a Fibonacci sequence problem", "dp[i] = dp[i-1] + dp[i-2]"]
    },
    {
      title: "House Robber",
      description: "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. Adjacent houses have security systems connected.",
      difficulty: "Medium" as const,
      pattern: "Dynamic Programming",
      starterCode: `class Solution {
    public int rob(int[] nums) {
        // Write your solution here
        return 0;
    }
}`,
      hints: ["For each house, decide to rob or not rob", "dp[i] = max(dp[i-1], dp[i-2] + nums[i])"]
    },
    {
      title: "Longest Increasing Subsequence",
      description: "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
      difficulty: "Medium" as const,
      pattern: "Dynamic Programming",
      starterCode: `class Solution {
    public int lengthOfLIS(int[] nums) {
        // Write your solution here
        return 0;
    }
}`,
      hints: ["dp[i] = length of LIS ending at index i", "For each i, check all previous elements"]
    }
  ];

  // Sorting & Searching problems
  const sortSearchProblems = [
    {
      title: "Binary Search",
      description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums.",
      difficulty: "Easy" as const,
      pattern: "Binary Search",
      starterCode: `class Solution {
    public int search(int[] nums, int target) {
        // Write your solution here
        return -1;
    }
}`,
      hints: ["Use binary search template", "left <= right, mid = left + (right - left) / 2"]
    },
    {
      title: "Merge Sort",
      description: "Implement merge sort algorithm to sort an array of integers.",
      difficulty: "Medium" as const,
      pattern: "Divide and Conquer",
      starterCode: `class Solution {
    public int[] sortArray(int[] nums) {
        // Write your solution here
        return nums;
    }
}`,
      hints: ["Divide array into halves", "Recursively sort and merge"]
    },
    {
      title: "Find Peak Element",
      description: "A peak element is an element that is strictly greater than its neighbors. Given an integer array nums, find a peak element.",
      difficulty: "Medium" as const,
      pattern: "Binary Search",
      starterCode: `class Solution {
    public int findPeakElement(int[] nums) {
        // Write your solution here
        return 0;
    }
}`,
      hints: ["Use binary search", "Compare mid with mid+1 to decide direction"]
    }
  ];

  // Get topic IDs
  const topicsList = await db.select().from(topics);
  const topicsMap = new Map(topicsList.map(t => [t.name, t.id]));

  // Insert problems for each topic
  const allTopicProblems = [
    { topicName: "Arrays", problems: arraysProblems },
    { topicName: "Linked Lists", problems: linkedListProblems },
    { topicName: "Stacks & Queues", problems: stackQueueProblems },
    { topicName: "Trees & Graphs", problems: treeGraphProblems },
    { topicName: "Dynamic Programming", problems: dpProblems },
    { topicName: "Sorting & Searching", problems: sortSearchProblems }
  ];

  for (const { topicName, problems: topicProblems } of allTopicProblems) {
    const topicId = topicsMap.get(topicName);
    if (!topicId) continue;

    for (const problem of topicProblems) {
      await db.insert(problems).values({
        topicId,
        title: problem.title,
        description: problem.description,
        difficulty: problem.difficulty,
        pattern: problem.pattern,
        starterCode: problem.starterCode,
        hints: problem.hints,
        examples: JSON.stringify([]),
        testCases: JSON.stringify([]),
        tags: [problem.pattern],
        constraints: ["Follow the problem requirements"],
        createdAt: new Date(),
        updatedAt: new Date()
      }).onConflictDoNothing();
    }

    console.log(`Added ${topicProblems.length} problems for ${topicName}`);
  }

  console.log("✅ Successfully restored all problems across all topics");
}

restoreAllProblems().catch(console.error);