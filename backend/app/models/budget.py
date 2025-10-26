from sqlalchemy import Column, String, Float, Date, ForeignKey, Enum
from sqlalchemy.orm import relationship
import enum
from app.models.base import BaseModel

class TransactionType(str, enum.Enum):
    INCOME = "income"
    EXPENSE = "expense"

class Transaction(BaseModel):
    """Financial transaction model."""
    __tablename__ = "transactions"
    
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    type = Column(Enum(TransactionType), nullable=False)
    amount = Column(Float, nullable=False)
    category = Column(String)  # e.g., "groceries", "salary", "entertainment"
    description = Column(String)
    date = Column(Date, nullable=False)
    
    # Relationships
    user = relationship("User", back_populates="transactions")

class Budget(BaseModel):
    """Budget model for tracking spending limits."""
    __tablename__ = "budgets"
    
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    category = Column(String, nullable=False)
    monthly_limit = Column(Float, nullable=False)
    year = Column(String, nullable=False)
    month = Column(String, nullable=False)
    
    # Relationships
    user = relationship("User", back_populates="budgets")

