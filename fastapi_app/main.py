from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from langchain.embeddings import SentenceTransformerEmbeddings
from langchain.vectorstores import Chroma
import os
import pandas as pd
from sqlalchemy import create_engine
from dotenv import load_dotenv
import logging
from datetime import datetime, timedelta
import asyncio
from pathlib import Path  # Python 3.6+ only
# from starlette.middleware.cors import CORSMiddleware

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

env_path = Path('fastapi_app/.env')
load_dotenv(dotenv_path=env_path)

db_host = os.getenv('DB_HOST')
db_name = os.getenv('DB_NAME')
db_user = os.getenv('DB_USER')
db_password = os.getenv('DB_PASSWORD')
db_port = os.getenv('DB_PORT')


connection_string = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"

item_csv_file_path = os.path.join(os.path.dirname(__file__), 'items.csv')
category_csv_file_path = os.path.join(os.path.dirname(__file__), 'category.csv')
# board_csv_file_path = os.path.join(os.path.dirname(__file__), 'boards.csv')
# qna_csv_file_path = os.path.join(os.path.dirname(__file__), 'qnas.csv')

app = FastAPI()
origins = [
    "http://localhost:5173",
    "*",
    "https://petpals.digital/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sbert = SentenceTransformerEmbeddings(model_name="monologg/kobert")

def export_data_to_csv():
    if os.path.exists(item_csv_file_path):
        os.remove(item_csv_file_path)
        logging.info(f"Existing {item_csv_file_path} file deleted.")

    query = "SELECT * FROM app_item;"
    engine = None
    try:
        engine = create_engine(connection_string)
        df_item = pd.read_sql_query(query, engine)
        logging.info(f"Columns in item DataFrame: {df_item.columns.tolist()}")
        
        df_category = pd.read_csv(category_csv_file_path)
        logging.info(f"Columns in category DataFrame: {df_category.columns.tolist()}")

        df_merged = df_item.merge(df_category, left_on='category_id_id', right_on='id', how='left')
        df_merged.rename(columns={'name_y': 'category_name', 'name_x': 'item_name'}, inplace=True)

        df_merged.to_csv(item_csv_file_path, index=False)
        logging.info("Data exported successfully with category names.")
    except Exception as e:
        logging.error(f"Error: {e}")
    finally:
        if engine is not None:
            engine.dispose()
# export_data_to_csv()

# # board data 조회 후, csv로 저장.
# def export_board_data_to_csv():
#     if os.path.exists(board_csv_file_path):
#         os.remove(board_csv_file_path)
#         logging.info(f"Existing {board_csv_file_path} file deleted.")

#     query = "SELECT * FROM app_board;"
#     engine = None
#     try:
#         engine = create_engine(connection_string)
#         df_board = pd.read_sql_query(query, engine)
#         logging.info(f"Columns in board DataFrame: {df_board.columns.tolist()}")

#         df_board.to_csv(board_csv_file_path, index=False)
#         logging.info("Board data exported successfully.")
#     except Exception as e:
#         logging.error(f"Error: {e}")
#     finally:
#         if engine is not None:
#             engine.dispose()
# export_board_data_to_csv()


# qna data 조회 후, csv로 저장.
# def export_qna_data_to_csv():
#     if os.path.exists(qna_csv_file_path):
#         os.remove(qna_csv_file_path)
#         logging.info(f"Existing {qna_csv_file_path} file deleted.")

#     query = "SELECT * FROM app_user_qna;"
#     engine = None
#     try:
#         engine = create_engine(connection_string)
#         df_qna = pd.read_sql_query(query, engine)
#         logging.info(f"Columns in qna DataFrame: {df_qna.columns.tolist()}")

#         df_qna.to_csv(qna_csv_file_path, index=False)
#         logging.info("Qna data exported successfully.")
#     except Exception as e:
#         logging.error(f"Error: {e}")
#     finally:
#         if engine is not None:
#             engine.dispose()
# export_qna_data_to_csv()


async def schedule_daily_task():
    while True:
        now = datetime.now()
        next_run = (now + timedelta(days=1)).replace(hour=2, minute=0, second=0, microsecond=0)
        wait_time = (next_run - now).total_seconds()
        logging.info(f"Next data export scheduled at {next_run}")
        await asyncio.sleep(wait_time)
        # export_data_to_csv(), export_board_data_to_csv(), export_qna_data_to_csv()
        export_data_to_csv()


@app.on_event("startup")
async def startup_event():
    export_data_to_csv()
    asyncio.create_task(schedule_daily_task())

# lifespan 핸들러 사용시
# from contextlib import asynccontextmanager
# from fastapi import FastAPI
# import asyncio

# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     asyncio.create_task(schedule_daily_task())
#     yield

# app = FastAPI(lifespan=lifespan)

@app.get("/search/")
async def search_items(query: str):
    
    items = pd.read_csv(item_csv_file_path)
    vector_store = Chroma.from_texts(
        texts=items['item_name'].tolist(),
        embedding=sbert
    )
    results = vector_store.similarity_search(query=query, k=10)

    if results:
        top_result_category = items[items['item_name'] == results[0].page_content]['category_name'].values[0]
        similar_category_items = items[items['category_name'] == top_result_category]
        
        if not similar_category_items.empty:  # Add this check
            category_vector_store = Chroma.from_texts(
                texts=similar_category_items['item_name'].tolist(),
                embedding=sbert
            )
            category_results = category_vector_store.similarity_search(query=query, k=10)

            unique_results = []
            seen = set()
            for result in category_results:
                if result.page_content not in seen:
                    seen.add(result.page_content)
                    unique_results.append(result)
                if len(unique_results) == 4:
                    break

            return {"query": query, "results": unique_results}
    
    return {"query": query, "results": []}


# @app.post("/b_search/")
# async def search_boards(query: str):
    
#     boards = pd.read_csv(board_csv_file_path)
#     vector_store = Chroma.from_texts(
#         texts=boards['title'].tolist() + boards['content'].tolist(),  # Consider both 'title' and 'content'
#         embedding=sbert
#     )
#     results = vector_store.similarity_search(query=query, k=10)
    
#     return {"query": query, "results": results }


# @app.post("/q_search/")
# async def search_qnas(query: str):
    
#     qnas = pd.read_csv(qna_csv_file_path)
#     vector_store = Chroma.from_texts(
#         texts=qnas['title'].tolist() + qnas['content'].tolist(),  # Consider both 'question' and 'answer'
#         embedding=sbert
#     )
#     results = vector_store.similarity_search(query=query, k=10)
    
#     return {"query": query, "results": results }