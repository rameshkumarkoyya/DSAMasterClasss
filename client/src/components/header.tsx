import { useSimpleAuth } from "@/hooks/useSimpleAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Code, Search, Bell } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Header() {
  const { user, logout } = useSimpleAuth();
  
  const { data: stats } = useQuery({
    queryKey: ['/api/user-stats'],
    enabled: !!user
  });

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase() || 'U';
  };

  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-lg border-b border-purple-500/20 fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Code className="h-8 w-8 text-purple-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                CodeMaster
              </span>
            </div>
            <nav className="hidden md:flex space-x-1">
              <a href="/" className="px-4 py-2 text-purple-300 font-medium bg-purple-800/50 rounded-lg border border-purple-500/30 backdrop-blur-sm hover:bg-purple-700/50 transition-all duration-200">
                DSA Topics
              </a>
              <a href="#" className="px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200">
                Problems
              </a>
              <a href="#" className="px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200">
                System Design
              </a>
              <a href="#" className="px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200">
                Mock Interviews
              </a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:block relative">
              <Input
                type="text"
                placeholder="Search topics, problems..."
                className="w-80 pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
              />
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="relative text-gray-300 hover:text-white hover:bg-slate-800/50">
                <Bell className="h-5 w-5" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 border-0"
                >
                  3
                </Badge>
              </Button>
              
              <div className="h-6 w-px bg-slate-600"></div>
              
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8 ring-2 ring-purple-400/30">
                  <AvatarImage src={user?.profileImageUrl || undefined} />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium">
                    {getInitials(user?.firstName, user?.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-white">
                    {user?.firstName && user?.lastName 
                      ? `${user.firstName} ${user.lastName}`
                      : user?.email || 'User'
                    }
                  </p>
                  <p className="text-xs text-purple-300">
                    Level {stats?.level || 1} • {stats?.totalXP || 0} XP
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={logout}
                  className="text-gray-300 hover:text-white hover:bg-red-600/20 border border-transparent hover:border-red-500/30 transition-all duration-200"
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
