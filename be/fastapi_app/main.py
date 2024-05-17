
import os
import pandas as pd
from fastapi import FastAPI, HTTPException
from langchain.embeddings import SentenceTransformerEmbeddings
from langchain.vectorstores import Chroma

app = FastAPI()


file_path = os.path.join(os.path.dirname(__file__), 'output.csv')
items = pd.read_csv(file_path)

sbert = SentenceTransformerEmbeddings(model_name='jhgan/ko-sroberta-multitask')
vector_store = Chroma.from_texts(
    texts=items['name'].tolist(),
    embedding=sbert
)

@app.post("/search/")
def search_books(query: str):
    results = vector_store.similarity_search(query=query, k=3)
    return {"query": query, "results": results}