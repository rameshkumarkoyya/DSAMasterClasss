# CodeMaster - DSA Learning Platform

A comprehensive Data Structures and Algorithms learning platform with interactive coding problems, real-time code execution, and progress tracking.

## Features

- **Interactive Problem Solving**: Over 50+ DSA problems with detailed explanations
- **Real-time Code Editor**: Java code editor with syntax highlighting and auto-completion
- **Test Case Execution**: Run code against multiple test cases with detailed feedback
- **Progress Tracking**: Monitor your learning progress and achievements
- **Authentication**: Secure user authentication with JWT tokens
- **Responsive Design**: Modern UI that works on all devices

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn/UI
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT-based authentication
- **Code Execution**: Real-time Java code execution system

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Git

### One-Command Setup

```bash
git clone <your-repo-url>
cd codemaster
npm run setup
```

This will:
1. Install all dependencies
2. Set up the database schema
3. Seed the database with problems
4. Start the development server

### Manual Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd codemaster
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your database credentials:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/codemaster
   JWT_SECRET=your-jwt-secret-key
   ```

4. **Database Setup**
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Seed database with sample data
- `npm run setup` - Complete setup (install, db setup, seed, start)

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions
├── server/                 # Express backend
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Database operations
│   └── db.ts               # Database connection
├── shared/                 # Shared types and schemas
│   └── schema.ts           # Database schema
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/user` - Get current user

### Problems
- `GET /api/topics` - Get all topics
- `GET /api/topics/:id/problems` - Get problems by topic
- `GET /api/problems/:id` - Get specific problem

### Code Execution
- `POST /api/execute` - Execute code with test cases

### Progress
- `GET /api/progress` - Get user progress
- `POST /api/submissions` - Submit solution

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.