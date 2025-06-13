import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Code, Search, Bell } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Header() {
  // Demo user data without authentication
  const user = {
    firstName: "Demo",
    lastName: "User",
    email: "demo@example.com",
    profileImageUrl: null
  };
  
  // Demo stats without authentication
  const stats = {
    level: 2,
    totalXP: 75
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase() || 'U';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <Code className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-gray-900">CodeMaster</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-primary font-medium border-b-2 border-primary pb-4">
                DSA Topics
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 pb-4">
                Problems
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 pb-4">
                System Design
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 pb-4">
                Mock Interviews
              </a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:block relative">
              <Input
                type="text"
                placeholder="Search topics, problems..."
                className="w-80 pl-10"
              />
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  3
                </Badge>
              </Button>
              
              <div className="h-6 w-px bg-gray-300"></div>
              
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.profileImageUrl || undefined} />
                  <AvatarFallback className="bg-primary text-white text-sm">
                    {getInitials(user?.firstName, user?.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.firstName && user?.lastName 
                      ? `${user.firstName} ${user.lastName}`
                      : user?.email || 'User'
                    }
                  </p>
                  <p className="text-xs text-gray-600">
                    Level {stats?.level || 1} • {stats?.totalXP || 0} XP
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => window.location.href = '/api/logout'}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
