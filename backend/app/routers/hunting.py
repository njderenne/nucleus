from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.core.database import get_db
from app.core.security import get_current_user_id
from app.models.hunting import HuntingLocation, HuntingSighting
from app.schemas.hunting import (
    HuntingLocationCreate, HuntingLocationResponse,
    HuntingSightingCreate, HuntingSightingResponse
)

router = APIRouter()

# Location endpoints
@router.get("/locations", response_model=List[HuntingLocationResponse])
async def get_hunting_locations(
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    """Get all hunting locations for the current user."""
    result = await db.execute(
        select(HuntingLocation).where(HuntingLocation.user_id == user_id)
    )
    locations = result.scalars().all()
    return locations

@router.post("/locations", response_model=HuntingLocationResponse, status_code=status.HTTP_201_CREATED)
async def create_hunting_location(
    location_data: HuntingLocationCreate,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    """Create a new hunting location."""
    location = HuntingLocation(
        user_id=user_id,
        **location_data.model_dump()
    )
    db.add(location)
    await db.commit()
    await db.refresh(location)
    return location

# Sighting endpoints
@router.get("/sightings", response_model=List[HuntingSightingResponse])
async def get_hunting_sightings(
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    """Get all hunting sightings for the current user."""
    result = await db.execute(
        select(HuntingSighting).where(HuntingSighting.user_id == user_id)
    )
    sightings = result.scalars().all()
    return sightings

@router.post("/sightings", response_model=HuntingSightingResponse, status_code=status.HTTP_201_CREATED)
async def create_hunting_sighting(
    sighting_data: HuntingSightingCreate,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    """Create a new hunting sighting."""
    sighting = HuntingSighting(
        user_id=user_id,
        **sighting_data.model_dump()
    )
    db.add(sighting)
    await db.commit()
    await db.refresh(sighting)
    return sighting

