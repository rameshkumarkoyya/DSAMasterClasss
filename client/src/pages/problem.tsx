import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import ProblemDescription from "@/components/problem-description";
import CodeEditor from "@/components/code-editor";
import AchievementModal from "@/components/achievement-modal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Problem() {
  const { problemId } = useParams();
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const [showAchievement, setShowAchievement] = useState(false);
  const [achievementData, setAchievementData] = useState<any>(null);
  const queryClient = useQueryClient();

  // No authentication required

  const { data: problem, isLoading: problemLoading } = useQuery({
    queryKey: [`/api/problems/${problemId}`],
    enabled: !!problemId,
  });

  const { data: submissions } = useQuery({
    queryKey: [`/api/problems/${problemId}/submissions`],
    enabled: false, // Disable auth-required endpoint
  });

  const executeMutation = useMutation({
    mutationFn: async (data: { code: string; testCases: any[] }) => {
      const response = await apiRequest("POST", "/api/execute", data);
      return await response.json();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Execution Failed",
        description: "Failed to execute code. Please try again.",
        variant: "destructive",
      });
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: { 
      code: string; 
      problemId: number; 
      topicId: number;
      difficulty: string;
      language: string;
      status: string;
      runtime?: number;
      memory?: number;
    }) => {
      const response = await apiRequest("POST", "/api/submissions", data);
      return await response.json();
    },
    onSuccess: (data) => {
      if (data.status === 'Accepted') {
        setAchievementData({
          title: "Problem Solved!",
          description: `Great job solving this ${problem?.difficulty} problem!`,
          xp: problem?.difficulty === 'Easy' ? 10 : problem?.difficulty === 'Medium' ? 25 : 50,
        });
        setShowAchievement(true);
      }
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: [`/api/problems/${problemId}/submissions`] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Submission Failed",
        description: "Failed to submit code. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleRunCode = (code: string) => {
    if (!problem?.testCases) return;
    
    executeMutation.mutate({
      code,
      testCases: problem.testCases,
    });
  };

  const handleSubmitCode = (code: string) => {
    if (!problem) return;

    // First execute the code
    executeMutation.mutate({
      code,
      testCases: problem.testCases || [],
    }, {
      onSuccess: (result) => {
        // Then submit based on execution result
        submitMutation.mutate({
          code,
          problemId: problem.id,
          topicId: problem.topicId,
          difficulty: problem.difficulty,
          language: "java",
          status: result.status,
          runtime: result.runtime,
          memory: result.memory,
        });
      }
    });
  };

  if (isLoading || !isAuthenticated) {
    return <div>Loading...</div>;
  }

  if (problemLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex pt-16 min-h-screen">
          <Sidebar />
          <main className="flex-1 flex items-center justify-center">
            <div>Loading problem...</div>
          </main>
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex pt-16 min-h-screen">
          <Sidebar />
          <main className="flex-1 flex items-center justify-center">
            <div>Problem not found</div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex pt-16 min-h-screen">
        <Sidebar />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Problem Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-semibold text-gray-900">{problem.title}</h1>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  problem.difficulty === 'Easy' 
                    ? 'bg-green-50 text-green-600'
                    : problem.difficulty === 'Medium' 
                    ? 'bg-yellow-50 text-yellow-600'
                    : 'bg-red-50 text-red-600'
                }`}>
                  {problem.difficulty}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">👍 {problem.likes || 0}</span>
                  <span className="text-sm text-gray-600">👎 {problem.dislikes || 0}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex">
            <ProblemDescription problem={problem} />
            <CodeEditor 
              problem={problem}
              onRunCode={handleRunCode}
              onSubmitCode={handleSubmitCode}
              isRunning={executeMutation.isPending}
              isSubmitting={submitMutation.isPending}
              executionResult={executeMutation.data}
            />
          </div>
        </main>
      </div>

      <AchievementModal 
        isOpen={showAchievement}
        onClose={() => setShowAchievement(false)}
        achievement={achievementData}
      />
    </div>
  );
}
