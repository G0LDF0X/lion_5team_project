from pydantic import BaseModel

class DetailedRecommendationResponse(BaseModel):
    item_id: int
    name: str
    image_url: str
    description: str
    price: float
    score: float

    class Config:
        orm_mode = True

class BoardRecommendationResponse(BaseModel):
    board_id: int
    title: str
    image_url: str
    
    score: float

    class Config:
        orm_mode = True
