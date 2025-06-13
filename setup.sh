#!/bin/bash

# CodeMaster - One-Command Setup Script
echo "🚀 Setting up CodeMaster DSA Learning Platform..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env file exists, if not create from example
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        echo "📋 Creating .env file from .env.example..."
        cp .env.example .env
        echo "⚠️  Please update .env file with your database credentials before running the app."
    else
        echo "📋 Creating .env file with default values..."
        cat > .env << EOL
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/codemaster

# JWT Secret (change this in production)
JWT_SECRET=your-super-secret-jwt-key-here

# Node Environment
NODE_ENV=development
EOL
        echo "⚠️  Please update .env file with your database credentials."
    fi
fi

# Setup database schema
echo "🗄️  Setting up database schema..."
npm run db:push

# Seed database with sample data
echo "🌱 Seeding database with problems and topics..."
npm run db:seed

echo "✅ Setup completed successfully!"
echo ""
echo "🎯 To start the development server:"
echo "   npm run dev"
echo ""
echo "📝 The application will be available at: http://localhost:5000"
echo ""
echo "🔧 Make sure to update your .env file with the correct database credentials!"