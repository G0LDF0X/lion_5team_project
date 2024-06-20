# from fastapi import FastAPI, BackgroundTasks
# import pickle
# import torch
# from typing import List
# from . import schemas
# from .database import SessionLocal
# from .train_models import train_svd_model, train_rbm_model, load_and_preprocess_data
# from .train_board_models import train_board_svd_model, train_board_rbm_model, load_and_preprocess_board_data, RBM
# import sys
# import os
# import django
# from asgiref.sync import sync_to_async
# import pandas as pd
# import aioredis
# from django.core.exceptions import ObjectDoesNotExist
# from fastapi.middleware.cors import CORSMiddleware

# sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
# django.setup()
# from app.models import Item, Board, User 

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
# redis = aioredis.from_url("redis://127.0.0.1:6379", encoding="utf-8", decode_responses=True)
# @app.on_event("startup")
# async def startup_event():
#     background_tasks = BackgroundTasks()
#     background_tasks.add_task(train_svd_model)
#     background_tasks.add_task(train_rbm_model)
#     background_tasks.add_task(train_board_svd_model)
#     background_tasks.add_task(train_board_rbm_model)
#     background_tasks.add_task(generate_all_user_recommendations)  # Add this line to generate recommendations for all users
#     await background_tasks()

# @app.post("/train")
# async def train_models(background_tasks: BackgroundTasks):
#     background_tasks.add_task(sync_to_async(train_svd_model))
#     background_tasks.add_task(sync_to_async(train_rbm_model))
#     background_tasks.add_task(sync_to_async(train_board_svd_model))
#     background_tasks.add_task(sync_to_async(train_board_rbm_model))
#     return {"message": "Training started in background"}

# @app.get("/recommendations/{user_id}", response_model=List[schemas.DetailedRecommendationResponse])
# async def get_recommendations(user_id: int):
#     cache_key = f"recommendations_{user_id}"
#     recommendations = await redis.get(cache_key)
    
#     if recommendations is None:
#         recommendations = await generate_recommendations(user_id)
#         await redis.set(cache_key, recommendations, ex=24*60*60)
#     # background_tasks.add_task(generate_recommendations, user_id)
#     return recommendations

# @app.get("/board-recommendations/{user_id}", response_model=List[schemas.BoardRecommendationResponse])
# async def get_board_recommendations(user_id: int):
#     cache_key = f"board_recommendations_{user_id}"
#     recommendations = await redis.get(cache_key)
    
#     if recommendations is None:
#         recommendations = await generate_board_recommendations(user_id)
#         await redis.set(cache_key, recommendations, ex=24*60*60)
#     # background_tasks.add_task(generate_board_recommendations, user_id)
#     return recommendations

# async def generate_all_user_recommendations():
#     users = await sync_to_async(list)(User.objects.all())
#     for user in users:
#         user_id = user.id
#         recommendations = await generate_recommendations(user_id)
#         await redis.set(f"recommendations_{user_id}", recommendations, ex=24*60*60)

#         board_recommendations = await generate_board_recommendations(user_id)
#         await redis.set(f"board_recommendations_{user_id}", board_recommendations, ex=24*60*60)

# async def generate_recommendations(user_id: int):   
#     svd_model_path = 'svd_model.pkl'
#     rbm_model_path = 'rbm_model.pkl'

#     if not os.path.exists(svd_model_path) or not os.path.exists(rbm_model_path):
#         return await get_top_rated_items()

#     with open(svd_model_path, 'rb') as f:
#         svd_model = pickle.load(f)

#     with open(rbm_model_path, 'rb') as f:
#         rbm_model = pickle.load(f)

#     df_agg = await load_and_preprocess_data()
#     user_interactions = df_agg[df_agg['user_id'] == user_id]
#     shown_items = user_interactions['content_id'].tolist()
#     items = df_agg['content_id'].unique()

#     recommendations = []

#     for item in items:
#         if item in shown_items:
#             continue

#         svd_score = 0
#         rbm_score = 0

#         if svd_model:
#             svd_score = svd_model.predict(user_id, item).est

#         if rbm_model:
#             user_vector = torch.zeros(rbm_model.W.shape[1])  # Initialize with zeros
#             if not user_interactions.empty:
#                 user_interaction_matrix = user_interactions.pivot(index='user_id', columns='content_id', values='rating').fillna(0)
#                 user_interaction_values = user_interaction_matrix.values.flatten()
#                 user_vector[:len(user_interaction_values)] = torch.FloatTensor(user_interaction_values)
#                 user_vector = user_vector.to(rbm_model.W.device)
                
#             rbm_score = rbm_model(user_vector.unsqueeze(0)).mean().item()  # Take the mean of the output tensor

#         combined_score = svd_score + rbm_score
#         recommendations.append((item, combined_score))

#     recommendations.sort(key=lambda x: x[1], reverse=True)

#     return await get_items_from_ids([rec[0] for rec in recommendations[:10]])

# async def generate_board_recommendations(user_id: int):
#     svd_model_path = 'board_svd_model.pkl'
#     rbm_model_path = 'board_rbm_model.pkl'

#     if not os.path.exists(svd_model_path) or not os.path.exists(rbm_model_path):
#         return await get_top_rated_boards()

#     with open(svd_model_path, 'rb') as f:
#         svd_model = pickle.load(f)

#     with open(rbm_model_path, 'rb') as f:
#         rbm_model = pickle.load(f)

#     df_agg = await load_and_preprocess_board_data()
#     user_interactions = df_agg[df_agg['user_id_id'] == user_id]
#     shown_boards = user_interactions['content_id'].tolist()
#     boards = df_agg['content_id'].unique()

#     recommendations = []

#     for board in boards:
#         if board in shown_boards:
#             continue

#         user_vector = torch.zeros(rbm_model.W.shape[1])
#         if not user_interactions.empty:
#             user_interaction_matrix = user_interactions.pivot(index='user_id_id', columns='content_id', values='rating').fillna(0)
#             user_interaction_values = user_interaction_matrix.values.flatten()
#             user_vector[:len(user_interaction_values)] = torch.FloatTensor(user_interaction_values)
#             user_vector = user_vector.to(rbm_model.W.device)

#         content_scores = rbm_model.calculate_similarity_scores(user_vector)

#         recommendations.append((board, content_scores.mean()))  # Use mean similarity score

#     recommendations.sort(key=lambda x: x[1], reverse=True)

#     return await get_boards_from_ids([rec[0] for rec in recommendations[:10]])

# async def get_items_from_ids(item_ids):
#     items = await sync_to_async(list)(Item.objects.filter(id__in=item_ids))
#     response_data = [
#         {
#             'id': item.id,
#             'name': item.name,
#             'image_url': item.image_url.url if item.image_url else '',
#             'description': item.description,
#             'price': item.price,
#             'score': item.rate
#         }
#         for item in items
#     ]
#     return response_data

# async def get_boards_from_ids(board_ids):
#     boards = await sync_to_async(list)(Board.objects.filter(id__in=board_ids).select_related('user_id'))
#     response_data = await sync_to_async(list)([
#         {
#             'id': board.id,
#             'title': board.title,
#             'image_url': board.image_url.url if board.image_url else '',
#             'username': board.user_id.username,
#             'user_image': board.user_id.image_url.url if board.user_id.image_url else '',
#             'content': board.content,
#             'created_at': board.created_at.isoformat(),
#             'score': board.show,
#             'user_id': board.user_id_id
#         }
#         for board in boards
#     ])
#     return response_data
from fastapi import FastAPI, BackgroundTasks, Depends
import pickle
import torch
from typing import List
from cachetools import TTLCache
from cachetools import cached as cachetools_cached
from . import schemas
from .database import SessionLocal
from .train_models import train_svd_model, train_rbm_model, load_and_preprocess_data
from .train_board_models import train_board_svd_model, train_board_rbm_model, load_and_preprocess_board_data, RBM
import sys
import os
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
from asgiref.sync import sync_to_async

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
from app.models import Item, Board, User

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

# Configure cachetools with a TTL cache
cache = TTLCache(maxsize=1000, ttl=24*60*60)

@app.on_event("startup")
async def startup_event():
    background_tasks = BackgroundTasks()
    background_tasks.add_task(train_svd_model)
    background_tasks.add_task(train_rbm_model)
    background_tasks.add_task(train_board_svd_model)
    background_tasks.add_task(train_board_rbm_model)
    background_tasks.add_task(generate_all_user_recommendations)
    await background_tasks()

@app.post("/train")
async def train_models(background_tasks: BackgroundTasks):
    background_tasks.add_task(train_svd_model)
    background_tasks.add_task(train_rbm_model)
    background_tasks.add_task(train_board_svd_model)
    background_tasks.add_task(train_board_rbm_model)
    return {"message": "Training started in background"}

@app.get("/recommendations/{user_id}", response_model=List[schemas.DetailedRecommendationResponse])
@cachetools_cached(cache, key=lambda *args, **kwargs: f"recommendations_{kwargs['user_id']}")
async def get_recommendations(user_id: int):
    recommendations = await generate_recommendations(user_id)
    return recommendations

@app.get("/board-recommendations/{user_id}", response_model=List[schemas.BoardRecommendationResponse])
@cachetools_cached(cache, key=lambda *args, **kwargs: f"board_recommendations_{kwargs['user_id']}")
async def get_board_recommendations(user_id: int):
    recommendations = await generate_board_recommendations(user_id)
    return recommendations

async def generate_all_user_recommendations():
    users = await sync_to_async(list)(User.objects.all())
    for user in users:
        user_id = user.id
        recommendations = await generate_recommendations(user_id)
        cache[f"recommendations_{user_id}"] = recommendations

        board_recommendations = await generate_board_recommendations(user_id)
        cache[f"board_recommendations_{user_id}"] = board_recommendations

async def generate_recommendations(user_id: int):   
    svd_model_path = 'svd_model.pkl'
    rbm_model_path = 'rbm_model.pkl'

    if not os.path.exists(svd_model_path) or not os.path.exists(rbm_model_path):
        return await get_top_rated_items()

    with open(svd_model_path, 'rb') as f:
        svd_model = pickle.load(f)

    with open(rbm_model_path, 'rb') as f:
        rbm_model = pickle.load(f)

    df_agg = await load_and_preprocess_data()
    user_interactions = df_agg[df_agg['user_id'] == user_id]
    shown_items = user_interactions['content_id'].tolist()
    items = df_agg['content_id'].unique()

    recommendations = []

    for item in items:
        if item in shown_items:
            continue

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

    return await get_items_from_ids([rec[0] for rec in recommendations[:10]])

async def generate_board_recommendations(user_id: int):
    svd_model_path = 'board_svd_model.pkl'
    rbm_model_path = 'board_rbm_model.pkl'

    if not os.path.exists(svd_model_path) or not os.path.exists(rbm_model_path):
        return await get_top_rated_boards()

    with open(svd_model_path, 'rb') as f:
        svd_model = pickle.load(f)

    with open(rbm_model_path, 'rb') as f:
        rbm_model = pickle.load(f)

    df_agg = await load_and_preprocess_board_data()
    user_interactions = df_agg[df_agg['user_id_id'] == user_id]
    shown_boards = user_interactions['content_id'].tolist()
    boards = df_agg['content_id'].unique()

    recommendations = []

    for board in boards:
        if board in shown_boards:
            continue

        user_vector = torch.zeros(rbm_model.W.shape[1])
        if not user_interactions.empty:
            user_interaction_matrix = user_interactions.pivot(index='user_id_id', columns='content_id', values='rating').fillna(0)
            user_interaction_values = user_interaction_matrix.values.flatten()
            user_vector[:len(user_interaction_values)] = torch.FloatTensor(user_interaction_values)
            user_vector = user_vector.to(rbm_model.W.device)

        content_scores = rbm_model.calculate_similarity_scores(user_vector)

        recommendations.append((board, content_scores.mean()))  # Use mean similarity score

    recommendations.sort(key=lambda x: x[1], reverse=True)

    return await get_boards_from_ids([rec[0] for rec in recommendations[:10]])

async def get_items_from_ids(item_ids):
    items = await sync_to_async(list)(Item.objects.filter(id__in=item_ids))
    response_data = [
        {
            'id': item.id,
            'name': item.name,
            'image_url': item.image_url.url if item.image_url else '',
            'description': item.description,
            'price': item.price,
            'score': item.rate
        }
        for item in items
    ]
    return response_data

async def get_boards_from_ids(board_ids):
    boards = await sync_to_async(list)(Board.objects.filter(id__in=board_ids).select_related('user_id'))
    response_data = await sync_to_async(list)([
        {
            'id': board.id,
            'title': board.title,
            'image_url': board.image_url.url if board.image_url else '',
            'username': board.user_id.username,
            'user_image': board.user_id.image_url.url if board.user_id.image_url else '',
            'content': board.content,
            'created_at': board.created_at.isoformat(),
            'score': board.show,
            'user_id': board.user_id_id
        }
        for board in boards
    ])
    return response_data
