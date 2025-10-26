from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.core.database import get_db
from app.core.security import get_current_user_id
from app.models.pantry import PantryItem
from app.schemas.pantry import PantryItemCreate, PantryItemUpdate, PantryItemResponse

router = APIRouter()

@router.get("/", response_model=List[PantryItemResponse])
async def get_pantry_items(
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    """Get all pantry items for the current user."""
    result = await db.execute(
        select(PantryItem).where(PantryItem.user_id == user_id)
    )
    items = result.scalars().all()
    return items

@router.post("/", response_model=PantryItemResponse, status_code=status.HTTP_201_CREATED)
async def create_pantry_item(
    item_data: PantryItemCreate,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    """Create a new pantry item."""
    item = PantryItem(
        user_id=user_id,
        **item_data.model_dump()
    )
    db.add(item)
    await db.commit()
    await db.refresh(item)
    return item

@router.get("/{item_id}", response_model=PantryItemResponse)
async def get_pantry_item(
    item_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    """Get a specific pantry item."""
    result = await db.execute(
        select(PantryItem).where(
            PantryItem.id == item_id,
            PantryItem.user_id == user_id
        )
    )
    item = result.scalar_one_or_none()
    
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    return item

@router.put("/{item_id}", response_model=PantryItemResponse)
async def update_pantry_item(
    item_id: str,
    item_data: PantryItemUpdate,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    """Update a pantry item."""
    result = await db.execute(
        select(PantryItem).where(
            PantryItem.id == item_id,
            PantryItem.user_id == user_id
        )
    )
    item = result.scalar_one_or_none()
    
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    # Update fields
    for field, value in item_data.model_dump(exclude_unset=True).items():
        setattr(item, field, value)
    
    await db.commit()
    await db.refresh(item)
    return item

@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_pantry_item(
    item_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    """Delete a pantry item."""
    result = await db.execute(
        select(PantryItem).where(
            PantryItem.id == item_id,
            PantryItem.user_id == user_id
        )
    )
    item = result.scalar_one_or_none()
    
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    await db.delete(item)
    await db.commit()

