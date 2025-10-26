from sqlalchemy import Column, String, Integer, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import BaseModel

class PantryItem(BaseModel):
    """Pantry item model for tracking food inventory."""
    __tablename__ = "pantry_items"
    
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    name = Column(String, nullable=False)
    category = Column(String)  # e.g., "dairy", "meat", "produce", "pantry"
    quantity = Column(Float, default=1.0)
    unit = Column(String)  # e.g., "lbs", "oz", "count", "kg"
    expiration_date = Column(Date, nullable=True)
    location = Column(String)  # e.g., "fridge", "freezer", "pantry"
    notes = Column(String)
    
    # Relationships
    user = relationship("User", back_populates="pantry_items")

