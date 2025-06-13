import session from 'express-session';
import Keycloak from 'keycloak-connect';
import type { Express } from 'express';
import { storage } from './storage';

let memoryStore = new session.MemoryStore();

export function setupKeycloakAuth(app: Express) {
  // Session configuration
  app.use(session({
    secret: process.env.SESSION_SECRET || 'keycloak-session-secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));

  // Keycloak configuration
  const keycloakConfig = {
    realm: process.env.KEYCLOAK_REALM || 'dsa-platform',
    'auth-server-url': process.env.KEYCLOAK_URL || 'http://localhost:8080/auth/',
    'ssl-required': 'external',
    resource: process.env.KEYCLOAK_CLIENT_ID || 'dsa-app',
    'public-client': true,
    'confidential-port': 0
  };

  const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

  // Initialize Keycloak middleware
  app.use(keycloak.middleware({
    logout: '/logout',
    admin: '/'
  }));

  // Authentication routes
  app.get('/login', keycloak.protect(), (req, res) => {
    res.redirect('/');
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // Protected API middleware
  app.use('/api/protected', keycloak.protect());

  // User sync middleware
  app.use(async (req: any, res, next) => {
    if (req.kauth && req.kauth.grant && req.kauth.grant.access_token) {
      const token = req.kauth.grant.access_token;
      const userInfo = token.content;
      
      // Sync user to database
      try {
        await storage.upsertUser({
          id: userInfo.sub,
          email: userInfo.email,
          firstName: userInfo.given_name,
          lastName: userInfo.family_name,
          profileImageUrl: userInfo.picture || null
        });
      } catch (error) {
        console.error('Error syncing user:', error);
      }
    }
    next();
  });

  return keycloak;
}