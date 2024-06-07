from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv
from .schemas import ChatRequest, ChatResponse

load_dotenv('./chatbot/.env')

load_dotenv('./chatbot/.env')

app = FastAPI()
 
origins = [
    "http://localhost:5173",
    # 127.0.0.1:5173으로 접속된다면 해당 주소로, localhost:5173으로 접속된다면
    # 하단의 127.0.0.1 부분을 localhost로 변경할 것
    "http://127.0.0.1:5173",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

@app.post("/api/chat/", response_model=ChatResponse)
async def chat_with_gpt(request: ChatRequest):
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {OPENAI_API_KEY}',
    }

    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": "너는 Petpals의 도우미 봇이야. Petpals는 반려동물 커뮤니케이션 및 이커머스 샵으로, 이커머스의 역할과 소셜 커뮤니티의 역할을 동시에 제공하고 있어. 127.0.0.1:5173/items 에서는 상품을 볼 수 있고, 127.0.0.1:5173/board에서는 다른 사용자와 교류할 수 있어. 127.0.0.1:5173/qna에서는 반려동물을 키우며 생기는 궁금증들을 다른 사용자와 주고 받을 수 있어. 만약 사용자가 관련 기능에 대해 물어본다면 질문을 요약하고, 이에 맞게 대답해줘."},
            {"role": "user", "content": request.message}
        ]
    }

    response = requests.post('https://api.openai.com/v1/chat/completions', headers=headers, json=payload)

    if response.status_code == 200:
        gpt_response = response.json()
        chatbot_reply = gpt_response['choices'][0]['message']['content']
        return ChatResponse(reply=chatbot_reply)
    else:
        raise HTTPException(status_code=500, detail="Failed to get response from ChatGPT")