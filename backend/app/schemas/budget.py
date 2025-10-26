from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional
from app.models.budget import TransactionType

class TransactionBase(BaseModel):
    type: TransactionType
    amount: float
    category: Optional[str] = None
    description: Optional[str] = None
    date: date

class TransactionCreate(TransactionBase):
    pass

class TransactionResponse(TransactionBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class BudgetBase(BaseModel):
    category: str
    monthly_limit: float
    year: str
    month: str

class BudgetCreate(BudgetBase):
    pass

class BudgetResponse(BudgetBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

