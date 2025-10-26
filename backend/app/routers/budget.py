from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.core.database import get_db
from app.core.security import get_current_user_id
from app.models.budget import Transaction, Budget
from app.schemas.budget import (
    TransactionCreate, TransactionResponse,
    BudgetCreate, BudgetResponse
)

router = APIRouter()

# Transaction endpoints
@router.get("/transactions", response_model=List[TransactionResponse])
async def get_transactions(
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    """Get all transactions for the current user."""
    result = await db.execute(
        select(Transaction).where(Transaction.user_id == user_id)
    )
    transactions = result.scalars().all()
    return transactions

@router.post("/transactions", response_model=TransactionResponse, status_code=status.HTTP_201_CREATED)
async def create_transaction(
    transaction_data: TransactionCreate,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    """Create a new transaction."""
    transaction = Transaction(
        user_id=user_id,
        **transaction_data.model_dump()
    )
    db.add(transaction)
    await db.commit()
    await db.refresh(transaction)
    return transaction

# Budget endpoints
@router.get("/budgets", response_model=List[BudgetResponse])
async def get_budgets(
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    """Get all budgets for the current user."""
    result = await db.execute(
        select(Budget).where(Budget.user_id == user_id)
    )
    budgets = result.scalars().all()
    return budgets

@router.post("/budgets", response_model=BudgetResponse, status_code=status.HTTP_201_CREATED)
async def create_budget(
    budget_data: BudgetCreate,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    """Create a new budget."""
    budget = Budget(
        user_id=user_id,
        **budget_data.model_dump()
    )
    db.add(budget)
    await db.commit()
    await db.refresh(budget)
    return budget

