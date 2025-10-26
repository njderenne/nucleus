from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class PhotoBase(BaseModel):
    file_path: str
    file_name: str
    file_size: Optional[float] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    location_name: Optional[str] = None
    taken_at: Optional[datetime] = None
    camera: Optional[str] = None
    tags: Optional[List[str]] = None
    description: Optional[str] = None
    ai_caption: Optional[str] = None
    ai_tags: Optional[List[str]] = None

class PhotoCreate(PhotoBase):
    pass

class PhotoResponse(PhotoBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

