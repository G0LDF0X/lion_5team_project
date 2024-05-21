from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from langchain.embeddings import SentenceTransformerEmbeddings
from langchain.vectorstores import Chroma
import os
import pandas as pd
import psycopg2
from dotenv import load_dotenv
import logging
from datetime import datetime, timedelta
import asyncio

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

load_dotenv()

db_host = os.getenv('DB_HOST')
db_name = os.getenv('DB_NAME')
db_user = os.getenv('DB_USER')
db_password = os.getenv('DB_PASSWORD')
db_port = os.getenv('DB_PORT')

conn_params = {
    'host': db_host,
    'dbname': db_name,
    'user': db_user,
    'password': db_password,
    'port': db_port
}

csv_file_path = os.path.join(os.path.dirname(__file__), 'items.csv')

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sbert = SentenceTransformerEmbeddings(model_name='jhgan/ko-sroberta-multitask')

def export_data_to_csv():
    if os.path.exists(csv_file_path):
        os.remove(csv_file_path)
        logging.info(f"Existing {csv_file_path} file deleted.")

    query = "SELECT * FROM app_item;"

    try:
        conn = psycopg2.connect(**conn_params)
        df = pd.read_sql_query(query, conn)

        df.to_csv(csv_file_path, index=False)
        logging.info("Data exported successfully.")
    except Exception as e:
        logging.error(f"Error: {e}")
    finally:
        if conn:
            conn.close()
            logging.info("Database connection closed.")

async def schedule_daily_task():
    while True:
        now = datetime.now()
        next_run = (now + timedelta(days=1)).replace(hour=2, minute=0, second=0, microsecond=0)
        wait_time = (next_run - now).total_seconds()
        logging.info(f"Next data export scheduled at {next_run}")
        await asyncio.sleep(wait_time)
        export_data_to_csv()

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(schedule_daily_task())

@app.post("/search/")
async def search_books(query: str):
    items = pd.read_csv(csv_file_path)
    if items.empty:
        return {"error": "No data available."}
    vector_store = Chroma.from_texts(
        texts=items['name'].tolist(),
        embedding=sbert
    )
    results = vector_store.similarity_search(query=query, k=4)
    return {"results": results}