import pandas as pd
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from asgiref.sync import sync_to_async
import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F
import psycopg2
from psycopg2 import sql
from dotenv import load_dotenv
from sqlalchemy import create_engine
import logging



load_dotenv()
db_host = os.getenv('DB_HOST')
db_name = os.getenv('DB_NAME')
db_user = os.getenv('DB_USER')
db_password = os.getenv('DB_PASSWORD')
db_port = os.getenv('DB_PORT')

connection_string = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"

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
    schedule_daily_task()
    global df_reviews, df_users, df_items, user_id_mapping, item_id_mapping, user_item_matrix, n_users, n_items
    df_reviews = pd.read_csv(os.path.join(review_csv_file_path))
    df_users = pd.read_csv(os.path.join(user_csv_file_path))
    df_items = pd.read_csv(os.path.join(item_csv_file_path))
    user_id_mapping = {user_id: index for index, user_id in enumerate(df_users['id'].unique())}
    item_id_mapping = {item_id: index for index, item_id in enumerate(df_items['id'].unique())}

    df_reviews['user_id'] = df_reviews['user_id'].map(user_id_mapping)
    df_reviews['item_id'] = df_reviews['item_id'].map(item_id_mapping)

    n_users = len(user_id_mapping)
    n_items = len(item_id_mapping)

    user_item_matrix = np.zeros((n_users, n_items))

    for row in df_reviews.itertuples():
        user_item_matrix[row.user_id, row.item_id] = row.rate

class RBM(nn.Module):
    def __init__(self, n_visible, n_hidden):
        super(RBM, self).__init__()
        self.W = nn.Parameter(torch.randn(n_hidden, n_visible) * 0.01)
        self.bh = nn.Parameter(torch.zeros(n_hidden))
        self.bv = nn.Parameter(torch.zeros(n_visible))

    def sample_h(self, v):
        p_h_given_v = torch.sigmoid(F.linear(v, self.W, self.bh))
        return p_h_given_v, torch.bernoulli(p_h_given_v)

    def sample_v(self, h):
        p_v_given_h = torch.sigmoid(F.linear(h, self.W.t(), self.bv))
        return p_v_given_h, torch.bernoulli(p_v_given_h)

    def forward(self, v):
        _, h_sample = self.sample_h(v)
        _, v_sample = self.sample_v(h_sample)
        return v_sample

    def free_energy(self, v):
        v_term = torch.matmul(v, self.bv)
        h_term = torch.sum(F.softplus(F.linear(v, self.W, self.bh)), dim=1)
        return -v_term - h_term

def train(rbm, data, epochs=10, batch_size=64, learning_rate=0.01):
    optimizer = optim.SGD(rbm.parameters(), lr=learning_rate)
    criterion = nn.MSELoss()

    for epoch in range(epochs):
        epoch_loss = 0
        for i in range(0, data.shape[0], batch_size):
            batch = data[i:i+batch_size]
            v = torch.FloatTensor(batch)
            v_sample = rbm(v)

            loss = criterion(v_sample, v)
            epoch_loss += loss.item()

            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

        print(f'Epoch {epoch + 1}, Loss: {epoch_loss / len(data)}')

async def main():

    await setup()

    user_item_tensor = torch.FloatTensor(user_item_matrix)

    n_visible = n_items
    n_hidden = 128

    rbm = RBM(n_visible, n_hidden)
    train(rbm, user_item_tensor, epochs=20, batch_size=10, learning_rate=0.01)

    return rbm

async def recommend(rbm, user_id):
    user_index = user_id_mapping.get(user_id)
    if user_index is None:
        raise ValueError(f"User ID {user_id} not found in the dataset.")

    user_ratings = user_item_matrix[user_index].reshape(1, -1)

    user_ratings_tensor = torch.FloatTensor(user_ratings)
    predicted_ratings_tensor = rbm(user_ratings_tensor)
    predicted_ratings = predicted_ratings_tensor.detach().numpy().flatten()

    recommended_items = np.argsort(predicted_ratings)[::-1][:5]
    recommended_items = [(item_id, predicted_ratings[item_id]) for item_id in recommended_items]

    top_items = []
    for item_id, rating in recommended_items:
        item_id_original = list(item_id_mapping.keys())[list(item_id_mapping.values()).index(item_id)]
        item = df_items[df_items['id'] == int(item_id_original)].iloc[0] 
        top_items.append({'item_id': int(item_id_original), 'item_name': item['name'], 'estimated_rating': float(rating)})

    print(top_items)
    return top_items

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
    global rbm_model
    rbm_model = await main()

@app.get("/recommend/")
async def recommend_item(user_id: int):
    return await recommend(rbm_model, user_id)
