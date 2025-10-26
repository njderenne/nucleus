from sqlalchemy import Column, String, Boolean, DateTime
from sqlalchemy.orm import relationship
from app.models.base import BaseModel

class User(BaseModel):
    """User model for multi-tenant architecture."""
    __tablename__ = "users"
    
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    
    # Google Calendar integration
    google_calendar_token = Column(String, nullable=True)
    google_refresh_token = Column(String, nullable=True)
    
    # Relationships
    pantry_items = relationship("PantryItem", back_populates="user", cascade="all, delete-orphan")
    transactions = relationship("Transaction", back_populates="user", cascade="all, delete-orphan")
    budgets = relationship("Budget", back_populates="user", cascade="all, delete-orphan")
    hunting_locations = relationship("HuntingLocation", back_populates="user", cascade="all, delete-orphan")
    hunting_sightings = relationship("HuntingSighting", back_populates="user", cascade="all, delete-orphan")
    photos = relationship("Photo", back_populates="user", cascade="all, delete-orphan")

