import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Send, Maximize2, Loader2, CheckCircle, XCircle, Clock, Zap, BookOpen, Code, Lightbulb } from "lucide-react";

interface CodeEditorProps {
  problem: any;
  onRunCode: (code: string) => void;
  onSubmitCode: (code: string) => void;
  isRunning: boolean;
  isSubmitting: boolean;
  executionResult?: any;
}

export default function CodeEditor({ 
  problem, 
  onRunCode, 
  onSubmitCode, 
  isRunning, 
  isSubmitting, 
  executionResult 
}: CodeEditorProps) {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("java");
  const [activeTab, setActiveTab] = useState("problem");
  const [editorTab, setEditorTab] = useState("code");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (problem) {
      setCode(getJavaStarterCode(problem));
    }
  }, [problem]);

  function getDefaultCode() {
    return `import java.util.*;
import java.util.stream.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
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
}`;
  }

  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
  };

  const insertCodeSnippet = (snippet: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newCode = code.substring(0, start) + snippet + code.substring(end);
    setCode(newCode);
    
    // Focus back to textarea after insertion
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + snippet.length, start + snippet.length);
    }, 0);
  };

  const javaSnippets = [
    { name: "HashMap", code: "Map<Integer, Integer> map = new HashMap<>();" },
    { name: "ArrayList", code: "List<Integer> list = new ArrayList<>();" },
    { name: "Arrays.sort", code: "Arrays.sort(arr);" },
    { name: "For Loop", code: "for (int i = 0; i < arr.length; i++) {\n    \n}" },
    { name: "While Loop", code: "while (condition) {\n    \n}" },
    { name: "StringBuilder", code: "StringBuilder sb = new StringBuilder();" }
  ];

  const getSolutionContent = (problem: any) => {
    if (!problem) return <p>Loading solution...</p>;

    const solutionApproaches: any = {
      "Two Sum": {
        title: "Hash Map Approach",
        description: "Use a hash map to store numbers and their indices for O(1) lookup time.",
        algorithm: [
          "Create a hash map to store number → index mapping",
          "For each number in the array:",
          "• Calculate the complement (target - current number)",
          "• Check if complement exists in the hash map",
          "• If found, return both indices",
          "• If not found, add current number and index to hash map"
        ]
      },
      "3Sum": {
        title: "Two Pointers Approach",
        description: "Sort the array and use two pointers technique to find triplets that sum to zero.",
        algorithm: [
          "Sort the array to enable two pointers technique",
          "For each element as the first element:",
          "• Use two pointers (left and right) for the remaining array",
          "• If sum equals target, add to result and move both pointers",
          "• If sum is less than target, move left pointer right",
          "• If sum is greater than target, move right pointer left",
          "• Skip duplicates to avoid duplicate triplets"
        ]
      },
      "3Sum Closest": {
        title: "Two Pointers with Closest Sum Tracking",
        description: "Similar to 3Sum but track the closest sum to target instead of exact matches.",
        algorithm: [
          "Sort the array for two pointers technique",
          "Initialize closest sum with first three elements",
          "For each element as the first element:",
          "• Use two pointers for remaining elements",
          "• Calculate current sum and compare with target",
          "• Update closest sum if current is closer to target",
          "• Move pointers based on sum comparison with target"
        ]
      },
      "Merge Intervals": {
        title: "Sort and Merge Approach",
        description: "Sort intervals by start time and merge overlapping intervals iteratively.",
        algorithm: [
          "Sort intervals by their start times",
          "Initialize result with first interval",
          "For each subsequent interval:",
          "• If it overlaps with last merged interval, merge them",
          "• Otherwise, add it as a new interval to result",
          "Return the merged intervals"
        ]
      }
    };

    const solution = solutionApproaches[problem.title] || {
      title: "Algorithm Approach",
      description: `Solve ${problem.title} using ${problem.pattern} pattern.`,
      algorithm: problem.hints || ["Analyze the problem requirements", "Choose appropriate data structures", "Implement step by step"]
    };

    return (
      <>
        <h3 className="text-lg font-semibold text-white mb-3">{solution.title}</h3>
        <p className="mb-4">{solution.description}</p>
        
        <h4 className="font-semibold text-white mb-2">Algorithm:</h4>
        <ol className="space-y-2 ml-4">
          {solution.algorithm.map((step: string, index: number) => (
            <li key={index} className={step.startsWith('•') ? 'ml-4' : ''}>{step}</li>
          ))}
        </ol>
      </>
    );
  };

  const getJavaStarterCode = (problem: any) => {
    if (!problem) return getDefaultCode();

    const javaCodeMap: any = {
      "Two Sum": `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
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
      "3Sum": `import java.util.*;

class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        // Write your solution here
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(nums);
        
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i-1]) continue;
            
            int left = i + 1, right = nums.length - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    while (left < right && nums[left] == nums[left+1]) left++;
                    while (left < right && nums[right] == nums[right-1]) right--;
                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        
        return result;
    }
}`,
      "3Sum Closest": `import java.util.*;

class Solution {
    public int threeSumClosest(int[] nums, int target) {
        // Write your solution here
        Arrays.sort(nums);
        int closestSum = nums[0] + nums[1] + nums[2];
        
        for (int i = 0; i < nums.length - 2; i++) {
            int left = i + 1, right = nums.length - 1;
            
            while (left < right) {
                int currentSum = nums[i] + nums[left] + nums[right];
                
                if (Math.abs(currentSum - target) < Math.abs(closestSum - target)) {
                    closestSum = currentSum;
                }
                
                if (currentSum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        
        return closestSum;
    }
}`,
      "Merge Intervals": `import java.util.*;

class Solution {
    public int[][] merge(int[][] intervals) {
        // Write your solution here
        if (intervals.length <= 1) return intervals;
        
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
        List<int[]> result = new ArrayList<>();
        int[] current = intervals[0];
        
        for (int i = 1; i < intervals.length; i++) {
            if (current[1] >= intervals[i][0]) {
                current[1] = Math.max(current[1], intervals[i][1]);
            } else {
                result.add(current);
                current = intervals[i];
            }
        }
        result.add(current);
        
        return result.toArray(new int[result.size()][]);
    }
}`
    };

    return javaCodeMap[problem.title] || problem.starterCode || getDefaultCode();
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border-b border-slate-700/50">
          <TabsTrigger value="problem" className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4" />
            <span>Problem</span>
          </TabsTrigger>
          <TabsTrigger value="solution" className="flex items-center space-x-2">
            <Lightbulb className="h-4 w-4" />
            <span>Solution</span>
          </TabsTrigger>
          <TabsTrigger value="complexity" className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>Complexity</span>
          </TabsTrigger>
          <TabsTrigger value="code" className="flex items-center space-x-2">
            <Code className="h-4 w-4" />
            <span>Code Editor</span>
          </TabsTrigger>
        </TabsList>

        {/* Problem Tab */}
        <TabsContent value="problem" className="flex-1 p-6">
          <ScrollArea className="h-full">
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">{problem?.title}</h1>
                <div className="flex items-center space-x-3 mb-4">
                  <Badge className={`${
                    problem?.difficulty === 'Easy' ? 'bg-green-600' :
                    problem?.difficulty === 'Medium' ? 'bg-yellow-600' : 'bg-red-600'
                  }`}>
                    {problem?.difficulty}
                  </Badge>
                  <Badge variant="outline" className="text-purple-400 border-purple-500">
                    {problem?.pattern}
                  </Badge>
                  {problem?.leetcodeUrl && (
                    <a 
                      href={problem.leetcodeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-orange-400 hover:text-orange-300 text-sm"
                    >
                      View on LeetCode
                    </a>
                  )}
                </div>
              </div>

              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Problem Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {problem?.description}
                  </div>
                </CardContent>
              </Card>

              {problem?.examples && problem.examples.length > 0 && (
                <Card className="bg-slate-800/50 border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">Examples</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {problem.examples.map((example: any, index: number) => (
                      <div key={index} className="bg-slate-900/50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-white mb-2">Example {index + 1}:</p>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-400">Input:</span>
                            <code className="ml-2 text-blue-400">{example.input}</code>
                          </div>
                          <div>
                            <span className="text-gray-400">Output:</span>
                            <code className="ml-2 text-green-400">{example.output}</code>
                          </div>
                          {example.explanation && (
                            <div>
                              <span className="text-gray-400">Explanation:</span>
                              <span className="ml-2 text-gray-300">{example.explanation}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {problem?.constraints && (
                <Card className="bg-slate-800/50 border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">Constraints</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-gray-300 whitespace-pre-line">
                      {problem.constraints}
                    </div>
                  </CardContent>
                </Card>
              )}

              {problem?.hints && problem.hints.length > 0 && (
                <Card className="bg-slate-800/50 border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">Hints</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-gray-300 space-y-2">
                      {problem.hints.map((hint: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="text-yellow-400 mr-2">💡</span>
                          <span>{hint}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Solution Tab */}
        <TabsContent value="solution" className="flex-1 p-6">
          <ScrollArea className="h-full">
            <div className="max-w-4xl mx-auto space-y-6">
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Solution Approach</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-gray-300">
                    {getSolutionContent(problem)}
                  </div>
                </CardContent>
              </Card>

              {problem?.solutionWalkthrough && (
                <Card className="bg-slate-800/50 border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">Step-by-Step Walkthrough</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-gray-300 whitespace-pre-line">
                      {problem.solutionWalkthrough}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Complexity Tab */}
        <TabsContent value="complexity" className="flex-1 p-6">
          <ScrollArea className="h-full">
            <div className="max-w-4xl mx-auto space-y-6">
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-blue-400" />
                    <span>Time Complexity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-2xl font-bold text-green-400">O(n)</div>
                    <p className="text-gray-300">
                      We traverse the array only once. Each lookup and insertion in the hash map takes O(1) time on average.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-purple-400" />
                    <span>Space Complexity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-2xl font-bold text-blue-400">O(n)</div>
                    <p className="text-gray-300">
                      In the worst case, we store all n elements in the hash map before finding the solution.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Complexity Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="text-left py-2 text-white">Approach</th>
                          <th className="text-left py-2 text-white">Time</th>
                          <th className="text-left py-2 text-white">Space</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-300">
                        <tr>
                          <td className="py-2">Brute Force</td>
                          <td className="py-2 text-red-400">O(n²)</td>
                          <td className="py-2 text-green-400">O(1)</td>
                        </tr>
                        <tr>
                          <td className="py-2">Hash Map</td>
                          <td className="py-2 text-green-400">O(n)</td>
                          <td className="py-2 text-blue-400">O(n)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Code Editor Tab */}
        <TabsContent value="code" className="flex-1 flex flex-col">
          <div className="flex-1 flex">
            {/* Code Editor */}
            <div className="flex-1 flex flex-col">
              {/* Editor Header */}
              <div className="flex items-center justify-between p-4 bg-slate-800/50 border-b border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-32 bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                    </SelectContent>
                  </Select>
                  <Maximize2 className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-300" />
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRunCode(code)}
                    disabled={isRunning}
                    className="flex items-center space-x-2 bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                  >
                    {isRunning ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                    <span>Run</span>
                  </Button>
                  
                  <Button
                    size="sm"
                    onClick={() => onSubmitCode(code)}
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    <span>Submit</span>
                  </Button>
                </div>
              </div>

              {/* Code Input */}
              <div className="flex-1 flex flex-col">
                <textarea
                  ref={textareaRef}
                  value={code}
                  onChange={handleCodeChange}
                  className="flex-1 w-full p-4 font-mono text-sm border-none outline-none resize-none bg-slate-900 text-white"
                  placeholder="Write your Java code here..."
                  spellCheck={false}
                  style={{ tabSize: 4 }}
                />
              </div>

              {/* Test Results */}
              <div className="h-48 border-t border-slate-700/50 bg-slate-800/30">
                <Tabs value={editorTab} onValueChange={setEditorTab} className="h-full flex flex-col">
                  <TabsList className="bg-slate-800/50">
                    <TabsTrigger value="code">Console</TabsTrigger>
                    <TabsTrigger value="results">Test Results</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="code" className="flex-1 p-4">
                    <div className="text-gray-400 text-sm">
                      Console output will appear here when you run your code...
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="results" className="flex-1 p-4 overflow-y-auto">
                    {executionResult ? (
                      <div className="space-y-4 text-sm">
                        {/* Overall Result */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {executionResult.success ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span className={`font-medium ${
                              executionResult.success ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {executionResult.output}
                            </span>
                          </div>
                          <div className="text-gray-400">
                            {executionResult.passedTests}/{executionResult.totalTests} passed
                          </div>
                        </div>

                        {/* Performance Stats */}
                        {executionResult.runtime && (
                          <div className="flex items-center space-x-4 text-xs text-gray-400 border-b border-slate-700/50 pb-2">
                            <span>Runtime: {executionResult.runtime}ms</span>
                            <span>Memory: {executionResult.memory}MB</span>
                          </div>
                        )}

                        {/* Test Cases */}
                        {executionResult.testResults && executionResult.testResults.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="text-white font-medium">Test Cases:</h4>
                            {executionResult.testResults.map((test: any, index: number) => (
                              <div key={index} className="bg-slate-900/50 rounded p-3 space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-400">Test Case {test.testCase}</span>
                                  <div className="flex items-center space-x-1">
                                    {test.passed ? (
                                      <CheckCircle className="h-3 w-3 text-green-500" />
                                    ) : (
                                      <XCircle className="h-3 w-3 text-red-500" />
                                    )}
                                    <span className={test.passed ? 'text-green-400' : 'text-red-400'}>
                                      {test.passed ? 'PASS' : 'FAIL'}
                                    </span>
                                    <span className="text-gray-500 text-xs">
                                      ({test.executionTime}ms)
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="space-y-1 text-xs">
                                  <div>
                                    <span className="text-gray-400">Input:</span>
                                    <code className="ml-2 text-blue-400">{test.input}</code>
                                  </div>
                                  <div>
                                    <span className="text-gray-400">Expected:</span>
                                    <code className="ml-2 text-green-400">{test.expectedOutput}</code>
                                  </div>
                                  <div>
                                    <span className="text-gray-400">Output:</span>
                                    <code className={`ml-2 ${test.passed ? 'text-green-400' : 'text-red-400'}`}>
                                      {test.actualOutput}
                                    </code>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-gray-400 text-sm">
                        Run your code to see test results here...
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Code Snippets Sidebar */}
            <div className="w-64 bg-slate-800/30 border-l border-slate-700/50 p-4">
              <h3 className="text-white font-semibold mb-3">Java Snippets</h3>
              <div className="space-y-2">
                {javaSnippets.map((snippet, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left text-gray-300 hover:text-white hover:bg-slate-700/50"
                    onClick={() => insertCodeSnippet(snippet.code)}
                  >
                    {snippet.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}