from fastapi import APIRouter, Depends
from app.core.security import get_current_user_id

router = APIRouter()

@router.get("/events")
async def get_calendar_events(
    user_id: str = Depends(get_current_user_id)
):
    """Get calendar events (Google Calendar integration placeholder)."""
    return {
        "message": "Calendar integration coming soon",
        "user_id": user_id
    }

@router.get("/summary")
async def get_calendar_summary(
    user_id: str = Depends(get_current_user_id)
):
    """Get AI-powered calendar summary."""
    return {
        "message": "Calendar summary coming soon",
        "user_id": user_id
    }

