import { useState, useEffect } from 'react';
import keycloak from '@/lib/keycloak';

export function useKeycloak() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const initKeycloak = async () => {
      try {
        const authenticated = await keycloak.init({
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
        });

        setIsAuthenticated(authenticated);
        
        if (authenticated) {
          const profile = await keycloak.loadUserProfile();
          setUser({
            id: keycloak.subject,
            email: profile.email,
            firstName: profile.firstName,
            lastName: profile.lastName,
            username: profile.username
          });
        }
      } catch (error) {
        console.error('Keycloak initialization failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initKeycloak();
  }, []);

  const login = () => {
    keycloak.login();
  };

  const logout = () => {
    keycloak.logout();
  };

  const register = () => {
    keycloak.register();
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    register,
    keycloak
  };
}