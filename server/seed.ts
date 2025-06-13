import { db } from "./db";
import { topics, problems, achievements } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  // Insert topics
  const topicsData = [
    {
      name: "Arrays & Strings",
      description: "Master fundamental array operations, string manipulation, and basic algorithms",
      icon: "list",
      orderIndex: 1,
    },
    {
      name: "Linked Lists",
      description: "Learn pointer manipulation, list traversal, and dynamic data structures",
      icon: "link",
      orderIndex: 2,
    },
    {
      name: "Stacks & Queues",
      description: "Understand LIFO and FIFO operations, recursion, and expression evaluation",
      icon: "layers",
      orderIndex: 3,
    },
    {
      name: "Trees & Graphs",
      description: "Explore tree traversals, graph algorithms, and hierarchical data structures",
      icon: "git-branch",
      orderIndex: 4,
    },
    {
      name: "Dynamic Programming",
      description: "Master optimization problems, memoization, and recursive solutions",
      icon: "zap",
      orderIndex: 5,
    },
    {
      name: "Sorting & Searching",
      description: "Learn efficient sorting algorithms and binary search techniques",
      icon: "search",
      orderIndex: 6,
    },
  ];

  const insertedTopics = await db.insert(topics).values(topicsData).returning();
  console.log(`Inserted ${insertedTopics.length} topics`);

  // Insert problems for Arrays & Strings
  const arrayProblems = [
    {
      topicId: insertedTopics[0].id,
      title: "Two Sum",
      description: `Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
      difficulty: "Easy",
      starterCode: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[0];
    }
}`,
      solution: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        
        return new int[0];
    }
}`,
      hints: [
        "Use a hash map to store numbers and their indices",
        "For each number, check if its complement exists in the map",
        "The complement is target - current number"
      ],
      constraints: [
        "2 ≤ nums.length ≤ 10<sup>4</sup>",
        "-10<sup>9</sup> ≤ nums[i] ≤ 10<sup>9</sup>",
        "-10<sup>9</sup> ≤ target ≤ 10<sup>9</sup>",
        "Only one valid answer exists"
      ],
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] = 2 + 7 = 9, we return [0, 1]."
        },
        {
          input: "nums = [3,2,4], target = 6",
          output: "[1,2]",
          explanation: "Because nums[1] + nums[2] = 2 + 4 = 6, we return [1, 2]."
        }
      ],
      testCases: [
        { input: "[2,7,11,15], 9", expectedOutput: "[0,1]" },
        { input: "[3,2,4], 6", expectedOutput: "[1,2]" },
        { input: "[3,3], 6", expectedOutput: "[0,1]" }
      ],
      tags: ["Array", "Hash Table"],
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      orderIndex: 1,
    },
    {
      topicId: insertedTopics[0].id,
      title: "Valid Palindrome",
      description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.

Given a string <code>s</code>, return <code>true</code> if it is a palindrome, or <code>false</code> otherwise.`,
      difficulty: "Easy",
      starterCode: `import java.util.*;

class Solution {
    public boolean isPalindrome(String s) {
        // Your code here
        return false;
    }
}`,
      solution: `import java.util.*;

class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        
        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
                left++;
            }
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
                right--;
            }
            
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            }
            
            left++;
            right--;
        }
        
        return true;
    }
}`,
      hints: [
        "Use two pointers from both ends",
        "Skip non-alphanumeric characters",
        "Compare characters in lowercase"
      ],
      constraints: [
        "1 ≤ s.length ≤ 2 * 10<sup>5</sup>",
        "s consists only of printable ASCII characters"
      ],
      examples: [
        {
          input: 's = "A man, a plan, a canal: Panama"',
          output: "true",
          explanation: '"amanaplanacanalpanama" is a palindrome.'
        },
        {
          input: 's = "race a car"',
          output: "false",
          explanation: '"raceacar" is not a palindrome.'
        }
      ],
      testCases: [
        { input: '"A man, a plan, a canal: Panama"', expectedOutput: "true" },
        { input: '"race a car"', expectedOutput: "false" },
        { input: '" "', expectedOutput: "true" }
      ],
      tags: ["String", "Two Pointers"],
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      orderIndex: 2,
    }
  ];

  // Insert problems for Linked Lists
  const linkedListProblems = [
    {
      topicId: insertedTopics[1].id,
      title: "Reverse Linked List",
      description: `Given the <code>head</code> of a singly linked list, reverse the list, and return the reversed list.`,
      difficulty: "Easy",
      starterCode: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {
        // Your code here
        return null;
    }
}`,
      solution: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        
        return prev;
    }
}`,
      hints: [
        "Use three pointers: prev, curr, and next",
        "Iterate through the list and reverse the links",
        "Don't forget to update all pointers in each iteration"
      ],
      constraints: [
        "The number of nodes in the list is the range [0, 5000]",
        "-5000 ≤ Node.val ≤ 5000"
      ],
      examples: [
        {
          input: "head = [1,2,3,4,5]",
          output: "[5,4,3,2,1]",
          explanation: "The linked list is reversed."
        },
        {
          input: "head = [1,2]",
          output: "[2,1]",
          explanation: "The linked list is reversed."
        }
      ],
      testCases: [
        { input: "[1,2,3,4,5]", expectedOutput: "[5,4,3,2,1]" },
        { input: "[1,2]", expectedOutput: "[2,1]" },
        { input: "[]", expectedOutput: "[]" }
      ],
      tags: ["Linked List", "Recursion"],
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      orderIndex: 1,
    }
  ];

  // Insert problems for Stacks & Queues
  const stackQueueProblems = [
    {
      topicId: insertedTopics[2].id,
      title: "Valid Parentheses",
      description: `Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
      difficulty: "Easy",
      starterCode: `import java.util.*;

class Solution {
    public boolean isValid(String s) {
        // Your code here
        return false;
    }
}`,
      solution: `import java.util.*;

class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;
                
                char top = stack.pop();
                if ((c == ')' && top != '(') || 
                    (c == ']' && top != '[') || 
                    (c == '}' && top != '{')) {
                    return false;
                }
            }
        }
        
        return stack.isEmpty();
    }
}`,
      hints: [
        "Use a stack to keep track of opening brackets",
        "When you encounter a closing bracket, check if it matches the most recent opening bracket",
        "The string is valid if the stack is empty at the end"
      ],
      constraints: [
        "1 ≤ s.length ≤ 10<sup>4</sup>",
        "s consists of parentheses only '()[]{}'."
      ],
      examples: [
        {
          input: 's = "()"',
          output: "true",
          explanation: "The parentheses are properly matched."
        },
        {
          input: 's = "()[]{}"',
          output: "true",
          explanation: "All brackets are properly matched."
        },
        {
          input: 's = "(]"',
          output: "false",
          explanation: "The brackets are not properly matched."
        }
      ],
      testCases: [
        { input: '"()"', expectedOutput: "true" },
        { input: '"()[]{}"', expectedOutput: "true" },
        { input: '"(]"', expectedOutput: "false" },
        { input: '"([)]"', expectedOutput: "false" }
      ],
      tags: ["String", "Stack"],
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      orderIndex: 1,
    }
  ];

  const allProblems = [...arrayProblems, ...linkedListProblems, ...stackQueueProblems];
  const insertedProblems = await db.insert(problems).values(allProblems).returning();
  console.log(`Inserted ${insertedProblems.length} problems`);

  // Insert achievements
  const achievementsData = [
    {
      name: "First Steps",
      description: "Solve your first coding problem",
      icon: "trophy",
      xpReward: 25,
      condition: { type: "problems_solved", value: 1 },
    },
    {
      name: "Problem Solver",
      description: "Solve 10 coding problems",
      icon: "target",
      xpReward: 100,
      condition: { type: "problems_solved", value: 10 },
    },
    {
      name: "Array Master",
      description: "Complete all Array & String problems",
      icon: "list",
      xpReward: 200,
      condition: { type: "topic_completed", value: "Arrays & Strings" },
    },
    {
      name: "Speed Demon",
      description: "Solve a problem in under 5 minutes",
      icon: "zap",
      xpReward: 50,
      condition: { type: "solve_time", value: 300 },
    },
  ];

  const insertedAchievements = await db.insert(achievements).values(achievementsData).returning();
  console.log(`Inserted ${insertedAchievements.length} achievements`);

  console.log("Database seeded successfully!");
}

seed().catch(console.error);