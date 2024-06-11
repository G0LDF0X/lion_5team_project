from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class InteractionBase(BaseModel):
    user_id: int
    content_id: int
    interaction_type: str
    stay_time: Optional[float]
    timestamp: datetime

class InteractionCreate(InteractionBase):
    pass

class Interaction(InteractionBase):
    id: int

    class Config:
        orm_mode = True

class RecommendationBase(BaseModel):
    user_id: int
    recommended_content_id: int
    score: float
    created_at: datetime

class RecommendationCreate(RecommendationBase):
    pass

class Recommendation(RecommendationBase):
    id: int

    class Config:
        orm_mode = True

class SimpleRecommendationResponse(BaseModel):
    recommended_content_id: int
    score: float

