from typing import Optional
from pydantic import BaseModel

class DetailedRecommendationResponse(BaseModel):
    id: int
    name: Optional[str]
    image_url: Optional[str]
    description: Optional[str]
    price: Optional[float]
    score: Optional[float]

    class Config:
        orm_mode = True

class BoardRecommendationResponse(BaseModel):
    id: int
    title: Optional[str]
    image_url: Optional[str]
    username: Optional[str]
    user_image: Optional[str]
    content: Optional[str]
    user_id: Optional[int]
    created_at: Optional[str]
    
    score: Optional[float]

    class Config:
        orm_mode = True