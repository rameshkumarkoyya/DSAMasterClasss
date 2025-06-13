import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { useSimpleAuth } from "@/hooks/useSimpleAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import CodeEditor from "@/components/code-editor";
import AchievementModal from "@/components/achievement-modal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Problem() {
  const params = useParams();
  const problemId = params.problemId;
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useSimpleAuth();
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
    <div className="min-h-screen bg-slate-900">
      <Header />
      <div className="flex pt-16 min-h-screen">
        <Sidebar />
        
        <main className="flex-1 overflow-hidden">
          <CodeEditor 
            problem={problem}
            onRunCode={handleRunCode}
            onSubmitCode={handleSubmitCode}
            isRunning={executeMutation.isPending}
            isSubmitting={submitMutation.isPending}
            executionResult={executeMutation.data}
          />
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
