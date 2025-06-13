# CodeMaster - Deployment Guide

This guide covers deployment options for the CodeMaster DSA Learning Platform.

## Quick Start (Single Command)

```bash
git clone <your-repo-url>
cd codemaster
./setup.sh
```

Or manually:
```bash
npm install && npm run db:push && npm run db:seed && npm run dev
```

## Prerequisites

- Node.js 18+
- PostgreSQL database
- Git

## Development Setup

### Option 1: Automated Setup
```bash
git clone <your-repo-url>
cd codemaster
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Setup
```bash
# Clone repository
git clone <your-repo-url>
cd codemaster

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your database credentials

# Setup database
npm run db:push
npm run db:seed

# Start development server
npm run dev
```

## Production Deployment

### Docker Deployment (Recommended)

```bash
# Clone repository
git clone <your-repo-url>
cd codemaster

# Start with Docker Compose
docker-compose up -d
```

This will:
- Start PostgreSQL database
- Build and run the application
- Expose the app on port 5000

### Manual Production Deployment

```bash
# On your server
git clone <your-repo-url>
cd codemaster

# Install dependencies
npm ci --only=production

# Build application
npm run build

# Setup environment variables
cp .env.example .env
# Configure with production database credentials

# Setup database
npm run db:push
npm run db:seed

# Start application
npm start
```

### Cloud Platform Deployment

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Railway
1. Connect GitHub repository to Railway
2. Add PostgreSQL service
3. Set environment variables
4. Deploy automatically

#### Heroku
```bash
# Create Heroku app
heroku create your-app-name

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Deploy
git push heroku main
```

## Environment Configuration

### Required Environment Variables

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/codemaster

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here

# Environment
NODE_ENV=production
```

### Optional Variables
```env
# Database Connection Details
PGHOST=localhost
PGPORT=5432
PGUSER=username
PGPASSWORD=password
PGDATABASE=codemaster
```

## Database Management

### Initial Setup
```bash
npm run db:push    # Create database schema
npm run db:seed    # Add sample problems and data
```

### Backup Database
```bash
pg_dump $DATABASE_URL > backup.sql
```

### Restore Database
```bash
psql $DATABASE_URL < backup.sql
```

## Process Management

### Using PM2 (Recommended for VPS)
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start npm --name "codemaster" -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

### Using Systemd
```bash
# Create service file
sudo nano /etc/systemd/system/codemaster.service

# Service content:
[Unit]
Description=CodeMaster DSA Platform
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/codemaster
ExecStart=/usr/bin/npm start
Restart=on-failure

[Install]
WantedBy=multi-user.target

# Enable and start
sudo systemctl enable codemaster
sudo systemctl start codemaster
```

## SSL/HTTPS Setup

### Using Nginx Reverse Proxy
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Using Certbot for SSL
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

## Monitoring and Logs

### Application Logs
```bash
# View PM2 logs
pm2 logs codemaster

# View system logs
journalctl -u codemaster -f
```

### Health Checks
The application exposes health check endpoints:
- `GET /api/health` - Application health
- `GET /api/auth/user` - Authentication status

## Security Checklist

- [ ] Use strong JWT secret (32+ characters)
- [ ] Enable HTTPS in production
- [ ] Configure CORS properly
- [ ] Update dependencies regularly
- [ ] Use environment variables for secrets
- [ ] Enable database connection SSL
- [ ] Set up firewall rules
- [ ] Regular security audits

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check DATABASE_URL format
   - Verify database is running
   - Check firewall settings

2. **Application Won't Start**
   - Check Node.js version (18+)
   - Verify all dependencies installed
   - Check environment variables

3. **Code Execution Not Working**
   - Ensure `/api/execute` endpoint is accessible
   - Check server logs for errors

### Performance Optimization

- Enable database connection pooling
- Use CDN for static assets
- Enable gzip compression
- Implement caching strategies
- Monitor database query performance

## Backup Strategy

### Automated Backups
```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL > backups/codemaster_$DATE.sql
# Keep only last 7 days
find backups/ -name "*.sql" -type f -mtime +7 -delete
```

### Scheduled Backups
```bash
# Add to crontab
0 2 * * * /path/to/backup.sh
```