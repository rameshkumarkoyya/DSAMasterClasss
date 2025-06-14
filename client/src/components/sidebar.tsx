import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, List, Link, Layers, GitBranch } from "lucide-react";
import { useLocation } from "wouter";

const topicIcons: Record<string, any> = {
  'Arrays': List,
  'Linked Lists': Link,
  'Stacks & Queues': Layers,
  'Trees & Graphs': GitBranch,
};

export default function Sidebar() {
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([1]));
  const [expandedPatterns, setExpandedPatterns] = useState<Set<string>>(new Set(['Two Pointers']));
  const [, setLocation] = useLocation();

  const { data: topics, isLoading: topicsLoading } = useQuery({
    queryKey: ["/api/topics"],
  });

  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
  });

  const { data: progress } = useQuery({
    queryKey: ["/api/progress"],
  });

  const toggleTopic = (topicId: number) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId);
    } else {
      newExpanded.add(topicId);
    }
    setExpandedTopics(newExpanded);
  };

  const togglePattern = (pattern: string) => {
    const newExpanded = new Set(expandedPatterns);
    if (newExpanded.has(pattern)) {
      newExpanded.delete(pattern);
    } else {
      newExpanded.add(pattern);
    }
    setExpandedPatterns(newExpanded);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-900/20 text-green-400 border-green-500/30';
      case 'Medium':
        return 'bg-yellow-900/20 text-yellow-400 border-yellow-500/30';
      case 'Hard':
        return 'bg-red-900/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-900/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTopicProgress = (topicId: number) => {
    if (!progress) return { completed: 0, total: 0 };
    
    const topicProgress = progress.filter((p: any) => p.topicId === topicId);
    const completed = topicProgress.filter((p: any) => p.completed).length;
    const total = topicProgress.length;
    
    return { completed, total };
  };

  const progressPercentage = stats ? Math.round((stats.solvedProblems / stats.totalProblems) * 100) : 0;

  if (topicsLoading) {
    return (
      <aside className="w-80 bg-white shadow-sm border-r border-gray-200">
        <div className="p-6">
          <div>Loading topics...</div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-80 bg-white shadow-sm border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Learning Path</h2>
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Progress</span>
              <span className="text-sm text-primary font-medium">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="mb-2" />
            <p className="text-xs text-gray-600">
              {stats?.solvedProblems || 0} problems solved • {stats?.completedTopics || 0} topics completed
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {topics?.map((topic: any) => {
            const { completed, total } = getTopicProgress(topic.id);
            const isExpanded = expandedTopics.has(topic.id);
            const IconComponent = topicIcons[topic.name] || List;
            
            return (
              <div key={topic.id} className="border border-gray-200 rounded-lg">
                <Button
                  variant="ghost"
                  className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 h-auto"
                  onClick={() => toggleTopic(topic.id)}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent className={`h-5 w-5 ${completed === total && total > 0 ? 'text-green-500' : 'text-gray-400'}`} />
                    <div>
                      <h3 className="font-medium text-gray-900">{topic.name}</h3>
                      <p className="text-xs text-gray-600">
                        {completed}/{total} problems completed
                      </p>
                    </div>
                  </div>
                  {isExpanded ? 
                    <ChevronDown className="h-4 w-4 text-gray-400" /> : 
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  }
                </Button>
                
                {isExpanded && (
                  <div className="px-4 pb-3 space-y-1">
                    {/* Sample problems - in a real app, you'd fetch these */}
                    <SampleProblems 
                      topicId={topic.id} 
                      onProblemClick={setLocation}
                      expandedPatterns={expandedPatterns}
                      togglePattern={togglePattern}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

function SampleProblems({ 
  topicId, 
  onProblemClick, 
  expandedPatterns, 
  togglePattern 
}: { 
  topicId: number; 
  onProblemClick: (path: string) => void;
  expandedPatterns: Set<string>;
  togglePattern: (pattern: string) => void;
}) {
  const { data: problems } = useQuery({
    queryKey: [`/api/topics/${topicId}/problems`],
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-900/20 text-green-400 border-green-500/30';
      case 'Medium':
        return 'bg-yellow-900/20 text-yellow-400 border-yellow-500/30';
      case 'Hard':
        return 'bg-red-900/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-900/20 text-gray-400 border-gray-500/30';
    }
  };

  if (!problems || problems.length === 0) {
    return (
      <div className="px-3 py-2 text-sm text-gray-400">
        No problems available
      </div>
    );
  }

  // Group problems by pattern
  const groupedProblems = problems.reduce((acc: any, problem: any) => {
    const pattern = problem.pattern || 'Other';
    if (!acc[pattern]) acc[pattern] = [];
    acc[pattern].push(problem);
    return acc;
  }, {});

  const patternOrder = ['Two Pointers', 'Merge Intervals', 'Sorting', 'Sliding Window', 'Prefix Sums', 'Other'];
  
  const getPatternIcon = (pattern: string) => {
    switch (pattern) {
      case 'Two Pointers': return '🔄';
      case 'Merge Intervals': return '📊';
      case 'Sorting': return '📈';
      case 'Sliding Window': return '🪟';
      case 'Prefix Sums': return '🧮';
      default: return '📝';
    }
  };

  const getPatternHighlight = (pattern: string) => {
    switch (pattern) {
      case 'Two Pointers': return 'text-blue-400';
      case 'Merge Intervals': return 'text-green-400';
      case 'Sorting': return 'text-purple-400';
      case 'Sliding Window': return 'text-orange-400';
      case 'Prefix Sums': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-3">
      {patternOrder.map(pattern => {
        const patternProblems = groupedProblems[pattern];
        if (!patternProblems || patternProblems.length === 0) return null;

        return (
          <div key={pattern} className="bg-slate-800/50 rounded-lg border border-slate-700/50 backdrop-blur-sm p-3">
            <div 
              className="flex items-center space-x-2 mb-2 cursor-pointer hover:bg-slate-700/30 rounded p-2 -m-2"
              onClick={() => togglePattern(pattern)}
            >
              {expandedPatterns.has(pattern) ? (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-400" />
              )}
              <span className="text-sm">{getPatternIcon(pattern)}</span>
              <h4 className={`font-semibold text-sm ${getPatternHighlight(pattern)}`}>{pattern}</h4>
              <Badge variant="outline" className="text-xs bg-slate-700/40 text-gray-300 border-slate-600/40">
                {patternProblems.length}
              </Badge>
            </div>
            {expandedPatterns.has(pattern) && (
              <div className="space-y-1 ml-6">
                {patternProblems.map((problem: any) => (
                  <Button
                    key={problem.id}
                    variant="ghost"
                    className="w-full px-3 py-2 text-xs text-left flex items-center justify-between hover:bg-slate-700/40 h-auto bg-slate-800/30 rounded-md transition-all duration-200"
                    onClick={() => onProblemClick(`/problems/${problem.id}`)}
                  >
                    <span className="text-gray-300 font-medium truncate">{problem.title}</span>
                    <Badge
                      variant="outline"
                      className={`text-xs ${getDifficultyColor(problem.difficulty)} ml-2 flex-shrink-0`}
                    >
                      {problem.difficulty}
                    </Badge>
                  </Button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
