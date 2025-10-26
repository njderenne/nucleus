# Nucleus - Your Life's Operating System

![Nucleus Logo](https://via.placeholder.com/150x150.png?text=Nucleus)

**Nucleus** is an AI-powered life management platform that brings intelligent organization to every aspect of your personal life. From pantry management and scheduling to finances, hunting, and photography—Nucleus is your single hub for everything.

## 🌟 Features

- **🏠 Pantry & Meals**: Track ingredients, expiration dates, and get AI-powered recipe suggestions
- **📅 Smart Scheduling**: Sync with Google Calendar and receive intelligent daily summaries
- **💰 Budget Tracking**: Monitor expenses, set budgets, and gain financial insights
- **🎯 Hunting Management**: Track stands, record sightings, and analyze patterns with GPS
- **📸 Photo Gallery**: Organize photos by location with AI-powered tagging
- **🤖 AI Assistant**: Chat with your intelligent assistant for summaries and insights

## 🏗️ Architecture

Nucleus uses a modern, multi-tenant architecture:

- **Frontend**: Next.js 14 with TypeScript and App Router
- **Backend**: FastAPI (Python) with async support
- **Database**: PostgreSQL for structured data
- **Vector DB**: Qdrant for AI memory and semantic search
- **AI**: LangChain + OpenAI for intelligent features
- **Infrastructure**: Docker Compose for easy deployment

## 📋 Prerequisites

- **Docker** and **Docker Compose** (v2.0+)
- **Node.js** 20+ (for local frontend development)
- **Python** 3.11+ (for local backend development)
- **OpenAI API Key** (for AI features)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/nucleus.git
cd nucleus
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and update the following critical values:

```env
# Database
POSTGRES_PASSWORD=your_secure_password_here

# Security
JWT_SECRET=your-super-secret-jwt-key-change-this

# AI (required for AI features)
OPENAI_API_KEY=sk-your-openai-api-key-here
```

### 3. Start the Application

```bash
# Build and start all services
docker compose up -d --build

# View logs
docker compose logs -f

# Check running services
docker compose ps
```

### 4. Access the Application

- **Frontend**: http://localhost (or http://localhost:80)
- **API Docs**: http://localhost/docs
- **API Health**: http://localhost/health

### 5. Create Your First Account

1. Navigate to http://localhost
2. Click "Get Started" or "Register"
3. Fill in your details and create your account
4. Start managing your life with Nucleus!

## 🛠️ Development Setup

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at http://localhost:3000

### Backend Development

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The backend will be available at http://localhost:8000

### Database Migrations (Coming Soon)

```bash
cd backend
alembic revision --autogenerate -m "Description"
alembic upgrade head
```

## 📦 Project Structure

```
nucleus/
├── frontend/              # Next.js 14 application
│   ├── app/              # App Router pages
│   ├── components/       # React components
│   ├── lib/              # Utilities and API client
│   └── public/           # Static assets
│
├── backend/              # FastAPI application
│   ├── app/
│   │   ├── core/        # Config, database, security
│   │   ├── models/      # SQLAlchemy models
│   │   ├── routers/     # API endpoints
│   │   ├── schemas/     # Pydantic schemas
│   │   └── main.py      # Application entry point
│   └── requirements.txt
│
├── nginx/               # Nginx reverse proxy config
├── data/                # Persistent data (gitignored)
│   ├── postgres/
│   └── qdrant/
│
├── docker-compose.yml   # Docker services definition
└── .env.example         # Environment template
```

## 🐳 Docker Services

| Service    | Port | Description                    |
|------------|------|--------------------------------|
| nginx      | 80   | Reverse proxy                  |
| frontend   | 3000 | Next.js application (internal) |
| backend    | 8000 | FastAPI application (internal) |
| postgres   | 5432 | PostgreSQL database (internal) |
| qdrant     | 6333 | Vector database (internal)     |
| redis      | 6379 | Cache (optional, internal)     |

## 🔒 Security Best Practices

1. **Change default passwords**: Update `POSTGRES_PASSWORD` and `JWT_SECRET`
2. **Use strong secrets**: Generate random strings for production
3. **Enable HTTPS**: Configure SSL certificates in nginx
4. **Secure API keys**: Never commit `.env` files
5. **Regular backups**: Set up automated database backups

## 🌐 Deployment to Production (Linode)

### Server Setup

```bash
# SSH into your Linode server
ssh root@your-server-ip

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Clone repository
git clone https://github.com/yourusername/nucleus.git /var/www/nucleus
cd /var/www/nucleus

# Configure production environment
cp .env.example .env
nano .env  # Edit with production values

# Start services
docker compose up -d --build
```

### SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
apt-get update
apt-get install certbot python3-certbot-nginx

# Generate certificate
certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is configured automatically
```

### GitHub Actions CI/CD

1. Add secrets to your GitHub repository:
   - `LINODE_IP`: Your server IP
   - `SSH_USERNAME`: SSH user (usually `root`)
   - `SSH_PRIVATE_KEY`: Your SSH private key

2. Push to `main` branch to trigger automatic deployment

## 📊 API Documentation

Once running, visit:

- **Swagger UI**: http://localhost/docs
- **ReDoc**: http://localhost/redoc

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/), [FastAPI](https://fastapi.tiangolo.com/), and [LangChain](https://langchain.com/)
- UI components inspired by [Radix UI](https://www.radix-ui.com/)
- Icons by [Lucide](https://lucide.dev/)

## 📮 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/yourusername/nucleus/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/nucleus/discussions)

---

**Nucleus** - Your life's operating system. 🧠✨
