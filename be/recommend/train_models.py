# import pandas as pd
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker
# from surprise import Dataset, Reader, SVD, accuracy
# from surprise.model_selection import train_test_split
# import pickle
# from datetime import datetime
# import torch
# from torch import nn
# import torch.optim as optim
# import os
# import sys
# import django
# from asgiref.sync import sync_to_async
# sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# django.setup()

# from app.models import Interaction
# from dotenv import load_dotenv

# load_dotenv()

# db_host = os.getenv('DB_HOST')
# db_name = os.getenv('DB_NAME')
# db_user = os.getenv('DB_USER')
# db_password = os.getenv('DB_PASSWORD')
# db_port = os.getenv('DB_PORT')

# connection_string = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
# engine = create_engine(connection_string)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# @sync_to_async
# def fetch_interactions():
#     query = """
#     SELECT
#         id,
#         user_id_id AS user_id,
#         content_id,
#         interaction_type,
#         stay_time,
#         timestamp
#     FROM app_interaction
#     WHERE content_type = 'item'
#     """
#     return pd.read_sql(query, engine)

# T = 7  
# def apply_time_decay(df, T):
#     t_now = datetime.now()
#     df['timestamp'] = df['timestamp'].apply(lambda x: x.tz_localize(None))
#     t_now = t_now.replace(tzinfo=None)
#     df['decayed_weight'] = df.apply(lambda row: row['interaction_weight'] * 0.5 ** ((t_now - row['timestamp']).days / T), axis=1)
#     return df


# async def load_and_preprocess_data():
#     df = await fetch_interactions()

#     df['stay_time_seconds'] = df['stay_time'].apply(lambda x: x.total_seconds() if pd.notnull(x) else 0)

#     df['stay_time_normalized'] = (df['stay_time_seconds'] - df['stay_time_seconds'].min()) / (df['stay_time_seconds'].max() - df['stay_time_seconds'].min())

#     average_stay_time = df['stay_time_seconds'].mean()
#     interaction_weights = {
#         'view': 3 if average_stay_time > 90 else(2 if average_stay_time > 60 else 1) ,
#         'like': 2,
#         'bookmark': 3,
#         'purchase': 5,
#         'comment': 2,
#         'review': 4
#     }
#     df['interaction_weight'] = df['interaction_type'].apply(lambda x: interaction_weights.get(x, 1))

#     df['timestamp'] = pd.to_datetime(df['timestamp'])
#     df = apply_time_decay(df, T)

#     # Combine decayed weight and normalized stay time to form a rating
#     df['rating'] = df['decayed_weight'] * (1 + df['stay_time_normalized'])

#     # Aggregate ratings for each (user_id, content_id) pair
#     df_agg = df.groupby(['user_id', 'content_id']).agg({'rating': 'mean'}).reset_index()

#     return df_agg

# @sync_to_async
# def save_svd_model(svd, path):
#     with open(path, 'wb') as f:
#         pickle.dump(svd, f)

# async def train_svd_model():
#     df_agg = await load_and_preprocess_data()
#     reader = Reader(rating_scale=(0, 10))
#     data = Dataset.load_from_df(df_agg[['user_id', 'content_id', 'rating']], reader)
#     trainset, testset = train_test_split(data, test_size=0.01)
#     svd = SVD()
#     svd.fit(trainset)
    
#     await save_svd_model(svd, 'svd_model.pkl')

#     predictions = svd.test(testset)
#     print(f"RMSE for SVD: {accuracy.rmse(predictions)}")

# class RBM(nn.Module):
#     def __init__(self, n_vis, n_hid):
#         super(RBM, self).__init__()
#         self.W = nn.Parameter(torch.randn(n_hid, n_vis) * 0.1)
#         self.h_bias = nn.Parameter(torch.zeros(n_hid))
#         self.v_bias = nn.Parameter(torch.zeros(n_vis))

#     def forward(self, v):
#         p_h_given_v = torch.sigmoid(nn.functional.linear(v, self.W, self.h_bias))
#         return p_h_given_v

#     def sample_from_p(self, p):
#         return nn.functional.relu(torch.sign(p - torch.rand_like(p)))

#     def v_to_h(self, v):
#         p_h_given_v = torch.sigmoid(nn.functional.linear(v, self.W, self.h_bias))
#         return self.sample_from_p(p_h_given_v), p_h_given_v

#     def h_to_v(self, h):
#         p_v_given_h = torch.sigmoid(nn.functional.linear(h, self.W.t(), self.v_bias))
#         return self.sample_from_p(p_v_given_h), p_v_given_h

# @sync_to_async
# def save_rbm_model(rbm, path):
#     with open(path, 'wb') as f:
#         pickle.dump(rbm, f)

# async def train_rbm_model():
#     df_agg = await load_and_preprocess_data()
#     user_item_matrix = df_agg.pivot(index='user_id', columns='content_id', values='rating').fillna(0).values
#     device = torch.device('cuda' if torch.cuda.is_available() else ('mds' if torch.cuda.is_available() else 'cpu'))  
#     train_data = torch.FloatTensor(user_item_matrix).to(device)
#     n_vis = train_data.shape[1]
#     n_hid = 100
#     rbm = RBM(n_vis, n_hid).to(device)
#     optimizer = optim.SGD(rbm.parameters(), lr=0.1)
#     epochs = 10

#     for epoch in range(epochs):
#         epoch_loss = 0
#         for user in train_data:
#             v0 = user.unsqueeze(0)
#             vk = v0
#             ph0, _ = rbm.v_to_h(v0)
#             for k in range(10):
#                 hk, _ = rbm.v_to_h(vk)
#                 vk, _ = rbm.h_to_v(hk)
#             phk, _ = rbm.v_to_h(vk)
#             loss = torch.mean((v0 - vk) ** 2)
#             epoch_loss += loss.item()
#             optimizer.zero_grad()
#             loss.backward()
#             optimizer.step()
#         print(f'Epoch {epoch + 1}/{epochs}, Loss: {epoch_loss / len(train_data)}')

#     await save_rbm_model(rbm, 'rbm_model.pkl')
# import pandas as pd
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker
# from surprise import Dataset, Reader, SVD, accuracy
# from surprise.model_selection import train_test_split
# import pickle
# from datetime import datetime
# import torch
# from torch import nn
# import torch.optim as optim
# import os
# import sys
# import django
# from asgiref.sync import sync_to_async
# from transformers import AutoTokenizer, AutoModel
# from sklearn.metrics.pairwise import cosine_similarity
# import torch.nn.functional as F

# sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# django.setup()

# from app.models import Interaction, Item
# from dotenv import load_dotenv

# load_dotenv()

# db_host = os.getenv('DB_HOST')
# db_name = os.getenv('DB_NAME')
# db_user = os.getenv('DB_USER')
# db_password = os.getenv('DB_PASSWORD')
# db_port = os.getenv('DB_PORT')

# connection_string = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
# engine = create_engine(connection_string)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# @sync_to_async
# def fetch_interactions():
#     query = """
#     SELECT
#         id,
#         user_id_id AS user_id,
#         content_id,
#         interaction_type,
#         stay_time,
#         timestamp
#     FROM app_interaction
#     WHERE content_type = 'item'
#     """
#     return pd.read_sql(query, engine)

# T = 7  
# def apply_time_decay(df, T):
#     t_now = datetime.now()
#     df['timestamp'] = df['timestamp'].apply(lambda x: x.tz_localize(None))
#     t_now = t_now.replace(tzinfo=None)
#     df['decayed_weight'] = df.apply(lambda row: row['interaction_weight'] * 0.5 ** ((t_now - row['timestamp']).days / T), axis=1)
#     return df

# async def load_and_preprocess_data():
#     df = await fetch_interactions()

#     df['stay_time_seconds'] = df['stay_time'].apply(lambda x: x.total_seconds() if pd.notnull(x) else 0)

#     df['stay_time_normalized'] = (df['stay_time_seconds'] - df['stay_time_seconds'].min()) / (df['stay_time_seconds'].max() - df['stay_time_seconds'].min())

#     average_stay_time = df['stay_time_seconds'].mean()
#     interaction_weights = {
#         'view': 3 if average_stay_time > 90 else (2 if average_stay_time > 60 else 1),
#         'like': 2,
#         'bookmark': 3,
#         'purchase': 5,
#         'comment': 2,
#         'review': 4
#     }
#     df['interaction_weight'] = df['interaction_type'].apply(lambda x: interaction_weights.get(x, 1))

#     df['timestamp'] = pd.to_datetime(df['timestamp'])
#     df = apply_time_decay(df, T)

#     # Combine decayed weight and normalized stay time to form a rating
#     df['rating'] = df['decayed_weight'] * (1 + df['stay_time_normalized'])

#     # Aggregate ratings for each (user_id, content_id) pair
#     df_agg = df.groupby(['user_id', 'content_id']).agg({'rating': 'mean'}).reset_index()

#     return df_agg

# @sync_to_async
# def save_svd_model(svd, path):
#     with open(path, 'wb') as f:
#         pickle.dump(svd, f)

# async def train_svd_model():
#     df_agg = await load_and_preprocess_data()
#     reader = Reader(rating_scale=(0, 10))
#     data = Dataset.load_from_df(df_agg[['user_id', 'content_id', 'rating']], reader)
#     trainset, testset = train_test_split(data, test_size=0.01)
#     svd = SVD()
#     svd.fit(trainset)
    
#     await save_svd_model(svd, 'svd_model.pkl')

#     predictions = svd.test(testset)
#     print(f"RMSE for SVD: {accuracy.rmse(predictions)}")

# class RBM(nn.Module):
#     def __init__(self, n_vis, n_hid):
#         super(RBM, self).__init__()
#         self.W = nn.Parameter(torch.randn(n_hid, n_vis) * 0.1)
#         self.h_bias = nn.Parameter(torch.zeros(n_hid))
#         self.v_bias = nn.Parameter(torch.zeros(n_vis))
#         self.content_embeddings = None

#     def forward(self, v):
#         p_h_given_v = torch.sigmoid(F.linear(v, self.W, self.h_bias))
#         return p_h_given_v

#     def sample_from_p(self, p):
#         return F.relu(torch.sign(p - torch.rand_like(p)))

#     def v_to_h(self, v):
#         p_h_given_v = torch.sigmoid(F.linear(v, self.W, self.h_bias))
#         return self.sample_from_p(p_h_given_v), p_h_given_v

#     def h_to_v(self, h):
#         p_v_given_h = torch.sigmoid(F.linear(h, self.W.t(), self.v_bias))
#         return self.sample_from_p(p_v_given_h), p_v_given_h

#     def set_content_embeddings(self, embeddings):
#         self.content_embeddings = embeddings

#     def calculate_cosine_similarity(self, user_embedding):
#         if self.content_embeddings is None:
#             raise ValueError("Content embeddings are not set.")
#         user_embedding = user_embedding.detach().numpy()
#         similarities = cosine_similarity([user_embedding], self.content_embeddings)
#         return similarities.squeeze()

# @sync_to_async
# def save_rbm_model(rbm, path):
#     with open(path, 'wb') as f:
#         pickle.dump(rbm, f)

# async def train_rbm_model():
#     df_agg = await load_and_preprocess_data()
#     user_item_matrix = df_agg.pivot(index='user_id', columns='content_id', values='rating').fillna(0).values
#     device = torch.device('cuda' if torch.cuda.is_available() else ('mps' if torch.backends.mps.is_available() else 'cpu'))  
#     train_data = torch.FloatTensor(user_item_matrix).to(device)

#     # Embedding content (name, description)
#     items_df = pd.DataFrame(await sync_to_async(list)(Item.objects.all().values()))
#     content_features_df = extract_features(items_df, ['name', 'description'])
#     content_embeddings = content_features_df.to_numpy()

#     n_vis = train_data.shape[1]
#     n_hid = 100
#     rbm = RBM(n_vis, n_hid).to(device)
#     rbm.set_content_embeddings(content_embeddings)

#     optimizer = optim.SGD(rbm.parameters(), lr=0.1)
#     epochs = 10

#     for epoch in range(epochs):
#         epoch_loss = 0
#         for user in train_data:
#             v0 = user.unsqueeze(0)
#             vk = v0
#             ph0, _ = rbm.v_to_h(v0)
#             for k in range(10):
#                 hk, _ = rbm.v_to_h(vk)
#                 vk, _ = rbm.h_to_v(hk)
#             phk, _ = rbm.v_to_h(vk)
#             loss = torch.mean((v0 - vk) ** 2)
#             epoch_loss += loss.item()
#             optimizer.zero_grad()
#             loss.backward()
#             optimizer.step()
#         print(f'Epoch {epoch + 1}/{epochs}, Loss: {epoch_loss / len(train_data)}')

#     await save_rbm_model(rbm, 'rbm_model.pkl')

# # Define functions for content embeddings and cosine similarity
# tokenizer = AutoTokenizer.from_pretrained("monologg/kobert")
# model = AutoModel.from_pretrained("monologg/kobert")

# def embed_text(text):
#     inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
#     outputs = model(**inputs)
#     return outputs.last_hidden_state.mean(dim=1).squeeze()

# def extract_features(df, feature_columns):
#     features = []
#     for idx, row in df.iterrows():
#         combined_embedding = None
#         for col in feature_columns:
#             embedding = embed_text(row[col])
#             if combined_embedding is None:
#                 combined_embedding = embedding
#             else:
#                 combined_embedding += embedding
#         combined_embedding = combined_embedding / len(feature_columns)  # Average embeddings
#         features.append(combined_embedding.detach().numpy())  # Detach and convert to numpy
#     return pd.DataFrame(features)
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
from transformers import AutoTokenizer, AutoModel
from sklearn.metrics.pairwise import cosine_similarity
from torch.nn import functional as F    

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

django.setup()

from app.models import Interaction, Item
from pathlib import Path
from dotenv import load_dotenv
env_path = Path('recommend/.env')

load_dotenv(env_path)

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
    WHERE content_type = 'item'
    """
    return pd.read_sql(query, engine)

T = 7  
def apply_time_decay(df, T):
    t_now = datetime.now()
    df['timestamp'] = df['timestamp'].apply(lambda x: x.tz_localize(None))
    t_now = t_now.replace(tzinfo=None)
    df['decayed_weight'] = df.apply(lambda row: row['interaction_weight'] * 0.5 ** ((t_now - row['timestamp']).days / T), axis=1)
    return df

async def load_and_preprocess_data():
    df = await fetch_interactions()

    df['stay_time_seconds'] = df['stay_time'].apply(lambda x: x.total_seconds() if pd.notnull(x) else 0)

    df['stay_time_normalized'] = (df['stay_time_seconds'] - df['stay_time_seconds'].min()) / (df['stay_time_seconds'].max() - df['stay_time_seconds'].min())

    average_stay_time = df['stay_time_seconds'].mean()
    interaction_weights = {
        'view': 3 if average_stay_time > 90 else (2 if average_stay_time > 60 else 1),
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

@sync_to_async
def save_svd_model(svd, path):
    with open(path, 'wb') as f:
        pickle.dump(svd, f)

async def train_svd_model():
    df_agg = await load_and_preprocess_data()
    reader = Reader(rating_scale=(0, 10))
    data = Dataset.load_from_df(df_agg[['user_id', 'content_id', 'rating']], reader)
    trainset, testset = train_test_split(data, test_size=0.01)
    svd = SVD()
    svd.fit(trainset)
    
    await save_svd_model(svd, 'svd_model.pkl')

    predictions = svd.test(testset)
    print(f"RMSE for SVD: {accuracy.rmse(predictions)}")

class RBM(nn.Module):
    def __init__(self, n_vis, n_hid):
        super(RBM, self).__init__()
        self.W = nn.Parameter(torch.randn(n_hid, n_vis) * 0.1)
        self.h_bias = nn.Parameter(torch.zeros(n_hid))
        self.v_bias = nn.Parameter(torch.zeros(n_vis))
        self.content_embeddings = None

    def forward(self, v):
        p_h_given_v = torch.sigmoid(F.linear(v, self.W, self.h_bias))
        return p_h_given_v

    def sample_from_p(self, p):
        return F.relu(torch.sign(p - torch.rand_like(p)))

    def v_to_h(self, v):
        p_h_given_v = torch.sigmoid(F.linear(v, self.W, self.h_bias))
        return self.sample_from_p(p_h_given_v), p_h_given_v

    def h_to_v(self, h):
        p_v_given_h = torch.sigmoid(F.linear(h, self.W.t(), self.v_bias))
        return self.sample_from_p(p_v_given_h), p_v_given_h

    def set_content_embeddings(self, embeddings):
        self.content_embeddings = embeddings

    def calculate_cosine_similarity(self, user_embedding):
        if self.content_embeddings is None:
            raise ValueError("Content embeddings are not set.")
        user_embedding = user_embedding.detach().cpu().numpy()  # Move to CPU before converting to numpy
        similarities = cosine_similarity([user_embedding], self.content_embeddings)
        return similarities.squeeze()

@sync_to_async
def save_rbm_model(rbm, path):
    with open(path, 'wb') as f:
        pickle.dump(rbm, f)

async def train_rbm_model():
    df_agg = await load_and_preprocess_data()
    user_item_matrix = df_agg.pivot(index='user_id', columns='content_id', values='rating').fillna(0).values
    device = torch.device('cuda' if torch.cuda.is_available() else'cpu')  
    train_data = torch.FloatTensor(user_item_matrix).to(device)

    # Embedding content (name, description)
    items_df = pd.DataFrame(await sync_to_async(list)(Item.objects.all().values()))
    content_features_df = extract_features(items_df, ['name', 'description'])
    content_embeddings = content_features_df.to_numpy()

    n_vis = train_data.shape[1]
    n_hid = 100
    rbm = RBM(n_vis, n_hid).to(device)
    rbm.set_content_embeddings(content_embeddings)

    optimizer = optim.SGD(rbm.parameters(), lr=0.1)
    epochs = 10

    for epoch in range(epochs):
        epoch_loss = 0
        for user in train_data:
            v0 = user.unsqueeze(0)
            vk = v0
            ph0, _ = rbm.v_to_h(v0)
            for k in range(10):
                hk, _ = rbm.v_to_h(vk)
                vk, _ = rbm.h_to_v(hk)
            phk, _ = rbm.v_to_h(vk)
            loss = torch.mean((v0 - vk) ** 2)
            epoch_loss += loss.item()
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
        print(f'Epoch {epoch + 1}/{epochs}, Loss: {epoch_loss / len(train_data)}')

    await save_rbm_model(rbm, 'rbm_model.pkl')

# Define functions for content embeddings and cosine similarity
tokenizer = AutoTokenizer.from_pretrained("monologg/kobert")
model = AutoModel.from_pretrained("monologg/kobert")

def embed_text(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    outputs = model(**inputs)
    return outputs.last_hidden_state.mean(dim=1).squeeze()

def extract_features(df, feature_columns):
    features = []
    for idx, row in df.iterrows():
        combined_embedding = None
        for col in feature_columns:
            embedding = embed_text(row[col])
            if combined_embedding is None:
                combined_embedding = embedding
            else:
                combined_embedding += embedding
        combined_embedding = combined_embedding / len(feature_columns)  # Average embeddings
        features.append(combined_embedding.detach().numpy())  # Detach and convert to numpy
    return pd.DataFrame(features)
