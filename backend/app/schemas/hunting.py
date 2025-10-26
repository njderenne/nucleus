from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class HuntingLocationBase(BaseModel):
    name: str
    type: Optional[str] = None
    latitude: float
    longitude: float
    description: Optional[str] = None
    notes: Optional[str] = None

class HuntingLocationCreate(HuntingLocationBase):
    pass

class HuntingLocationResponse(HuntingLocationBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class HuntingSightingBase(BaseModel):
    location_id: Optional[str] = None
    species: str
    count: float = 1.0
    date: datetime
    gender: Optional[str] = None
    description: Optional[str] = None
    photo_url: Optional[str] = None
    weather: Optional[str] = None
    temperature: Optional[float] = None
    notes: Optional[str] = None

class HuntingSightingCreate(HuntingSightingBase):
    pass

class HuntingSightingResponse(HuntingSightingBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

