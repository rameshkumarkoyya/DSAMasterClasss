# Keycloak Setup for DSA Learning Platform

## Option 1: Docker Keycloak Setup (Recommended)

### 1. Create Keycloak Docker Compose
Add this to your `docker-compose.yml`:

```yaml
services:
  keycloak:
    image: quay.io/keycloak/keycloak:latest
    environment:
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: admin
      KC_DB: postgres
      KC_DB_URL: jdbc:postgresql://postgres:5432/keycloak
      KC_DB_USERNAME: postgres
      KC_DB_PASSWORD: password
    ports:
      - "8080:8080"
    depends_on:
      - postgres
    command: start-dev

  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: dsa_platform
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init-keycloak-db.sql:/docker-entrypoint-initdb.d/init-keycloak-db.sql
```

### 2. Create Database Initialization Script
Create `init-keycloak-db.sql`:

```sql
CREATE DATABASE keycloak;
```

### 3. Start Services
```bash
docker-compose up -d
```

### 4. Configure Keycloak

1. Open http://localhost:8080
2. Login with admin/admin
3. Create realm "dsa-platform"
4. Create client "dsa-app":
   - Client ID: dsa-app
   - Client Type: Public
   - Valid redirect URIs: http://localhost:5000/*
   - Web origins: http://localhost:5000

## Option 2: Standalone Keycloak

### Download and Run
```bash
# Download Keycloak
wget https://github.com/keycloak/keycloak/releases/download/23.0.1/keycloak-23.0.1.zip
unzip keycloak-23.0.1.zip
cd keycloak-23.0.1

# Start in development mode
./bin/kc.sh start-dev --http-port=8080
```

### Initial Setup
1. Create admin user at http://localhost:8080
2. Configure realm and client as described above

## Option 3: Simplified Auth (No External Server)

If you prefer not to set up Keycloak, I can implement a simple JWT-based authentication with local user registration and login.

## Environment Variables

Update your `.env` file:
```
KEYCLOAK_URL=http://localhost:8080/auth/
KEYCLOAK_REALM=dsa-platform
KEYCLOAK_CLIENT_ID=dsa-app
VITE_KEYCLOAK_URL=http://localhost:8080/auth/
VITE_KEYCLOAK_REALM=dsa-platform
VITE_KEYCLOAK_CLIENT_ID=dsa-app
```

## Testing

After setup, the login page will redirect to Keycloak for authentication, allowing users to register and sign in securely.