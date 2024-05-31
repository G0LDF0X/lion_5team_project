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

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Load environment variables
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

# Change the embedding model here
sbert = SentenceTransformerEmbeddings(model_name="jhgan/ko-sroberta-multitask")

# Function to export data to CSV
def export_data_to_csv():
    # Delete the existing CSV file if it exists
    if os.path.exists(csv_file_path):
        os.remove(csv_file_path)
        logging.info(f"Existing {csv_file_path} file deleted.")

    # SQL query to select data
    query = "SELECT * FROM app_item;"

    # Connect to PostgreSQL
    try:
        conn = psycopg2.connect(**conn_params)
        df = pd.read_sql_query(query, conn)

        # Export to CSV
        df.to_csv(csv_file_path, index=False)
        logging.info("Data exported successfully.")
    except Exception as e:
        logging.error(f"Error: {e}")
    finally:
        if conn:
            conn.close()
            logging.info("Database connection closed.")

# Background task to run export_data_to_csv once per day
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
    # Schedule the daily task
    asyncio.create_task(schedule_daily_task())

@app.post("/search/")
async def search_books(query: str):
    items = pd.read_csv(csv_file_path)
    vector_store = Chroma.from_texts(
        texts=items['name', 'category'].tolist(),
        
        embedding=sbert

    )
    results = vector_store.similarity_search(query=query, k=10) 

    unique_results = []
    seen = set()
    for result in results:
        if result.page_content not in seen:
            seen.add(result.page_content)
            unique_results.append(result)
        if len(unique_results) == 4:
            break

    return {"query": query, "results": unique_results}