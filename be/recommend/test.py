import pandas as pd
import os
import django
import torch
from torch import nn
import torch.nn.functional as F
import torch.optim as optim
from surprise import Dataset, Reader, SVD
from surprise.model_selection import train_test_split
from surprise import accuracy
from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from dotenv import load_dotenv
from pytz import utc
load_dotenv()

db_host = os.getenv('DB_HOST')
db_name = os.getenv('DB_NAME')
db_user = os.getenv('DB_USER')
db_password = os.getenv('DB_PASSWORD')
db_port = os.getenv('DB_PORT')

connection_string = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
engine = create_engine(connection_string)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def fetch_interactions():
    query = """
    SELECT
        *
    FROM app_interaction
    WHERE content_type = 'board'

    """
    return pd.read_sql(query, engine)
# Define the half-life for the decay function
T = 7  # days

def apply_time_decay(df, T):
    t_now = datetime.now()
    df['timestamp'] = df['timestamp'].apply(lambda x: x.tz_localize(None))
    df['decayed_weight'] = df.apply(lambda row: row['interaction_weight'] * 0.5 ** ((t_now - row['timestamp']).days / T), axis=1)
    return df
df = fetch_interactions()
# Assign weights to interactions

interaction_weights = {
        'view': 1,
        'like': 2,
        'comment': 2,
    }

df['interaction_weight'] = df['interaction_type'].apply(lambda x: interaction_weights.get(x, 1))

# Apply time decay to interaction weights
df['timestamp'] = pd.to_datetime(df['timestamp'])
df = apply_time_decay(df, T)

# Combine decayed weight and normalized stay time to form a rating
df['rating'] = df['decayed_weight']

# Aggregate ratings for each (user_id, content_id) pair
df_agg = df.groupby(['user_id_id', 'content_id']).agg({'rating': 'mean'}).reset_index()

# Train the SVD algorithm
reader = Reader(rating_scale=(0, 10))
data = Dataset.load_from_df(df_agg[['user_id_id', 'content_id', 'rating']], reader)
trainset, testset = train_test_split(data, test_size=0.01)
svd = SVD()
svd.fit(trainset)
predictions = svd.test(testset)
print(f"RMSE for SVD: {accuracy.rmse(predictions)}")

# Check for GPU availability with Metal support
device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")
print(f"Using device: {device}")

# Train the RBM model
class RBM(nn.Module):
    def __init__(self, n_vis, n_hid):
        super(RBM, self).__init__()
        self.W = nn.Parameter(torch.randn(n_hid, n_vis) * 0.1)
        self.h_bias = nn.Parameter(torch.zeros(n_hid))
        self.v_bias = nn.Parameter(torch.zeros(n_vis))

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

user_item_matrix = df_agg.pivot(index='user_id_id', columns='content_id', values='rating').fillna(0).values
train_data = torch.FloatTensor(user_item_matrix).to(device)  # Move data to device
n_vis = train_data.shape[1]
n_hid = 100
rbm = RBM(n_vis, n_hid).to(device)  # Move model to device
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

def recommend_items(user_id_id, svd_model, rbm_model=None, num_recommendations=10):
    user_interactions = df_agg[df_agg['user_id_id'] == user_id_id]
    items = df_agg['content_id'].unique()
    recommendations = []

    for item in items:
        if svd_model:
            score = svd_model.predict(user_id_id, item).est
        if rbm_model:
            user_vector = torch.FloatTensor(user_interactions.pivot(index='user_id_id', columns='content_id', values='rating').fillna(0).values).to(device)
            score = rbm_model(user_vector).item()
        recommendations.append((item, score))

    recommendations.sort(key=lambda x: x[1], reverse=True)
    return recommendations[:num_recommendations]

# Example usage with SVD
user_id_id = 49
recommendations = recommend_items(user_id_id, svd)
print(recommendations)
