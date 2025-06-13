import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, Target, Trophy, Clock, BookOpen, Zap, Award } from "lucide-react";

export default function Home() {
  // Demo stats without authentication
  const stats = {
    solvedProblems: 3,
    totalProblems: 20,
    completedTopics: 1,
    level: 2,
    totalXP: 75
  };

  const { data: topics, isLoading: topicsLoading } = useQuery({
    queryKey: ["/api/topics"],
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const progressPercentage = Math.round((stats.solvedProblems / stats.totalProblems) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <Header />
      <div className="flex pt-16 min-h-screen">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6 pt-6">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/50 via-blue-900/50 to-purple-900/50 border border-purple-500/20 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10"></div>
                <div className="relative p-8">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                    Welcome back to CodeMaster!
                  </h1>
                  <p className="text-gray-300 text-lg">
                    Continue your DSA learning journey and master coding interviews.
                  </p>
                  <div className="mt-6 flex space-x-4">
                    <div className="px-4 py-2 bg-purple-600/20 rounded-lg border border-purple-500/30">
                      <span className="text-purple-300 text-sm">🎯 Daily Challenge</span>
                    </div>
                    <div className="px-4 py-2 bg-blue-600/20 rounded-lg border border-blue-500/30">
                      <span className="text-blue-300 text-sm">🔥 7 Day Streak</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <Card className="relative bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">
                      Problems Solved
                    </CardTitle>
                    <Target className="h-4 w-4 text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">
                      {stats.solvedProblems}
                    </div>
                    <p className="text-xs text-gray-400">
                      of {stats.totalProblems} total problems
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <Card className="relative bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">
                      Current Level
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">
                      {stats.level}
                    </div>
                    <p className="text-xs text-gray-400">
                      {stats.totalXP} XP earned
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <Card className="relative bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">
                      Topics Completed
                    </CardTitle>
                    <Trophy className="h-4 w-4 text-yellow-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">
                      {stats.completedTopics}
                    </div>
                    <p className="text-xs text-gray-400">
                      of {Array.isArray(topics) ? topics.length : 6} topics
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <Card className="relative bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">
                      Overall Progress
                    </CardTitle>
                    <Clock className="h-4 w-4 text-purple-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">
                      {progressPercentage}%
                    </div>
                    <Progress value={progressPercentage} className="mt-2 bg-slate-700" />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Recent Activity & Recommendations */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Continue Learning */}
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-purple-400" />
                    <span>Continue Learning</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {topicsLoading ? (
                    <div className="text-gray-400">Loading topics...</div>
                  ) : (
                    <div className="space-y-4">
                      {Array.isArray(topics) ? topics.slice(0, 3).map((topic: any) => (
                        <div key={topic.id} className="flex items-center justify-between p-3 border border-slate-600/50 rounded-lg hover:bg-slate-700/50 hover:border-purple-500/30 transition-all duration-200 group">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                              <span className="text-purple-300 text-sm font-semibold">
                                {topic.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-medium text-white group-hover:text-purple-300 transition-colors">{topic.name}</h4>
                              <p className="text-sm text-gray-400">{topic.description}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20">
                            Continue
                          </Badge>
                        </div>
                      )) : (
                        <div className="text-gray-400">No topics available</div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Learning Path */}
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    <span>Recommended Next Steps</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border border-blue-500/30 bg-blue-900/20 rounded-lg hover:bg-blue-900/30 transition-all duration-200 group">
                      <h4 className="font-medium text-blue-300 mb-1 group-hover:text-blue-200">
                        Master Array Algorithms
                      </h4>
                      <p className="text-sm text-gray-400 mb-2">
                        Complete sliding window and two-pointer problems
                      </p>
                      <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30 hover:bg-blue-600/30">
                        Recommended
                      </Badge>
                    </div>
                    
                    <div className="p-3 border border-green-500/30 bg-green-900/20 rounded-lg hover:bg-green-900/30 transition-all duration-200 group">
                      <h4 className="font-medium text-green-300 mb-1 group-hover:text-green-200">
                        Explore Linked Lists
                      </h4>
                      <p className="text-sm text-gray-400 mb-2">
                        Learn pointer manipulation and list operations
                      </p>
                      <Badge className="bg-green-600/20 text-green-300 border-green-500/30 hover:bg-green-600/30">
                        Next Topic
                      </Badge>
                    </div>

                    <div className="p-3 border border-purple-500/30 bg-purple-900/20 rounded-lg hover:bg-purple-900/30 transition-all duration-200 group">
                      <h4 className="font-medium text-purple-300 mb-1 group-hover:text-purple-200">
                        Practice Mock Interviews
                      </h4>
                      <p className="text-sm text-gray-400 mb-2">
                        Test your skills with timed coding challenges
                      </p>
                      <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30 hover:bg-purple-600/30">
                        Challenge
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
