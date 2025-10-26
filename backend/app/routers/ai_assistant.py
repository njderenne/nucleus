from fastapi import APIRouter, Depends
from app.core.security import get_current_user_id
from app.core.ai_client import ai_client
from app.schemas.ai import ChatRequest, ChatResponse

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat_with_ai(
    request: ChatRequest,
    user_id: str = Depends(get_current_user_id)
):
    """Chat with the AI assistant."""
    response = await ai_client.chat(
        user_message=request.message,
        system_context="You are helping the user manage their life through the Nucleus app.",
        user_id=user_id
    )
    
    return ChatResponse(
        message=response or "AI service is not configured.",
        user_id=user_id
    )

@router.post("/summarize")
async def generate_summary(
    request: ChatRequest,
    user_id: str = Depends(get_current_user_id)
):
    """Generate an AI summary of content."""
    summary = await ai_client.generate_summary(
        content=request.message,
        context="Provide a concise summary for the user's life management system."
    )
    
    return {
        "summary": summary or "AI service is not configured.",
        "user_id": user_id
    }

