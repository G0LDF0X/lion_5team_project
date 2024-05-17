from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from langchain.embeddings import SentenceTransformerEmbeddings
from langchain.vectorstores import Chroma
import os
import pandas as pd

app = FastAPI()

origins = [
    "http://localhost:5173",  # Adjust this based on your frontend's actual origin
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

file_path = os.path.join(os.path.dirname(__file__), 'output.csv')
items = pd.read_csv(file_path)

sbert = SentenceTransformerEmbeddings(model_name='jhgan/ko-sroberta-multitask')
vector_store = Chroma.from_texts(
    texts=items['name'].tolist(),
    embedding=sbert
)

@app.post("/search/")
async def search_books(query: str):
    results = vector_store.similarity_search(query=query, k=3)
    return {"query": query, "results": results}