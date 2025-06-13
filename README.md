# DSA Learning Platform

A comprehensive Data Structures & Algorithms learning platform with Java programming support, featuring interactive coding challenges, user progress tracking, and a modern web interface.

## Features

- 🎯 **Interactive Coding Problems** - Practice DSA concepts with real Java coding challenges
- 📚 **Comprehensive Topics** - Arrays, Strings, Linked Lists, Trees, Graphs, Dynamic Programming, and more
- 🎨 **Modern UI** - Clean, responsive interface built with React and Tailwind CSS
- 📊 **Progress Tracking** - Monitor your learning journey with detailed statistics
- 🏆 **Achievement System** - Earn XP and unlock achievements as you progress
- 💾 **Persistent Storage** - PostgreSQL database for reliable data storage

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database

### One-Command Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dsa-learning-platform.git
cd dsa-learning-platform
```

2. Run the one-command setup:
```bash
./start.sh
```

Or use Node.js setup:
```bash
node setup.js
```

This single command will:
- Install all dependencies
- Set up the PostgreSQL database
- Run database migrations
- Seed the database with sample data
- Start the development server

The application will be available at `http://localhost:5000`

### Manual Setup (Alternative)

If you prefer to set up manually:

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database connection details
```

3. Set up the database:
```bash
npm run db:push
npm run db:seed
```

4. Start the development server:
```bash
npm run dev
```

## Database Setup

The application uses PostgreSQL. Make sure you have a PostgreSQL database running and update the `DATABASE_URL` in your environment variables.

Example DATABASE_URL format:
```
DATABASE_URL=postgresql://username:password@localhost:5432/dsa_platform
```

## Project Structure

```
├── client/           # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Application pages
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utility functions
├── server/           # Express backend
│   ├── index.ts     # Server entry point
│   ├── routes.ts    # API routes
│   ├── storage.ts   # Database operations
│   └── db.ts        # Database connection
├── shared/           # Shared types and schemas
│   └── schema.ts    # Database schema and types
└── package.json     # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run db:push` - Push database schema changes
- `npm run db:seed` - Seed database with sample data
- `npm run setup` - One-command setup (install + database + seed + start)

## Topics Covered

1. **Arrays & Strings** - Basic data manipulation and string processing
2. **Linked Lists** - Single and double linked list operations
3. **Stacks & Queues** - LIFO and FIFO data structures
4. **Trees & Graphs** - Tree traversals, graph algorithms, and search
5. **Dynamic Programming** - Optimization problems and memoization
6. **Sorting & Searching** - Various sorting algorithms and binary search

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Wouter (routing)
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI Components**: shadcn/ui components
- **Build Tool**: Vite

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.