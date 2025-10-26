# Nucleus Quick Start Guide

Get up and running with Nucleus in under 5 minutes!

## 🚀 Super Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/nucleus.git
cd nucleus

# 2. Run the setup script
make setup
# OR
bash scripts/setup.sh

# 3. Access Nucleus
open http://localhost
```

That's it! 🎉

## 📋 Step-by-Step Guide

### 1. Prerequisites

Make sure you have:
- ✅ [Docker](https://docs.docker.com/get-docker/) installed
- ✅ [Docker Compose](https://docs.docker.com/compose/install/) installed

Check your installation:
```bash
docker --version
docker compose version
```

### 2. Clone & Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/nucleus.git
cd nucleus

# Run setup (this will create .env and start all services)
make setup
```

The setup script will:
- Create a `.env` file with secure random secrets
- Create necessary data directories
- Build and start all Docker containers
- Set up the database

### 3. Configure AI Features (Optional)

To enable AI features, edit `.env` and add your OpenAI API key:

```bash
# Edit .env
nano .env

# Add your key
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
```

Then restart the backend:
```bash
docker compose restart backend
```

### 4. Access Nucleus

Open your browser and navigate to:
- **App**: http://localhost
- **API Docs**: http://localhost/docs

### 5. Create Your Account

1. Click "Get Started" or "Register"
2. Enter your details
3. Click "Create Account"
4. Start using Nucleus!

## 🎯 What Can You Do?

### Pantry Management
Track your food inventory, expiration dates, and get meal suggestions.

### Calendar Integration
Sync with Google Calendar and get AI-powered summaries (coming soon).

### Budget Tracking
Monitor your expenses and stay on top of your finances.

### Hunting Management
Track your hunting locations, stands, and wildlife sightings.

### Photo Organization
Organize photos by location with AI tagging.

### AI Assistant
Chat with your intelligent life assistant for insights and help.

## 🛠️ Useful Commands

```bash
# View logs
make logs
docker compose logs -f

# Stop Nucleus
make stop
docker compose down

# Restart Nucleus
make restart
docker compose restart

# Check status
make status
docker compose ps

# Create a backup
make backup

# Update Nucleus
git pull
docker compose up -d --build
```

## 🔧 Troubleshooting

### Services won't start
```bash
# Check if ports are available
docker compose down
docker compose up -d

# View logs for errors
docker compose logs
```

### Can't access the app
```bash
# Make sure all services are running
docker compose ps

# Should show all services as "Up"
# If not, check logs for the failed service
docker compose logs [service-name]
```

### Database connection errors
```bash
# Restart the database
docker compose restart postgres

# Wait a few seconds, then restart backend
docker compose restart backend
```

### "Permission denied" errors
```bash
# On Linux/Mac, make scripts executable
chmod +x scripts/*.sh

# Or run with bash
bash scripts/setup.sh
```

## 🌐 Production Deployment

### Linode/VPS Setup

```bash
# On your server
ssh root@your-server-ip

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Clone and setup
git clone https://github.com/yourusername/nucleus.git /var/www/nucleus
cd /var/www/nucleus
cp .env.example .env
nano .env  # Edit with production values

# Start services
docker compose up -d --build
```

### Enable HTTPS with Let's Encrypt

```bash
# Install Certbot
apt-get update
apt-get install certbot python3-certbot-nginx

# Get certificate
certbot certonly --standalone -d yourdomain.com

# Update nginx config to use SSL
# Then restart nginx
docker compose restart nginx
```

## 📱 Mobile Access

Nucleus is a Progressive Web App (PWA)! You can install it on your phone:

1. Open Nucleus in your mobile browser
2. Tap "Add to Home Screen" (iOS) or "Install" (Android)
3. Use it like a native app!

## 🎓 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check out [CONTRIBUTING.md](CONTRIBUTING.md) if you want to contribute
- Join discussions and report issues on GitHub

## 💬 Need Help?

- **Issues**: [GitHub Issues](https://github.com/yourusername/nucleus/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/nucleus/discussions)

---

**Happy organizing with Nucleus! 🧠✨**

