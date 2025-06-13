import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Send, Maximize2, Loader2, CheckCircle, XCircle } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState("testcases");

  useEffect(() => {
    if (problem?.starterCode) {
      setCode(problem.starterCode);
    }
  }, [problem]);

  function getDefaultCode() {
    return `import java.util.*;

class Solution {
    public int[] solve(int[] nums, int k) {
        // Your code here
        return new int[0];
    }
}`;
  }

  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
  };

  const handleRun = () => {
    onRunCode(code);
    setActiveTab("results");
  };

  const handleSubmit = () => {
    onSubmitCode(code);
    setActiveTab("results");
  };

  return (
    <div className="w-1/2 flex flex-col">
      {/* Editor Header */}
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="sm">
              <Maximize2 className="h-4 w-4 mr-1" />
              Fullscreen
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
