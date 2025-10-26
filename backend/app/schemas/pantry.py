from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional

class PantryItemBase(BaseModel):
    name: str
    category: Optional[str] = None
    quantity: float = 1.0
    unit: Optional[str] = None
    expiration_date: Optional[date] = None
    location: Optional[str] = None
    notes: Optional[str] = None

class PantryItemCreate(PantryItemBase):
    pass

class PantryItemUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    quantity: Optional[float] = None
    unit: Optional[str] = None
    expiration_date: Optional[date] = None
    location: Optional[str] = None
    notes: Optional[str] = None

class PantryItemResponse(PantryItemBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

