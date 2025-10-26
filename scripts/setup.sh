#!/bin/bash

# Nucleus Setup Script
# This script helps you set up Nucleus for the first time

set -e

echo "🧠 Welcome to Nucleus Setup!"
echo "================================"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first:"
    echo "   https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first:"
    echo "   https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    
    # Generate random secrets
    JWT_SECRET=$(openssl rand -hex 32 2>/dev/null || echo "please-change-this-jwt-secret-$(date +%s)")
    POSTGRES_PASSWORD=$(openssl rand -hex 16 2>/dev/null || echo "change-this-password-$(date +%s)")
    
    # Update .env with generated secrets
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s|JWT_SECRET=.*|JWT_SECRET=$JWT_SECRET|g" .env
        sed -i '' "s|POSTGRES_PASSWORD=.*|POSTGRES_PASSWORD=$POSTGRES_PASSWORD|g" .env
    else
        # Linux
        sed -i "s|JWT_SECRET=.*|JWT_SECRET=$JWT_SECRET|g" .env
        sed -i "s|POSTGRES_PASSWORD=.*|POSTGRES_PASSWORD=$POSTGRES_PASSWORD|g" .env
    fi
    
    echo "✅ .env file created with random secrets"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env and add your OpenAI API key:"
    echo "   OPENAI_API_KEY=sk-your-key-here"
    echo ""
else
    echo "✅ .env file already exists"
    echo ""
fi

# Create data directories
echo "📁 Creating data directories..."
mkdir -p data/postgres data/qdrant nginx/ssl
echo "✅ Data directories created"
echo ""

# Build and start services
echo "🚀 Building and starting Nucleus..."
echo "   This may take a few minutes on first run..."
echo ""
docker compose up -d --build

echo ""
echo "⏳ Waiting for services to start..."
sleep 10

# Check if services are running
if docker compose ps | grep -q "Up"; then
    echo ""
    echo "✅ Nucleus is running!"
    echo ""
    echo "🌐 Access your Nucleus instance:"
    echo "   Frontend:  http://localhost"
    echo "   API Docs:  http://localhost/docs"
    echo "   Health:    http://localhost/health"
    echo ""
    echo "📖 Next steps:"
    echo "   1. Open http://localhost in your browser"
    echo "   2. Click 'Get Started' to create your account"
    echo "   3. Start managing your life with Nucleus!"
    echo ""
    echo "🛠️  Useful commands:"
    echo "   View logs:        docker compose logs -f"
    echo "   Stop Nucleus:     docker compose down"
    echo "   Restart Nucleus:  docker compose restart"
    echo ""
else
    echo ""
    echo "⚠️  Some services may not have started correctly."
    echo "   Check the logs with: docker compose logs"
    echo ""
fi

