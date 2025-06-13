import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  const [code, setCode] = useState(problem?.starterCode || getDefaultCode());
  const [language, setLanguage] = useState("java");
  const [activeTab, setActiveTab] = useState("problem");
  const [editorTab, setEditorTab] = useState("code");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (problem?.starterCode) {
      setCode(problem.starterCode);
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

  const handleRun = () => {
    onRunCode(code);
    setActiveTab("results");
  };

  const handleSubmit = () => {
    onSubmitCode(code);
    setActiveTab("results");
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
                </div>
              </div>

              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Problem Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-300 leading-relaxed">
                    {problem?.description}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Examples</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="bg-slate-900/50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-white mb-2">Example 1:</p>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-400">Input:</span>
                          <code className="ml-2 text-blue-400">nums = [2,7,11,15], target = 9</code>
                        </div>
                        <div>
                          <span className="text-gray-400">Output:</span>
                          <code className="ml-2 text-green-400">[0,1]</code>
                        </div>
                        <div>
                          <span className="text-gray-400">Explanation:</span>
                          <span className="ml-2 text-gray-300">Because nums[0] + nums[1] == 9, we return [0, 1].</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Constraints</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-gray-300 space-y-1">
                    <li>• 2 ≤ nums.length ≤ 10⁴</li>
                    <li>• -10⁹ ≤ nums[i] ≤ 10⁹</li>
                    <li>• -10⁹ ≤ target ≤ 10⁹</li>
                    <li>• Only one valid answer exists</li>
                  </ul>
                </CardContent>
              </Card>
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
                    <h3 className="text-lg font-semibold text-white mb-3">Hash Map Approach</h3>
                    <p className="mb-4">
                      We can solve this problem efficiently using a hash map to store the numbers we've seen and their indices.
                    </p>
                    
                    <h4 className="font-semibold text-white mb-2">Algorithm:</h4>
                    <ol className="space-y-2 ml-4">
                      <li>1. Create a hash map to store number → index mapping</li>
                      <li>2. For each number in the array:</li>
                      <li className="ml-4">• Calculate the complement (target - current number)</li>
                      <li className="ml-4">• Check if complement exists in the hash map</li>
                      <li className="ml-4">• If found, return both indices</li>
                      <li className="ml-4">• If not found, add current number and index to hash map</li>
                      <li>3. Continue until solution is found</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Step-by-Step Walkthrough</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-gray-300">
                    <div className="bg-slate-900/50 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Example: nums = [2,7,11,15], target = 9</h4>
                      <div className="space-y-2 text-sm">
                        <div>Step 1: i=0, num=2, complement=7, map={} → map={2:0}</div>
                        <div>Step 2: i=1, num=7, complement=2, map={2:0} → Found! Return [0,1]</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                  
                  <TabsContent value="results" className="flex-1 p-4">
                    {executionResult ? (
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          {executionResult.success ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span className={`font-medium ${
                            executionResult.success ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {executionResult.success ? 'All tests passed!' : 'Some tests failed'}
                          </span>
                        </div>
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
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRun}
              disabled={isRunning || isSubmitting}
            >
              {isRunning ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              Run
            </Button>
            <Button 
              size="sm" 
              onClick={handleSubmit}
              disabled={isRunning || isSubmitting}
              className="bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              Submit
            </Button>
          </div>
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 bg-gray-900 text-gray-100 font-mono text-sm overflow-auto">
        <textarea
          value={code}
          onChange={handleCodeChange}
          className="w-full h-full p-4 bg-transparent resize-none focus:outline-none"
          style={{ minHeight: '400px' }}
          spellCheck={false}
        />
      </div>

      {/* Test Cases / Results */}
      <div className="bg-white border-t border-gray-200 h-48">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <TabsList className="grid w-fit grid-cols-2">
              <TabsTrigger value="testcases">Test Cases</TabsTrigger>
              <TabsTrigger value="results">Test Results</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="h-40 overflow-y-auto">
            <TabsContent value="testcases" className="p-4 mt-0">
              <div className="space-y-3">
                {problem?.testCases?.map((testCase: any, index: number) => (
                  <Card key={index} className="border border-gray-200">
                    <CardContent className="pt-3">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900 mb-1">
                          Test Case {index + 1}
                        </div>
                        <div className="text-gray-600 space-y-1">
                          <div><strong>Input:</strong> {testCase.input}</div>
                          <div><strong>Expected:</strong> {testCase.expectedOutput}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )) || (
                  <div className="text-gray-500 text-sm">No test cases available</div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="results" className="p-4 mt-0">
              {executionResult ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 mb-3">
                    {executionResult.status === 'Accepted' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <Badge 
                      variant={executionResult.status === 'Accepted' ? 'default' : 'destructive'}
                      className={executionResult.status === 'Accepted' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {executionResult.status}
                    </Badge>
                    {executionResult.runtime && (
                      <span className="text-sm text-gray-600">
                        Runtime: {executionResult.runtime}ms
                      </span>
                    )}
                    {executionResult.memory && (
                      <span className="text-sm text-gray-600">
                        Memory: {executionResult.memory}KB
                      </span>
                    )}
                  </div>
                  
                  {executionResult.results?.map((result: any, index: number) => (
                    <Card key={index} className={`border ${result.passed ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                      <CardContent className="pt-3">
                        <div className="text-sm">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">Test Case {result.testCase}</span>
                            {result.passed ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                          <div className="space-y-1 text-gray-600">
                            <div><strong>Input:</strong> {result.input}</div>
                            <div><strong>Expected:</strong> {result.expectedOutput}</div>
                            <div><strong>Actual:</strong> {result.actualOutput}</div>
                            {result.executionTime && (
                              <div><strong>Time:</strong> {result.executionTime}ms</div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-sm">
                  Run your code to see test results
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
