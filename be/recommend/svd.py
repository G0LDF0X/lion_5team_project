import sys
import django
from django.shortcuts import render
import os
from asgiref.sync import sync_to_async
from surprise import Dataset, Reader
from surprise import SVD
from surprise.model_selection import train_test_split
from surprise import accuracy
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

import pandas as pd
from app.models import Review, User, Item

async def fetch_reviews():
    reviews = await sync_to_async(list)(Review.objects.all().values('user_id', 'item_id', 'rate'))
    return pd.DataFrame(reviews)

async def fetch_users():
    users = await sync_to_async(list)(User.objects.all().values('id', 'username'))
    return pd.DataFrame(users)

async def fetch_items():
    items = await sync_to_async(list)(Item.objects.all().values('id', 'name'))
    return pd.DataFrame(items)

async def setup():
    global df_reviews, df_users, df_items
    df_reviews = await fetch_reviews()
    df_users = await fetch_users()
    df_items = await fetch_items()

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
