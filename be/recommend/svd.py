# import sys
# import django
import os
from asgiref.sync import sync_to_async
from surprise import Dataset, Reader
from surprise import SVD
from surprise.model_selection import train_test_split
from surprise import accuracy
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from psycopg2 import sql
from dotenv import load_dotenv
from sqlalchemy import create_engine
import logging
import asyncio
from datetime import datetime, timedelta

load_dotenv()
db_host = os.getenv('DB_HOST')
db_name = os.getenv('DB_NAME')
db_user = os.getenv('DB_USER')
db_password = os.getenv('DB_PASSWORD')
db_port = os.getenv('DB_PORT')

connection_string = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
# sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
# django.setup()

import pandas as pd
# from app.models import Review, User, Item

# async def fetch_reviews():
#     reviews = await sync_to_async(list)(Review.objects.all().values('user_id', 'item_id', 'rate'))
#     return pd.DataFrame(reviews)

# async def fetch_users():
#     users = await sync_to_async(list)(User.objects.all().values('id', 'username'))
#     return pd.DataFrame(users)

# async def fetch_items():
#     items = await sync_to_async(list)(Item.objects.all().values('id', 'name'))
#     return pd.DataFrame(items)
item_csv_file_path = os.path.join(os.path.dirname(__file__), 'csvs/item.csv')
review_csv_file_path = os.path.join(os.path.dirname(__file__), 'csvs/review.csv')
user_csv_file_path = os.path.join(os.path.dirname(__file__), 'csvs/user.csv')
def export_data_to_csv():
    if os.path.exists(csv_dir_path):
        os.remove(csv_dir_path)
        logging.info(f"Existing {csv_dir_path} file deleted.")
    


    query1 = "SELECT id, name FROM app_item;"
    query2 = "SELECT id, username FROM app_user;"
    query3 = "SELECT user_id_id, item_id_id, rate FROM app_review;"

    try:
        engine = create_engine(connection_string)
        df_item = pd.read_sql_query(query1, engine)
        logging.info(f"Columns in item DataFrame: {df_item.columns.tolist()}")
        
        df_user = pd.read_sql_query(query2, engine)
        logging.info(f"Columns in user DataFrame: {df_user.columns.tolist()}")
        
        df_review = pd.read_sql_query(query3, engine)
        df_review.rename(columns={'user_id_id':'user_id', 'item_id_id':'item_id'}, inplace=True)
        logging.info(f"Columns in category DataFrame: {df_review.columns.tolist()}")
        df_item.to_csv(os.path.join(item_csv_file_path), index=False)
        df_review.to_csv(os.path.join(review_csv_file_path), index=False)
        df_user.to_csv(os.path.join(user_csv_file_path), index=False)
        logging.info("Data exported to csv successfully")
    except Exception as e:
        logging.error(f"Error during data export: {e}")
async def schedule_daily_task():
    while True:
        now = datetime.now()
        next_run = (now + timedelta(days=1)).replace(hour=2, minute=0, second=0, microsecond=0)
        wait_time = (next_run - now).total_seconds()
        logging.info(f"Next data export scheduled at {next_run}")
        await asyncio.sleep(wait_time)
        export_data_to_csv()

async def setup():
    await schedule_daily_task()
    global df_reviews, df_users, df_items
    df_reviews = pd.read_csv(review_csv_file_path)
    df_users = pd.read_csv(user_csv_file_path)
    df_items = pd.read_csv(item_csv_file_path)

    return df_reviews, df_users, df_items

reader = Reader(rating_scale=(1, 5))
async def get_recommendations(user_id):
    global df_reviews, df_items, reader
    data = Dataset.load_from_df(df_reviews[['user_id', 'item_id', 'rate']], reader)

    trainset, testset = train_test_split(data, test_size=0.25)

    algo = SVD()
    algo.fit(trainset)

    predictions = algo.test(testset)

    accuracy.rmse(predictions)

    items_ids = df_items['id'].unique()
    items_to_rate = [item for item in items_ids if item not in df_reviews[df_reviews['user_id'] == user_id]['item_id'].values]

    predictions = [algo.predict(user_id, item_id) for item_id in items_to_rate]

    recommendations = sorted(predictions, key=lambda x: x.est, reverse=True)

    top_5_recommendations = recommendations[:5]
    top_items = []
    for rec in top_5_recommendations:
        item_id = rec.iid
        item = df_items[df_items['id'] == item_id].iloc[0]
        top_items.append({'item_id': int(item_id), 'item_name': item['name'], 'estimated_rating': rec.est})

    return top_items
# data = Dataset.load_from_df(df_reviews[['user_id', 'item_id', 'rate']], reader)

# trainset, testset = train_test_split(data, test_size=0.25)

# algo = SVD()
# algo.fit(trainset)

# predictions = algo.test(testset)

# accuracy.rmse(predictions)
# user_id = 1
# items_ids = df_items['id'].unique()

# items_to_rate = [item for item in items_ids if item not in df_reviews[df_reviews['user_id'] == user_id]['item_id'].values]

# predictions = [algo.predict(user_id, item_id) for item_id in items_to_rate]

# recommendations = sorted(predictions, key=lambda x: x.est, reverse=True)

# top_5_recommendations = recommendations[:5]
# top_items = []
# for rec in top_5_recommendations:
#     item_id = rec.iid
#     item = df_items[df_items['id'] == item_id].iloc[0]
#     top_items.append({'item_id': item_id, 'item_name': item['name'], 'estimated_rating': rec.est})

# print(top_items)

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    global df_reviews, df_users, df_items
    df_reviews, df_users, df_items = await setup()

@app.get("/recommend/")
async def recommend(user_id: int):
    return await get_recommendations(user_id)
