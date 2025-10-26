#!/bin/bash

# Nucleus Development Script
# Run frontend and backend in development mode

set -e

echo "🧠 Starting Nucleus in Development Mode"
echo "========================================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Run ./scripts/setup.sh first."
    exit 1
fi

# Start only database services
echo "🐳 Starting database services..."
docker compose up -d postgres qdrant redis

echo "⏳ Waiting for databases to be ready..."
sleep 5

echo ""
echo "✅ Database services started!"
echo ""
echo "To start development servers:"
echo ""
echo "Backend (in one terminal):"
echo "  cd backend"
echo "  python -m venv venv"
echo "  source venv/bin/activate  # Windows: venv\\Scripts\\activate"
echo "  pip install -r requirements.txt"
echo "  uvicorn app.main:app --reload --port 8000"
echo ""
echo "Frontend (in another terminal):"
echo "  cd frontend"
echo "  npm install"
echo "  npm run dev"
echo ""
echo "Then access:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:8000/docs"
echo ""

