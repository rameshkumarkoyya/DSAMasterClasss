import { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/queryClient';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export function useSimpleAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/auth/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('auth_token');
      }
    } catch (error) {
      localStorage.removeItem('auth_token');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await apiRequest('POST', '/api/auth/login', {
        email,
        password
      });

      const data = await response.json();
      localStorage.setItem('auth_token', data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      
      // Force page reload to ensure clean state update
      setTimeout(() => {
        window.location.reload();
      }, 100);
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const register = async (email: string, password: string, firstName: string, lastName?: string) => {
    try {
      const response = await apiRequest('POST', '/api/auth/register', {
        email,
        password,
        firstName,
        lastName
      });

      const data = await response.json();
      localStorage.setItem('auth_token', data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      
      // Force page reload to ensure clean state update
      setTimeout(() => {
        window.location.reload();
      }, 100);
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    setIsAuthenticated(false);
    // Force a page reload to ensure clean state
    window.location.reload();
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout
  };
}