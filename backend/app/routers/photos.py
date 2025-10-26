from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.core.database import get_db
from app.core.security import get_current_user_id
from app.models.photo import Photo
from app.schemas.photo import PhotoCreate, PhotoResponse

router = APIRouter()

@router.get("/", response_model=List[PhotoResponse])
async def get_photos(
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    """Get all photos for the current user."""
    result = await db.execute(
        select(Photo).where(Photo.user_id == user_id)
    )
    photos = result.scalars().all()
    return photos

@router.post("/", response_model=PhotoResponse, status_code=status.HTTP_201_CREATED)
async def create_photo(
    photo_data: PhotoCreate,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    """Create a new photo record."""
    photo = Photo(
        user_id=user_id,
        **photo_data.model_dump()
    )
    db.add(photo)
    await db.commit()
    await db.refresh(photo)
    return photo

