from fastapi import FastAPI, BackgroundTasks
import pickle
import torch
from typing import List
from . import schemas
from .database import SessionLocal
from .train_models import train_svd_model, train_rbm_model, load_and_preprocess_data, RBM
import sys
import os
import django
from asgiref.sync import sync_to_async
import numpy as np  
from .train_board_models import train_board_svd_model, train_board_rbm_model, load_and_preprocess_board_data
from django.core.exceptions import ObjectDoesNotExist
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()
from app.models import Item, Board  # Ensure you import the Item model

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    await train_svd_model()
    await train_rbm_model()
    await train_board_svd_model()
    await train_board_rbm_model()

@app.post("/train")
async def train_models(background_tasks: BackgroundTasks):
    background_tasks.add_task(sync_to_async(train_svd_model))
    background_tasks.add_task(sync_to_async(train_rbm_model))
    background_tasks.add_task(sync_to_async(train_board_svd_model))
    background_tasks.add_task(sync_to_async(train_board_rbm_model))
    return {"message": "Training started in background"}

@app.get("/recommendations/{user_id}", response_model=List[schemas.DetailedRecommendationResponse])
async def get_recommendations(user_id: int):
    svd_model_path = 'svd_model.pkl'
    rbm_model_path = 'rbm_model.pkl'

    if not os.path.exists(svd_model_path) or not os.path.exists(rbm_model_path):
        return {"error": "Model files not found. Ensure the models are trained and saved."}

    with open(svd_model_path, 'rb') as f:
        svd_model = pickle.load(f)

    with open(rbm_model_path, 'rb') as f:
        rbm_model = pickle.load(f)

    df_agg = await load_and_preprocess_data()
    user_interactions = df_agg[df_agg['user_id'] == user_id]
    items = df_agg['content_id'].unique()
    recommendations = []

    for item in items:
        svd_score = 0
        rbm_score = 0

        if svd_model:
            svd_score = svd_model.predict(user_id, item).est
        
        if rbm_model:
            user_vector = torch.zeros(rbm_model.W.shape[1])  # Initialize with zeros
            if not user_interactions.empty:
                user_interaction_matrix = user_interactions.pivot(index='user_id', columns='content_id', values='rating').fillna(0)
                user_interaction_values = user_interaction_matrix.values.flatten()
                user_vector[:len(user_interaction_values)] = torch.FloatTensor(user_interaction_values)
                user_vector = user_vector.to(rbm_model.W.device)
                
            rbm_score = rbm_model(user_vector.unsqueeze(0)).mean().item()  # Take the mean of the output tensor

        combined_score = svd_score + rbm_score
        recommendations.append((item, combined_score))

    recommendations.sort(key=lambda x: x[1], reverse=True)

    # Fetch additional item details from the database
    response_data = []
    for rec in recommendations[:10]:
        print(rec)
        item = await sync_to_async(Item.objects.get)(id=rec[0])
        print(item.id)
        await sync_to_async(response_data.append)({
            'item_id': item.id,
            'name': item.name,
            'image_url': item.image_url.url if item.image_url else '',
            'price': item.price,
            'score': rec[1]
        })
        print("resonse:",response_data)

    return response_data

@app.get("/board-recommendations/{user_id}", response_model=List[schemas.DetailedRecommendationResponse])
async def get_board_recommendations(user_id: int):
    svd_model_path = 'board_svd_model.pkl'
    rbm_model_path = 'board_rbm_model.pkl'

    if not os.path.exists(svd_model_path) or not os.path.exists(rbm_model_path):
        return {"error": "Model files not found. Ensure the models are trained and saved."}

    with open(svd_model_path, 'rb') as f:
        svd_model = pickle.load(f)

    with open(rbm_model_path, 'rb') as f:
        rbm_model = pickle.load(f)

    df_agg = await load_and_preprocess_board_data()
    user_interactions = df_agg[df_agg['user_id_id'] == user_id]
    items = df_agg['content_id'].unique()
    recommendations = []

    for item in items:
        svd_score = 0
        rbm_score = 0

        if svd_model:
            svd_score = svd_model.predict(user_id, item).est
        
        if rbm_model:
            user_vector = torch.zeros(rbm_model.W.shape[1])
            if not user_interactions.empty:
                user_interaction_matrix = user_interactions.pivot(index='user_id_id', columns='content_id', values='rating').fillna(0)
                user_interaction_values = user_interaction_matrix.values.flatten()
                user_vector[:len(user_interaction_values)] = torch.FloatTensor(user_interaction_values)
                user_vector = user_vector.to(rbm_model.W.device)

            rbm_score = rbm_model(user_vector.unsqueeze(0)).mean().item()
    
        combined_score = svd_score + rbm_score
        recommendations.append((item, combined_score))

    recommendations.sort(key=lambda x: x[1], reverse=True)

    response_data = []
    print(recommendations)
    for rec in recommendations[:10]:
        print (rec)
        try:
            board = await sync_to_async(Board.objects.get)(id=rec[0])
            print (board.id)
            if not board:
                continue
                
            await sync_to_async(response_data.append)({
                'board_id': board.id,
                'title': board.title,
                'image_url': board.image_url.url if board.image_url else '' ,
                
                'score': rec[1]
            })
        except ObjectDoesNotExist:
        
            continue

    return response_data