#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Setting up DSA Learning Platform...\n');

function runCommand(command, description) {
  console.log(`${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`${description} completed\n`);
  } catch (error) {
    console.error(`Error during ${description.toLowerCase()}:`, error.message);
    process.exit(1);
  }
}

function checkEnvironment() {
  console.log('Checking environment...');
  
  // Check if .env file exists
  if (!fs.existsSync('.env')) {
    console.log('No .env file found. Creating from template...');
    if (fs.existsSync('.env.example')) {
      fs.copyFileSync('.env.example', '.env');
      console.log('Created .env file from .env.example');
      console.log('Please update DATABASE_URL and other settings in .env file');
    }
  }
  
  // Check if DATABASE_URL is set
  require('dotenv').config();
  if (!process.env.DATABASE_URL) {
    console.log('DATABASE_URL not found in environment variables');
    console.log('Please set up your PostgreSQL database and update the .env file');
  }
  
  console.log('Environment check completed\n');
}

async function main() {
  try {
    // Install dependencies
    runCommand('npm install', 'Installing dependencies');
    
    // Check environment
    checkEnvironment();
    
    // Set up database
    runCommand('npm run db:push', 'Setting up database schema');
    
    // Seed database
    runCommand('npx tsx server/seed.ts', 'Seeding database with sample data');
    
    console.log('Setup completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Update your .env file with correct database credentials');
    console.log('2. Run "npm run dev" to start the development server');
    console.log('3. Open http://localhost:5000 in your browser');
    console.log('\nHappy coding!');
    
  } catch (error) {
    console.error('Setup failed:', error.message);
    process.exit(1);
  }
}

main();