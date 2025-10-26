from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.config import settings
from app.core.database import engine, get_db
from app.routers import pantry, calendar, budget, hunting, photos, ai_assistant, auth, users

# Import models to ensure they're registered with SQLAlchemy
from app.models import base

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🚀 Starting Nucleus API...")
    # Create tables
    async with engine.begin() as conn:
        await conn.run_sync(base.Base.metadata.create_all)
    yield
    # Shutdown
    print("🛑 Shutting down Nucleus API...")

app = FastAPI(
    title="Nucleus API",
    description="AI-powered life operating system",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "app": "Nucleus API",
        "version": "1.0.0"
    }

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(pantry.router, prefix="/api/pantry", tags=["Pantry"])
app.include_router(calendar.router, prefix="/api/calendar", tags=["Calendar"])
app.include_router(budget.router, prefix="/api/budget", tags=["Budget"])
app.include_router(hunting.router, prefix="/api/hunting", tags=["Hunting"])
app.include_router(photos.router, prefix="/api/photos", tags=["Photos"])
app.include_router(ai_assistant.router, prefix="/api/ai", tags=["AI Assistant"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to Nucleus API",
        "docs": "/docs",
        "health": "/health"
    }

