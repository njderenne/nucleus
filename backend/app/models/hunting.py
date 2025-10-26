from sqlalchemy import Column, String, Float, Date, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.models.base import BaseModel

class HuntingLocation(BaseModel):
    """Model for tracking hunting stands, cameras, and trail locations."""
    __tablename__ = "hunting_locations"
    
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    name = Column(String, nullable=False)
    type = Column(String)  # e.g., "stand", "camera", "trail"
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    description = Column(Text)
    notes = Column(Text)
    
    # Relationships
    user = relationship("User", back_populates="hunting_locations")
    sightings = relationship("HuntingSighting", back_populates="location", cascade="all, delete-orphan")

class HuntingSighting(BaseModel):
    """Model for recording wildlife sightings."""
    __tablename__ = "hunting_sightings"
    
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    location_id = Column(String, ForeignKey("hunting_locations.id"), nullable=True)
    
    species = Column(String, nullable=False)  # e.g., "deer", "turkey"
    count = Column(Float, default=1)
    date = Column(DateTime, nullable=False)
    
    # Details
    gender = Column(String)  # e.g., "buck", "doe"
    description = Column(Text)
    photo_url = Column(String)
    weather = Column(String)
    temperature = Column(Float)
    notes = Column(Text)
    
    # Relationships
    user = relationship("User", back_populates="hunting_sightings")
    location = relationship("HuntingLocation", back_populates="sightings")

