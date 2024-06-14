# # from fastapi import FastAPI, HTTPException
# # from fastapi.middleware.cors import CORSMiddleware
# # from pydantic import BaseModel
# # import requests
# # import os
# # from dotenv import load_dotenv
# # from .schemas import ChatRequest, ChatResponse
# # import json

# # load_dotenv('./chatbot/.env')

# # load_dotenv('./chatbot/.env')

# # app = FastAPI()
 
# # origins = [
# #     "http://localhost:5173",
# #     # 127.0.0.1:5173으로 접속된다면 해당 주소로, localhost:5173으로 접속된다면
# #     # 하단의 127.0.0.1 부분을 localhost로 변경할 것
# #     "http://127.0.0.1:5173",  
# # ]

# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=origins,
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# # )

# # OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

# # def get_training_data():
# #     with open('chatbot/train.jsonl', 'r', encoding='utf-8') as f:
# #         for line in f:
# #             data = json.loads(line)
# #             yield data

# # @app.post("/api/chat/", response_model=ChatResponse)
# # async def chat_with_gpt(request: ChatRequest):
# #     headers = {
# #         'Content-Type': 'application/json',
# #         'Authorization': f'Bearer {OPENAI_API_KEY}',
# #     }

# #     training_data = get_training_data()
# #     data = next(training_data)
# #     system_message = ""
# #     for message in data["messages"]:
# #         if message["role"] == "system":
# #             system_message += message["content"]
# #             break
# #     user_message = request.message

# #     payload = {
# #         "model": "gpt-3.5-turbo",
# #         "messages": [
# #             {"role": "system", "content": system_message},
# #             {"role": "user", "content": user_message}
# #         ]
# #     }

# #     response = requests.post('https://api.openai.com/v1/chat/completions', headers=headers, json=payload)

# #     if response.status_code == 200:
# #         gpt_response = response.json()
# #         chatbot_reply = gpt_response['choices'][0]['message']['content']
# #         return ChatResponse(reply=chatbot_reply)
# #     else:
# #         raise HTTPException(status_code=500, detail="Failed to get response from ChatGPT")

# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import torch
# from transformers import GPT2LMHeadModel, GPT2Tokenizer
# from safetensors.torch import load_file
# import os
# import logging

# class ChatRequest(BaseModel):
#     message: str

# class ChatResponse(BaseModel):
#     reply: str

# app = FastAPI()

# origins = [
#     "http://localhost:5173",
#     "http://127.0.0.1:5173",  
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Set up logging
# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# # Print the current working directory
# current_dir = os.getcwd()
# logger.info(f"Current working directory: {current_dir}")

# # Load the fine-tuned model and tokenizer
# model_name = os.path.join(current_dir, "kogpt2_chatbot_model")

# if not os.path.isdir(model_name):
#     raise EnvironmentError(f"Model directory {model_name} does not exist")

# try:
#     tokenizer = GPT2Tokenizer.from_pretrained(model_name)
#     model = GPT2LMHeadModel.from_pretrained(model_name)

#     # Manually load the safetensors weights
#     safetensors_path = os.path.join(model_name, "model.safetensors")
#     if os.path.isfile(safetensors_path):
#         state_dict = load_file(safetensors_path, device="cpu")
        
#         # Adjust state_dict if necessary
#         if "transformer.lm_head.weight" not in state_dict:
#             if "lm_head.weight" in state_dict:
#                 state_dict["transformer.lm_head.weight"] = state_dict.pop("lm_head.weight")
        
#         model.load_state_dict(state_dict, strict=False)
#         logger.info("Model and tokenizer loaded successfully with safetensors")
#     else:
#         raise EnvironmentError(f"Safetensors file {safetensors_path} does not exist")
# except EnvironmentError as e:
#     raise EnvironmentError(f"Error loading model: {str(e)}")

# def generate_response(prompt):
#     inputs = tokenizer.encode(prompt, return_tensors="pt")
#     print (inputs)
#     attention_mask = inputs.ne(tokenizer.pad_token_id).long()
    
#     outputs = model.generate(inputs, attention_mask=attention_mask, max_length=500, num_return_sequences=1, pad_token_id=tokenizer.eos_token_id)
#     response = tokenizer.decode(outputs[0], skip_special_tokens=True)
#     print (response)
#     return response

# @app.post("/api/chat/", response_model=ChatResponse)
# async def chat_with_gpt(request: ChatRequest):
#     try:
#         user_message = request.message

#         # Log the user message
#         logger.info(f"User message: {user_message}")

#         prompt = f"User: {user_message}\nAI:"
        
#         # Log the prompt
#         logger.info(f"Prompt: {prompt}")

#         # Generate response using the fine-tuned model
#         chatbot_reply = generate_response(prompt)
        
#         # Log the response
#         logger.info(f"Response: {chatbot_reply}")
        
#         return ChatResponse(reply=chatbot_reply.strip())
#     except Exception as e:
#         logger.error(f"Error generating response: {str(e)}")
#         raise HTTPException(status_code=500, detail=f"Failed to generate response: {str(e)}")

# # if __name__ == "__main__":
# #     import uvicorn
# #     uvicorn.run(app, host="0.0.0.0", port=8000)
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import BertTokenizer, BertForQuestionAnswering
import torch
import os

class ChatRequest(BaseModel):
    context: str
    question: str

class ChatResponse(BaseModel):
    answer: str

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the BERT model and tokenizer
model_name = "bert-base-multilingual-cased"
tokenizer = BertTokenizer.from_pretrained(model_name)
model = BertForQuestionAnswering.from_pretrained(model_name)

def get_answer(context: str, question: str) -> str:
    inputs = tokenizer.encode_plus(question, context, add_special_tokens=True, return_tensors="pt")
    input_ids = inputs["input_ids"].tolist()[0]

    text_tokens = tokenizer.convert_ids_to_tokens(input_ids)
    answer_start_scores, answer_end_scores = model(**inputs)

    answer_start = torch.argmax(answer_start_scores)
    answer_end = torch.argmax(answer_end_scores) + 1

    answer = tokenizer.convert_tokens_to_string(tokenizer.convert_ids_to_tokens(input_ids[answer_start:answer_end]))
    return answer

@app.post("/api/chat/", response_model=ChatResponse)
async def chat_with_bert(request: ChatRequest):
    try:
        context = request.context
        question = request.question
        answer = get_answer(context, question)
        return ChatResponse(answer=answer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate response: {str(e)}")

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)