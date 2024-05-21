from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv
from .schemas import ChatRequest, ChatResponse

load_dotenv('./chatbot/.env')

app = FastAPI()
 
origins = [
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
            {"role": "system", "content": "You are a helpful assistant."},
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