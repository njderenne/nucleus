from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Optional

class Settings(BaseSettings):
    # App
    APP_NAME: str = "Nucleus"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # Database
    DATABASE_URL: str = "postgresql+asyncpg://appuser:secret@postgres:5432/nucleus"
    
    # Security
    JWT_SECRET: str = "your-secret-key-change-this"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # AI Services
    OPENAI_API_KEY: Optional[str] = None
    QDRANT_URL: str = "http://qdrant:6333"
    QDRANT_COLLECTION_NAME: str = "nucleus_memory"
    
    # Redis (optional)
    REDIS_URL: Optional[str] = "redis://redis:6379/0"
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:80",
        "http://frontend:3000"
    ]
    
    # Google Calendar (OAuth)
    GOOGLE_CLIENT_ID: Optional[str] = None
    GOOGLE_CLIENT_SECRET: Optional[str] = None
    
    # Frontend URL
    FRONTEND_URL: str = "http://localhost:3000"
    
    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="allow"
    )

settings = Settings()

