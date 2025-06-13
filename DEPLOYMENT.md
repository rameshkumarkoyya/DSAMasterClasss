# Deployment Guide

## Quick Start (Recommended)

### Option 1: Docker (Easiest)
If you have Docker installed:

```bash
git clone <repository-url>
cd dsa-learning-platform
docker-compose up --build
```

This will automatically:
- Set up PostgreSQL database
- Install all dependencies
- Run database migrations
- Seed sample data
- Start the application on http://localhost:5000

### Option 2: Local Setup

1. **Prerequisites**
   - Node.js 18 or higher
   - PostgreSQL database

2. **Clone and setup**
   ```bash
   git clone <repository-url>
   cd dsa-learning-platform
   ./start.sh
   ```

3. **Manual setup (if start.sh doesn't work)**
   ```bash
   # Install dependencies
   npm install
   
   # Copy environment file
   cp .env.example .env
   
   # Edit .env with your database credentials
   nano .env
   
   # Setup database
   npm run db:push
   npx tsx server/seed.ts
   
   # Start application
   npm run dev
   ```

## Environment Configuration

Update your `.env` file with your PostgreSQL connection details:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/dsa_platform
PGHOST=localhost
PGPORT=5432
PGUSER=username
PGPASSWORD=password
PGDATABASE=dsa_platform
SESSION_SECRET=your-secure-session-secret
NODE_ENV=development
```

## Database Setup

The application automatically creates all necessary tables and seeds sample data including:
- 6 DSA topics (Arrays, Linked Lists, Trees, etc.)
- 12+ coding problems with test cases
- Sample user progress data

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check DATABASE_URL format: `postgresql://user:password@host:port/database`
- Verify database exists and user has proper permissions

### Port Already in Use
If port 5000 is occupied, the application will automatically use the next available port.

### Missing Dependencies
Run `npm install` to ensure all packages are installed.

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production` in your environment
2. Use a secure `SESSION_SECRET`
3. Configure your production database
4. Run `npm run build` to build optimized assets
5. Use a process manager like PM2 or deploy to platforms like Heroku, Railway, or Vercel