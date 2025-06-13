#!/bin/bash

echo "🚀 Starting DSA Learning Platform..."
echo

# Check if Docker is available
if command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
    echo "📦 Using Docker setup..."
    docker-compose up --build
else
    echo "📦 Using local setup..."
    
    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
        exit 1
    fi
    
    # Install dependencies if node_modules doesn't exist
    if [ ! -d "node_modules" ]; then
        echo "📦 Installing dependencies..."
        npm install
    fi
    
    # Check if .env exists
    if [ ! -f ".env" ]; then
        echo "⚠️  Creating .env file from template..."
        cp .env.example .env
        echo "📝 Please update DATABASE_URL in .env file with your PostgreSQL connection string"
        echo
    fi
    
    # Load environment variables
    if [ -f ".env" ]; then
        export $(grep -v '^#' .env | xargs)
    fi
    
    # Check if database is accessible
    if [ -z "$DATABASE_URL" ]; then
        echo "⚠️  DATABASE_URL not set. Please configure your .env file."
        echo "Example: DATABASE_URL=postgresql://username:password@localhost:5432/dsa_platform"
        exit 1
    fi
    
    # Set up database schema
    echo "🗄️  Setting up database schema..."
    npm run db:push
    
    # Seed database
    echo "🌱 Seeding database with sample data..."
    npx tsx server/seed.ts
    
    # Start the application
    echo "🚀 Starting development server..."
    echo "Application will be available at http://localhost:5000"
    echo
    npm run dev
fi