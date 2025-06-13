import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, BookOpen, Trophy, Users, Zap, Target } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Code className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-gray-900">CodeMaster</span>
            </div>
            <Button 
              onClick={() => window.location.href = '/api/login'}
              className="bg-primary hover:bg-primary/90"
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Master Data Structures & 
            <span className="text-primary block">System Design</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Learn DSA concepts, solve coding problems, and ace your technical interviews 
            with our comprehensive Java-focused learning platform.
          </p>
          <Button 
            size="lg" 
            onClick={() => window.location.href = '/api/login'}
            className="bg-primary hover:bg-primary/90 text-lg px-8 py-3"
          >
            Start Learning Today
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <BookOpen className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Comprehensive Curriculum</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Complete DSA coverage from Arrays to Advanced Graph algorithms. 
                Learn with Java code examples and step-by-step explanations.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Code className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Interactive Code Editor</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Practice coding with our built-in editor. Run tests, submit solutions, 
                and get instant feedback on your Java implementations.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Trophy className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Track your learning journey with detailed progress analytics. 
                Earn XP, unlock achievements, and level up your skills.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Target className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Difficulty Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Problems categorized by difficulty from Easy to Hard. 
                Gradual progression to build confidence and mastery.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Zap className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Instant Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Get immediate results for your code submissions. 
                Detailed test case analysis and optimization hints.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Interview Preparation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Prepare for technical interviews with curated problem sets 
                and company-specific question patterns.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Level Up Your Coding Skills?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of developers who are mastering DSA with CodeMaster
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => window.location.href = '/api/login'}
            className="text-lg px-8 py-3"
          >
            Get Started Now
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Code className="h-6 w-6" />
            <span className="text-lg font-bold">CodeMaster</span>
          </div>
          <p className="text-gray-400">
            © 2024 CodeMaster. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
