import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from surprise import Dataset, Reader, SVD, accuracy
from surprise.model_selection import train_test_split
import pickle
from datetime import datetime
import torch
from torch import nn
import torch.optim as optim
import os
import sys
import django
from asgiref.sync import sync_to_async
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

django.setup()

from app.models import Interaction
from dotenv import load_dotenv

load_dotenv()

db_host = os.getenv('DB_HOST')
db_name = os.getenv('DB_NAME')
db_user = os.getenv('DB_USER')
db_password = os.getenv('DB_PASSWORD')
db_port = os.getenv('DB_PORT')

connection_string = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
engine = create_engine(connection_string)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@sync_to_async
def fetch_interactions():
    query = """
    SELECT
        id,
        user_id_id AS user_id,
        content_id,
        interaction_type,
        stay_time,
        timestamp
    FROM app_interaction
    WHERE content_type = 'board'
    """
    return pd.read_sql(query, engine)

print(fetch_interactions())
T = 7  
def apply_time_decay(df, T):
    t_now = datetime.now()
    t_now = t_now.replace(tzinfo=None)
    df['decayed_weight'] = df.apply(lambda row: row['interaction_weight'] * 0.5 ** ((t_now - row['timestamp']).days / T), axis=1)
    return df

async def load_and_preprocess_data():
    df = await fetch_interactions()

    df['stay_time_seconds'] = df['stay_time'].apply(lambda x: x.total_seconds() if pd.notnull(x) else 0)

    df['stay_time_normalized'] = (df['stay_time_seconds'] - df['stay_time_seconds'].min()) / (df['stay_time_seconds'].max() - df['stay_time_seconds'].min())

    average_stay_time = df['stay_time_seconds'].mean()
    interaction_weights = {
        'view': 3 if average_stay_time > 90 else(2 if average_stay_time > 60 else 1) ,
        'like': 2,
        'bookmark': 3,
        'purchase': 5,
        'comment': 2,
        'review': 4
    }
    df['interaction_weight'] = df['interaction_type'].apply(lambda x: interaction_weights.get(x, 1))

    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df = apply_time_decay(df, T)

    # Combine decayed weight and normalized stay time to form a rating
    df['rating'] = df['decayed_weight'] * (1 + df['stay_time_normalized'])

    # Aggregate ratings for each (user_id, content_id) pair
    df_agg = df.groupby(['user_id', 'content_id']).agg({'rating': 'mean'}).reset_index()

    return df_agg