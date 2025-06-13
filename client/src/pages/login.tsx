import { useEffect } from 'react';
import { useKeycloak } from '@/hooks/useKeycloak';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Code, BookOpen, Trophy } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Login() {
  const { isAuthenticated, isLoading, login, register } = useKeycloak();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      setLocation('/');
    }
  }, [isAuthenticated, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Code className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">DSA Master</h1>
          </div>
          <p className="text-gray-600">
            Master Data Structures & Algorithms with interactive coding challenges
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <BookOpen className="h-8 w-8 text-blue-600 mx-auto" />
            <p className="text-sm text-gray-600">Learn</p>
          </div>
          <div className="space-y-2">
            <Code className="h-8 w-8 text-green-600 mx-auto" />
            <p className="text-sm text-gray-600">Practice</p>
          </div>
          <div className="space-y-2">
            <Trophy className="h-8 w-8 text-yellow-600 mx-auto" />
            <p className="text-sm text-gray-600">Achieve</p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle>Welcome to DSA Master</CardTitle>
            <p className="text-sm text-gray-600">
              Sign in to track your progress and unlock achievements
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={login}
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              Sign In
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">New to DSA Master?</span>
              </div>
            </div>

            <Button 
              onClick={register}
              variant="outline"
              className="w-full"
              size="lg"
            >
              Create Account
            </Button>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="text-center space-y-2">
          <h3 className="font-semibold text-gray-900">What you'll get:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 6 comprehensive DSA topics</li>
            <li>• Interactive Java code editor</li>
            <li>• Progress tracking & achievements</li>
            <li>• Interview preparation problems</li>
          </ul>
        </div>
      </div>
    </div>
  );
}