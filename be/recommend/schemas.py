from pydantic import BaseModel

class RecommendationBase(BaseModel):
    user_id: int
    recommended_content_id: int
    created_at: str
    score: float

class Recommendation(RecommendationBase):
    id: int

    class Config:
        orm_mode = True

class DetailedRecommendationResponse(BaseModel):
    item_id: int
    name: str
    image_url: str
    price: float
    score: float

    class Config:
        orm_mode = True
class DetailedRecommendationResponse(BaseModel):
    board_id: int
    title: str
    image_url: str
    
    score: float

    class Config:
        orm_mode = True