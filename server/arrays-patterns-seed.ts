import { db } from "./db";
import { topics, problems } from "@shared/schema";

export async function seedArraysPatterns() {
  console.log("Seeding Arrays & Strings patterns...");

  // Create Arrays & Strings topic if it doesn't exist
  const [arraysTopic] = await db.insert(topics).values({
    name: "Arrays & Strings",
    description: "Master fundamental array and string manipulation algorithms",
    icon: "grid",
    orderIndex: 1
  }).onConflictDoUpdate({
    target: topics.name,
    set: { description: "Master fundamental array and string manipulation algorithms" }
  }).returning();

  const topicId = arraysTopic.id;

  // Two Pointers Pattern Problems
  const twoPointerProblems = [
    {
      title: "Two Sum",
      difficulty: "Easy" as const,
      pattern: "Two Pointers",
      leetcodeUrl: "https://leetcode.com/problems/two-sum/",
      description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
        }
      ],
      starterCode: `def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Your solution here
    pass`,
      hints: ["Use a hash map to store values and their indices", "For each element, check if target - element exists in the map"]
    },
    {
      title: "3Sum",
      difficulty: "Medium" as const,
      pattern: "Two Pointers",
      leetcodeUrl: "https://leetcode.com/problems/3sum/",
      description: `Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.`,
      examples: [
        {
          input: "nums = [-1,0,1,2,-1,-4]",
          output: "[[-1,-1,2],[-1,0,1]]",
          explanation: "The distinct triplets are [-1,0,1] and [-1,-1,2]."
        }
      ],
      starterCode: `def threeSum(nums):
    """
    :type nums: List[int]
    :rtype: List[List[int]]
    """
    # Your solution here
    pass`,
      hints: ["Sort the array first", "Use two pointers technique after fixing one element", "Skip duplicates to avoid duplicate triplets"]
    },
    {
      title: "3Sum Closest",
      difficulty: "Medium" as const,
      pattern: "Two Pointers",
      leetcodeUrl: "https://leetcode.com/problems/3sum-closest/",
      description: `Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target.

Return the sum of the three integers.

You may assume that each input would have exactly one solution.`,
      starterCode: `def threeSumClosest(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: int
    """
    # Your solution here
    pass`,
      hints: ["Sort the array first", "Use two pointers and track the closest sum", "Update closest sum when a closer one is found"]
    }
  ];

  // Merge Intervals Pattern Problems
  const mergeIntervalProblems = [
    {
      title: "Merge Intervals",
      difficulty: "Medium" as const,
      pattern: "Merge Intervals",
      leetcodeUrl: "https://leetcode.com/problems/merge-intervals/",
      description: `Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
      examples: [
        {
          input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
          output: "[[1,6],[8,10],[15,18]]",
          explanation: "Since intervals [1,3] and [2,6] overlap, merge them into [1,6]."
        }
      ],
      starterCode: `def merge(intervals):
    """
    :type intervals: List[List[int]]
    :rtype: List[List[int]]
    """
    # Your solution here
    pass`,
      hints: ["Sort intervals by start time", "Merge overlapping intervals", "Check if current interval overlaps with the last merged interval"]
    },
    {
      title: "Insert Interval",
      difficulty: "Medium" as const,
      pattern: "Merge Intervals",
      leetcodeUrl: "https://leetcode.com/problems/insert-interval/",
      description: `You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.

Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return intervals after the insertion.`,
      starterCode: `def insert(intervals, newInterval):
    """
    :type intervals: List[List[int]]
    :type newInterval: List[int]
    :rtype: List[List[int]]
    """
    # Your solution here
    pass`,
      hints: ["Add all intervals that end before newInterval starts", "Merge all overlapping intervals", "Add all intervals that start after newInterval ends"]
    },
    {
      title: "Non-overlapping Intervals",
      difficulty: "Medium" as const,
      pattern: "Merge Intervals",
      leetcodeUrl: "https://leetcode.com/problems/non-overlapping-intervals/",
      description: `Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.`,
      starterCode: `def eraseOverlapIntervals(intervals):
    """
    :type intervals: List[List[int]]
    :rtype: int
    """
    # Your solution here
    pass`,
      hints: ["Sort intervals by end time", "Use greedy approach", "Keep track of the last non-overlapping interval"]
    }
  ];

  // Sorting Pattern Problems
  const sortingProblems = [
    {
      title: "Sort Colors",
      difficulty: "Medium" as const,
      pattern: "Sorting",
      leetcodeUrl: "https://leetcode.com/problems/sort-colors/",
      description: `Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.`,
      examples: [
        {
          input: "nums = [2,0,2,1,1,0]",
          output: "[0,0,1,1,2,2]"
        }
      ],
      starterCode: `def sortColors(nums):
    """
    :type nums: List[int]
    :rtype: None Do not return anything, modify nums in-place instead.
    """
    # Your solution here
    pass`,
      hints: ["Use Dutch National Flag algorithm", "Maintain three pointers: low, mid, high", "Swap elements to their correct positions"]
    },
    {
      title: "Meeting Rooms II",
      difficulty: "Medium" as const,
      pattern: "Sorting",
      leetcodeUrl: "https://leetcode.com/problems/meeting-rooms-ii/",
      description: `Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.`,
      examples: [
        {
          input: "intervals = [[0,30],[5,10],[15,20]]",
          output: "2",
          explanation: "We need two meeting rooms. Room 1: [0,30], Room 2: [5,10],[15,20]"
        }
      ],
      starterCode: `def minMeetingRooms(intervals):
    """
    :type intervals: List[List[int]]
    :rtype: int
    """
    # Your solution here
    pass`,
      hints: ["Sort start and end times separately", "Use two pointers to track meetings", "Count concurrent meetings"]
    },
    {
      title: "Largest Number",
      difficulty: "Medium" as const,
      pattern: "Sorting",
      leetcodeUrl: "https://leetcode.com/problems/largest-number/",
      description: `Given a list of non-negative integers nums, arrange them such that they form the largest number and return it.

Since the result may be very large, so you need to return a string instead of an integer.`,
      starterCode: `def largestNumber(nums):
    """
    :type nums: List[int]
    :rtype: str
    """
    # Your solution here
    pass`,
      hints: ["Custom comparator for sorting", "Compare concatenated strings", "Handle edge case of all zeros"]
    }
  ];

  // Sliding Window Pattern Problems
  const slidingWindowProblems = [
    {
      title: "Minimum Size Subarray Sum",
      difficulty: "Medium" as const,
      pattern: "Sliding Window",
      leetcodeUrl: "https://leetcode.com/problems/minimum-size-subarray-sum/",
      description: `Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.`,
      examples: [
        {
          input: "target = 7, nums = [2,3,1,2,4,3]",
          output: "2",
          explanation: "The subarray [4,3] has the minimal length under the problem constraint."
        }
      ],
      starterCode: `def minSubArrayLen(target, nums):
    """
    :type target: int
    :type nums: List[int]
    :rtype: int
    """
    # Your solution here
    pass`,
      hints: ["Use two pointers for sliding window", "Expand window until sum >= target", "Contract window while maintaining the condition"]
    },
    {
      title: "Longest Mountain in Array",
      difficulty: "Medium" as const,
      pattern: "Sliding Window",
      leetcodeUrl: "https://leetcode.com/problems/longest-mountain-in-array/",
      description: `You may recall that an array arr is a mountain array if and only if:
- arr.length >= 3
- There exists some index i (0-indexed) with 0 < i < arr.length - 1 such that:
  - arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
  - arr[i] > arr[i + 1] > ... > arr[arr.length - 1]

Given an integer array arr, return the length of the longest subarray that is a mountain. Return 0 if there is no mountain subarray.`,
      starterCode: `def longestMountain(arr):
    """
    :type arr: List[int]
    :rtype: int
    """
    # Your solution here
    pass`,
      hints: ["Track uphill and downhill sequences", "A mountain needs both uphill and downhill", "Reset counters when pattern breaks"]
    },
    {
      title: "Longest Continuous Increasing Subsequence",
      difficulty: "Easy" as const,
      pattern: "Sliding Window",
      leetcodeUrl: "https://leetcode.com/problems/longest-continuous-increasing-subsequence/",
      description: `Given an unsorted array of integers nums, return the length of the longest continuous increasing subsequence (i.e. subarray). The subsequence must be strictly increasing.`,
      starterCode: `def findLengthOfLCIS(nums):
    """
    :type nums: List[int]
    :rtype: int
    """
    # Your solution here
    pass`,
      hints: ["Use sliding window technique", "Track current and maximum length", "Reset when sequence breaks"]
    }
  ];

  // Prefix Sums Pattern Problems
  const prefixSumProblems = [
    {
      title: "Count of Smaller Numbers After Self",
      difficulty: "Hard" as const,
      pattern: "Prefix Sums",
      leetcodeUrl: "https://leetcode.com/problems/count-of-smaller-numbers-after-self/",
      description: `Given an integer array nums, return an integer array counts where counts[i] is the number of smaller elements to the right of nums[i].`,
      examples: [
        {
          input: "nums = [5,2,6,1]",
          output: "[2,1,1,0]",
          explanation: "To the right of 5 there are 2 smaller elements (2 and 1). To the right of 2 there is only 1 smaller element (1). To the right of 6 there is 1 smaller element (1). To the right of 1 there is 0 smaller element."
        }
      ],
      starterCode: `def countSmaller(nums):
    """
    :type nums: List[int]
    :rtype: List[int]
    """
    # Your solution here
    pass`,
      hints: ["Use merge sort with index tracking", "Count inversions during merge", "Maintain original indices"]
    },
    {
      title: "Range Sum Query - Mutable",
      difficulty: "Medium" as const,
      pattern: "Prefix Sums",
      leetcodeUrl: "https://leetcode.com/problems/range-sum-query-mutable/",
      description: `Given an integer array nums, handle multiple queries of the following types:
1. Update the value of an element in nums.
2. Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.

Implement the NumArray class with update and sumRange methods.`,
      starterCode: `class NumArray:
    def __init__(self, nums):
        """
        :type nums: List[int]
        """
        # Your solution here
        pass

    def update(self, index, val):
        """
        :type index: int
        :type val: int
        :rtype: None
        """
        # Your solution here
        pass

    def sumRange(self, left, right):
        """
        :type left: int
        :type right: int
        :rtype: int
        """
        # Your solution here
        pass`,
      hints: ["Use Binary Indexed Tree (Fenwick Tree)", "Or use Segment Tree for range operations", "Both allow O(log n) updates and queries"]
    },
    {
      title: "Subarray Product Less Than K",
      difficulty: "Medium" as const,
      pattern: "Prefix Sums",
      leetcodeUrl: "https://leetcode.com/problems/subarray-product-less-than-k/",
      description: `Given an array of integers nums and an integer k, return the number of contiguous subarrays where the product of all the elements in the subarray is strictly less than k.`,
      starterCode: `def numSubarrayProductLessThanK(nums, k):
    """
    :type nums: List[int]
    :type k: int
    :rtype: int
    """
    # Your solution here
    pass`,
      hints: ["Use sliding window technique", "Maintain product of current window", "Shrink window when product >= k"]
    }
  ];

  // Additional problems from the screenshot
  const additionalProblems = [
    {
      title: "Remove Duplicates from Sorted Array",
      difficulty: "Easy" as const,
      pattern: "Two Pointers",
      leetcodeUrl: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
      description: `Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same.`,
      starterCode: `def removeDuplicates(nums):
    """
    :type nums: List[int]
    :rtype: int
    """
    # Your solution here
    pass`,
      hints: ["Use two pointers approach", "One pointer for unique elements", "One pointer for iteration"]
    },
    {
      title: "Interval List Intersections",
      difficulty: "Medium" as const,
      pattern: "Merge Intervals",
      leetcodeUrl: "https://leetcode.com/problems/interval-list-intersections/",
      description: `You are given two lists of closed intervals, firstList and secondList, where firstList[i] = [starti, endi] and secondList[j] = [startj, endj]. Each list of intervals is pairwise disjoint and in sorted order.

Return the intersection of these two interval lists.`,
      starterCode: `def intervalIntersection(firstList, secondList):
    """
    :type firstList: List[List[int]]
    :type secondList: List[List[int]]
    :rtype: List[List[int]]
    """
    # Your solution here
    pass`,
      hints: ["Use two pointers for both lists", "Find intersection of current intervals", "Move pointer of interval that ends first"]
    },
    {
      title: "Wiggle Sort II",
      difficulty: "Medium" as const,
      pattern: "Sorting",
      leetcodeUrl: "https://leetcode.com/problems/wiggle-sort-ii/",
      description: `Given an integer array nums, reorder it such that nums[0] < nums[1] > nums[2] < nums[3]....

You may assume the input array always has a valid answer.`,
      starterCode: `def wiggleSort(nums):
    """
    :type nums: List[int]
    :rtype: None Do not return anything, modify nums in-place instead.
    """
    # Your solution here
    pass`,
      hints: ["Find median and partition array", "Use virtual indexing for placement", "Place larger elements at odd indices"]
    },
    {
      title: "Maximum Points You Can Obtain from Cards",
      difficulty: "Medium" as const,
      pattern: "Sliding Window",
      leetcodeUrl: "https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/",
      description: `There are several cards arranged in a row, and each card has an associated number of points. The points are given in the integer array cardPoints.

In one step, you can take one card from the beginning or from the end of the row. You have to take exactly k cards.

Your score is the sum of the points of the cards you have taken.

Given the integer array cardPoints and the integer k, return the maximum score you can obtain.`,
      starterCode: `def maxScore(cardPoints, k):
    """
    :type cardPoints: List[int]
    :type k: int
    :rtype: int
    """
    # Your solution here
    pass`,
      hints: ["Think of it as finding minimum subarray of length n-k", "Use sliding window to find minimum sum", "Maximum score = total sum - minimum subarray sum"]
    }
  ];

  // Insert all problems
  const allProblems = [
    ...twoPointerProblems,
    ...mergeIntervalProblems,
    ...sortingProblems,
    ...slidingWindowProblems,
    ...prefixSumProblems,
    ...additionalProblems
  ];

  for (const problem of allProblems) {
    await db.insert(problems).values({
      topicId,
      ...problem,
      examples: JSON.stringify(problem.examples || []),
      testCases: JSON.stringify([]),
      tags: [problem.pattern],
      constraints: ["1 <= nums.length <= 10^4", "-10^4 <= nums[i] <= 10^4"],
      createdAt: new Date(),
      updatedAt: new Date()
    }).onConflictDoNothing();
  }

  console.log(`✅ Seeded ${allProblems.length} Arrays & Strings problems across 5 patterns`);
}

// Run the seed function
seedArraysPatterns().catch(console.error);