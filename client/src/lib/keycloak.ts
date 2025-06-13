import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8080/auth/',
  realm: import.meta.env.VITE_KEYCLOAK_REALM || 'dsa-platform',
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'dsa-app',
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;