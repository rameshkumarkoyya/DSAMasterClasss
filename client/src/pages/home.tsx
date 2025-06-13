import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, Target, Trophy, Clock } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex pt-16 min-h-screen">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6 pt-6">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back to CodeMaster!
              </h1>
              <p className="text-gray-600">
                Continue your DSA learning journey and master coding interviews.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Problems Solved
                  </CardTitle>
                  <Target className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.solvedProblems}
                  </div>
                  <p className="text-xs text-gray-600">
                    of {stats.totalProblems} total problems
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Current Level
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.level}
                  </div>
                  <p className="text-xs text-gray-600">
                    {stats.totalXP} XP earned
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Topics Completed
                  </CardTitle>
                  <Trophy className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.completedTopics}
                  </div>
                  <p className="text-xs text-gray-600">
                    of {Array.isArray(topics) ? topics.length : 6} topics
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Overall Progress
                  </CardTitle>
                  <Clock className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {progressPercentage}%
                  </div>
                  <Progress value={progressPercentage} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Recommendations */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Continue Learning */}
              <Card>
                <CardHeader>
                  <CardTitle>Continue Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  {topicsLoading ? (
                    <div>Loading topics...</div>
                  ) : (
                    <div className="space-y-4">
                      {Array.isArray(topics) ? topics.slice(0, 3).map((topic: any) => (
                        <div key={topic.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-primary text-sm font-semibold">
                                {topic.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{topic.name}</h4>
                              <p className="text-sm text-gray-600">{topic.description}</p>
                            </div>
                          </div>
                          <Badge variant="outline">
                            Continue
                          </Badge>
                        </div>
                      )) : (
                        <div className="text-gray-500">No topics available</div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Learning Path */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border border-blue-200 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-1">
                        Master Array Algorithms
                      </h4>
                      <p className="text-sm text-blue-700 mb-2">
                        Complete sliding window and two-pointer problems
                      </p>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        Recommended
                      </Badge>
                    </div>
                    
                    <div className="p-3 border border-green-200 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-1">
                        Explore Linked Lists
                      </h4>
                      <p className="text-sm text-green-700 mb-2">
                        Learn pointer manipulation and list operations
                      </p>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        Next Topic
                      </Badge>
                    </div>

                    <div className="p-3 border border-purple-200 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-purple-900 mb-1">
                        Practice Mock Interviews
                      </h4>
                      <p className="text-sm text-purple-700 mb-2">
                        Test your skills with timed coding challenges
                      </p>
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
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
