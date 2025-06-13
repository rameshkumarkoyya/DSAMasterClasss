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
    const completed = topicProgress.filter((p: any) => p.isCompleted).length;
    
    return { completed, total: topicProgress.length };
  };

  if (topicsLoading) {
    return (
      <aside className="w-80 bg-slate-900/95 backdrop-blur-sm border-r border-slate-700/50 overflow-y-auto">
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-slate-700 rounded"></div>
            <div className="h-4 bg-slate-700 rounded w-3/4"></div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-80 bg-slate-900/95 backdrop-blur-sm border-r border-slate-700/50 overflow-y-auto">
      <div className="p-6">
        {/* Stats Summary */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-3">Your Progress</h2>
          <div className="space-y-1">
            <p className="text-sm text-gray-300">
              Problems Solved: <span className="text-white font-medium">{stats?.solvedProblems || 0}</span> of <span className="text-white font-medium">{stats?.totalProblems || 0}</span> total problems
            </p>
          </div>
        </div>

        {/* Topics */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Topics</h3>
            <Badge variant="outline" className="text-xs bg-slate-800/50 text-gray-400 border-slate-600/50">
              {stats?.solvedProblems || 0} solved • {stats?.completedTopics || 0} completed
            </Badge>
          </div>
          
          {topics?.map((topic: any) => {
            const isExpanded = expandedTopics.has(topic.id);
            const { completed, total } = getTopicProgress(topic.id);
            const IconComponent = topicIcons[topic.name] || List;
            
            return (
              <div key={topic.id} className="bg-slate-800/30 rounded-lg border border-slate-700/30">
                <Button
                  variant="ghost"
                  className="w-full p-4 flex items-center justify-between hover:bg-slate-700/30 h-auto"
                  onClick={() => toggleTopic(topic.id)}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent className="h-5 w-5 text-purple-400" />
                    <div className="text-left">
                      <h3 className="font-medium text-white">{topic.name}</h3>
                      <p className="text-xs text-gray-400">
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
                    <SampleProblems 
                      topicId={topic.id} 
                      onProblemClick={setLocation}
                      expandedPatterns={expandedPatterns}
                      togglePattern={togglePattern}
                      getDifficultyColor={getDifficultyColor}
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
  togglePattern,
  getDifficultyColor
}: { 
  topicId: number; 
  onProblemClick: (path: string) => void;
  expandedPatterns: Set<string>;
  togglePattern: (pattern: string) => void;
  getDifficultyColor: (difficulty: string) => string;
}) {
  const { data: problems } = useQuery({
    queryKey: [`/api/topics/${topicId}/problems`],
  });

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