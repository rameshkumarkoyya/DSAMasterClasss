import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Target, CheckCircle } from "lucide-react";

export default function PatternsGuide() {
  const patterns = [
    {
      name: "Two Pointers",
      icon: "🔄",
      color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
      scenarios: "Look for problems where you need to iterate through the array considering two positions within the array. Consider tasks that involve comparing or manipulating pairs of elements at different parts of the array simultaneously.",
      clue: "Look for problem descriptions mentioning a sorted array or the need to compare elements at both ends of the array.",
      examples: ["Two Sum", "3Sum", "3Sum Closest", "Remove Duplicates from Sorted Array"],
      approach: {
        when: "Use when you need to find pairs or triplets in sorted arrays, or when you need to compare elements from both ends",
        technique: "Place one pointer at the beginning and another at the end, move them based on comparison results",
        timeComplexity: "O(n) or O(n²) for nested loops",
        spaceComplexity: "O(1) additional space"
      },
      keySteps: [
        "Sort the array if not already sorted",
        "Initialize left pointer at start, right pointer at end",
        "Compare elements and move pointers based on target condition",
        "Continue until pointers meet or target is found"
      ]
    },
    {
      name: "Merge Intervals",
      icon: "📊",
      color: "from-green-500/20 to-emerald-500/20 border-green-500/30",
      scenarios: "Identify problems involving intervals or ranges that have start and end times, intervals, or find intersections between them.",
      clue: "Look for problems where the input involves intervals represented as pairs of start and end points, and the task is around manipulating these intervals.",
      examples: ["Merge Intervals", "Insert Interval", "Non-overlapping Intervals", "Interval List Intersections"],
      approach: {
        when: "Use when dealing with time intervals, scheduling problems, or range overlapping scenarios",
        technique: "Sort intervals by start time, then merge overlapping ones",
        timeComplexity: "O(n log n) due to sorting",
        spaceComplexity: "O(n) for the result array"
      },
      keySteps: [
        "Sort intervals by start time",
        "Initialize result with first interval",
        "For each subsequent interval, check if it overlaps with the last in result",
        "If overlapping, merge them; otherwise, add to result"
      ]
    },
    {
      name: "Sorting",
      icon: "📈",
      color: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
      scenarios: "Look for tasks where sorting elements according to certain criteria can lead to a solution or optimize subsequent operations.",
      clue: "Look for problems mentioning that the array needs to be sorted first or that sorting criteria lead to solution or optimize subsequent operations.",
      examples: ["Sort Colors", "Meeting Rooms II", "Largest Number", "Wiggle Sort II"],
      approach: {
        when: "Use when order matters, or when sorting simplifies the problem logic",
        technique: "Choose appropriate sorting algorithm or use custom comparators",
        timeComplexity: "O(n log n) for comparison-based sorts",
        spaceComplexity: "O(1) to O(n) depending on sort algorithm"
      },
      keySteps: [
        "Identify the sorting criteria",
        "Choose appropriate sorting method (built-in, custom comparator, or specialized algorithm)",
        "Apply sorting to transform the problem into a simpler form",
        "Process the sorted data to get the final result"
      ]
    },
    {
      name: "Sliding Window",
      icon: "🪟",
      color: "from-orange-500/20 to-red-500/20 border-orange-500/30",
      scenarios: "Look for tasks where you need to maintain a window of elements within the array that satisfies specific conditions.",
      clue: "Look for problems involving contiguous subarrays or substrings where you need to track a subset of elements within the array that satisfies specific conditions.",
      examples: ["Minimum Size Subarray Sum", "Longest Mountain in Array", "Longest Continuous Increasing Subsequence", "Maximum Points You Can Obtain from Cards"],
      approach: {
        when: "Use for subarray/substring problems with contiguous elements",
        technique: "Maintain a window with two pointers, expand/contract based on conditions",
        timeComplexity: "O(n) single pass through array",
        spaceComplexity: "O(1) additional space"
      },
      keySteps: [
        "Initialize window boundaries (left and right pointers)",
        "Expand window by moving right pointer until condition is met",
        "Contract window by moving left pointer while maintaining condition",
        "Track the optimal window size or content throughout the process"
      ]
    },
    {
      name: "Prefix Sums",
      icon: "🧮",
      color: "from-yellow-500/20 to-amber-500/20 border-yellow-500/30",
      scenarios: "Look for tasks where you need to find a sum or average of elements in subarrays or answer range queries efficiently.",
      clue: "Look for problems mentioning substring/subarray sums, cumulative sums, or range sums that help optimize subsequent moving window conditions.",
      examples: ["Count of Smaller Numbers After Self", "Range Sum Query - Mutable", "Subarray Product Less Than K"],
      approach: {
        when: "Use when you need to calculate range sums efficiently or precompute cumulative values",
        technique: "Build prefix sum array where prefix[i] = sum of elements from 0 to i",
        timeComplexity: "O(n) preprocessing, O(1) per query",
        spaceComplexity: "O(n) for prefix array"
      },
      keySteps: [
        "Build prefix sum array with cumulative sums",
        "Use formula: sum(i,j) = prefix[j] - prefix[i-1]",
        "Handle edge cases for index boundaries",
        "Apply prefix sums to solve range-based problems efficiently"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <Header />
      <div className="pt-16">
        <main className="max-w-7xl mx-auto p-6">
          {/* Header Section */}
          <div className="mb-8">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/50 via-blue-900/50 to-purple-900/50 border border-purple-500/20 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10"></div>
              <div className="relative p-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                  Arrays & Strings Algorithm Patterns
                </h1>
                <p className="text-gray-300 text-lg mb-6">
                  Master the fundamental patterns that appear in 80% of array and string problems
                </p>
                <div className="flex space-x-4">
                  <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                    5 Core Patterns
                  </Badge>
                  <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30">
                    23 Practice Problems
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Patterns Grid */}
          <div className="space-y-8">
            {patterns.map((pattern, index) => (
              <Card key={pattern.name} className={`bg-gradient-to-r ${pattern.color} backdrop-blur-sm border`}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-white">
                    <span className="text-2xl">{pattern.icon}</span>
                    <span className="text-xl">{pattern.name}</span>
                    <Badge variant="outline" className="bg-slate-700/50 text-gray-300 border-slate-600/50">
                      Pattern #{index + 1}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* When to Use */}
                  <div>
                    <h4 className="text-white font-semibold mb-2 flex items-center space-x-2">
                      <Target className="h-4 w-4 text-purple-400" />
                      <span>When to Use This Pattern</span>
                    </h4>
                    <p className="text-gray-300 text-sm">{pattern.scenarios}</p>
                  </div>

                  {/* Recognition Clue */}
                  <div>
                    <h4 className="text-white font-semibold mb-2 flex items-center space-x-2">
                      <Code className="h-4 w-4 text-blue-400" />
                      <span>How to Recognize</span>
                    </h4>
                    <p className="text-gray-300 text-sm">{pattern.clue}</p>
                  </div>

                  {/* Approach Details */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-800/30 rounded-lg p-4">
                      <h5 className="text-white font-medium mb-3">Approach & Complexity</h5>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-purple-300 font-medium">Technique:</span>
                          <p className="text-gray-300">{pattern.approach.technique}</p>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-300">Time: {pattern.approach.timeComplexity}</span>
                          <span className="text-blue-300">Space: {pattern.approach.spaceComplexity}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-800/30 rounded-lg p-4">
                      <h5 className="text-white font-medium mb-3">Key Steps</h5>
                      <div className="space-y-1">
                        {pattern.keySteps.map((step, idx) => (
                          <div key={idx} className="flex items-start space-x-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                            <span className="text-gray-300">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Example Problems */}
                  <div>
                    <h4 className="text-white font-semibold mb-3">Practice Problems</h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
                      {pattern.examples.map((example, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          className="text-left justify-start bg-slate-800/20 border-slate-600/30 text-gray-300 hover:bg-slate-700/30 hover:text-white"
                        >
                          <span className="truncate">{example}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      Start Practicing
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    <Button variant="outline" className="border-slate-600 text-gray-300 hover:bg-slate-700/30">
                      View Code Templates
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Master These Patterns?</h3>
                <p className="text-gray-300 mb-6">
                  Start with Two Pointers and work your way through each pattern systematically
                </p>
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  Begin Pattern Practice
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}