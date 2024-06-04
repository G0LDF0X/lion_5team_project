import requests
import sys
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
import django
import pandas as pd
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from surprise import Dataset, Reader, KNNBasic
from surprise.model_selection import train_test_split
from surprise import accuracy
from asgiref.sync import sync_to_async
import numpy as np

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from app.models import Review, User, Item

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
    global df_reviews, df_users, df_items, algo
    df_reviews = await fetch_reviews()
    df_users = await fetch_users()
    df_items = await fetch_items()

    reader = Reader(rating_scale=(1, 5))
    data = Dataset.load_from_df(df_reviews[['user_id', 'item_id', 'rate']], reader)

    trainset, testset = train_test_split(data, test_size=0.25)

    sim_options = {
        'name': 'cosine',
        'user_based': True
    }

    algo = KNNBasic(sim_options=sim_options)
    algo.fit(trainset)

async def get_recommendations(user_id: int):
    items_ids = df_items['id'].unique()
    items_to_rate = [item for item in items_ids if item not in df_reviews[df_reviews['user_id'] == user_id]['item_id'].values]

    predictions = [algo.predict(user_id, item_id) for item_id in items_to_rate]
    recommendations = sorted(predictions, key=lambda x: x.est, reverse=True)
    top_5_recommendations = recommendations[:5]

    top_items = []
    for rec in top_5_recommendations:
        item_id = int(rec.iid)
        item = df_items[df_items['id'] == item_id].iloc[0]
        top_items.append({'item_id': item_id, 'item_name': item['name'], 'estimated_rating': rec.est})

    return top_items

@app.get("/recommend/")
async def recommend(user_id: int):
    try:
        recommendations = await get_recommendations(user_id)
        return recommendations
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.on_event("startup")
async def startup_event():
    await setup()
