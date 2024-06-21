# from fastapi import FastAPI, HTTPException, BackgroundTasks
# from fastapi.middleware.cors import CORSMiddleware
# from langchain.embeddings import SentenceTransformerEmbeddings
# from langchain.vectorstores import Chroma
# import os
# import pandas as pd
# from sqlalchemy import create_engine
# from dotenv import load_dotenv
# import logging
# from datetime import datetime, timedelta
# import asyncio
# # import faiss


# # from starlette.middleware.cors import CORSMiddleware

# logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# load_dotenv()

# db_host = os.getenv('DB_HOST')
# db_name = os.getenv('DB_NAME')
# db_user = os.getenv('DB_USER')
# db_password = os.getenv('DB_PASSWORD')
# db_port = os.getenv('DB_PORT')

# connection_string = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"

# item_csv_file_path = os.path.join(os.path.dirname(__file__), 'items.csv')
# category_csv_file_path = os.path.join(os.path.dirname(__file__), 'category.csv')
# app = FastAPI()
# origins = [
#     "http://localhost:5173",
#     "*"
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# sbert = SentenceTransformerEmbeddings(model_name="jhgan/ko-sroberta-multitask")

# def export_data_to_csv():
#     if os.path.exists(item_csv_file_path):
#         os.remove(item_csv_file_path)
#         logging.info(f"Existing {item_csv_file_path} file deleted.")

#     query = "SELECT * FROM app_item;"
#     engine = None
#     try:
#         engine = create_engine(connection_string)
#         df_item = pd.read_sql_query(query, engine)
#         logging.info(f"Columns in item DataFrame: {df_item.columns.tolist()}")
        
#         df_category = pd.read_csv(category_csv_file_path)
#         logging.info(f"Columns in category DataFrame: {df_category.columns.tolist()}")

#         df_merged = df_item.merge(df_category, left_on='category_id_id', right_on='id', how='left')
#         df_merged.rename(columns={'name_y': 'category_name', 'name_x': 'item_name'}, inplace=True)

#         df_merged.to_csv(item_csv_file_path, index=False)
#         logging.info("Data exported successfully with category names.")
#     except Exception as e:
#         logging.error(f"Error: {e}")
#     finally:
#         if engine is not None:
#             engine.dispose()
# export_data_to_csv()

# async def schedule_daily_task():
#     while True:
#         now = datetime.now()
#         next_run = (now + timedelta(days=1)).replace(hour=2, minute=0, second=0, microsecond=0)
#         wait_time = (next_run - now).total_seconds()
#         logging.info(f"Next data export scheduled at {next_run}")
#         await asyncio.sleep(wait_time)
#         export_data_to_csv()

# @app.on_event("startup")
# async def startup_event():
#     asyncio.create_task(schedule_daily_task())

# @app.post("/search/")
# async def search_items(query: str):
    
#     items = pd.read_csv(item_csv_file_path)
#     vector_store = Chroma.from_texts(
#         texts=items['item_name'].tolist(),
#         embedding=sbert
#     )
#     results = vector_store.similarity_search(query=query, k=10)

#     if results:
#         top_result_category = items[items['item_name'] == results[0].page_content]['category_name'].values[0]
#         similar_category_items = items[items['category_name'] == top_result_category]
        
#         if not similar_category_items.empty:  # Add this check
#             category_vector_store = Chroma.from_texts(
#                 texts=similar_category_items['item_name'].tolist(),
#                 embedding=sbert
#             )
#             category_results = category_vector_store.similarity_search(query=query, k=10)

#             unique_results = []
#             seen = set()
#             for result in category_results:
#                 if result.page_content not in seen:
#                     seen.add(result.page_content)
#                     unique_results.append(result)
#                 if len(unique_results) == 4:
#                     break

#             return {"query": query, "results": unique_results}
    
#     return {"query": query, "results": []}
# # from fastapi import FastAPI, HTTPException, BackgroundTasks, Query
# # from fastapi.middleware.cors import CORSMiddleware
# # from langchain.embeddings import SentenceTransformerEmbeddings
# # from langchain_huggingface import HuggingFaceEmbeddings
# # import faiss
# # import numpy as np
# # import os
# # import pandas as pd
# # from sqlalchemy import create_engine
# # from dotenv import load_dotenv
# # import logging
# # from datetime import datetime, timedelta
# # import asyncio

# # logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
# # logger = logging.getLogger()
# # logger.setLevel(logging.INFO)

# # load_dotenv()

# # db_host = os.getenv('DB_HOST')
# # db_name = os.getenv('DB_NAME')
# # db_user = os.getenv('DB_USER')
# # db_password = os.getenv('DB_PASSWORD')
# # db_port = os.getenv('DB_PORT')

# # connection_string = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"

# # item_csv_file_path = os.path.join(os.path.dirname(__file__), 'items.csv')
# # category_csv_file_path = os.path.join(os.path.dirname(__file__), 'category.csv')
# # app = FastAPI()
# # origins = [
# #     "http://localhost:5173",
# #     "*"
# # ]

# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=origins,
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# # )

# # # Load the embedding model with error handling

# # sbert = SentenceTransformerEmbeddings(model_name="jhgan/ko-sroberta-multitask")
# # logger.info("Model loaded successfully.")
# # def preprocess_text(text):
# #     return text.lower()

# # def export_data_to_csv():
# #     if os.path.exists(item_csv_file_path):
# #         os.remove(item_csv_file_path)
# #         logger.info(f"Existing {item_csv_file_path} file deleted.")

# #     query = "SELECT * FROM app_item;"
# #     engine = None
# #     try:
# #         engine = create_engine(connection_string)
# #         df_item = pd.read_sql_query(query, engine)
# #         logger.info(f"Columns in item DataFrame: {df_item.columns.tolist()}")
        
# #         df_category = pd.read_csv(category_csv_file_path)
# #         logger.info(f"Columns in category DataFrame: {df_category.columns.tolist()}")

# #         df_merged = df_item.merge(df_category, left_on='category_id_id', right_on='id', how='left')
# #         df_merged.rename(columns={'name_y': 'category_name', 'name_x': 'item_name'}, inplace=True)

# #         df_merged['item_name'] = df_merged['item_name'].apply(preprocess_text)
# #         df_merged.to_csv(item_csv_file_path, index=False)
# #         logger.info("Data exported successfully with category names.")
# #     except Exception as e:
# #         logger.error(f"Error: {e}")
# #     finally:
# #         if engine is not None:
# #             engine.dispose()

# # @app.on_event("startup")
# # async def startup_event():
# #     asyncio.create_task(schedule_daily_task())

# # async def schedule_daily_task():
# #     while True:
# #         now = datetime.now()
# #         next_run = (now + timedelta(days=1)).replace(hour=2, minute=0, second=0, microsecond=0)
# #         wait_time = (next_run - now).total_seconds()
# #         logger.info(f"Next data export scheduled at {next_run}")
# #         await asyncio.sleep(wait_time)
# #         export_data_to_csv()

# # @app.post("/search/")
# # async def search_items(query: str = Query(...)):
# #     logger.info(f"Search query received: {query}")
# #     items = pd.read_csv(item_csv_file_path)
# #     items['item_name'] = items['item_name'].apply(preprocess_text)

# #     try:
# #         texts = items['item_name'].tolist()
# #         embeddings = sbert.encode(texts)
        
# #         index = faiss.IndexFlatL2(embeddings.shape[1])
# #         index.add(np.array(embeddings).astype(np.float32))
        
# #         query_embedding = sbert.encode([preprocess_text(query)])
# #         distances, indices = index.search(np.array(query_embedding).astype(np.float32), k=10)
        
# #         results = [texts[idx] for idx in indices[0]]
# #         logger.debug(f"Initial search results: {results}")

# #         if results:
# #             top_result_category = items[items['item_name'] == results[0]]['category_name'].values[0]
# #             similar_category_items = items[items['category_name'] == top_result_category]
            
# #             if not similar_category_items.empty:
# #                 category_texts = similar_category_items['item_name'].tolist()
# #                 category_embeddings = sbert.encode(category_texts)
                
# #                 category_index = faiss.IndexFlatL2(category_embeddings.shape[1])
# #                 category_index.add(np.array(category_embeddings).astype(np.float32))
                
# #                 category_distances, category_indices = category_index.search(np.array(query_embedding).astype(np.float32), k=10)
# #                 category_results = [category_texts[idx] for idx in category_indices[0]]
# #                 logger.debug(f"Category-based search results: {category_results}")

# #                 unique_results = []
# #                 seen = set()
# #                 for result in category_results:
# #                     if result not in seen:
# #                         seen.add(result)
# #                         unique_results.append(result)
# #                     if len(unique_results) == 4:
# #                         break

# #                 logger.info(f"Final unique results: {unique_results}")
# #                 return {"query": query, "results": unique_results}
# #     except Exception as e:
# #         logger.error(f"Error during search: {e}")
# #         raise HTTPException(status_code=500, detail="Internal server error")
    
# #     logger.info("No results found")
# #     return {"query": query, "results": []}

# # # export_data_to_csv()
from fastapi import FastAPI, HTTPException, BackgroundTasks, Query
from fastapi.middleware.cors import CORSMiddleware
from langchain_huggingface import HuggingFaceEmbeddings
# import faiss
import numpy as np
import os
import pandas as pd
from sqlalchemy import create_engine
from dotenv import load_dotenv
import logging
from datetime import datetime, timedelta
import asyncio

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger()
logger.setLevel(logging.INFO)

load_dotenv()

db_host = os.getenv('DB_HOST')
db_name = os.getenv('DB_NAME')
db_user = os.getenv('DB_USER')
db_password = os.getenv('DB_PASSWORD')
db_port = os.getenv('DB_PORT')

connection_string = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"

item_csv_file_path = os.path.join(os.path.dirname(__file__), 'items.csv')
category_csv_file_path = os.path.join(os.path.dirname(__file__), 'category.csv')
app = FastAPI()
origins = [
    "http://localhost:5173",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the embedding model with error handling
try:
    embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/xlm-r-100langs-bert-base-nli-stsb-mean-tokens")
    logger.info("Model loaded successfully.")
except Exception as e:
    logger.error(f"Error loading model: {e}")

def preprocess_text(text):
    return text.lower()

def export_data_to_csv():
    if os.path.exists(item_csv_file_path):
        os.remove(item_csv_file_path)
        logger.info(f"Existing {item_csv_file_path} file deleted.")

    query = "SELECT * FROM app_item;"
    engine = None
    try:
        engine = create_engine(connection_string)
        df_item = pd.read_sql_query(query, engine)
        logger.info(f"Columns in item DataFrame: {df_item.columns.tolist()}")
        
        df_category = pd.read_csv(category_csv_file_path)
        logger.info(f"Columns in category DataFrame: {df_category.columns.tolist()}")

        df_merged = df_item.merge(df_category, left_on='category_id_id', right_on='id', how='left')
        df_merged.rename(columns={'name_y': 'category_name', 'name_x': 'item_name'}, inplace=True)

        df_merged['item_name'] = df_merged['item_name'].apply(preprocess_text)
        df_merged.to_csv(item_csv_file_path, index=False)
        logger.info("Data exported successfully with category names.")
    except Exception as e:
        logger.error(f"Error: {e}")
    finally:
        if engine is not None:
            engine.dispose()

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(schedule_daily_task())

async def schedule_daily_task():
    while True:
        now = datetime.now()
        next_run = (now + timedelta(days=1)).replace(hour=2, minute=0, second=0, microsecond=0)
        wait_time = (next_run - now).total_seconds()
        logger.info(f"Next data export scheduled at {next_run}")
        await asyncio.sleep(wait_time)
        export_data_to_csv()

@app.post("/search/")
async def search_items(query: str = Query(...)):
    logger.info(f"Search query received: {query}")
    items = pd.read_csv(item_csv_file_path)
    items['item_name'] = items['item_name'].apply(preprocess_text)

    try:
        texts = items['item_name'].tolist()
        embeddings = embedding_model.embed_texts(texts)
        
        index = faiss.IndexFlatL2(embeddings.shape[1])
        index.add(np.array(embeddings).astype(np.float32))
        
        query_embedding = embedding_model.embed_texts([preprocess_text(query)])
        distances, indices = index.search(np.array(query_embedding).astype(np.float32), k=10)
        
        results = [texts[idx] for idx in indices[0]]
        logger.debug(f"Initial search results: {results}")

        if results:
            top_result_category = items[items['item_name'] == results[0]]['category_name'].values[0]
            similar_category_items = items[items['category_name'] == top_result_category]
            
            if not similar_category_items.empty:
                category_texts = similar_category_items['item_name'].tolist()
                category_embeddings = embedding_model.embed_texts(category_texts)
                
                category_index = faiss.IndexFlatL2(category_embeddings.shape[1])
                category_index.add(np.array(category_embeddings).astype(np.float32))
                
                category_distances, category_indices = category_index.search(np.array(query_embedding).astype(np.float32), k=10)
                category_results = [category_texts[idx] for idx in category_indices[0]]
                logger.debug(f"Category-based search results: {category_results}")

                unique_results = []
                seen = set()
                for result in category_results:
                    if result not in seen:
                        seen.add(result)
                        unique_results.append(result)
                    if len(unique_results) == 4:
                        break

                logger.info(f"Final unique results: {unique_results}")
                return {"query": query, "results": unique_results}
    except Exception as e:
        logger.error(f"Error during search: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
    
    logger.info("No results found")
    return {"query": query, "results": []}

# export_data_to_csv()
