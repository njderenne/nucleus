from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from app.models.base import BaseModel

class Photo(BaseModel):
    """Model for tracking photos with location and metadata."""
    __tablename__ = "photos"
    
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    
    # File info
    file_path = Column(String, nullable=False)
    file_name = Column(String, nullable=False)
    file_size = Column(Float)  # in bytes
    
    # Location
    latitude = Column(Float)
    longitude = Column(Float)
    location_name = Column(String)
    
    # Metadata
    taken_at = Column(DateTime)
    camera = Column(String)
    tags = Column(JSON)  # Array of tags
    description = Column(Text)
    
    # AI-generated
    ai_caption = Column(Text)
    ai_tags = Column(JSON)
    
    # Relationships
    user = relationship("User", back_populates="photos")

